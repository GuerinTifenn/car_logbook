const express = require('express');
const mongoose = require('mongoose');
const {password, userName, clusterName, dbName} = require("./conf");
const app = express();
const dbURI = `mongodb+srv://${userName}:${password}@${clusterName}/${dbName}?retryWrites=true&w=majority`
const bodyParser = require ("body-parser");
const userRoutes = require("./routes/user");

mongoose
.connect(dbURI)
.then(() => console.log("Connexion réussie"))
.catch(() => console.log("Connexion échouée"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("GET request")
})

app.use("/api/", userRoutes);

module.exports = app;
