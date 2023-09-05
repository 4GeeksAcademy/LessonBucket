import React, { useContext, useEffect } from "react";
import { PagosPendientes } from "../component/dashboard/pagosPendientes";
import { SubjectClass } from "../component/dashboard/subjectClass.js";
import { CalendarAux } from "../component/dashboard/calendar";
import "../../styles/dashboard.css";
import { Context } from "../store/appContext";

export const Dashboard = () => {
	const { store, actions } = useContext(Context);


	const idCalendar = "bdb86c31dd1521191e7d1a472d3e5bf9cf0e5d6fc30f63eabf3630227d053506@group.calendar.google.com";
	
	return (
		<div className="dashboard-wrapper">
			<div className="separator">Próximas Clases</div>
			<div className="row">
				<div className="col">
					<div className="d-flex flex-nowrap overflow-auto">
						{store.classes && store.classes.slice(0, 3).map((subjectClass, index) => (
							<div key={index}>
								<SubjectClass subjectClass={subjectClass} />
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="separator"></div>
			<div className="row justify-content-start">
				<div className="main-pagos col-md-4 mb-2 overflow-auto">
					
					<PagosPendientes />
				</div>
				<div className="col-md-1 mb-1">
				</div>
				<div className="main-pagos col-md-7 mb-5">
					<CalendarAux email={idCalendar} />
				</div>
			</div>
		</div>
	);
};