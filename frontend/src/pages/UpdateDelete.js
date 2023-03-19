import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import UpdateDeleteHeader from "../components/Header/UpdateDeleteHeader";

import "./UpdateDelete.css";
import "../share/button.css";

const UpdateDelete = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();


    const [name, setName] = useState(queryParams.get("name"));
    const [address, setAddress] = useState(queryParams.get("street"));
    const [number, setNumber] = useState(queryParams.get("housenumber"));
    const [postcode, setPostcode] = useState(queryParams.get("plz"));
    const [id, setId] = useState(queryParams.get("id"));

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

    const handleUpdate = async (event) => {
        event.preventDefault();

        const url = `http://nominatim.openstreetmap.org/search?street=${number}+${address}&postalcode=${postcode}&format=json`;

        try {

            const geodataResponse = await fetch(url);
            const data = await geodataResponse.json();

            if (data && data.length > 0) {
                const locationData = {
                    latitude: data[0].lat,
                    longitude: data[0].lon,
                };

                const putData = {
                    id,
                    name,
                    address,
                    number,
                    postcode,
                    lat: locationData.latitude,
                    lon: locationData.longitude,
                };

                const response = await fetch(`http://localhost:5000/susLocs/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(putData),
                });

                if (!response.ok) {
                    throw new Error("Failed to update location.");
                }

                navigate("/main");
            } else {
                throw new Error("Invalid Address!");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <React.Fragment>
            <UpdateDeleteHeader />
            <main className="updateDelete-main">
                <form className="updateDelete-form" onSubmit={handleUpdate}>
                    <div className="txt_field">
                        <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
                        <label>Location Name</label>
                    </div>
                    <div id="street" className="txt_field">
                        <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} name="address" required />
                        <label>Straße</label>
                    </div>
                    <div id="housenumber" className="txt_field">
                        <input type="text" value={number} onChange={(event) => setNumber(event.target.value)} name="number" required />
                        <label>Hausnr.</label>
                    </div>
                    <div id="plz" className="txt_field">
                        <input type="text" value={postcode} onChange={(event) => setPostcode(event.target.value)} name="postcode" required />
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