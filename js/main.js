window.onload = showOnlyLogin;

function showOnlyLogin() {
    document.getElementById("mainpage").style.display = "none";
    document.getElementById("add").style.display = "none";
    document.getElementById("updateDelete").style.display = "none";
}

const loginForm = document.getElementById("login-form");
const logoutButton = document.getElementById("logout-button");




const addForm = document.getElementById("add-form");
const addButton = document.getElementById("add-button");
const cancelAdd = document.getElementById("cancel-add");
const cancelUpdate = document.getElementById("cancel-update");
const addLocation = document.getElementById("add-location");
const deleteLocation = document.getElementById("update-delete-form");
const updateLocation = document.getElementById("update-delete-form");


// Login
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

// Logout
logoutButton.addEventListener("click", (e) => {
    document.getElementById("mainpage").style.display = "none";
    document.getElementById("login").style.display = "block";
});

// Adding location
addButton.addEventListener("click", (e) => {
    document.getElementById("mainpage").style.display = "none";
    document.getElementById("add").style.display = "block";
});

cancelAdd.addEventListener("click", (e) => {
    document.getElementById("add").style.display = "none";
    document.getElementById("mainpage").style.display = "block";
});

addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = addForm.name.value;
    const address = addForm.address.value;
    const number = addForm.number.value;
    const postcode = addForm.postcode.value;

    let httpRequest = new XMLHttpRequest();
    const url = "http://nominatim.openstreetmap.org/search?street=" + number + "+" + address + "&postalcode=" + postcode + "&format=json";

    httpRequest.open("GET", url, true);

    httpRequest.onload = function (e) {
        let data = this.response;
        let obj = JSON.parse(data);

        if (this.status = 200 && obj[0] != undefined) {
            addToLocations(obj[0]["lat"], obj[0]["lon"], name, address, number, postcode);
            document.getElementById("add").style.display = "none";
            document.getElementById("mainpage").style.display = "block";
        } else {
            alert("Please check the address!")
        }
    };
    httpRequest.send();
});

function addToMap(location) {
    location.marker.addTo(map);
    document.getElementById("location-list").innerHTML += `<li id="${location.name}">` + location.name + "</li><br>";
    location.marker.bindPopup(location.name);
}

function addToLocations(lat, lon, name, address, number, postcode) {
    let location = {
        name: name,
        address: address,
        number: number,
        postcode: postcode,
        lat: lat,
        lon: lon,
        marker: L.marker([lat, lon])
    };

    locations.push(location);
    addToMap(location);
    addEventListenerToLocationsElements();
}

// Update/Delete
cancelUpdate.addEventListener("click", (e) => {
    document.getElementById("updateDelete").style.display = "none";
    document.getElementById("mainpage").style.display = "block";
});

function addEventListenerToLocationsElements() {
    locations.forEach(location => {
        document.getElementById(location.name).addEventListener("click", (e) => {
            document.getElementById("mainpage").style.display = "none";
            document.getElementById("updateDelete").style.display = "block";
            document.getElementById("street").innerHTML = `<input type="text" value="${location.address}" name="street" required>` +
            "<label>Straße</label>";
            document.getElementById("housenumber").innerHTML = `<input type="text" value="${location.number}" name="housenumber" required>` +
            "<label>Nr.</label";
            document.getElementById("locationname").innerHTML = `<input type="text" value="${location.name}" name="name" required>` +
            "<label>Name</label>";
            document.getElementById("plz").innerHTML = `<input type="text" value="${location.postcode}" name="postcode" required>` +
            "<label>PLZ</label>";
        });
    })
}

deleteLocation.addEventListener("reset", (e) => {
    const name = deleteLocation.name.value;

    let index = locations.findIndex(element => element.name == name);

    if (index != -1) {
        locations[index].marker.remove();
        locations.splice(index, 1);
        document.getElementById("location-list").innerHTML = "";
        document.getElementById("mainpage").style.display = "block";
        document.getElementById("updateDelete").style.display = "none";

        locations.forEach(location => {
            document.getElementById("location-list").innerHTML += `<li id="${location.name}">` + location.name + "</li><br>";
        });

        addEventListenerToLocationsElements();
    } else {
        alert("Location does not exist!");
    }
});

updateLocation.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = updateLocation.name.value;
    const address = updateLocation.street.value;
    const number = updateLocation.housenumber.value;
    const plz = updateLocation.postcode.value;

    let index = locations.findIndex(element => element.name == name);

    console.log(address);
    console.log(name);
    console.log(number);
    console.log(plz);
    
    if(index != -1) {

    }
})

// array of locations
let locations = [];


// Map with coordinates for start view
var map = L.map('map').setView([52.51303, 13.4144269], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// marker for 'Fairteiler'
addToLocations("52.4918007", "13.3917255", "Fairteiler Mehrgenerationenhaus Gneisenaustraße", "Gneisenaustraße", "12", "10961");
addToLocations("52.5418451", "13.3962424", "Fairteiler Olof-Palme-Zentrum", "Demminer Straße", "28", "13355");
addToLocations("52.481132", "13.5226441", "Fairteiler Ikarus Stadtteilzentrum Karlshorst", "Wandlitzstr.", "13", "10318");