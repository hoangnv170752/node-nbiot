import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import LightTableRow from "./LightTableRow";
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);



const Deleteitem = () => {
    return (
        <>
        <Button size="sm" variant="danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick = {deleteShow}>
		    Delete
		</Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

