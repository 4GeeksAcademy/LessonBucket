import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
// import "../../styles/login.css";



export const PrivateStudents = () => {
   
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    

    useEffect(() => {
      actions.getAllStudents();
    }, []);


    return (
      <div className="container fluid min-vh-100">
        <h1 className="container custom-heading">Students</h1>
        <div className="text-center d-flex overflow-scroll" style={{ overflow: 'auto', whiteSpace: 'nowrap', margin: "40px"}}>
          {store.Students.map((student) => (
            <Students
              type={"students"}
              id={student.uid}
              key={student.uid}
              name={student.name}
              email={student.email}
              address={student.address} 
              phone={student.phone} 
              goal={student.goal}  
            />
          ))}
        </div>
      </div>
    );
}