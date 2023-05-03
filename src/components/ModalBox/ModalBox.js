import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useNavigate } from "react-router-dom";

function ModalBox({ btnName, row, children, deleteRecordCall }) {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button type='button' className='btn-sm mx-2 my-1 btn text-white' style={{ background: "#F64E60" }} onClick={handleShow}>
        <i className='bx bxs-trash me-2'></i>
        {btnName}
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button className='bg-primary-blue' onClick={handleClose}>
            Close
          </Button>
          <Button
            className='btn btn-danger'
            onClick={() => {
              deleteRecordCall();
            }}
          >
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalBox;
