import React, { useContext, useEffect } from "react";
import { PagosPendientes } from "../component/dashboard/pagosPendientes";
import { SubjectClass } from "../component/dashboard/subjectClass.js";
import { CalendarAux } from "../component/dashboard/calendar";
import "../../styles/dashboard.css";
import { Context } from "../store/appContext";

export const Dashboard = () => {
	const { store, actions } = useContext(Context);
	const classesByDate = store.classes;

	let today = new Date().toLocaleDateString("es-ES");
	

	const sortBySoonestDate = (a,b) => {
	
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);
		if (a.date > b.date) {
			return 1;
		}
		if (a.date < b.date) {
			return -1;
		}
		return 0;
	}

	useEffect(() => {
		actions.fetchClasses();
		
		console.log(classesByDate)
		actions.getAllSubjects();
		actions.getAllStudents();
	}, []);

	useEffect(() => {
		classesByDate.sort(sortBySoonestDate);
		console.log(classesByDate);
		console.log(today);
	}, [store.classes]);





	const idCalendar = "812c4ae1327f1fb4a4ae715bdb01f1d78ab6c2254d67b7e0b52b0ef790db827e@group.calendar.google.com";

	return (
		<div className="dashboard-wrapper">
			<div className="separator">Próximas Clases</div>
			<div className="row">
				<div className="col">
					<div className="d-flex flex-nowrap overflow-auto">
						{classesByDate && classesByDate.slice(0, 3).map((subjectClass, index) => (
							<div key={index}>
								<SubjectClass subjectClass={subjectClass} />
							</div>
						))}
					</div>
				</div>
			</div>

			
			<div className="d-flex justify-content gap-3">
				<div className="main-pagos col-md-4 mb-2 overflow-auto">
					<PagosPendientes />
				</div>
				
				<div className="main-calendar">
					{/* <CalendarAux email={idCalendar} /> */}
					<iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23B39DDB&ctz=UTC&showTabs=0&showPrint=0&showTitle=1&showNav=1&showDate=1&showCalendars=0&showTz=0&src=ODEyYzRhZTEzMjdmMWZiNGE0YWU3MTViZGIwMWYxZDc4YWI2YzIyNTRkNjdiN2UwYjUyYjBlZjc5MGRiODI3ZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23D50000" style={{border: "0"}} width="350" height="400" frameborder="0" ></iframe>
				</div>
			</div>
		</div>
	);
};