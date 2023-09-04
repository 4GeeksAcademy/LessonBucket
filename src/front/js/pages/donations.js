import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

import { Context } from "../store/appContext";

export const Donations = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container min-vh-100 d-flex align-items-center">
			<div className="position-absolute top-50 start-50 translate-middle text-center backg p-4" style={{ width: "300px" }}>
          <h2 className="whiteText">Want to help us?</h2>
          <a href="https://www.buymeacoffee.com/LessonBucket" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style={{height: '60px', width: '217px'}}/ ></a>
        </div>
        <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="LessonBucket" data-color="#FFDD00" data-emoji=""  data-font="Cookie" data-text="Buy us a coffee" data-outline-color="#000000" data-font-color="#000000" data-coffee-color="#ffffff" ></script>
		</div>
	);
};