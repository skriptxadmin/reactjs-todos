import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Icon from './Icon';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
function TodoList() {


  let todos = [
    {
      id:1,
      todo:"Learn React"
    },
    {
      id:2,
      todo:"Learn Angular"
    }
  ];

  let [listItems, setListItems] = useState(todos);

  return (
    <Container>
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
                <Button variant="warning">
                  <Icon name="edit" />
                </Button>
                <Button variant="danger">
                <Icon name="delete" />
                </Button>
              </td>
            </tr>
            );

          })
        }
       
      
      </tbody>
    </Table>
    </Container>
  );
}

export default TodoList;