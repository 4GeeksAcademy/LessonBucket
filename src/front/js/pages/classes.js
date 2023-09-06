import React, { useContext, useEffect, useState } from "react";
import { PrivateClass } from "../component/privateClass/privateClass";
import "../../styles/dashboard.css";
import { Context } from "../store/appContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";



export const Classes = () => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [loaded, setLoaded] = useState("loadedEmpty")
    const [classes, setClasses] = useState([])
    const [selectedFilter, setSelectedFilter] = useState("");
    const Subjects = store.allSubjects || []
    const Students = store.allStudents || []

    // LLAMADA INICIAL PARA OBTENER TODAS LAS LISTAS


    useEffect(() => {
        actions.fetchClasses()
		actions.getAllSubjects();
		actions.getAllStudents();
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


    let sortedClasses;

    if (store.classes) {
        sortedClasses = store.classes.sort((a, b) =>
            a.date.split('/').reverse().join().localeCompare(b.date.split('/').reverse().join())
        );
    }

    sortedClasses = store.classes.filter(subjectClass => {
        if (!selectedFilter) {
            return true;
        }
        return subjectClass.subjects.Subject === selectedFilter;
    });
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
                        {sortedClasses.slice(0, 3).map((privateClass, index) => (
                            <div key={index}>
                                {(sortedClasses && sortedClasses.length > 0) && <PrivateClass privateClass={privateClass} />}         
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
                            <img src="https://d5xydlzdo08s0.cloudfront.net/images/io/filter_icon_big.png" width={"15px"} alt="Filter" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {loaded === "fullLoaded" && store.allSubjects && store.allSubjects.map((subject, index) => (
                                <Dropdown.Item
                                    key={index}
                                    as="button"
                                    onClick={() => setSelectedFilter(subject.Subject)}
                                >
                                    {subject.Subject}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
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
                        {sortedClasses && sortedClasses.map((privateClass, index) => (
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