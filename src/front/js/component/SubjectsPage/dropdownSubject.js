import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./subjects.css";
import { Context } from "../../store/appContext.js";
import { StudentPerSubject } from "./studentPerSubject";
import PropTypes from "prop-types";


export const DropdownSubject = (props) => {

    const accordionID = `#${props.subject}`

    return (
        <div className="container my-2">
            <div className="accordion" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={accordionID} aria-expanded="false" aria-controls="flush-collapseOne">
                            {props.subject}
                            <i class="fa-solid fa-trash fa-2xs ms-2" style={{ color: "red" }}></i>
                        </button>
                    </h2>
                    <div id={props.subject} class="accordion-collapse collapse">
                        <div className="accordion-body">
                            <StudentPerSubject />
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

