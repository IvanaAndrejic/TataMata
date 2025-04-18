import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TataMataResultModal = ({ show, handleClose, result }) => {
  return (
    <Modal show={show} onHide={handleClose} centered size="m" animation>
      <Modal.Header className="bg-secondary text-white">
        <Modal.Title>Rezultat</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-items-center">
        <div className="result-container">
          <h4 className="text-center">{result}</h4>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button variant="warning" onClick={handleClose} className="w-25">
          Zatvori
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TataMataResultModal;
