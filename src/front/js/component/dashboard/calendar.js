import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import Calendar from "@ericz1803/react-google-calendar";

import "./calendar.css";

export const CalendarAux = (props) => {
	const API_KEY = "AIzaSyBrpMc_llCg1YH1cR1sMqDTM_eeY7E2HwY";
	let calendars = [
		{
			calendarId: props.email,
			color: "#801480"
		}
	];
	let styles = {
		calendar: {
			borderWidth: "5px",
			borderColor: "white",
			borderRadius: "20px",
			color: "white"
		},
		eventText: {
			color: "white",
			fontSize: "1.1rem"
		}
	};

	const language = "ES";
	return (
		<div style={{ color: "white" }}>
			<Calendar
				apiKey={API_KEY}
				calendars={calendars}
				styles={styles}
				language={language}
			/>
		</div>
	);
};