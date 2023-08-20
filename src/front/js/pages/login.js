import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import "../../styles/login.css";
import swal from 'sweetalert'
import { Loader } from "../component/loader/loader";
import "../component/loader/loader";



export const Login = () => {

    const { store, actions } = useContext(Context);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [address, setAddress] = useState("")
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();


    // SI EL USUARIO TIENE TOKEN SE REDIRIGE AUTOMATICAMENTE A DASHBOARD

    useEffect(()=>{
        if (store.logged == true) {
            setLoader(true)
            setTimeout(() => {
                setLoader(false);
                navigate("/dashboard")
            }, 2000);
        }
    },[store.logged])



    //   FUNCION RESETEO INPUT

    const handleRegisterFormClick = () => {
        setName("");
        setEmail("");
        setPassword("");
        setBirthDate("");
        setAddress("");
    };

    // FUNCIÓN BOTON REGISTRO

    const handleRegister = async (e) => {
        e.preventDefault()
        if (!name || !email || !password || !birthDate || !address) {
            swal("Please", "Fields cannot be empty", "warning", {
                button: "Try Again",
                timer: 4000,
            });
            return;
        } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
            swal("Please", "enter a valid email address, mail can only contain letters numbers periods hyphens and the underscore", "error", {
                button: "Try Again",
                timer: 4000,
            });
            return;
        } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{4,8})/.test(password)) {
            swal("Please", "Password must be 4 to 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter.", "error", {
                button: "Try Again",
                timer: 4000,
            });
            return;
        }

        let response = await actions.signup(name, email, password, birthDate, address);

        // Condicional para ocultar menú register una vez realizado.

        if (response) {
            swal("Good job!", "successfully created user.", "success", {
                button: "OK",
                timer: 4000,
            });

            const chk = document.getElementById("chk");
            if (chk) {
                chk.checked = false;
            }
            setName("");
            setEmail("");
            setPassword("");
            setBirthDate("");
            setAddress("");
        } else {
            swal("Sorry", "An unexpected error has occurred", "error", {
                button: "Try Again",
                timer: 4000,
            });
        }
    };


    // FUNCIÓN BOTON LOGÍN

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            swal("Please", "Fields cannot be empty", "warning", {
                button: "Try Again",
                timer: 4000,
            });
            return;
        }
        let response = await actions.login(email, password);
        if (response) {
            setLoader(true)
            setTimeout(() => {
                setLoader(false);
                navigate("/dashboard")
            }, 2000);
            setEmail("");
            setPassword("");
            

        } else {
            swal("Please", "Incorrect email or password", "warning", {
                button: "Try Again",
                timer: 4000,
            });
        }
    }


    return (
        <div className="login-main">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <div className="login">
                <form className="form">
                    <label htmlFor="chk" aria-hidden="true">Log in</label>
                    <input className="input" autoFocus type="email" placeholder="Email" value={email} required="" onChange={(e) => setEmail(e.target.value)} />
                    <input className="input" type="password" placeholder="Password" value={password} required="" onChange={(e) => setPassword(e.target.value)} />
                    {loader && <Loader />}
                    <button onClick={handleLogin}>Log in</button>
                </form>
            </div>

            <div className="register">
                <form className="form">
                    <label htmlFor="chk" aria-hidden="true" onClick={handleRegisterFormClick}>Register</label>
                    <input className="input" type="text" placeholder="Name" value={name} required="" onChange={(e) => setName(e.target.value)} />
                    <input className="input" type="email" placeholder="Email" value={email} required="" onChange={(e) => setEmail(e.target.value)} />
                    <input className="input" type="password" placeholder="Password" value={password} required="" onChange={(e) => setPassword(e.target.value)} />
                    <input className="input" type="text" placeholder="Birth_Date" value={birthDate} required="" onChange={(e) => setBirthDate(e.target.value)} />
                    <input className="input" type="text" placeholder="Address" value={address} required="" onChange={(e) => setAddress(e.target.value)} />
                    <button onClick={handleRegister}>Register</button>
                </form>
            </div>
        </div>
    );
};
