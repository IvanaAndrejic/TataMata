import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function TataMataModalError({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} style={{fontFamily: "Lexend, sans-serif"}}>
      <Modal.Header className="bg-warning text-white">
        <Modal.Title>Greška</Modal.Title>
      </Modal.Header>
      <Modal.Body>Neispravan unos</Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={handleClose}>Zatvori</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TataMataModalError;
