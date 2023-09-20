import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CreateSubject } from "../component/SubjectsPage/createSubject.js";
import { DropdownSubject } from "../component/SubjectsPage/dropdownSubject.js";
import { ModifySubject } from "../component/SubjectsPage/modifySubject.js";
import { Context } from "../store/appContext.js";
import "../component/SubjectsPage/subjects.css";
import { useNavigate } from 'react-router-dom';


export const SubjectsPage = props => {
	const { store, actions } = useContext(Context);
	const subjects = store.allSubjects;
	const user_id = store.user.id;
	const [loaded, setLoaded] = useState("loadedEmpty")
	const navigate = useNavigate()

	// UseEffect encargado de verificar si el usuario que navega tiene token

	useEffect(() => {
		const getProfileData = async () => {
			let logged = await actions.getProfile();
			console.log(logged);
			if (logged === false) {
				swal({
					title: "Please",
					text: "USER NOT LOGGED IN! You will be redirected to login.",
					icon: "warning",
					buttons: {
						confirm: {
							text: "Return to Login",
							className: "custom-swal-button",
						},
					},
					timer: 4000,
					closeOnClickOutside: false,
				}).then(() => {
					navigate("/login");
				});
			}
		};
		getProfileData();
	}, []);

	useEffect(() => {
		actions.getAllSubjects()
		setLoaded("fullLoaded")
	}, [store.token]);

	
	return (
		<div className="min-vh-100" style={{marginLeft:'200'}}>
			<CreateSubject />
			{store.allSubjects && store.allSubjects !== "" && store.allSubjects !== undefined ? (
				<>
					<div className="accordion" id="accordionSubjects">
						{(loaded === "fullLoaded") && (
							store.allSubjects.map(subject => (
								<div className="col md-auto">

									<DropdownSubject
										subject={subject.Subject}
										id={subject.id}
										key={subject.id}
										students={subject.students}
									/>
								</div>

							))
						)}
					</div>

				</>
			) : (
				<div className="text-center">
					<h1>Usuario no logueado, por favor, pulse el botón para volver a login.</h1>
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

	)
}