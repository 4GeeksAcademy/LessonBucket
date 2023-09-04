import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./subjects.css";
import { Context } from "../../store/appContext.js";
import { Modal, Button, Form } from "react-bootstrap";
import { StudentList } from "./studentList";





export const ModifySubject = () => {
    const { store, actions } = useContext(Context);
    const [show, setShow] = useState(false)
    const [Subject, setSubject] = useState("")
    const handleModal = () => { setShow(true), console.log("hola") }
    const handleClose = () => { setShow(false) }
    const UserID = store.user.id

    const onSubjectFormSubmit = (e) => {

        e.preventDefault();
        actions.update_subject(Subject, UserID);
        handleClose();

    };
    return (
        <div>
            <div className="container subjectsHeader">
                <h1 className="col-11">Subjects <i class="fa-solid fa-plus fa-2xs" onClick={() => handleModal()}></i></h1>
            </div>

            {/* modal */}
            <Modal class="modal" show={show} onHide={handleClose} id="modalUpdateSubject">
                <Modal.Header closeButton>
                    <Modal.Title>Create a new subject</Modal.Title>
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
                            <div className="container">

                            </div>
                        </Form.Group>
                        <Button className="mt-3" variant="primary" onSubmit={onSubjectFormSubmit} type="submit" block>
                            Create
                        </Button>
                    </Form>
                    <h1>Students</h1>
                    <p>You can choose students from your list to add to this subject!</p>
                    <div class="overflow-auto" id="StudentsBox" style={{ maxHeight: "300px", maxWidth: "100%" }}>
                        {(
                            store.allStudents.map(student => (
                                <div className="col md-auto" key={student.id}>
                                    <StudentList
                                        id={student.id}
                                        name={student.name}
                                        phone={student.phone}
                                        email={student.email}
                                        address={student.address}
                                        goal={student.goal}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    );
}