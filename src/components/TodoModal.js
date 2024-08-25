import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function TodoModal(props) {
  const [show, setShow] = useState(true);
  let [ todoText, setTodoText] = useState('');

  useEffect(()=>{
    console.log('from todo modal props', props)
    if(!props.todo){
      return;
    }
    setTodoText(props.todo.todo);
  }, []);

  const handleClose = () => {
    props.close();
    setShow(false)
  };
  const handleSave = () => {
    props.save({
        todo: todoText,
        id: props.todo?props.todo.id:null
    });
    setShow(false)
  };

  function onTodoTextChange(event){
    setTodoText(event.target.value)
  }

  return (
    <>
     
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="todo.todo">
        <Form.Label>Todo Text</Form.Label>
        <Form.Control type="text" placeholder="Enter todo text" 
        value={todoText}
        onChange={(event)=>onTodoTextChange(event)} />
      </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TodoModal;