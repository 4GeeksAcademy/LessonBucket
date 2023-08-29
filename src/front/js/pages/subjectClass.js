import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Modal from "react-bootstrap/Modal"; // Import Modal component
import Button from "react-bootstrap/Button"; // Import Button component from react-bootstrap
import "../../styles/subjectClass.css";

export const SubjectClass = (props) => {
	const { store, actions } = useContext(Context);
	const [isModalOpen, setIsModalOpen] = useState(false);
	let image;
	let britishImage = "https://upload.wikimedia.org/wikipedia/commons/f/f2/Flag_of_Great_Britain_%281707%E2%80%931800%29.svg";
	let frenchImage = "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg"
	let germanImage = "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg"
	if (props.subjectClass.Subject = 'Inglés') {
		image = britishImage;
	}


	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="card-subject">
			<div className="card-img-top" style={{ backgroundImage: `url(${image})` }}></div>
			<div className="card-body subject-text">
				<p className="card-title">Clase: {props.subjectClass.Subject}</p>
				<p className="card-text">Fecha: {props.subjectClass.date}</p>
			</div>
			<button className="subject-button" onClick={openModal}>Ver Clase</button>

			<Modal show={isModalOpen} onHide={closeModal} centered>
				<Modal.Header>
					<Modal.Title>
						<div className="card-img-top" style={{ backgroundImage: `url(${image})` }}></div>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="card-body subject-text">
						<p className="card-title">Clase: {props.subjectClass.Subject}</p>
						<p className="card-text">Fecha: {props.subjectClass.date}</p>
						<p className="card-text">Precio: {props.subjectClass.price}</p>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeModal}>Cerrar</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
