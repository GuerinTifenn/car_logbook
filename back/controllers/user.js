const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({
          error: { message: "Email is already in use", code: "email in use" },
        });
      }
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const user = new User({
            last_name: req.body.last_name,
            first_name: req.body.first_name,
            email: req.body.email,
            password: hash,
          });
          user
            .save()
            .then(() => {
              // Create a JWT token
              const token = jwt.sign(
                { userId: user._id, email: user.email },
                "RANDOM_SECRET_TOKEN", // Use a secure secret key for signing the token
                { expiresIn: "24h" }, // Set the token to expire in 24 hours
              );

              // Return the token to the frontend along with a success message
              res.status(201).json({
                message: "User created successfully!",
                token: token, // Send the token back
                userId: user._id,
              });
            })
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
