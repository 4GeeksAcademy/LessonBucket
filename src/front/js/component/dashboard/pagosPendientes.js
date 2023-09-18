import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import "./pagosPendientes.css";

export const PagosPendientes = () => {
	const { store, actions } = useContext(Context);
	const [pastClasses, setPastClasses] = useState([]);
	const classes = store.classes;
	const [loaded, setLoaded] = useState("loadedEmpty")
	const [paymentFiltrados, setPaymentFiltrados] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false);
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

	useEffect(() => {
		setLoaded("fullLoaded")
	}, [store.token]);

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

	let today = new Date();



	const orderPastClasses = () => {
		const pastFilteredClasses = classes.filter(function (item) {
			return new Date(item.date) < today
		}).sort(sortBySoonestDate);
		setPastClasses(pastFilteredClasses)
	}



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
		setIsModalOpen(true);
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
		setIsModalOpen(false);
	};



	const handleConfirmPayment = async () => {

		if (classItemForModal && classItemForModal.paid === true) {

			let response = await actions.updateSubjectClassInStore(classItemForModal.class_id, classItemForModal);

			if (response === true) {

				setPaymentFiltrados((prevPaymentFiltrados) =>
					prevPaymentFiltrados.filter(
						(payment) => payment.id !== classItemForModal.class_id
					)
				);

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
				  .then((confirmed) => {
					if (confirmed) {
					  
					  window.location.reload();
					} else {
					  
					  setTimeout(() => {
						window.location.reload();
					  });
					}
				  });

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



	useEffect(() => {
		orderPastClasses();
		setPaymentFiltrados(pastClasses.filter((payment) => payment.paid === false));
	}, [store.classes]);


	useEffect(() => {
		setPaymentFiltrados(pastClasses.filter((payment) => payment.paid === false));
	}, [pastClasses]);




	return (
		<div className="row">
			<div className="col">
				<div className="overflow-hidden">
					<div className="overflow-auto">
						<h5 className="pill-title">Pending payment </h5>
						{loaded === "fullLoaded" && paymentFiltrados ? paymentFiltrados.map((classItem, index) => (
							<div className="pill d-flex justify-content-between" key={index}>
								<p className="pill-font">{classItem.student.name}-{classItem.date}</p>
								<button type="button" className="button-paid" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleOpenModal(classItem)}>
									<i className="fa-solid fa-check" style={{ color: "#ffffff" }}></i>
								</button>
							</div>
						)) : "No hay pagos pendientes"}
					</div>
				</div>
			</div>

			<div className={`modal fade ${isModalOpen ? "show" : ""}`} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!isModalOpen}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Payment</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { handleCancelModal() }}></button>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
							<button type="button" className="btn btn-primary" onClick={() => { handleConfirmPayment() }}>Confirm</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};