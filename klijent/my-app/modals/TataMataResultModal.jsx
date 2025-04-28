import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TataMataResultModal = ({ show, handleClose, result }) => {
  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered 
      size="m" 
      style={{fontFamily: "Lexend, sans-serif"}} 
      animation
    >
      <Modal.Header className="bg-warning text-white">
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

      {/* Responzivnost */}
      <style>
        {`
          .modal-content {
            width: auto
            max-width: 90%; 
            margin: 0 auto; 
          }

          /* Manja prilagođavanja za mobilne uređaje */
          @media (max-width: 576px) {
            .modal-content {
              max-width: 95%; 
            }
          }

          @media (max-width: 400px) {
            .modal-content {
              max-width: 90%; 
            }
          }
        `}
      </style>
    </Modal>
  );
};

export default TataMataResultModal;
