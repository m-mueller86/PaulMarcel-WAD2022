var express = require('express');
var path = require("path");
var bodyParser = require("body-parser");
var ObjectId = require('mongodb').ObjectId;

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/users', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    MongoClient.connect(url, (err, client) => {
        if (err) throw err;

        const db = client.db('susLocDB');
        db.collection('users').findOne({ userId: username }, (err, result) => {
            if (err) throw err;

            if (result !== null && password === result.password) {
                // login successful
                delete result.password;
                res.status(200).send(result);
            } else {
                // login failed
                res.status(401).end();
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
                    res.status(201).json({ location: "/susLocs/" + result.insertedId });
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

app.put("/susLocs/:id", function (req, res) {
    let query = { _id: new ObjectId(req.body.id) }

    let replacement = {
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
            db.collection("locations").replaceOne(query, replacement,
                function (err, result) {
                    if (err) throw err;
                    if (result.matchedCount === 0) {
                        res.status(404).send();
                    } else {
                        res.status(204).send();
                    }
                    client.close()
                });
        });
});

module.exports = app;