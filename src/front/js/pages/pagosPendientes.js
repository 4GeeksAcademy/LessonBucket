import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/pagosPendientes.css";

export const PagosPendientes = (props) => {
	const { store, actions } = useContext(Context);

	return (
		<div className="main">
			<h5 className="pill-title">Pagos Pendientes</h5>
			<div className="row">
				{props.payments.map((payment, index) => (
					<div className="col-md-12 mb-12" key={index}>
						<div className="pill">
							<p className="pill-font">{payment}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
