import React, { useContext, useEffect } from "react";
import { PagosPendientes } from "../component/dashboard/pagosPendientes";
import { SubjectClass } from "../component/dashboard/subjectClass.js";
import { Calendar } from "../component/dashboard/calendar";
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
		actions.getAllSubjects();
		actions.getAllStudents();
	}, []);


	useEffect(() => {
		classesByDate.sort(sortBySoonestDate);
		console.log(today);
	}, [store.classes]);




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
					<Calendar />
					
				</div>
			</div>
		</div>
	);
};