window.onload = initialSetup;

const loginForm = document.getElementById("login-form");
const logoutButton = document.getElementById("logout-button");
const addForm = document.getElementById("add-form");
const addButton = document.getElementById("add-button");
const cancelAdd = document.getElementById("cancel-add");
const cancelUpdate = document.getElementById("cancel-update");
const addLocation = document.getElementById("add-location");
const deleteLocation = document.getElementById("update-delete-form");
const updateLocation = document.getElementById("update-delete-form");
const impressum = document.getElementById("impressum");
const back = document.getElementById("back");

var map = L.map('map');
var markers = L.layerGroup();

function initialSetup() {
    document.getElementById("impressum-page").style.display = "none";
    document.getElementById("mainpage").style.display = "none";
    document.getElementById("add").style.display = "none";
    document.getElementById("updateDelete").style.display = "none";

    fetch("/susLocs")
        .then(res => res.json())
        .then(data => {
            data.forEach(location => {
                location.marker = L.marker([location.lat, location.lon])
                addToMap(location);
            })
        });
    addEventListenerToLocationsElements();
}

function initializeMap() {
    // Map with coordinates for start view
    map.setView([52.51303, 13.4144269], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

}

function loginAsAdmina() {
    document.getElementById("mainpage").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("add-button").style.display = "block";
    document.getElementById("welcome-message").innerText = `Welcome back ${loginForm.username.value}`;
    document.getElementById("update").style.display = "block";
    document.getElementById("delete").style.display = "block";
    document.getElementById("locationId").style.display = "block";

    initializeMap();
}

function loginAsGuest() {
    document.getElementById("mainpage").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("add-button").style.display = "none";
    document.getElementById("welcome-message").innerText = `Welcome back ${loginForm.username.value}`;
    document.getElementById("update").style.display = "none";
    document.getElementById("delete").style.display = "none";
    document.getElementById("locationId").style.display = "none";

    initializeMap();
}

function refreshMap() {

    markers.clearLayers();
    document.getElementById("location-list").innerHTML = "";

    fetch("/susLocs")
        .then(res => res.json())
        .then(data => {
            data.forEach(location => {
                location.marker = L.marker([location.lat, location.lon])
                addToMap(location);
            })
        });
}

async function getLongitudeLatitude(locationName, locationNumber, locationAddress, locationPostcode) {
    const url = "http://nominatim.openstreetmap.org/search?street=" + locationNumber + "+" + locationAddress +
        "&postalcode=" + locationPostcode + "&format=json";

    let response = await fetch(url);
    let result = await response.json();

    if (result.length === 0) {
        alert("invalid address!");
    } else {

        let location = {
            lat: result[0]["lat"],
            lon: result[0]["lon"],
            name: locationName,
            address: locationAddress,
            number: locationNumber,
            postcode: locationPostcode
        }

        return location;
    }
}

function addToMap(location) {
    markers.addLayer(location.marker).addTo(map);
    document.getElementById("location-list").innerHTML += `<li id="${location.name}">` + location.name + "</li><br>";
    location.marker.bindPopup(location.name);
    setTimeout(addEventListenerToLocationsElements, 300);
}

function addEventListenerToLocationsElements() {

    fetch("/susLocs")
        .then(res => res.json())
        .then(data => data.forEach(location => {
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
                document.getElementById("locationId").innerHTML = `<input type="text" value="${location._id}" name="locationId" required>` +
                    "<label>ID</label>"
            });
        }));
}

loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const prePayload = new FormData(loginForm);
    const payload = new URLSearchParams(prePayload);

    fetch("/users", {
        method: "POST",
        body: payload,
    })
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                alert("Incorrect username or password!");
                loginForm.username.value = "";
                loginForm.password.value = "";
            }
        })
        .then(data => {
            if (data !== undefined && data.isAdmin === "true") {
                loginAsAdmina();
            } else if (data !== undefined && data.isAdmin === "false") {
                loginAsGuest();
            }
        })
        .catch(err => console.log(err));

});

logoutButton.addEventListener("click", (e) => {
    document.getElementById("mainpage").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("password-field").value = "";
    document.getElementById("username-field").value = "";
});

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

    getLongitudeLatitude(name, number, address, postcode)
        .then(data => {
            data.marker = L.marker([data.lat, data.lon])
            addToMap(data);
            delete data.marker;
            let payload = new URLSearchParams(data);
            fetch("susLocs", {
                method: "POST",
                body: payload
            }).then(res => {
                if (res.status === 201) {
                    document.getElementById("add").style.display = "none";
                    document.getElementById("mainpage").style.display = "block";
                }
            })
        });

});

cancelUpdate.addEventListener("click", (e) => {
    document.getElementById("updateDelete").style.display = "none";
    document.getElementById("mainpage").style.display = "block";
});

deleteLocation.addEventListener("reset", (e) => {

    const id = {
        id: deleteLocation.locationId.value
    }

    fetch("/susLocs/" + id, {
        method: "DELETE",
        body: new URLSearchParams(id)
    })
        .then(res => {
            if (res.status === 204) {
                setTimeout(refreshMap, 100);

                document.getElementById("mainpage").style.display = "block";
                document.getElementById("updateDelete").style.display = "none";
            } else if (res.status === 404) {
                alert("Invalid ID!");
            }
        })
});

updateLocation.addEventListener("submit", (e) => {

    e.preventDefault();

    const name = updateLocation.name.value;
    const address = updateLocation.street.value;
    const number = updateLocation.housenumber.value;
    const postcode = updateLocation.postcode.value;
    const id = updateLocation.locationId.value;

    getLongitudeLatitude(name, number, address, postcode)
        .then(data => {
            data.id = id;
            let payload = new URLSearchParams(data);
            fetch("susLocs/" + id, {
                method: "PUT",
                body: payload
            })
                .then(res => {
                    if (res.status === 204) {
                        data.marker = L.marker([data.lat, data.lon])
                        addToMap(data);
                        delete data.marker;
                        document.getElementById("mainpage").style.display = "block";
                        document.getElementById("updateDelete").style.display = "none";
                        setTimeout(refreshMap, 200);
                    } else if (res.status === 404) {
                        alert("Invalid ID!")
                    }
                })
        });
})

impressum.addEventListener("click", (e) => {
    document.getElementById("mainpage").style.display = "none";
    document.getElementById("add").style.display = "none";
    document.getElementById("updateDelete").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("impressum-page").style.display = "block";
})

back.addEventListener("click", (e) => {
    document.getElementById("impressum-page").style.display = "none";
    document.getElementById("login").style.display = "block";
})
