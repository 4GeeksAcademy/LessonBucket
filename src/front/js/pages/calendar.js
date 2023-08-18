import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/calendar.css";

export const Calendar = (props) => {
	const { store, actions } = useContext(Context);

	return (
		<div className="main">
			<h5 className="pill-title">Pagos Pendientes</h5>
			<div className="row">
				{props.pagos.map((pago, index) => (
					<div className="col-md-12 mb-12" key={index}>
						<div className="pill">
							<p className="pill-font">{pago}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
