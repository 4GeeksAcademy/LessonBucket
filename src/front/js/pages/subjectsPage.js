import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CreateSubject } from "../component/SubjectsPage/createSubject.js";
import { DropdownSubject } from "../component/SubjectsPage/dropdownSubject.js";
import { Context } from "../store/appContext.js";
import "../component/SubjectsPage/subjects.css";


export const SubjectsPage = props => {
	const { store, actions } = useContext(Context);


	return (
		<div className="min-vh-100">
			<CreateSubject />
			<DropdownSubject />
		</div>

	)
}