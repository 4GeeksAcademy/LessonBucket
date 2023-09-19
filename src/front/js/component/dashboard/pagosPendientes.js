import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import "./pagosPendientes.css";

export const PagosPendientes = ({ reloadComponent }) => {
	const { store, actions } = useContext(Context);
	const [classItemForModal, setClassItemForModal] = useState({
		class_id: "",
		subjects_id: "",
		student_id: "",
		comments: "",
		date: "",
		hour: "",
		price: "",
		paid: "",
	})
	const orderPastClasses = store.pastClasses;
	const paymentFiltered = store.paymentFilteredClass;


	useEffect(() => {
		actions.orderPastClasses();
	}, [store.classes]);


	useEffect(() => {
		actions.paymentFiltered();
	}, [orderPastClasses]);



	const handleOpenModal = (classItem) => {
		setClassItemForModal({
			class_id: classItem.id,
			subjects_id: classItem.subjects.id,
			student_id: classItem.student.id,
			comments: classItem.comments,
			date: classItem.date,
			hour: classItem.hour,
			price: classItem.price,
			paid: true
		});
		
	};

	const handleCancelModal = (classItem) => {
		setClassItemForModal({
			class_id: classItem.id,
			subjects_id: classItem.subjects.id,
			student_id: classItem.student.id,
			comments: classItem.comments,
			date: classItem.date,
			hour: classItem.hour,
			price: classItem.price,
			paid: classItem.paid,
		});
		
	};



	const handleConfirmPayment = async () => {
		if (classItemForModal && classItemForModal.paid === true) {

			let response = await actions.updateSubjectClassInStore(classItemForModal.class_id, classItemForModal);

			if (response === true) {


				swal({
					title: "Good job!",
					text: "Payment processed successfully.",
					icon: "success",
					buttons: {
						confirm: {
							text: "OK",
							className: "custom-swal-button",
						},
					},
					timer: 4000,
				})

				reloadComponent();
				setIsModalOpen(false);


			} else {
				swal("Sorry", "An unexpected error has occurred", "error", {
					buttons: {
						confirm: {
							text: "Try Again",
							className: "custom-swal-button",
						},
					},
					timer: 4000,
				});
			}
		}
	};




	return (
		<div className="row">
			<div className="col">
				<div className="overflow-hidden">
					<div className="overflow-auto">
						<h5 className="pill-title">Pending payment </h5>
						{orderPastClasses.length > 0 && paymentFiltered.length > 0 ? paymentFiltered.map((classItem, index) => (
							<div className="pill d-flex justify-content-between" key={index}>
								<p className="pill-font">{classItem.student.name}-{classItem.date}</p>
								<button type="button" className="button-paid" data-bs-toggle="modal" data-bs-target="#paymentModal" onClick={() => handleOpenModal(classItem)}>
									<i className="fa-solid fa-check" style={{ color: "#ffffff" }}></i>
								</button>
							</div>
						)) : "No hay pagos pendientes"}
					</div>
				</div>
			</div>

			<div className= "modal fade payment-modal-main-container"  id="paymentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" backdrop="static"	>
				<div className="modal-dialog">
					<div class="modal-content payment-Content">
						<form action="" className="payment-modal-form_main">
							<p className="modal-payment-brand mb-0 h1 "><i className="fa-solid fa-bucket me-2"></i>Lesson Bucket</p>
							<h1 className="payment-modal-heading">Confirm Payment?</h1>
							<div className="payment-modal-button-container" >
								<button type="button" className="payment-modal-button payment-modal-button-create" data-bs-dismiss="modal" onClick={() => { handleConfirmPayment() }}>Confirm</button>
								<button type="button" className="payment-modal-button payment-modal-button-cancel" data-bs-dismiss="modal" onClick={() => { handleCancelModal() }}>cancel</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};


