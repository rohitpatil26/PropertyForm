import React from "react";
import { Modal, Button } from "react-bootstrap";
import './Modal.scss';

// Custom Modal
const CustomModal = (props) => {
  return (
    <Modal show={props.open} onHide={props.handleToggle} className="custom-modal">
      <Modal.Body>
        <img src={props.src} alt="imagepreview" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleToggle}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
