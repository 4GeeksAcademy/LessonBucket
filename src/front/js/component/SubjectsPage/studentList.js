import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./subjects.css";
import { Context } from "../../store/appContext.js";



export const StudentList = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <hr />
            <div className="row mx-1 my-1">
                <div className="col-3">Name:</div>
                <div className="col-4">email:</div>
                <div className="col-4">goal:</div>
                <input type="checkbox" id="addStudent" className="col-1" />
            </div>
        </div>

    )

}
