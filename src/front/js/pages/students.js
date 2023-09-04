import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import { StudentCard } from "../component/studentCard/studentCard"
import { Loader } from "../component/loader/loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Modal } from "react-bootstrap";
import swal from 'sweetalert'
import "../../styles/students.css"


export const Students = () => {
  const { store, actions } = useContext(Context);
  const [loaded, setLoaded] = useState("loadedEmpty")
  const [iconSearch, setIconSearch] = useState(true);
  const [show, setShow] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [goal, setGoal] = useState("")
  const [loader, setLoader] = useState(false)
  const [searchStudent, setSearchStudent] = useState("")
  const navigate = useNavigate()
  const students = store.allStudents


  //  SE LLAMA A FUNCIÓN DESPUÉS DE TENER TOKEN

  useEffect(() => {
    actions.getAllStudents()
    setLoaded("fullLoaded")
  }, [store.token]);



  // FUNCIÓN PARA MANEJAR EL ICONO DE LA LUPA EN EL INPUT SEARCH

  const handleSearchShow = () => {
    setIconSearch(!iconSearch);
  };

  // FUNCIÓN PARA MANEJAR EL INPUT DE BUSQUEDA

  // const handleEnterKeyPress = (e) => {
  //   e.preventDefault()
  //   if (e.key === 'Enter') {
  //     const searchStudent = searchStudent.toUpperCase();

  //       filteredStudents = students.filter(student => {
  //       return student.name.toUpperCase().includes(searchStudentUpperCase);

  //     })

  //     setIconSearch(!iconSearch);
  //     setSearchStudent("");


  //   } else {
  //     swal("Sorry", "No matches found", "warning", {
  //       buttons: {
  //         confirm: {
  //           text: "Try Again",
  //           className: "custom-swal-button",
  //         }
  //       },
  //       timer: 4000,
  //     });
  //   };
  // }


  // FUNCIÓN PARA AGREGAR ESTUDIANTES

  const handleCreateStudent = async (e) => {
    e.preventDefault()
    if (!name || !email || !address || !phone || !goal) {
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
    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
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

    let response = await actions.createOneStudent(name, email, address, phone, goal);
    console.log(response)

    if (response === true) {

      swal("Good job!", "successfully created user.", "success", {
        buttons: {
          confirm: {
            text: "OK",
            className: "custom-swal-button",
          }
        },
        timer: 4000,
      });


      setShow(false)
      setName("");
      setEmail("");
      setAddress("");
      setPhone("");
      setGoal("");

      actions.getAllStudents()

    } else if (response.request.status === 402) {
      swal("Sorry", "An account with this email already exists", "error", {
        buttons: {
          confirm: {
            text: "Try Again",
            className: "custom-swal-button",
          }
        },
        timer: 4000,
      });
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

  // SE RENDERIZAN TARJETAS Y SE INCLUYE MODAL

  return (
    <div className="student-main-container">
      <div className="student-navbar">
        <h5 className="student-headboard">Alumnos <FontAwesomeIcon className="add-icon" icon={faPlus} onClick={() => setShow(!show)} /></h5>

        {/* INICIO DEL MODAL */}

        {show && (
          <Modal className="student-modal-main-container" tabIndex="-1" role="dialog" show={show} id="modalCreateSubject">
            <form action="" className="student-modal-form_main">
              <p className="modal-student-brand mb-0 h1 "><i className="fa-solid fa-bucket me-2"></i>Lesson Bucket</p>
              <p className="student-modal-heading">Add student to my list</p>
              <div className="student-modal-inputContainer">
                <input type="text" className="student-modal-inputField" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="student-modal-inputContainer">
                <input type="email" className="student-modal-inputField" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="student-modal-inputContainer">
                <input type="text" className="student-modal-inputField" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>

              <div className="student-modal-inputContainer">
                <input type="text" className="student-modal-inputField" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>

              <div className="student-modal-inputContainer">
                <input type="text" className="student-modal-inputField" placeholder="Goal" value={goal} onChange={(e) => setGoal(e.target.value)} />
              </div>
              <div className="student-modal-button-container" >
                <button type="button" className="student-modal-button student-modal-button-create" onClick={handleCreateStudent}>Create new student</button>
                <button type="button" className="student-modal-button student-modal-button-return" onClick={() => { setShow(false) }}>return</button>
              </div>
            </form>
          </Modal>

          // FIN DEL MODAL

        )}
        <input
          className="student-search-input"
          placeholder="    Search..."
          required=""
          value={searchStudent}
          onFocus={handleSearchShow}
          onBlur={handleSearchShow}
        // onChange={() => { setSearchStudent(e.target.value) }}
        // onKeyDown={handleEnterKeyPress}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="sm"
          className={`${iconSearch ? 'search-icon-visible' : 'search-icon-hidden'}`}
          style={{ "--fa-primary-opacity": "0.3", "--fa-secondary-opacity": "0.3" }}
        />
        <button className="student-button-refresh" onClick={() => actions.getAllStudents()}>Refresh</button>
      </div>
      {store.allStudents && store.allStudents !== "" && store.allStudents !== undefined ? (
        <>
          <div className="row d-flex flex-wrap justify-content-start gap-3">
            {(loaded === "fullLoaded") && (
              students.map(student => (
                <div className="col md-auto" key={student.id}>
                  <StudentCard
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
        </>
      ) : (
        <div className="recover-pass-main">
          {store.logged ? (
            <div>
              <h1 className="loading-screen">The student list is empty. Please include your students in the + icon to get started.</h1>
              <button className="student-button-refresh student-button-refresh-loadding-screen " onClick={() => actions.getAllStudents()}>Refresh</button>
            </div>
          ) : (
            <div className="recover-login">
              <form className="recover-form">
                <label htmlFor="recover-chk" aria-hidden="true">
                  ¡USER NOT LOGGED IN!
                </label>
                <h3 className="recover-instruction">
                  Please, If you press the button to be redirected to Login and you can log in
                </h3>
                {loader && <Loader view="recoverPass" />}
                <div className="container-fluid">
                  <div className="row ">
                    <div className="col">
                      <button
                        className="recover-button-return student-noLogin-button"
                        type="button"
                        onClick={() => {
                          setLoader(true);
                          setTimeout(() => {
                            setLoader(false);
                            navigate("/login");
                          }, 1000);
                        }}
                      >
                        Return to Login
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

          )}
        </div>
      )};
    </div>
  )
};

