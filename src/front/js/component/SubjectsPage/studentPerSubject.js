import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext.js";
import PropTypes from "prop-types";



export const StudentPerSubject = (props) => {



    return (
        <div>
            <div className="row">
                <div className="col-4">Name:{props.name}</div>
                <div className="col-4">email:{props.email}</div>
                <div className="col-4">phone:{props.phone}</div>
            </div>
            <div className="row">
                <div className="col-8">address:{props.address}</div>
                <div className="col-4">goal:{props.goal}</div>
            </div>
            <hr />
        </div>
    );
}

StudentPerSubject.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.string,
    goal: PropTypes.string
};