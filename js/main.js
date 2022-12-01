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
fairteiler3.bindPopup("<b>Fairteiler</b><br>Ikarus Stadtteilzentrum Karlshorst");


function getInfo(){
    var username = document.getElementById("username").value
    var password = document.getElementById("password ").value

   for(i = 0; i < objPeople.length; i++) {
       if(username == objPeople[i].username && password == objPeople[i].password){
           console.log("Hallo " + username)
           return // sobald
       }
   }
   console.log("falsches Passwort")
}