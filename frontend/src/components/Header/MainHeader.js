import React from "react";

import "./MainHeader.css"

const MainHeader = ({ user }) => {
    return (
        <header className="main-header">
            <h2>Welcome Back {user.firstName}!</h2>
        </header>
    );
};

export default MainHeader;