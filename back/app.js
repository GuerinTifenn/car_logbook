const express = require('express');
const mongoose = require('mongoose');
const {password, userName, clusterName, dbName} = require("./conf");
const app = express();
const dbURI = `mongodb+srv://${userName}:${password}@${clusterName}/?retryWrites=true&w=majority&appName=${dbName}`

mongoose
.connect(dbURI)
.then(() => console.log("Connexion réussie"))
.catch(() => console.log("Connexion échouée"));

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = app;
