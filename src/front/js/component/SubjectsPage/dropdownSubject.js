import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./subjects.css";
import { Context } from "../../store/appContext.js";
import { StudentPerSubject } from "./studentPerSubject";
import PropTypes from "prop-types";


export const DropdownSubject = (props) => {

    return (
        <div className="container">
            <div className="accordion" id={props.subject}>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={props.subject} aria-expanded="true" aria-controls={props.subject}>
                            {props.subject}
                        </button>
                    </h2>
                    <div id={props.subject} className="accordion-collapse collapse show" data-bs-parent={props.subject} >
                        <div className="accordion-body">
                            <StudentPerSubject />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

DropdownSubject.propTypes = {
    Subject: PropTypes.string
};

