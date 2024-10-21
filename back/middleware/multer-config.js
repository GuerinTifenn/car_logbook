// /back/middleware/multer-config.js
const multer = require("multer");
const path = require("path");

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
      cb(new Error('WRONG_EXTENSION'), false); // Reject the file
  }
}

// Configuration de multer pour accepter un seul fichier
// Limit file size to 5MB
const upload = multer({ storage, fileFilter: fileFilter, limits: { fileSize: 5 * 1024 * 1024}});

// Middleware to handle file uploads and errors
const uploadFile = (req, res, next) => {
  upload.single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ code: 'FILE_TOO_LARGE', message: 'File size should be less than 5MB' });
      }
      return res.status(400).json({ code: 'UPLOAD_ERROR', message: err.message });
    } else if (err) {
      // Handle wrong file extension
      if (err.message === 'WRONG_EXTENSION') {
        return res.status(415).json({ code: 'WRONG_EXTENSION', message: 'Only .png, .jpg, .jpeg, and .pdf formats are allowed!' });
      }
      return res.status(400).json({ code: 'UPLOAD_ERROR', message: 'An unknown error occurred' });
    }
    next();
  });
};

module.exports = uploadFile;
