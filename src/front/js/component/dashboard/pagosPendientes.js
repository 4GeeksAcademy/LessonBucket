import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import "./pagosPendientes.css";

export const PagosPendientes = (props) => {
	const { store, actions } = useContext(Context);
	const [pastClasses, setPastClasses] = useState([]);
	const classes = store.classes;
	const [loaded, setLoaded] = useState("loadedEmpty")

	
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

	const changePaidState = item.paid = true

	const orderPastClasses = () =>{
		const pastFilteredClasses = classes.filter(function (item){
			return new Date(item.date) < today
		}).sort(sortBySoonestDate);
		setPastClasses(pastFilteredClasses)
		}
	
	const handleStudentPaid = (item) =>{
		actions.markClassAsPaid(item.id);
	}

		const paymentFiltrados = pastClasses && pastClasses.filter((payment, index) => payment.paid == false)

		useEffect(() => {
			orderPastClasses();
		}, [store.classes]);
	
	useEffect(() => {
        setLoaded("fullLoaded")
    }, [store.token]);

	return (
		<div className="row">
			<div className="col">
				<div className="overflow-hidden">
					<div className="overflow-auto">
						<h5 className="pill-title">Pending payment </h5>
						{loaded === "fullLoaded" && paymentFiltrados ? paymentFiltrados.map((item, index) => (
							<div className="pill d-flex justify-content-between" key={index}>
								<p className="pill-font">{item.student?.name}-{item.date}</p>
								{console.log(item)}
								<button type="button" className="button-paid" data-bs-toggle="modal" data-bs-target="#exampleModal">
								<i className="fa-solid fa-check" style={{color: "#ffffff"}}></i>
								</button>
							</div>
						)): "No hay pagos pendientes"}
					</div>
				</div>
			</div>
			
			<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  			<div className="modal-dialog">
    				<div className="modal-content">
      					<div className="modal-header">
        					<h1 className="modal-title fs-5" id="exampleModalLabel">Confirm Payment</h1>
        					<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      					</div>
      					<div className="modal-footer">
        					<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        					<button type="button" className="btn btn-primary" onClick={() =>{handleStudentPaid()}}>Confirm</button>
      					</div>
    				</div>
  				</div>
			</div>
		</div>
	);
};