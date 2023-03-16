import React from "react";
import { Link } from "react-router-dom";

import "./Aside.css"

const Aside = ({ locations }) => {
    return (
        <aside>
            <ul>
                {locations.map(location => (
                    <li key={location._id}>
                        <Link to={`/details?id=${location._id}&name=${location.name}&street=${location.address}&housenumber=${location.number}&plz=${location.postcode}`}>
                            {location.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Aside;