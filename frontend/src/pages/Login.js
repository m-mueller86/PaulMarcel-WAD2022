import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

import LoginHeader from "../components/Header/LoginHeader";
import Footer from "../components/Footer/Footer";

import "./Login.css"
import AuthContext from "../components/Auth/AuthContext";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const {setUser} = useContext(AuthContext);

    const handleSubmit = event => {
        event.preventDefault();

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    alert("Incorrect username or password!");
                    setUsername("");
                    setPassword("");
                }
            })
            .then(data => {
                if (data !== undefined && data.isAdmin === "true") {
                    console.log("Login as Admin");
                    setLoggedIn(true);
                    setUser(data);
                } else if (data !== undefined && data.isAdmin === "false") {
                    console.log("Login as guest");
                    setLoggedIn(true);
                    setUser(data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    if (loggedIn) {
        return <Navigate to="/main" />;
    }

    return (
        <React.Fragment>
            <LoginHeader />
            <form className="login-form" action="/users" onSubmit={handleSubmit}>
                <div className="txt_field">
                    <input
                        type="text"
                        name="username"
                        id="username-field"
                        required
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                    <label>Username</label>
                </div>
                <div className="txt_field">
                    <input
                        type="password"
                        name="password"
                        id="password-field"
                        required
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <label>Password</label>
                </div>
                <input type="submit" value="Login" />
            </form>
            <Footer />
        </React.Fragment>
    );
};

export default Login;
