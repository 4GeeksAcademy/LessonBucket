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
    // let studentLength = null

    // const [checkedState, setCheckedState] = useState(
    //     new Array(studentLength).fill(false)
    //   );

    //   const handleOnChange = (position) => {
    //     const updatedCheckedState = checkedState.map((item, index) =>
    //       index === position ? !item : item
    //     );
    
    //     setCheckedState(updatedCheckedState);
    
        // const totalPrice = updatedCheckedState.reduce(
        //   (sum, currentState, index) => {
        //     if (currentState === true) {
        //       return sum + toppings[index].price;
        //     }
        //     return sum;
        //   },
        //   0
        // );
    
        // setTotal(totalPrice);
    //   };
    //   console.log(checkedState);
    //   console.log(store.allStudents.length);

    const onSubjectFormSubmit = (e) => {

        e.preventDefault();
        actions.createSubject(Subject, UserID);
        handleClose();

    };
    

    
    return (
        <div>
            <div className="container subjectsHeader">
                <h1 className="col-11">Subjects <i class="fa-solid fa-plus fa-2xs" onClick={() => handleModal()}></i></h1>
            </div>

            {/* modal */}
            <Modal class="modal" show={show} onHide={handleClose} id="modalCreateSubject">
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
                </Modal.Body>
            </Modal>
        </div >
    );
}