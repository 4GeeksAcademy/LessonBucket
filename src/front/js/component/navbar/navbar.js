import React, { useContext, useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";

    

export const Navbar = () => {

	const { store, actions } = useContext(Context);


	const handleSignOut = () => {
		if (store.logged === true){
			sessionStorage.removeItem("token");
		}
	}
	

	const handleLoginLogout = () =>{
		if (store.logged === true)  {return "Logout"} else {return "Login"}

	}

	const handleUserName = () => {
		if (store.logged === true) { return "Hola " + store.user.name}
	}


	

	return (
		<nav className="navtop d-flex align-items-center my-4">
			<div className="container-fluid d-flex flex-row justify-content-between align-items-center mx-4 ">
				<div>
				<Link to="/" className="link-logo">
					<span className="navbar-brand mb-0 h1 "><i className="fa-solid fa-bucket me-2"></i>Lesson Bucket</span>
				</Link>
				</div>
				<div className="ml-auto">
					<p className="user-name">{handleUserName()}</p>
					<Link to="/login">
						<a className="nav-links mx-4 " onClick={handleSignOut()}>{handleLoginLogout()}</a>
					</Link>
					<Link to="/demo">
						<a className="nav-links mx-4 ">Profile</a>
					</Link>
					<Link to="/demo">
						<a className="nav-links mx-4 ">About us</a>
					</Link>
					<Link to="/demo">
						<a className="nav-links mx-4 ">Pricing</a>
					</Link>
				</div>
			</div>
		</nav>
	);
};
