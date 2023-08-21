import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../../styles/recoverPass.css";
import swal from 'sweetalert';
import { Loader } from "../component/loader/loader";

export const RecoverPass = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();


    const handlerecoverPass = async (e) => {
        e.preventDefault()
        if (!email ) {
            swal("Please", "Field cannot be empty", "warning", {
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

        let response = await actions.recoverPass(email);

        if (response) {
            swal("Good job!", "Email sent successfull, please check your email inbox", "success", {
                buttons: {
                    confirm: {
                        text: "Try Again",
                        className: "custom-swal-button",
                    }
                },
                timer: 4000,
            });

             
            setEmail("");
            
        } else {
            swal("Sorry", "An unexpected error has occurred", "error", {
                buttons: {
                    confirm: {
                        text: "Please try again later or contact us",
                        className: "custom-swal-button",
                    }
                },
                timer: 4000,
            });
        }
    };



        return (
            <div className="recover-pass-main">
                <input type="checkbox" id="recover-chk" aria-hidden="true" />
                <div className="recover-login">
                    <form className="recover-form">
                        <label htmlFor="recover-chk" aria-hidden="true">Recover your account</label>
                        <p className="recover-instruction"> We will send a random code to your email to verify your identity.
                            <br />
                            Once received, enter it to reset your password and regain access to your account.
                        </p>
                        <input className="recover-input" autoFocus type="email" placeholder="Email" value={email} required="" onChange={(e) => setEmail(e.target.value)} />
                        {/* {loader && <Loader />} */}
                        <button className="recover-button" onClick={handlerecoverPass}>Send code to email</button>
                    </form>
                </div>
            </div>
        );
    };


