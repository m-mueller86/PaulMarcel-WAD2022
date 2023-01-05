var express = require('express');
var path = require("path");
var bodyParser = require("body-parser");

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

app.post("/users", function(req, res) {

    let username = req.body.username;
    let password = req.body.password;

    MongoClient.connect(url,
        function (err, client) {
            if (err) throw err;
            let db = client.db("susLocDB");
            db.collection("users").findOne({userId: username},
                function(err, result) {
                    if (err) throw err;
                    if (result && password === result.password) {
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

module.exports = app;