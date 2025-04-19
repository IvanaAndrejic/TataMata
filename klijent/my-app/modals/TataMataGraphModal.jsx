import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function TataMataGraphModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header className="bg-secondary text-white">
        <Modal.Title>Grafik funkcije</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="graph-modal-container" style={{ width: "100%", height: "400px" }}></div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={handleClose}>
          Zatvori
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
