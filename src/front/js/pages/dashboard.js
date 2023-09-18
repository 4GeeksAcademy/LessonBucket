import React, { useContext, useEffect, useState } from "react";
import { PagosPendientes } from "../component/dashboard/pagosPendientes";
import { SubjectClass } from "../component/dashboard/subjectClass.js";
import { Calendar } from "../component/dashboard/calendar";
import "../../styles/dashboard.css";
import { Context } from "../store/appContext";

export const Dashboard = () => {
	const { store, actions } = useContext(Context);
	// const classesByDate = store.classes;
	const classes = store.classes;
	const [futureClasses, setFutureClasses] = useState([]);
	

	// const classesByDate = classes.map((class) => return class.date
	// );
	// const classesByDate = classes.map(function (clas) {
	// 	return clas.date, clas.hour;
	//   });

	//   console.log(classesByDate)

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

	let today = new Date();

	
	const orderFutureClasses = () =>{
	const futureFilteredClasses = classes.filter(function (item){
		return new Date(item.date) >= today
	}).sort(sortBySoonestDate);
	setFutureClasses(futureFilteredClasses)
    }


	

	useEffect(() => {
		actions.fetchClasses();
		actions.getAllSubjects();
		actions.getAllStudents();
	}, []);


	useEffect(() => {
		orderFutureClasses();
	}, [store.classes]);




	return (
		<div className="dashboard-wrapper">
			<div className="separator">Next Classes</div>
			<div className="row">
				<div className="col">
					<div className="d-flex flex-nowrap overflow-auto">
						{futureClasses && futureClasses.slice(0, 3).map((subjectClass, index) => (
							<div key={index}>
								<SubjectClass subjectClass={subjectClass} />
							</div>
						))}
					</div>
				</div>
			</div>

			
			<div className="d-flex justify-content gap-3">
				<div className="main-pagos col-md-4 mb-2 overflow-auto">
					<PagosPendientes  />
				</div>
				
				<div className="main-calendar">
					<Calendar />
					
				</div>
			</div>
		</div>
	);
};