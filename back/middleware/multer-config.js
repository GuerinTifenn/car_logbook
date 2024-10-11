// /back/middleware/multer-config.js
const multer = require("multer");
const path = require("path");

// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../uploads")); // Dossier de destination des fichiers
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = path.extname(file.originalname);
    callback(null, name + Date.now() + extension); // Nom unique pour chaque fichier
  }
});

// Configuration de multer pour accepter un seul fichier
const upload = multer({ storage: storage });

module.exports = upload;
