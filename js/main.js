window.onload = showOnlyLogin;
const loginForm = document.getElementById("login-form");
const logoutButton = document.getElementById("logout-button");
function showOnlyLogin() {
    document.getElementById("mainpage").style.display = "none";
    document.getElementById("add").style.display = "none";
    document.getElementById("updateDelete").style.display = "none";
}

loginForm.addEventListener("submit", (e) => {
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    e.preventDefault();

    if (username === "admina" && password === "password") {
        loginAsAdmina();
    } else if (username === "guest" && password === "password") {
        loginAsGuest();
    } else {
        alert("Wrong password or username!")
    }
});

function loginAsAdmina() {
    document.getElementById("mainpage").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("add-button").style.display = "block";
    document.getElementById("welcome-message").innerText = `Welcome back ${loginForm.username.value}`;
    document.getElementById("update").style.display = "block";
    document.getElementById("delete").style.display = "block";
}

function loginAsGuest() {
    document.getElementById("mainpage").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("add-button").style.display = "none";
    document.getElementById("welcome-message").innerText = `Welcome back ${loginForm.username.value}`;
    document.getElementById("update").style.display = "none";
    document.getElementById("delete").style.display = "none";
}

logoutButton.addEventListener("click", (e) => {
    document.getElementById("mainpage").style.display = "none";
    document.getElementById("login").style.display = "block";
});

// Map with coordinates for start view
var map = L.map('map').setView([52.51303, 13.4144269], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// marker for 'Fairteiler'
var fairteiler1 = L.marker([52.4918007, 13.3917255]).addTo(map);
var fairteiler2 = L.marker([52.5418451, 13.3962424]).addTo(map);
var fairteiler3 = L.marker([52.481132, 13.5226441]).addTo(map);

// popups for the marker
fairteiler1.bindPopup("<b>Fairteiler</b><br>Mehrgenerationenhaus Gneisenaustrße");
fairteiler2.bindPopup("<b>Fairteiler</b><br>Olof-Palme-Zentrum");
fairteiler3.bindPopup("<b>Fairteiler</b><br>Ika");

