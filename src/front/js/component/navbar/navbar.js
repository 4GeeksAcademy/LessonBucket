import React, { useContext, useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";

    

export const Navbar = () => {
	
	const { store, actions } = useContext(Context);
	
	
	const handleLoginLogout = () =>{
		if (store.logged === true)  {return "Logout"} else {return "Login"}

	}

	const handleUserName = () => {
		if (store.logged === true) { return "👋 Hola " + store.user.name}
	}


	const handleSignOut = () => {
		if (store.logged === true){
			actions.logout();
		
		

		}
	}
	

	return (
		<nav className="navtop d-flex align-items-center">
			<div className="container-fluid d-flex flex-row justify-content-between align-items-center mx-4 ">
				<div>
				<Link  to="/" className="link-logo">
					<span className="navbar-brand mb-0 h1 "><i className="fa-solid fa-bucket me-2"></i>Lesson Bucket</span>
				</Link>
				</div>
				<div className="ml-auto d-flex flex-row align-items-center">
					<p className="user-name ">{handleUserName()}</p>
					<Link to="/login">
						<p className="nav-links mx-4 nav-p" onClick={handleSignOut}>{handleLoginLogout()}</p>
					</Link>
					<Link to="/profile">
						<p className="nav-links mx-4 nav-p">Profile</p>
					</Link>
					{/* <Link to="/About Us">
						<p className="nav-links mx-4 nav-p">About us</p>
					</Link> */}
					<Link to="/donations">
						<p className="nav-links mx-4 nav-p">Donate</p>
					</Link>
				</div>
			</div>
		</nav>
	);
};
