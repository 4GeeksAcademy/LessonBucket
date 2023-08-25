import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/recoverPass.css";
import swal from "sweetalert";
import { Loader } from "../component/loader/loader";

export const RecoverPass = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handlerecoverPass = async (e) => {
    e.preventDefault();
    if (!email) {
      swal("Please", "Field cannot be empty", "warning", {
        buttons: {
          confirm: {
            text: "Try Again",
            className: "custom-swal-button",
          },
        },
        timer: 4000,
      });

      return;
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)
    ) {
      swal(
        "Please",
        "enter a valid email address, mail can only contain letters numbers periods hyphens and the underscore",
        "error",
        {
          buttons: {
            confirm: {
              text: "Try Again",
              className: "custom-swal-button",
            },
          },
          timer: 4000,
        }
      );
      return;
    }

    let response = await actions.recoverPass(email);

    if (response) {
      swal({
        title: "Good job!",
        text: "Email sent successfully, please check your email inbox",
        icon: "success",
        buttons: {
          confirm: {
            text: "OK",
            className: "custom-swal-button",
          },
        },
        timer: 4000,
      }).then((value) => {
        if (value) {
          setLoader(true);
          setEmail("");
          navigate("/login");
          setLoader(false);
        }
      });

      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        navigate("/login");
      }, 4000);
      setEmail("");
    } else {
      swal("Sorry", "An unexpected error has occurred", "error", {
        buttons: {
          confirm: {
            text: "Please try again later or contact us",
            className: "custom-swal-button",
          },
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
          <label htmlFor="recover-chk" aria-hidden="true">
            Recover your account
          </label>
          <p className="recover-instruction">
            {" "}
            We will send a random code to your email to verify your identity.
            <br />
            Once received, enter it to reset your password and regain access to
            your account.
          </p>
          <input
            className="recover-input"
            autoFocus
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            required=""
            onChange={(e) => setEmail(e.target.value)}
          />
          {loader && <Loader view="recoverPass" />}
          <div className="container-fluid">
            <div className="row ">
            <div className="col-10">
              <button
                className="recover-button"
                type="button"
                onClick={handlerecoverPass}
              >
                Send code to email
              </button>
            </div>
            <div className="col-2">
              <button
                className="recover-button-return"
                type="button"
                onClick={() => {
                  setLoader(true);
                  setTimeout(() => {
                    setLoader(false);
                    navigate("/login");
                  }, 1000);
                  setEmail("");
                }}
              >
                Login
              </button>
            </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};