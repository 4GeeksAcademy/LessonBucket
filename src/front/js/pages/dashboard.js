import React, { useContext, useEffect, useState } from "react";
import { PagosPendientes } from "../component/dashboard/pagosPendientes";
import { SubjectClass } from "../component/dashboard/subjectClass.js";
import { Calendar } from "../component/dashboard/calendar";
import "../../styles/dashboard.css";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';


export const Dashboard = () => {
	const { store, actions } = useContext(Context);
	const classes = store.classes;
	const [futureClasses, setFutureClasses] = useState([]);
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


	// UseEffect encargado de obtener classes, subjects y students una vez se recarge la página.

	useEffect(() => {
		actions.fetchClasses();
		actions.getAllSubjects();
		actions.getAllStudents();
	}, []);



	let today = new Date();

	const sortBySoonestDate = (a, b) => {

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

	const orderFutureClasses = () => {
		const futureFilteredClasses = classes.filter(function (item) {
			return new Date(item.date) >= today
		}).sort(sortBySoonestDate);
		setFutureClasses(futureFilteredClasses)
	}

	// UseEffect encargado de obtener classes futuras una vez que store.classes tenga algo.

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