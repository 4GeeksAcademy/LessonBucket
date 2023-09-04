import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import "./pagosPendientes.css";

export const PagosPendientes = (props) => {
	const { store, actions } = useContext(Context);
	const paymentFiltrados = store.classes && store.classes.filter((payment, index) => payment.paid == false)
	console.log(paymentFiltrados)
					
	return (
		<div className="row">
			<div className="col">
				<div className="overflow-hidden">
					<div className="overflow-auto">
						<h5 className="pill-title">Pagos Pendientes</h5>
						{paymentFiltrados.length >0? paymentFiltrados.map((item, index) => (
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