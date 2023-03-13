import React, { useContext, useState } from "react";
import AuthContext from "../components/Auth/AuthContext";
import MapView from "../components/Map/MapView";

import MainHeader from "../components/Header/MainHeader";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import Aside from "../components/Aside/Aside";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const { user, setUser } = useContext(AuthContext);
    const [loggedIn, setLoggedIn] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoggedIn(false);
        setUser(null);
        navigate("/");
    }

    return (
        <React.Fragment>
            <MainHeader user={user} />
            <Navigation handleLogout={handleLogout} />
            <Aside />
            <MapView />
            <Footer />
        </React.Fragment>
    );
};

export default Main;