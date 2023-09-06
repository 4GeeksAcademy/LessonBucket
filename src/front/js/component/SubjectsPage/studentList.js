import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./subjects.css";
import { Context } from "../../store/appContext.js";
import { PropTypes } from "prop-types";



export const StudentList = (props) => {
    const { store, actions } = useContext(Context);
    // const [checkedState, setCheckedState] = useState(
    //     new Array(props.lengthStudents).fill(false)
    //   );

    //   const handleOnChange = (position) => {
    //     const updatedCheckedState = checkedState.map((item, index) =>
    //       index === position ? !item : item
    //     );
    
    //     setCheckedState(updatedCheckedState);
    
    //     // const totalPrice = updatedCheckedState.reduce(
    //     //   (sum, currentState, index) => {
    //     //     if (currentState === true) {
    //     //       return sum + toppings[index].price;
    //     //     }
    //     //     return sum;
    //     //   },
    //     //   0
    //     // );
    
    //     // setTotal(totalPrice);
    //   };
 

    return (
        <div>

            <div className="row py-2 px-2">
                <div className="col-3">Name: {props.name}</div>
                <div className="col-4">email: {props.email}</div>
                <div className="col-4">goal: {props.goal} </div>
                <input type="checkbox" id={`custom-checkbox-${props.index}`}
                    name={props.name}
                    value={props.name}
                    checked={props.checkedState[props.index]}
                    onChange={() => props.handleOnChange(props.index)} className="col-1" />
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