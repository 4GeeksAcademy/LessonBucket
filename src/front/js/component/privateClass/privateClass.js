import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "../privateClass/privateClass.css"

export const PrivateClass = (props) => {
    const { store, actions } = useContext(Context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loaded, setLoaded] = useState("loadedEmpty")
    const [updatedClassInfo, setUpdatedClassInfo] = useState({
        subjects_id: props.privateClass.subjects.id,
        student_id: props.privateClass.student.id,
        comments: props.privateClass.comments,
        date: props.privateClass.date,
        hour: props.privateClass.hour,
        price: props.privateClass.price,
        paid: props.privateClass.paid
    });
    const [classes, setClasses] = useState([])

    const Subjects = store.allSubjects || [];
    const Students = store.allStudents || [];


    useEffect(() => {
        actions.fetchClasses()
        actions.getAllSubjects()
        actions.getAllStudents()
        setLoaded("fullLoaded")
    }, [store.token]);

    useEffect(() => {
        setClasses(store.classes)
    }, [store.classes]);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // FUNCION PARA MANEJAR CAMBIOS DEL INPUT

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setUpdatedClassInfo((prevInfo) => ({
            ...prevInfo,
            [name]: type === "checkbox" ? checked : value
        }));
    };


    // FUNCION PARA ELIMINAR UNA CLASE

    const handleDeleteClass = async () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this class!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                let response = await actions.deleteOneClass(props.privateClass.id);

                if (response) {
                    swal("Good job!", "Class successfully deleted.", "success", {
                        buttons: {
                            confirm: {
                                text: "OK",
                                className: "custom-swal-button",
                            }
                        },
                        timer: 4000,
                    });

                    actions.fetchClasses()
                    closeModal();

                } else {
                    swal("Sorry", "An unexpected error has occurred", "error", {
                        buttons: {
                            confirm: {
                                text: "Please, Try Again Later",
                                className: "custom-swal-button",
                            }
                        },
                        timer: 4000,
                    });
                }
            }
        });
    };

    // FUNCION PARA MANEJAR CAMBIOS EN LA CLASE

    const handleUpdateClass = async (e) => {
        e.preventDefault()
        if ((updatedClassInfo.subjects_id === "") || (updatedClassInfo.student_id === "") || !updatedClassInfo.date || !updatedClassInfo.price || !updatedClassInfo.hour || !updatedClassInfo.paid || (updatedClassInfo.comments === "")) {
            swal("Please", "Fields cannot be empty", "warning", {
                buttons: {
                    confirm: {
                        text: "Try Again",
                        className: "custom-swal-button",
                    }

                },
                timer: 4000,
            });
            return
        } else {
            let response = await actions.updateSubjectClassInStore(props.privateClass.id, updatedClassInfo);
            

            if (response) {

                swal("Good job!", "successfully modify class.", "success", {
                    buttons: {
                        confirm: {
                            text: "OK",
                            className: "custom-swal-button",
                        }
                    },
                    timer: 4000,
                });

                actions.fetchClasses()
                closeModal();

            } else {
                swal("Sorry", "An unexpected error has occurred", "error", {
                    buttons: {
                        confirm: {
                            text: "Try Again",
                            className: "custom-swal-button",
                        }
                    },
                    timer: 4000,
                });
            }
        }
    }


    return (
        // VISTA RESUMIDA TARJETAS CLASE

        <div className="card-subject">
            <div className="card-body subject-text">
                <p className="card-title" title={props.privateClass.subjects.Subject}> Class: {props.privateClass.subjects.Subject}</p>
                <p className="card-text" title={props.privateClass.student.name}> Student: {props.privateClass.student.name}</p>
                <p className="card-text" title={props.privateClass.date}> Date: {props.privateClass.date}</p>
                <p className="card-text" title={props.privateClass.hour}> Hour: {props.privateClass.hour}</p>
                <p className="card-text" title={props.privateClass.comments}> Comment: {props.privateClass.comments}</p>
            </div>
            <button className="subject-button" onClick={openModal}>Ver Clase</button>


            {/* INICIO MODAL MODIFICAR CLASE */}

            <Modal show={isModalOpen} onHide={closeModal} centered>
                <Modal.Header>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Subject</Form.Label>
                            {loaded === "fullLoaded" && Subjects && Subjects.length > 0 && (
                                <Form.Control
                                    as="select"
                                    name="subjects_id"
                                    value={updatedClassInfo.subjects_id}
                                    onChange={handleInputChange}
                                >
                                    {Subjects.map(subject => (
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
                                    value={updatedClassInfo.student_id}
                                    onChange={handleInputChange}
                                >
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
                                value={updatedClassInfo.date}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={updatedClassInfo.price}
                                onChange={handleInputChange}
                                placeholder="class price"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>hour</Form.Label>
                            <Form.Control
                                type="time"
                                name="hour"
                                value={updatedClassInfo.hour}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>¿Paid?</Form.Label>
                            <Form.Check
                                type="checkbox"
                                name="paid"
                                checked={updatedClassInfo.paid}
                                onChange={handleInputChange}
                                label="Is it paid?"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Comments</Form.Label>
                            <Form.Control
                                type="text"
                                name="comments"
                                value={updatedClassInfo.comments}
                                onChange={handleInputChange}
                                placeholder="Comments"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleUpdateClass}>
                        Guardar Cambios
                    </Button>
                    <button className="modal-delete-icon">
                        <FontAwesomeIcon icon={faTrash} onClick={handleDeleteClass} />
                    </button>
                </Modal.Footer>
            </Modal>

            {/* FIN DE MODAL MODIFICAR CLASE */}
        </div>
    );
};