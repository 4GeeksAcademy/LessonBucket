import React, { useContext, useEffect, useState } from "react";
import { PrivateClass } from "../component/privateClass/privateClass";
import "../../styles/dashboard.css";
import { Context } from "../store/appContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


export const Classes = () => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [loaded, setLoaded] = useState("loadedEmpty")
    const [classes, setClasses] = useState([])
    const Subjects = store.allSubjects || []
    const Students = store.allStudents || []

    // LLAMADA INICIAL PARA OBTENER TODAS LAS LISTAS


    useEffect(() => {
        actions.fetchClasses()
        actions.getAllSubjects()
        actions.getAllStudents()
        setLoaded("fullLoaded")
    }, [store.token]);


    useEffect(() => {
        setClasses(store.classes)
    }, [store.classes]);
    
    


    const [newClassInfo, setNewClassInfo] = useState({
        subjects_name: "",
        student_name: "",
        comments: "",
        date: "",
        hour: "",
        price: "",
        paid: false,
    });


    // FUNCION PARA MANEJAR CAMBIOS DEL INPUT

    const handleInputChange = event => {
        const { name, value, type, checked } = event.target;
        setNewClassInfo(prevInfo => ({
            ...prevInfo,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // FUNCIONES PARA CONTROLAR DEL MODAL

    const handleClose = () => {
        setShowModal(false);
    };

    const handleShow = () => {
        setShowModal(true);
    };

    return (

        // VISTA PARA PRÓXIMAS LAS CLASES     

        <div className="dashboard-wrapper">
            <div className="separator">Próximas Clases</div>
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-nowrap overflow-auto">
                        {store.classes.slice(0, 3).map((privateClass, index) => (
                            <div key={index}>
                                {(store.classes && store.classes.length > 0) && <PrivateClass privateClass={privateClass} />}         
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

            {/* VISTA PARA TODAS LAS CLASES                 */}

            <div className="row">
                <div className="col">
                    <div className="d-flex flex-nowrap overflow-auto">
                        {store.classes && store.classes.map((privateClass, index) => (
                            <div key={index}>
                                <PrivateClass privateClass={privateClass} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>




            {/* MODAL PARA CREAR UNA CLASE  */}


            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new class</Modal.Title>
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
                                label="Is it paid?"
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
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => actions.createSubjectClass(newClassInfo, handleClose)}>
                        Create a new Class
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* FIN DE MODAL PARA CREAR UNA CLASE */}

        </div>
    );
};