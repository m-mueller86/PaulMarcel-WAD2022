import React, { useContext } from "react";
import AuthContext from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

import "./Navigation.css";

const Navigation = ({ handleLogout }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav>
            <button id="logout-button" className="nav-button" onClick={handleLogout}>Logout</button>
            {user.isAdmin === "true" && <button id="add-button" className="nav-button">Add</button>}
        </nav>
    );
};

export default Navigation;