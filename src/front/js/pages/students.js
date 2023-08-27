import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import { StudentCard } from "../component/studentCard/studentCard"
import { Loader } from "../component/loader/loader";
import "../../styles/students.css"





export const Students = () => {
    const { store, actions } = useContext(Context);
    const [loaded, setLoaded] = useState("loadedEmpty")
    const [iconLoader, setIconLoader] = useState(false);
    const navigate = useNavigate()

  //  SE LLAMA A FUNCIÓN DESPUÉS DE TENER TOKEN
    
    useEffect(() => {
      actions.getAllStudents()
      setLoaded("fullLoaded")
    }, [store.token]);

   console.log(loaded)

   useEffect(() => {
    console.log(store.allStudents)
  }, [store.allStudents]);
  
  return (
    <div className="student-main-container">
      <div className ="student-navbar">
        <h5 className="student-headboard">Alumnos</h5>
        <input className="student-search-input" placeholder="Search..." required="" />
        <button className="student-button-refresh" onClick={() => actions.getAllStudents()}>Refresh</button>
      </div>
      {store.allStudents && store.allStudents !== "" && store.allStudents !== undefined ? (
        <>
          <div className="row d-flex flex-wrap justify-content-start gap-3">
            {(loaded === "fullLoaded") && (
              store.allStudents.map(student => (
                <div className="col md-auto">
                  <StudentCard
                    key={student.id}
                    id={student.id}
                    name={student.name}
                    phone={student.phone}
                    email={student.email}
                  />
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h1>Usuario no regitrado, por favor, pulse el botón para volver a login.</h1>
          <button
                className="recover-button-return"
                type="button"
                onClick={() => {
                  setTimeout(() => {  
                    navigate("/login");
                  }, 2000);
                }}
              >
                Login
              </button>
         
        </div>
      )}
    </div>
  );
};


