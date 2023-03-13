import React, { useContext } from "react";
import AuthContext from "../components/Auth/AuthContext";

import MainHeader from "../components/Header/MainHeader";

const Main = () => {
    const { user } = useContext(AuthContext);

    return (
        <MainHeader user={user} />
    );
};

export default Main;