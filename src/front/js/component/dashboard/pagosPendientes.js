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

	const orderPastClasses = () =>{
		const pastFilteredClasses = classes.filter(function (item){
			return new Date(item.date) < today
		}).sort(sortBySoonestDate);
		setPastClasses(pastFilteredClasses)
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
							<div className="pill row" key={index}>
								<p className="pill-font col-9">{item.student?.name}-{item.date}</p>
								<button type="button" class="btn btn-primary col-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
  									Paid
								</button>
							</div>
						)): "No hay pagos pendientes"}
					</div>
				</div>
			</div>
			
			<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  			<div class="modal-dialog">
    				<div class="modal-content">
      					<div class="modal-header">
        					<h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      					</div>
      					<div class="modal-body">
        				...
      					</div>
      					<div class="modal-footer">
        					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        					<button type="button" class="btn btn-primary">Save changes</button>
      					</div>
    				</div>
  				</div>
			</div>
		</div>
	);
};