import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./subjects.css";
import { Context } from "../../store/appContext.js";
import { PropTypes } from "prop-types";



export const StudentList = (props) => {
    const { store, actions } = useContext(Context);

    const addToSubject = () => {
        actions.addOneStudentToSubject(props.subject_id, props.id)
        console.log(props.subject_id, props.id)
    }

    return (
        <div>

            <div className="row py-2 px-2">
                <div className="col-3">Name: {props.name}</div>
                <div className="col-4">email: {props.email}</div>
                <div className="col-4">goal: {props.goal} </div>
                {/* <button className="col-1" onClick={() => addToSubject()}>Add</button> */}
                <button className="col-1" id="buttonToAddStudentToSubject" onClick={() => addToSubject()}>
                Add
                </button>
            </div>
            <hr />
        </div>

    )

}

StudentList.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    goal: PropTypes.string
};  