import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const TataMataModalTest = ({ show, handleClose, result, resetTest }) => {
  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      style={{ fontFamily: "Lexend, sans-serif" }}
      centered
    >
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

      {/* Responzivnost */}
      <style>
        {`
          .modal-content {
            max-width: 90%;
            width: auto;
            margin: 0 auto;
          }

          @media (max-width: 576px) {
            .modal-content {
              max-width: 95%;
            }
          }

          @media (max-width: 400px) {
            .modal-content {
              max-width: 98%;
            }
          }
        `}
      </style>
    </Modal>
  );
};

export default TataMataModalTest;
