import React, { useState, useContext } from "react";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext"; import { Context } from "../../store/appContext";
export const Sidebar = () => {
    const { store, actions } = useContext(Context);
    const { store, actions } = useContext(Context);
    const [showSidebar, setShowSidebar] = useState("spread")


    const handleToggleSideBar = () => {

        if (showSidebar === "spread") { setShowSidebar("shrink") }
        else { setShowSidebar("spread") }
    }


    if (store.logged === false) return null
    else {

        if (showSidebar === "spread") {

            return (
                <>

                    < nav className="sidebar mt-5 align-items-center my-auto py-4 pe-5 ps-3 ">

                        <ul className="list-unstyled components mb-0 pb-0 lista">
                            <li>
                                <i className=" arrow-left fa-solid fa-arrow-left ms-3 me-3  mb-3 d-flex justify-content-end" onClick={handleToggleSideBar}></i>

                            </li>
                            <Link to="/dashboard" className="link-logo">
                                <li className="pt-0 dashboard">
                                    <i className="fa-solid fa-table-cells-large m-3 "></i>
                                    <a className="">Dashboard</a>
                                </li>
                            </Link>
                            <Link to="/students" className="link-logo">
                                <li className="students">
                                    <i className="fa-solid fa-graduation-cap m-3"></i>
                                    <a className="">Students</a>
                                </li>
                            </Link>
                            <Link to="/subjects" className="link-logo">
                                <li className="subjects">
                                    <i className="fa-solid fa-book m-3"></i>
                                    <a className="">Subjects</a>
                                </li>
                            </Link>
                            <Link to="/profile" className="link-logo">
                                <li className="profile">
                                    <i className="fa-solid fa-user m-3"></i>
                                    <a className="">Profile</a>
                                </li>
                            </Link>

                            <Link to="/settings" className="link-logo">
                                <li className="settings">
                                    <i className="fa-solid fa-gear m-3 "></i>
                                    <a className="">Settings</a>
                                </li>
                            </Link>
                            <Link to="/documents" className="link-logo">
                                <li className="documents">
                                    <i className="fa-regular fa-folder-open m-3"></i>
                                    <a className="">Documents</a>
                                </li>
                            </Link>
                        </ul>

                    </nav >


                </>

            );
        }

        else {
            return (
                <>

                    < nav className="sidebar mt-5 align-items-center my-auto py-4 pe-2 ps-3 ">

                        <ul className="list-unstyled components mb-0 pb-0">
                            <li>
                                <i className="arrow-right fa-solid fa-arrow-right ms-3 me-3  mb-3" onClick={handleToggleSideBar}></i>

                            </li>
                            <Link to="/dashboard" className="link-logo">
                                <li className="pt-0 dashboard">
                                    <i className="fa-solid fa-table-cells-large m-3 "></i>
                                </li>
                            </Link>
                            <Link to="/students" className="link-logo">
                                <li className="students">
                                    <i className="fa-solid fa-graduation-cap m-3"></i>
                                </li>
                            </Link>
                            <Link to="/subjects" className="link-logo">
                                <li className="subjects">
                                    <i className="fa-solid fa-book m-3"></i>
                                </li>
                            </Link>
                            <Link to="/profile" className="link-logo">
                                <li className="profile">
                                    <i className="fa-solid fa-user m-3"></i>
                                </li>
                            </Link>
                            <Link to="/settings" className="link-logo">
                                <li className="settings">
                                    <i className="fa-solid fa-gear m-3 "></i>
                                </li>
                            </Link>
                            <Link to="/documents" className="link-logo">
                                <li className="documents">
                                    <i className="fa-regular fa-folder-open m-3"></i>
                                </li>
                            </Link>
                        </ul>

                    </nav >


                </>

            );
        }

    }


};
