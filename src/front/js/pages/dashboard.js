import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { PagosPendientes } from "./pagosPendientes";
import { SubjectClass } from "./subjectClass";

import "../../styles/dashboard.css";

import { Context } from "../store/appContext";

export const Dashboard = () => {
	const { store, actions } = useContext(Context);
	let payments = ["Miguel Martín Ramos - 09/09/2023", "Pablo García De Gregorio- 01/09/2023", "Toni Centenera - 15/09/2023", "Christian David Velasquez Osorio - 31/08/2023"];
	let subjectClasses = [{ name: "Inglés", className: "18TM", shift: "Tarde", schedule: "18:00-20:00", image: "https://img.freepik.com/vector-premium/bandera-britanica-bandera-reino-unido-gran-bretana-ilustracion-simbolo-estado-vector_484720-2490.jpg" }, { name: "Francés", className: "20TM", shift: "Tarde", schedule: "20:00-22:00", image: "https://www.sitographics.com/enciclog/banderas/europa/image_2012/Francia.gif" }];
	return (
		<div className="container">
			<div className="separator">Próximas Clases</div>
			<div className="row">
				{subjectClasses.map((subjectClass, index) => (
					<SubjectClass key={index} subjectClass={subjectClass} />
				))}
			</div>
			<div className="separator"></div>
			<PagosPendientes payments={payments} />
		</div>
	);
};
