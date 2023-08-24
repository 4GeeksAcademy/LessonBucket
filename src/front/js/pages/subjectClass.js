import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/subjectClass.css";

export const SubjectClass = (props) => {
	const { store, actions } = useContext(Context);
	let image;
	let britishImage = "https://upload.wikimedia.org/wikipedia/commons/f/f2/Flag_of_Great_Britain_%281707%E2%80%931800%29.svg";
	if(props.subjectClass.Subject = 'Inglés'){
		image = britishImage;
	}
	return (
		<div className="card-subject">
			<div className="card-img-top" style={{ backgroundImage: `url(${image})` }}></div>
			<div className="card-body subject-text">
				<p className="card-title">Clase: {props.subjectClass.Subject}</p>
				{/* <p className="card-text">Código: {props.subjectClass.className}</p>
				<p className="card-text">Turno: {props.subjectClass.shift}</p>
				<p className="card-text">Horario: {props.subjectClass.schedule}</p> */}
			</div>
			<button className="subject-button">Ver Clase</button>
		</div>
	);
};
