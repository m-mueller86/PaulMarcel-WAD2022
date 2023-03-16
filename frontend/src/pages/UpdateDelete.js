import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import UpdateDeleteHeader from "../components/Header/UpdateDeleteHeader";

import "./UpdateDelete.css";
import "../share/button.css";

const UpdateDelete = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();


    const id = queryParams.get("id");
    const name = queryParams.get("name");
    const street = queryParams.get("street");
    const housenumber = queryParams.get("housenumber");
    const plz = queryParams.get("plz");

    const handleCancel = () => {
        navigate("/main");
    }

    const handleDelete = () => {
        const id = queryParams.get("id");

        fetch(`http://localhost:5000/susLocs/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete location.');
                }
                navigate("/main");
            })
            .catch(error => console.log(error));
    };


    return (
        <React.Fragment>
            <UpdateDeleteHeader />
            <main className="updateDelete-main">
                <form className="updateDelete-form">
                    <div className="txt_field">
                        <input type="text" defaultValue={name} required />
                        <label>Location Name</label>
                    </div>
                    <div id="street" className="txt_field">
                        <input type="text" defaultValue={street} required />
                        <label>Straße</label>
                    </div>
                    <div id="housenumber" className="txt_field">
                        <input type="text" defaultValue={housenumber} required />
                        <label>Hausnr.</label>
                    </div>
                    <div id="plz" className="txt_field">
                        <input type="text" defaultValue={plz} required />
                        <label>PLZ</label>
                    </div>
                    <div id="locationId" className="txt_field">
                        <input type="text" defaultValue={id} />
                        <label>Location Id</label>
                    </div>
                    <input id="update" type="submit" value="Update" className="save-button" />
                    <input id="delete" type="reset" value="Delete" className="delete-button" onClick={handleDelete} />
                    <input id="cancel-update" type="cancel" value="Cancel" className="cancel-button" onClick={handleCancel} />
                </form>
            </main>
            <Footer />
        </React.Fragment>
    );
};

export default UpdateDelete;