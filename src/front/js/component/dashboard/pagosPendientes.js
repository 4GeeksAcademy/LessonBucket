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
							<div className="pill" key={index}>
								<p className="pill-font">{item.student?.name}-{item.date}</p>
							</div>
						)): "No hay pagos pendientes"}
					</div>
				</div>
			</div>
		</div>

	);
};