import React, { useContext, useEffect, useState } from "react";
import { SubjectClass } from "./subjectClass";
import "../../styles/dashboard.css";
import { Context } from "../store/appContext";
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const Classes = () => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    useEffect(() => {
        if (store.logged === false) {
            window.location = '/login';
        }
        actions.fetchClasses();
    }, [store.token]);

    
    const [newClassInfo, setNewClassInfo] = useState({
        subjects_id: "1",
        student_id: "1",
        comments_id: null,
        date: "",
        price: "",
        paid: false
    });
    let sortedClases;
    if (store.classes.results) {
        sortedClases = store.classes.results.sort((a, b) =>
            a.date.split('/').reverse().join().localeCompare(b.date.split('/').reverse().join()));
    }
    const handleInputChange = event => {
        const { name, value, type, checked } = event.target;
        setNewClassInfo(prevInfo => ({
            ...prevInfo,
            [name]: type === "checkbox" ? checked : value
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
                        {sortedClases && sortedClases.slice(0, 3).map((subjectClass, index) => (
                            <div key={index}>
                                <SubjectClass subjectClass={subjectClass} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="separator">
                <div className="d-flex">
                    <div>Todas las Clases</div>
                    <Dropdown style={{ marginLeft: "1rem", backgroundColor: "linear-gradient(271deg, #801480 0%, #0C2FA8 100%);" }}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <img src="https://d5xydlzdo08s0.cloudfront.net/images/io/filter_icon_big.png" width={"15px"} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as="button">Inglés</Dropdown.Item>
                            <Dropdown.Item as="button">Francés</Dropdown.Item>
                            <Dropdown.Item as="button">Alemán</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div>
                        <button className="add-button" onClick={handleShow}>
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-nowrap overflow-auto">
                        {sortedClases && sortedClases.map((subjectClass, index) => (
                            <div key={index}>
                                <SubjectClass subjectClass={subjectClass} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nueva Clase</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>ID de Asignatura</Form.Label>
                            <Form.Control
                                type="text"
                                name="subjects_id"
                                value={newClassInfo.subjects_id}
                                onChange={handleInputChange}
                                placeholder="Ingrese el ID de la asignatura"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={newClassInfo.date}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={newClassInfo.price}
                                onChange={handleInputChange}
                                placeholder="Ingrese el precio"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>¿Pagado?</Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="paid"
                                checked={newClassInfo.paid}
                                onChange={handleInputChange}
                                label="¿Pagado?"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Comentarios</Form.Label>
                            <Form.Control
                                type="text"
                                name="comments_id"
                                value={newClassInfo.comments_id}
                                onChange={handleInputChange}
                                placeholder="Comentarios"
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