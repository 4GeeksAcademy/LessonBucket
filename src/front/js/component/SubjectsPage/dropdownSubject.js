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
    const accordionID = `#${props.subject.replace(/\s+/g, '')}`
    const [show, setShow] = useState(false)
    const [showModify, setShowModify] = useState(false)
    const [Subject, setSubject] = useState("")
    const HandleModifyModal = () => { setShowModify(true)}
    const handleModifyClose = () => { setShowModify(false) }
    const HandleConfirmationModal = () => { setShow(true)}
    const handleConfirmationClose = () => { setShow(false) }
    const handleAddStudentClose = () => { setShowAddStudent(false) }
    const [showAddStudent, setShowAddStudent] = useState(false)
    const UserID = store.user.id
    const [loaded, setLoaded] = useState("loadedEmpty")
    

    const onConfirmationAccept = () => {
        actions.deleteSubject(props.id)
        handleConfirmationClose()
    }

    const onSubjectFormSubmit = (e) => {

        e.preventDefault();
        actions.modifyOneSubject(props.id, Subject);
        handleModifyClose();
    }
    const HandleAddStudentModal = () => { 
        setShowAddStudent(true);
        console.log("hola")
    }
        useEffect(() => {
            actions.getAllStudents()
            setLoaded("fullLoaded")
            }, [store.token]);

    return (
        <div className="container my-2">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={accordionID} aria-expanded="false" aria-controls="flush-collapseOne">
                        {props.subject}
                        
                    </button>
                </h2>
                <div id={props.subject.replace(/\s+/g, '')} className="accordion-collapse collapse" data-bs-parent="#accordionSubjects">
                    <div className="accordion-body">
                        <div className="row row-cols-auto">
                    <button type="button" className="btn btn-outline-info col me-1" onClick={() => {HandleModifyModal()}}>Modify the subject</button>
                    <button type="button" class="btn btn-secondary me-2" onClick={()=>{HandleAddStudentModal()}}>Add a student</button>
                    <button type="button" className="btn btn-outline-danger col" onClick={() => {HandleConfirmationModal()}}>Delete the subject</button>
                    </div>
                    <hr/>
                        {(
                            props.students.map(student => (
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
                        <Button className="mt-3"  onSubmit={onSubjectFormSubmit} type="submit" block>
                            Create
                        </Button>
                    </Form>
                </Modal.Body>
             </Modal>
            {/* MODAL DE CONFIRMACION DE ELIMINAR MATERIA */}
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
{/* MODAL DE ASIGNAR ESTUDIANTE A MATERIA */}
            <Modal className="modal" show={showAddStudent} onHide={handleAddStudentClose} id="modalAddStudent">
                <Modal.Header closeButton>
                    <Modal.Title>Add a student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {students && students !== "" && students !== undefined ? (
				<>
                <div className="overflow-auto" id="StudentsBox" style={{ maxHeight: "300px", maxWidth: "100%" }}>
                        {(
                            students.map(student => (
                                <div className="col md-auto" key={student.id}>
                                    <StudentList
                                        id={student.id}
                                        name={student.name}
                                        phone={student.phone}
                                        email={student.email}
                                        address={student.address}
                                        goal={student.goal}
                                        subject_id={props.id}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                    </>) : (
				<div className="text-center">
					<h1>Cargando alumnos</h1>
				</div>
			)}
                </Modal.Body>
            </Modal>

            

            
        </div>
    );
}

DropdownSubject.propTypes = {
    Subject: PropTypes.string
};

