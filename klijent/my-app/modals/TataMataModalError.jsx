import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function TataMataModalError({ show, handleClose }) {
  return (
    <Modal
      show={show}
      size='m'
      onHide={handleClose}
      style={{
        fontFamily: 'Lexend, sans-serif',
      }}
      centered // Centriranje modala
    >
      <Modal.Header className="bg-warning text-white">
        <Modal.Title>Greška</Modal.Title>
      </Modal.Header>
      <Modal.Body>Neispravan unos</Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={handleClose}>
          Zatvori
        </Button>
      </Modal.Footer>

      <style jsx>{`
        .modal-content {
          width: 100%;
          max-width: 32rem; 
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
      `}</style>
    </Modal>
  );
}

export default TataMataModalError;
