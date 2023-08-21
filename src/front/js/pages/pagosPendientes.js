import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/pagosPendientes.css";

export const PagosPendientes = (props) => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
					<h5 className="pill-title">Pagos Pendientes</h5>
					{props.payments.map((payment, index) => (
						<div className="pill" key={index}>
							<p className="pill-font">{payment}</p>
						</div>
					))}
		</div>
	);
};
