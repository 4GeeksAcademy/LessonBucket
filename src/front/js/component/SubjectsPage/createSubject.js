import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./subjects.css";
import { Context } from "../../store/appContext.js";
import { Modal, Button, Form } from "react-bootstrap";





export const CreateSubject = () => {
    const { store, actions } = useContext(Context);
    const [show, setShow] = useState(false)
    const [Subject, setSubject] = useState("")
    const handleModal = () => { setShow(true), console.log("hola") }
    const handleClose = () => { setShow(false) }
    const UserID = store.user.id

    const onSubjectFormSubmit = (e) => {

        e.preventDefault();
        actions.createSubject(Subject, UserID);
        handleClose();

    };
    return (
        <div className="container">
            <div className="subjectsHeader">
                <h1 className="row">Materias</h1>
                <button className="row" onClick={() => handleModal()}><i class="fa-solid fa-plus"></i></button>
            </div>

            {/* modal */}
            <Modal class="modal" show={show} onHide={handleClose} id="modalCreateSubject">
                <Modal.Header closeButton>
                    <Modal.Title>Login Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubjectFormSubmit}>
                        <Form.Group controlId="formBasicSubject">
                            <Form.Label>Subject name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter subject name"
                                value={Subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember Me!" />
                        </Form.Group>
                        <Button variant="primary" onSubmit={onSubjectFormSubmit} type="submit" block>
                            Login
                        </Button>
                    </Form>
                    <div className="text-center">

                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}