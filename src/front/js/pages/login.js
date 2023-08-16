import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import "../../styles/login.css";


export const Login = () => {

    const { store, actions } = useContext(Context);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [address, setAddress] = useState("")
    const [showRegisterForm, setShowRegisterForm] = useState(true);
    

    let navigate = useNavigate();


    //   FUNCION RESETEO INPUT

    const handleRegisterFormClick = () => {
        setEmail("");
        setPassword("");
    };

    // FUNCIÓN BOTON REGISTRO

    const handleRegister = async (e) => {
        
        if (!name || !email || !password || !birthDate || !address) {
            invalidEntry();
            alert("Please, fields are required");
            return;
        } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
            alert("Please enter a valid email address, mail can only contain letters numbers periods hyphens and the underscore");
            return;
        } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{4,8})/.test(password)) {
            alert("Password must be 4 to 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter.");
            return;
        }
    
        let response = await actions.signup(name, email, password, birthDate, address);
    
        if (response) { 
            alert("successfully created user.");
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
            alert("An error has occurred, please try again.")
        }
    };
    
    
    // FUNCIÓN BOTON LOGÍN

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            alert("Please, fields are required")
            return;
        }
        let response = await actions.login(email, password);
            if (response) {
                //     navigate("/");
                setEmail("");
                setPassword("");

            } else {
                alert("'Incorrect email or password, please try again.'")
            }
        }
    

    return (
        <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <div className="login">
                <form className="form">
                    <label htmlFor="chk" aria-hidden="true">Log in</label>
                    <input className="input" autoFocus type="email" placeholder="Email" value={email} required="" onChange={(e) => setEmail(e.target.value)} />
                    <input className="input" type="password" placeholder="Password" value={password} required="" onChange={(e) => setPassword(e.target.value)} />
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
