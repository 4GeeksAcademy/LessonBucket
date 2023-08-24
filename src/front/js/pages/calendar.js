import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Calendar from "@ericz1803/react-google-calendar";
import "../../styles/calendar.css";

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
		  borderWidth: "0px"
		}
	  };
	  
	  const language = "ES";
	return (
		<div>
			<Calendar
			          apiKey={API_KEY}
					  calendars={calendars}
					  styles={styles}
					  language={language}
			/>
		</div>
	);
};
