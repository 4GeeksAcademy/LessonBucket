import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import "./pagosPendientes.css";

export const PagosPendientes = (props) => {
	const { store, actions } = useContext(Context);
	const paymentFiltrados = store.classes && store.classes.filter((payment, index) => payment.paid == false)
	const [loaded, setLoaded] = useState("loadedEmpty")

	useEffect(() => {
        setLoaded("fullLoaded")
    }, [store.token]);

	return (
		<div className="row">
			<div className="col">
				<div className="overflow-hidden">
					<div className="overflow-auto">
						<h5 className="pill-title">Pagos Pendientes</h5>
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