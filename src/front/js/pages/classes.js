import React, { useContext, useEffect, useState } from "react";
import { PrivateClass } from "../component/privateClass/privateClass";
import "../../styles/dashboard.css";
import { Context } from "../store/appContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


export const Classes = (props) => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [loaded, setLoaded] = useState("loadedEmpty")
    const Subjects = store.allSubjects
    const Students = store.allStudents


    useEffect(() => {
        actions.fetchClasses()
        actions.getAllSubjects()
        actions.getAllStudents()
        setLoaded("fullLoaded")
    }, [store.token]);


    useEffect(() => {
        console.log(Subjects)
    }, [Subjects]);




    const [newClassInfo, setNewClassInfo] = useState({
        subjects_name: "",
        student_name: "",
        comments: "",
        date: "",
        hour: "",
        price: "",
        paid: false,
    });



    // let sortedClases;
    // if (store.classes.results) {
    //     sortedClases = store.classes.results.sort((a, b) =>
    //         a.date.split('/').reverse().join().localeCompare(b.date.split('/').reverse().join()));
    // }

    const handleInputChange = event => {
        const { name, value, type, checked } = event.target;
        setNewClassInfo(prevInfo => ({
            ...prevInfo,
            [name]: value
        }));
    };


    const handleClose = () => {
        setShowModal(false);
    };

    const handleShow = () => {
        setShowModal(true);
    };

    return (
        <div className="dashboard-wrapper">
            <div className="separator">Próximas Clases</div>
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-nowrap overflow-auto">
                        {store.classes && store.classes.slice(0, 3).map((privateClass, index) => (
                            <div key={index}>
                                <PrivateClass privateClass={privateClass} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="separator">
                <div className="d-flex">
                    <div>Todas las Clases</div>

                    <div>
                        <button className="add-button" onClick={handleShow}>
                            +
                        </button>
                    </div>
                </div>
            </div>

            {/* NO SE QUE ES ESO */}
            {/* <div className="row">
                <div className="col">
                    <div className="d-flex flex-nowrap overflow-auto">
                        {/* {sortedClases && sortedClases.map((privateClass, index) => (
                            <div key={index}>
                                <PrivateClass privateClass={privateClass} />
                            </div>
                        ))} */}
            {/* </div> */}
            {/* </div> */}
            {/* // </div> */}

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nueva Clase</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Subject</Form.Label>
                            {loaded === "fullLoaded" && Subjects && Subjects.length > 0 && (
                                <Form.Control
                                    as="select"
                                    name="subjects_name"
                                    value={newClassInfo.subjects_name}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select a subject</option>
                                    {Subjects.map( subject => (
                                       <option key={subject.id} value={subject.id}>
                                       {subject.Subject}
                                   </option> 
                                    ))}
                                </Form.Control>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Student</Form.Label>
                            {loaded === "fullLoaded" && Students && Students.length > 0 && (
                                <Form.Control
                                    as="select"
                                    name="student_name"
                                    value={newClassInfo.student_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select a student</option>
                                    {Students.map(student => (
                                        <option key={student.id} value={student.id}>
                                            {student.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            )}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={newClassInfo.date}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>hour</Form.Label>
                            <Form.Control
                                type="time"
                                name="hour"
                                value={newClassInfo.hour}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={newClassInfo.price}
                                onChange={handleInputChange}
                                placeholder="class price"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>¿Pagado?</Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="paid"
                                checked={newClassInfo.paid}
                                onChange={handleInputChange}
                                label="¿Está Pagado?"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                type="text"
                                name="comments"
                                value={newClassInfo.comments}
                                onChange={handleInputChange}
                                placeholder="Comments"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={() => actions.createSubjectClass(newClassInfo, handleClose)}>
                        Crear Clase
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};