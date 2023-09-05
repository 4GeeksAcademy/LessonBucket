import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CreateSubject } from "../component/SubjectsPage/createSubject.js";
import { DropdownSubject } from "../component/SubjectsPage/dropdownSubject.js";
import { ModifySubject } from "../component/SubjectsPage/modifySubject.js";
import { Context } from "../store/appContext.js";
import "../component/SubjectsPage/subjects.css";


export const SubjectsPage = props => {
	const { store, actions } = useContext(Context);
	const subjects = store.allSubjects;
	const user_id = store.user.id;
	const [loaded, setLoaded] = useState("loadedEmpty")

	useEffect(() => {
		actions.getAllSubjects()
		setLoaded("fullLoaded")
	}, [store.token]);

	useEffect(() => {
		console.log(subjects)
	}, [store.allSubjects]);

	useEffect(() => {
		console.log(subjects)
	}, [store.allSubjects]);



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