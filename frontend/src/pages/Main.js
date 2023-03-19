import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../components/Auth/AuthContext";
import MapView from "../components/Map/MapView";

import MainHeader from "../components/Header/MainHeader";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import Aside from "../components/Aside/Aside";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const { user, setUser } = useContext(AuthContext);
    const [locations, setLocations] = useState([]);
    const [loggedIn, setLoggedIn] = useState(true);
    const [hoveredLocation, setHoveredLocation] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoggedIn(false);
        setUser(null);
        navigate("/");
    };

    const handleLocationHover = (location) => {
        setHoveredLocation(location);
    };

    useEffect(() => {
        fetch("http://localhost:5000/susLocs")
            .then((response) => response.json())
            .then((data) => setLocations(data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <React.Fragment>
            <MainHeader user={user} />
            <Navigation handleLogout={handleLogout} />
            <Aside locations={locations} handleLocationHover={handleLocationHover} />
            <MapView locations={locations} hoveredLocation={hoveredLocation} />
            <Footer />
        </React.Fragment>
    );
};

export default Main;
