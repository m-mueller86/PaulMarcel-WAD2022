import React from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import AddHeader from "../components/Header/AddHeader";

import "./Add.css";
import "../share/button.css";

const Add = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const address = event.target.address.value;
        const number = event.target.number.value;
        const postcode = event.target.postcode.value;

        const url = `http://nominatim.openstreetmap.org/search?street=${number}+${address}&postalcode=${postcode}&format=json`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.length > 0) {
                const locationData = {
                    latitude: data[0].lat,
                    longitude: data[0].lon,
                };

                const postData = {
                    name,
                    address,
                    number,
                    postcode,
                    lat: locationData.latitude,
                    lon: locationData.longitude,
                };

                const postResponse = await fetch("http://localhost:5000/susLocs", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData),
                });

                if (!postResponse.ok) {
                    throw new Error("Failed to save location.");
                }
                navigate("/main");
            } else {
                throw new Error("Invalid Address!");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleCancel = () => {
        navigate("/main");
    }

    return (
        <React.Fragment>
            <AddHeader />
            <main className="add-main">
                <form onSubmit={handleSubmit} className="add-form">
                    <div className="txt_field">
                        <input type="text" name="name" required />
                        <label>Name</label>
                    </div>
                    <div className="txt_field">
                        <input id="address" type="text" name="address" required />
                        <label>Straße</label>
                    </div>
                    <div className="txt_field">
                        <input id="number" type="text" name="number" required />
                        <label>Hausnr.</label>
                    </div>
                    <div className="txt_field">
                        <input id="postcode" type="text" name="postcode" required />
                        <label>PLZ</label>
                    </div>
                    <input type="submit" value="Save" className="save-button" />
                    <input id="cancel-add" type="reset" value="Cancel" className="cancel-button" onClick={handleCancel} />
                </form>
            </main>
            <Footer />
        </React.Fragment>
    );
};

export default Add;
