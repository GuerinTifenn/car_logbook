const express = require("express");
const mongoose = require("mongoose");
const { password, userName, clusterName, dbName } = require("./conf");
const app = express();
const dbURI = `mongodb+srv://${userName}:${password}@${clusterName}/${dbName}?retryWrites=true&w=majority`;
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const auth = require("./middleware/auth");
const vehicleRoutes = require("./routes/vehicle");
const serviceRoutes = require("./routes/service")
const requestRoutes = require("./routes/request")
const path = require("path");

mongoose
  .connect(dbURI)
  .then(() => console.log("Connexion réussie"))
  .catch(() => console.log("Connexion échouée"));

// Configuration des headers CORS
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
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

// Routes de base
app.get("/", (req, res) => {
  res.send("GET request");
});

app.get("/dashboard", auth, (req, res) => {
  res.status(200).json({ message: "dashboard access" });
});

app.get("/services/:vehicleId", auth, (req, res) => {
  res.status(200).json({ message: "services access" });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Ajout des routes d'API
app.use("/api/", userRoutes);
app.use("/api/", vehicleRoutes);
app.use("/api/", serviceRoutes)
app.use("/api/", requestRoutes)

module.exports = app;
