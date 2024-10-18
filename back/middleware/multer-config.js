// /back/middleware/multer-config.js
const multer = require("multer");
const path = require("path");

const MIME_TYPES = {
  'uploads/jpg': 'jpg',
  'uploads/jpeg': 'jpeg',
  'uploads/png': 'png',
  'uploads/pdf': 'pdf'
}

// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads'); // Dossier de destination des fichiers
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    callback(null, Date.now() + '.' + name); // Nom unique pour chaque fichier
  }
});

const fileFilter = ( req, file, cb ) => {
  const fileTypes = /jpeg|jpg|png|pdf/
  // Check file extension
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  // Check MIME type
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
      return cb(null, true); // Accept the file
  } else {
      cb(new Error('Only .png, .jpg, .jpeg, and .pdf formats are allowed!'), false); // Reject the file
  }
}

// Configuration de multer pour accepter un seul fichier
// Limit file size to 5MB
const upload = multer({ storage, fileFilter: fileFilter, limits: { fileSize: 5 * 1024 * 1024}}).single('file');

module.exports = upload;
