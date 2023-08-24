import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/pagosPendientes.css";

export const PagosPendientes = (props) => {
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.fetchStudentsPendingPayment();
	}, []);
	return (
		<div className="row">
			<div className="col">
				<div className="overflow-hidden">
					<div className="overflow-auto">
						<h5 className="pill-title">Pagos Pendientes</h5>
						{store.studentsPendingPayment.results && store.studentsPendingPayment.results.map((payment, index) => (
							<div className="pill" key={index}>
								<p className="pill-font">{payment.name}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>

	);
};