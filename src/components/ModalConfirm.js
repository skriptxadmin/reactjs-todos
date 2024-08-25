import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalConfirm(props) {
  const [show, setShow] = useState(true);

  const handleClose = (result) => {
    props.close(result);
    setShow(false)
};

  return (
    <>
      <Modal show={show} onHide={()=>handleClose(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this modal</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose(false)}>
            No
          </Button>
          <Button variant="primary" onClick={()=>handleClose(true)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirm;