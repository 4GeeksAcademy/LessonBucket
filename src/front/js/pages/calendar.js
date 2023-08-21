import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/calendar.css";

export const Calendar = (props) => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<iframe
				src={"https://calendar.google.com/calendar/embed?src=bdb86c31dd1521191e7d1a472d3e5bf9cf0e5d6fc30f63eabf3630227d053506%40group.calendar.google.com&ctz=America%2FBogota"}
				style={{ border: 0, width: '100%', height: '500px', frameborder: '0', scrolling: 'no' }}
			></iframe>
		</div>
	);
};
