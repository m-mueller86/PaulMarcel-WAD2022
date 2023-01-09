var express = require('express');
var path = require("path");
var bodyParser = require("body-parser");

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

app.post("/users", function (req, res) {

    let username = req.body.username;
    let password = req.body.password;

    MongoClient.connect(url,
        function (err, client) {
            if (err) throw err;
            let db = client.db("susLocDB");
            db.collection("users").findOne({ userId: username },
                function (err, result) {
                    if (err) throw err;
                    if (result !== null && password === result.password) {
                        delete result.password;
                        res.status(200).send(result);
                    } else {
                        res.status(401);
                        res.end();
                    }
                    client.close();
                });
        });
});

app.post("/susLocs", function (req, res) {

    let location = {
        lat: req.body.lat,
        lon: req.body.lon,
        name: req.body.name,
        address: req.body.address,
        number: req.body.number,
        postcode: req.body.postcode,
    }

    MongoClient.connect(url,
        function (err, client) {
            if (err) throw err;
            let db = client.db("susLocDB");
            db.collection("locations").insertOne(location,
                function (err, result) {
                    if (err) throw err;
                    res.status(201).send("Location: /susLocs/" + result.insertedId);
                    client.close();
                });

        });
});

app.get("/susLocs", function (req, res) {
    MongoClient.connect(url,
        function (err, client) {
            if (err) throw err;
            let db = client.db("susLocDB");
            db.collection("locations").find({}).toArray(
                function (err, result) {
                    if (err) throw err;
                    res.status(200).send(result);
                    client.close();
                });
        });
});

app.delete("/susLocs/:id", function (req, res) {
    MongoClient.connect(url,
        function (err, client) {
            if (err) throw err;
            let db = client.db("susLocDB");
            db.collection("locations").deleteOne({ _id: new ObjectId(req.body.id) },
                function (err, result) {
                    if (err) throw err;
                    if (result.deletedCount === 1) {
                        res.status(204).send();
                    } else {
                        res.status(404).send();
                    }
                    client.close();
                });
        });
});

module.exports = app;