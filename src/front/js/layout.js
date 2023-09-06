import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";


import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { RecoverPass } from "./pages/recoverPass";
import { Students } from "./pages/students";
import { LearnMore } from "./pages/LearnMore";
import { Donations } from "./pages/donations";
import { Single } from "./pages/single";
import { SubjectsPage } from "./pages/subjectsPage";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar/navbar";
import { Footer } from "./component/footer/footer";
import { Sidebar } from "./component/sidebar/sidebar";
import { Dashboard } from "./pages/dashboard"
import { Classes } from "./pages/classes"
import { Profile } from "./pages/Profile";
import { JobsNearby } from "./pages/JobsNearby"


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;



    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                <Navbar />
                    <div className="container-fluid p-0">
                        <div className="row">
                            <div className="col-2 p-0">
                            <Sidebar />                               
                            </div>
                       
                            <div className="col-10 p-0">  
                            
                        <div className="min-vh-100 pt-4">
                            <Routes>
                                <Route element={<Home />} path="/" />
                                <Route element={<Login />} path="/login" />
                                <Route element={<RecoverPass />} path="/recoverPass" />
                                <Route element={<Students />} path="/students" />
                                <Route element={<Donations />} path="/donations" />
                                <Route element={<LearnMore />} path="/demo" />
                                <Route element={<Dashboard />} path="/dashboard" />
                                <Route element={<Classes />} path="/classes" />
                                <Route element={<SubjectsPage />} path="/subjects" />
                                <Route element={<Single />} path="/single/:theid" />
                                <Route element={<Profile />} path="/profile" />
                                <Route element={<JobsNearby />} path="/jobsnearby" />
                                <Route element={<h1>Not found!</h1>} />
                            </Routes>
                        </div>
                                                    
                            </div>
                         </div>
                    </div>
                    <Footer /> 
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
