import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function TataMataGraphModal({ show, handleClose }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="m"
      centered
      style={{
        fontFamily: "Lexend, sans-serif",
        maxWidth: "100%",
        display: "flex", // Centriranje
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal.Header className="bg-warning text-white">
        <Modal.Title>Grafik funkcije</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          padding: "0",
          height: "60vh", 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          id="graph-modal-container"
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden", // Sprečava izlazak grafikona van okvira
          }}
        >
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={handleClose}>
          Zatvori
        </Button>
      </Modal.Footer>

      <style jsx>{`
        /* Responzivnost */
        @media (max-width: 516px) {
          .modal-dialog {
            max-width: 90vw; 
            margin: auto; 
            top: 10%; 
          }

          .modal-body {
            height: 50vh; 
            padding: 0;
          }

          #graph-modal-container {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        @media (min-width: 500px) and (max-width: 1000px) {
          .modal-body {
            height: 70vh; 
          }

          #graph-modal-container {
            height: 90%; 
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .modal-dialog {
            max-width: 80vw; 
            margin: auto; 
            top: 5vh; 
          }
        }

        @media (min-width: 1001px) {
          .modal-body {
            height: 60vh; 
          }

          #graph-modal-container {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .modal-dialog {
            max-width: 75vw; 
            margin-top: 5vh;
          }
        }
      `}</style>
    </Modal>
  );
}
