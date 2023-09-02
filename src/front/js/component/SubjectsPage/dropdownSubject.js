import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./subjects.css";
import { Context } from "../../store/appContext.js";
import { StudentPerSubject } from "./studentPerSubject";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { StudentList } from "./studentList";


export const DropdownSubject = (props) => {

    const { store, actions } = useContext(Context);
    const students = store.allStudents;
    const accordionID = `#${props.subject}`
    const [show, setShow] = useState(false)
    const [showModify, setShowModify] = useState(false)
    const [Subject, setSubject] = useState("")
    const HandleModifyModal = () => { setShowModify(true)}
    const handleModifyClose = () => { setShow(false) }
    const HandleConfirmationModal = () => { setShow(true)}
    const handleConfirmationClose = () => { setShow(false) }
    const UserID = store.user.id

    const onConfirmationAccept = () => {
        actions.deleteSubject(props.id)
        handleConfirmationClose()
    }

    const onSubjectFormSubmit = (e) => {

        e.preventDefault();
        actions.modifyOneSubject(props.id, Subject);
        handleModifyClose();
    }
        useEffect(() => {
            actions.getAllStudents()
            }, [store.token]);

    return (
        <div className="container my-2">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={accordionID} aria-expanded="false" aria-controls="flush-collapseOne">
                        {props.subject}
                        
                    </button>
                </h2>
                <div id={props.subject} className="accordion-collapse collapse" data-bs-parent="#accordionSubjects">
                    <div className="accordion-body">
                        <div className="row row-cols-auto">
                    <button type="button" className="btn btn-outline-info col me-1" onClick={() => {HandleModifyModal()}}>Modify the subject</button>
                    <button type="button" className="btn btn-outline-danger col" onClick={() => {HandleConfirmationModal()}}>Delete the subject</button>
                    </div>
                    <hr/>
                        {(
                            students.map(student => (
                                <div className="col md-auto" key={student.id}>
                                    <StudentPerSubject
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

                </div>

            </div>
            {/* modal */}
            <Modal className="modal" show={showModify} onHide={handleModifyClose} id="modalUpdateSubject">
                <Modal.Header closeButton>
                    <Modal.Title>Modify a subject</Modal.Title>
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
                    <div className="overflow-auto" id="StudentsBox" style={{ maxHeight: "300px", maxWidth: "100%" }}>
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

            <Modal className="modal" show={show} onHide={handleConfirmationClose} id="modalConfirmDelete">
                <Modal.Header closeButton>
                    <Modal.Title>Delete the subject</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>Alert!</h1>
                    <p>Are you sure you want to delete this subject? This action can't be undone.</p>
                    <button type="button" class="btn btn-primary me-2" onClick={()=>{onConfirmationAccept()}}>Yes, delete</button>
                    <button type="button" class="btn btn-danger" onClick={()=>{handleModifyClose()}}>No!</button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

DropdownSubject.propTypes = {
    Subject: PropTypes.string
};

