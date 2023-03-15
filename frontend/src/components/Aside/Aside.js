import React from "react";

import "./Aside.css"

const Aside = ({ locations }) => {
    return (
        <aside>
            <ul>
                {locations.map(location => (
                    <li key={location._id}>{location.name}</li>
                ))}
            </ul>
        </aside>
    );
};

export default Aside;