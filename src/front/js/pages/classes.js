import React, { useContext, useEffect } from "react";
import { PagosPendientes } from "./pagosPendientes";
import { SubjectClass } from "./subjectClass";
import { CalendarAux } from "./calendar";
import "../../styles/dashboard.css";
import { Context } from "../store/appContext";
import Dropdown from 'react-bootstrap/Dropdown';

export const Classes = () => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.fetchClasses();
	}, []);

	return (
		<div className="dashboard-wrapper">
			<div className="separator">Próximas Clases</div>
			<div className="row">
				<div className="col">
					<div className="d-flex flex-nowrap overflow-auto">
						{store.classes.results && store.classes.results.slice(0, 3).map((subjectClass, index) => (
							<div key={index}>
								<SubjectClass subjectClass={subjectClass} />
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="separator">
				<div className="d-flex">
					<div>Todas las Clases</div>
					<Dropdown style={{ marginLeft: "1rem", backgroundColor: "linear-gradient(271deg, #801480 0%, #0C2FA8 100%);" }}>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							<img src="https://d5xydlzdo08s0.cloudfront.net/images/io/filter_icon_big.png" width={"15px"}/>
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item as="button">Inglés</Dropdown.Item>
							<Dropdown.Item as="button">Francés</Dropdown.Item>
							<Dropdown.Item as="button">Alemán</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<div className="d-flex flex-nowrap overflow-auto">
						{store.classes.results && store.classes.results.map((subjectClass, index) => (
							<div key={index}>
								<SubjectClass subjectClass={subjectClass} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};