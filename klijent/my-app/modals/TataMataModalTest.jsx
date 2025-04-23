import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const TataMataModalTest = ({ show, handleClose, result, resetTest }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Rezultat testa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{result}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={handleClose}>
          Zatvori
        </Button>
        <Button variant="primary" onClick={resetTest}>
          Ponovo započni test
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TataMataModalTest;
