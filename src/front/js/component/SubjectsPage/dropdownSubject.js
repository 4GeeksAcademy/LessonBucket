import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./subjects.css";
import { Context } from "../../store/appContext.js";
import { StudentPerSubject } from "./studentPerSubject";
import PropTypes from "prop-types";


export const DropdownSubject = (props) => {

    const { store, actions } = useContext(Context);
    const accordionID = `#${props.subject}`
    useEffect(() => {
        actions.getAllStudents()
    }, [store.token]);

    return (
        <div className="container my-2">

            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={accordionID} aria-expanded="false" aria-controls="flush-collapseOne">
                        {props.subject}
                        <i class="fa-solid fa-trash fa-2xs ms-2" style={{ color: "red" }}></i>
                    </button>
                </h2>
                <div id={props.subject} class="accordion-collapse collapse" data-bs-parent="#accordionSubjects">
                    <div className="accordion-body">
                        {(
                            store.allStudents.map(student => (
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
        </div>
    );
}

DropdownSubject.propTypes = {
    Subject: PropTypes.string
};

