import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Icon from './Icon';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import TodoModal from './TodoModal';
import ModalConfirm from './ModalConfirm';
import { API } from '../environment';

import { collection, getDocs, setDoc, addDoc, doc, deleteDoc } from "firebase/firestore";
import {db} from '../firestore';

function TodoList() {

  let [listItems, setListItems] = useState([]);
  let [showTodoModal, setShowTodoModal] = useState(false);
  let [selectedTodo, setSelectedTodo] = useState(null);
  let [showModalConfirm, setShowModalConfirm]= useState(false);
  let [todoSelectedForDelete, setTodoSelectedForDelete] = useState(null);

  useEffect(()=>{
      fetchTodos();
  }, []);




  async function fetchTodos(){
    // const res = await fetch(API);  // Using db.json only for local
    // const todos = await res.json();
    // setListItems(todos);

    // From firebase
    await getDocs(collection(db, "todos"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
                setListItems(newData);                
            // console.log(todos, newData);
        })


  }

  function onCreateClick(event, todo){
    event.preventDefault();
    event.stopPropagation();

    console.log("create button is clicked", todo)
    setSelectedTodo(todo);
    setShowTodoModal(true);
  }

  function onCloseTodoModal(){
    setShowTodoModal(false);
  }

  async function onSaveTodoModal(todo){
    if(!todo.id){
      // create operation
      createTodo(todo);
      return;
    }
    updateTodo(todo);
   
  }

  async function createTodo(todo){
    // let id = -1;   // using db.json in local
    // listItems.forEach(item => {
    //   if(item.id >= id){
    //     id = item.id;
    //   }
    // })
    // todo.id = id+1;
    // const res = await fetch(API,{
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(todo),
    // })

    delete todo.id;
    await addDoc(collection(db, "todos"),todo); // firebase

    fetchTodos();
    setShowTodoModal(false);
  }

  async function updateTodo(todo){
    // const res = await fetch(API+todo.id,{ // local db.json
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(todo),
    // })
    const docRef = doc(collection(db, "todos"), todo.id) // firebase
    delete todo.id;
    await setDoc(docRef,todo);// firebase
    fetchTodos();
    setShowTodoModal(false);
  }

  function onDeleteClick(event, todo){
    event.preventDefault();
    event.stopPropagation();
    setShowModalConfirm(true);
    setTodoSelectedForDelete(todo);
  }

  async function onDeleteModalClose(result){
    setShowModalConfirm(false);
    if(!result){
      // NO or Cancel button is clicked
    setTodoSelectedForDelete(null);
      return;
    }
    // const res = await fetch(API+todoSelectedForDelete.id,{  // local db.json
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    const docRef = doc(collection(db, "todos"), todoSelectedForDelete.id)
    await deleteDoc(docRef);
    fetchTodos();
    setTodoSelectedForDelete(null);
  }

  return (
    <Container>
      <div className='my-3 d-flex justify-content-end align-items-center'>
        <Button variant="primary" onClick={(event) => onCreateClick(event, null)}>Create</Button>
      </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Todo</th>
          <th style={{width:"150px"}}>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          listItems.map((item) => {
            return (
              <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.todo}</td>
              <td>
                <Button variant="warning" onClick={(event) => onCreateClick(event, item)}>
                  <Icon name="edit" />
                </Button>
                <Button variant="danger" onClick={(event) => onDeleteClick(event, item)}>
                <Icon name="delete" />
                </Button>
              </td>
            </tr>
            );

          })
        }
       
      
      </tbody>
    </Table>
    {
      showTodoModal? <TodoModal close={onCloseTodoModal} save={onSaveTodoModal} todo={selectedTodo}/>:''
    }
    {
      showModalConfirm? <ModalConfirm close={onDeleteModalClose} />:''
    }
    </Container>
  );
}

export default TodoList;