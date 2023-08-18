import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/subjectClass.css";

export const SubjectClass = (props) => {
	const { store, actions } = useContext(Context);

	return (
		<div className="card card-subject">
			<div className="card-img-top" style={{ backgroundImage: "url(" + props.subjectClass.image + ")" }}></div>
			<div className="card-body subject-text">
				<p className="card-title">Clase:&#20;{props.subjectClass.name}</p>
				<p className="card-text">Código:&#20;{props.subjectClass.className}</p>
				<p className="card-text">Turno:&#20;{props.subjectClass.shift}</p>
				<p className="card-text">Horario:&#20;{props.subjectClass.schedule}</p>
			</div>
			<button className="subject-button">Ver Clase</button>
		</div>
	);
};
