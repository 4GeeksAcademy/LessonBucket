import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./subjectClass.css";

export const SubjectClass = (props) => {
    const { store, actions } = useContext(Context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedClassInfo, setUpdatedClassInfo] = useState({
        subjects: props.subjectClass.subject,
        student_id: props.subjectClass.student_id,
        comments_id: props.subjectClass.comments_id,
        date: props.subjectClass.date,
        price: props.subjectClass.price,
        paid: props.subjectClass.paid
    });
    

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setUpdatedClassInfo((prevInfo) => ({
            ...prevInfo,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleUpdateClass = () => {
        actions.updateSubjectClassInStore(props.subjectClass.id, updatedClassInfo);
        closeModal();
    };



    return (
        <div className="card-subject">
            
            <div className="card-body subject-text">
                <p className="card-title">Clase: {props.subjectClass.subjects?.Subject}</p>
                <p className="card-text">Fecha: {props.subjectClass.date}</p>
            </div>
            {/* <button className="subject-button" onClick={openModal}>Ver Clase</button> */}

            {/* <Modal show={isModalOpen} onHide={closeModal} centered>
                <Modal.Header>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>ID de Asignatura</Form.Label>
                            <Form.Control
                                type="text"
                                name="subjects_id"
                                value={updatedClassInfo.subjects}
                                onChange={handleInputChange}
                                placeholder="Ingrese el ID de la asignatura"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ID del Alumno</Form.Label>
                            <Form.Control
                                type="text"
                                name="subjects_id"
                                value={updatedClassInfo.student_id}
                                onChange={handleInputChange}
                                placeholder="Ingrese el ID del Alumno"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={updatedClassInfo.date}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={updatedClassInfo.price}
                                onChange={handleInputChange}
                                placeholder="Ingrese el precio"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>¿Pagado?</Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="paid"
                                checked={updatedClassInfo.paid}
                                onChange={handleInputChange}
                                label="¿Pagado?"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Comentarios</Form.Label>
                            <Form.Control
                                type="text"
                                name="comments_id"
                                checked={updatedClassInfo.comments_id}
                                onChange={handleInputChange}
                                placeholder="Comentarios"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button  onClick={closeModal}>
                        Cancelar
                    </Button>
                    <Button  onClick={handleUpdateClass}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </div>
    );
};