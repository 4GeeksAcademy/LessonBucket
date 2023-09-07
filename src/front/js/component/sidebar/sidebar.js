import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import { useLocation } from 'react-router-dom';


export const Sidebar = () => {


    const { store, actions } = useContext(Context);
    // const [showSidebar, setShowSidebar] = useState("spread")


    // const handleToggleSideBar = () => {
    //     if (Sidebar != null) {

    //         if (showSidebar === "spread") { setShowSidebar("shrink") }
    //         else { setShowSidebar("spread") }
    //     }
    // }



    if (store.logged === false || (store.token === "")) return null

    else {

        // if (showSidebar === "spread") {

            return (
                <>
        
                    < nav className="sidebar align-items-center ">
                   
                        <ul className="list-unstyled components  pt-4 mb-0 pb-0 lista ">
                           
                            <Link to="/dashboard" className="link-logo mb-4  ">
                                <li className="pt-0 dashboard mx-auto d-flex">
                                    <i className="sideIcons fa-solid fa-table-cells-large me-2 my-auto "></i>
                                    <span className="sideText">Dashboard</span>
                                </li>
                            </Link>
                            <Link to="/students" className="link-logo mb-4 ">
                                <li className="students">
                                    <i className="sideIcons fa-solid fa-graduation-cap me-2 my-auto"></i>
                                    <span className="sideText">Students</span>
                                </li>
                            </Link>
                            <Link to="/subjects" className="link-logo mb-4 ">
                                <li className="subjects">
                                    <i className="sideIcons fa-solid fa-book me-2 my-auto"></i>
                                    <span className="sideText">Subjects</span>
                                </li>
                            </Link>
                            <Link to="/classes" className="link-logo mb-4 ">
                                <li className="classes">
                                    <i className="sideIcons fa-solid fa-person-chalkboard me-2 my-auto"></i>
                                    <span className="sideText">Classes</span>
                                </li>
                            </Link>
                            <Link to="/profile" className="link-logo mb-4 ">
                                <li className="sideProfile">
                                    <i className="sideIcons fa-solid fa-user me-2 my-auto"></i>
                                    <span className="sideText">Profile</span>
                                </li>
                            </Link>

                            <Link to="/jobsnearby" className="link-logo ">
                                <li className="jobsNearby">
                                <i className="sideIcons fa-solid fa-user-doctor me-2 my-auto"></i>
                                    <span className="sideText">Jobs Near</span>
                                </li>
                            </Link>
                            
                        </ul>

                    </nav >


                </>

            );
        }


        // if (store.logged === false || (useLocation().pathname === "/")) return null
        // else {
        //     return (
        //         <>

        //             < nav className="sidebar align-items-center my-auto py-4 pe-5 ps-3  ">

        //                 <ul className="list-unstyled components mb-0 pb-0">
        //                     <li>
        //                         <i className="arrow-right fa-solid fa-arrow-right ms-3 me-3  mb-3" onClick={handleToggleSideBar}></i>

        //                     </li>
        //                     <Link to="/dashboard" className="link-logo">
        //                         <li className="pt-0 dashboard">
        //                             <i className="fa-solid fa-table-cells-large m-3 "></i>
        //                         </li>
        //                     </Link>
        //                     <Link to="/students" className="link-logo">
        //                         <li className="students">
        //                             <i className="fa-solid fa-graduation-cap m-3"></i>
        //                         </li>
        //                     </Link>
        //                     <Link to="/subjects" className="link-logo">
        //                         <li className="subjects">
        //                             <i className="fa-solid fa-book m-3"></i>
        //                         </li>
        //                     </Link>
        //                     <Link to="/classes" className="link-logo">
        //                         <li className="classes">
        //                         <i class="fa-solid fa-person-chalkboard m-3"></i>
        //                         </li>
        //                     </Link>
        //                     <Link to="/profile" className="link-logo">
        //                         <li className="profile">
        //                             <i className="fa-solid fa-user m-3"></i>
        //                         </li>
        //                     </Link>
        //                     <Link to="/settings" className="link-logo">
        //                         <li className="settings">
        //                             <i className="fa-solid fa-gear m-3 "></i>
        //                         </li>
        //                     </Link>
        //                     <Link to="/documents" className="link-logo">
        //                         <li className="documents">
        //                             <i className="fa-regular fa-folder-open m-3"></i>
        //                         </li>
        //                     </Link>
        //                 </ul>

        //             </nav >

        //         </>
        //     );
        // }
    };

