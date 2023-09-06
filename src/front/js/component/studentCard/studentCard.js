import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCamera } from '@fortawesome/free-solid-svg-icons';
import { Modal } from "react-bootstrap";
import "./studentCard.css";
import "../../../styles/students.css";


export const StudentCard = (props) => {

    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(props.name);
    const [editedPhone, setEditedPhone] = useState(props.phone);
    const [editedEmail, setEditedEmail] = useState(props.email);
    const [editedAddress, setEditedAddress] = useState(props.address);
    const [editedGoal, setEditedGoal] = useState(props.goal);

    
    const handleModifyStudent = async () => {
        if (!editedName || !editedPhone || !editedEmail || !editedPhone || !editedGoal) {
          swal("Please", "Fields cannot be empty", "warning", {
            buttons: {
              confirm: {
                text: "Try Again",
                className: "custom-swal-button",
              }
            },
            timer: 4000,
          });
          return;
        } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(editedEmail)) {
          swal("Please", "enter a valid email address, mail can only contain letters numbers periods hyphens and the underscore", "error", {
            buttons: {
              confirm: {
                text: "Try Again",
                className: "custom-swal-button",
              }
            },
            timer: 4000,
          });
          return;
        }
    
        let response = await actions.modifyOneStudent(editedName, editedEmail, editedPhone, editedAddress, editedGoal, props.id);
    
        if (response === true) {
    
          swal("Good job!", "user successfully modified", "success", {
            buttons: {
              confirm: {
                text: "OK",
                className: "custom-swal-button",
              }
            },
            timer: 4000,
          });
    
          setEditedName(editedName);
          setEditedEmail(editedEmail);
          setEditedPhone(editedPhone);
          setEditedAddress(editedAddress);
          setEditedGoal(editedGoal);

          actions.getAllStudents();
    
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
        };
      }


    const handleDeleteStudent = async () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this student!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                let response = await actions.deleteOneStudent(props.id);
                if (response) {
                    swal("Good job!", "Student successfully deleted.", "success", {
                        buttons: {
                            confirm: {
                                text: "OK",
                                className: "custom-swal-button",
                            }
                        },
                        timer: 4000,
                    });

                    actions.getAllStudents();
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



    // Estructura de la card para estudiantes

    return (
        <div className="student-card" onClick={() => { setShowModal(true); }}>

            {/* INICIO DEL MODAL */}

            {showModal && (
                <Modal className="student-modal-main-container" tabIndex="-1" role="dialog" show={showModal} id="modalCreateSubject">
                    <div className="card">
                        <div className="top-section">
                            <div className="border"></div>
                            <div className="icons">
                                <div className="logo">
                                    <p className="student-modal-upTitle">LessonBucket</p>
                                </div>
                                <div className="social-media" >
                                    <div className="modal-camera-icon"><FontAwesomeIcon icon={faCamera} /></div>
                                </div>
                            </div>
                        </div>
                        <div className="bottom-section">
                            <span className="title">
                                {isEditing ? (
                                    <input
                                        className="modal-input-card"
                                        type="text"
                                        value={editedName}
                                        placeholder="Name"
                                        onChange={(e) => setEditedName(e.target.value)}
                                    />
                                ) : (
                                    <span className="title">{props.name}</span>
                                )}
                            </span>
                            <div className="row row1">
                                <div className="item">
                                    <div className="big-text">
                                        {isEditing ? (
                                            <input
                                                className="modal-input-card"
                                                type="text"
                                                value={editedEmail}
                                                placeholder="Email"
                                                onChange={(e) => setEditedEmail(e.target.value)}
                                            />
                                        ) : (
                                            <span className="big-text">@Email: {props.email}</span>
                                        )}
                                    </div>
                                    <div className="item">
                                        <div className="big-text">
                                            {isEditing ? (
                                                <input
                                                    className="modal-input-card"
                                                    type="text"
                                                    value={editedPhone}
                                                    placeholder="Phone"
                                                    onChange={(e) => setEditedPhone(e.target.value)}
                                                />
                                            ) : (
                                                <span className="big-text">Phone: {props.phone}</span>
                                            )}
                                        </div>
                                        <div className="item">
                                            <div className="big-text">
                                                {isEditing ? (
                                                    <input
                                                        className="modal-input-card"
                                                        type="text"
                                                        value={editedAddress}
                                                        placeholder="Address"
                                                        onChange={(e) => setEditedAddress(e.target.value)}
                                                    />
                                                ) : (
                                                    <span className="big-text">Address: {props.address}</span>
                                                )}
                                            </div>
                                            <div className="item">
                                                <div className="big-text">
                                                    {isEditing ? (
                                                        <input
                                                            className="modal-input-card"
                                                            type="text"
                                                            value={editedGoal}
                                                            placeholder="Goal"
                                                            onChange={(e) => setEditedGoal(e.target.value)}
                                                        />
                                                    ) : (
                                                        <span className="big-text">Goal: {props.goal}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="container-footer-modal-card">
                                                <button
                                                    type="button"
                                                    className="student-modal-button studentCard-modal-button-create"
                                                    onClick={() => {
                                                        if (isEditing) {
                                                            handleModifyStudent();
                                                        }
                                                        setIsEditing(!isEditing);
                                                    }}
                                                >
                                                    {isEditing ? 'Save Changes' : 'Modify student data'}
                                                </button>
                                                {isEditing ? (
                                                    <button
                                                        type="button"
                                                        className="student-modal-button studentCard-modal-button-return"
                                                        onClick={() => {
                                                            setIsEditing(false);
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="student-modal-button studentCard-modal-button-return"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setShowModal(!showModal);
                                                            setIsEditing(false);
                                                        }}
                                                    >
                                                        Return
                                                    </button>
                                                )}
                                                <button className="modal-delete-icon">
                                                    <FontAwesomeIcon icon={faTrash} onClick={handleDeleteStudent} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
                // FIN DEL MODAL

            )}
            <div className="student-top-section">
                <div className="student-border"></div>
                <div className="student-icons">
                    <div className="student-logo">
                        <p className="student-upTitle">LessonBucket</p>
                    </div>
                    <div className="student-social-media">
                        <div className="camera-icon"><FontAwesomeIcon icon={faCamera} /></div>
                    </div>
                </div>
            </div>
            <div className="student-bottom-section">
                <div className="student-title">{props.name}</div>
                <div className="student-row row1">
                    <div className="student-item">
                        <span className="student-big-text" title={props.phone}>{props.phone}</span>
                        <span className="student-regular-text">phone</span>
                    </div>
                    <div className="student-item">
                        <span className="student-big-text" title={props.email}>{props.email}</span>
                        <span className="student-regular-text">email</span>
                    </div>
                </div>
            </div>
        </div >
    );
};