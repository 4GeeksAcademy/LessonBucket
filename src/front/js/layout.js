import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";


import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { RecoverPass } from "./pages/recoverPass";
import { LearnMore } from "./pages/LearnMore";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar/navbar";
import { Footer } from "./component/footer/footer";
import { Sidebar } from "./component/sidebar/sidebar";
import { Dashboard } from "./pages/dashboard";
import { Profile } from "./pages/Profile";


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
                    {/* <div className="wrapper"> */}
                    <Sidebar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<RecoverPass />} path="/recoverPass" />
                        <Route element={<LearnMore />} path="/demo" />
                        <Route element={<Dashboard />} path="/dashboard" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    {/* </div> */}
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
