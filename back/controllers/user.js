const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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
            is_admin: req.body.is_admin,
            vehicles: []
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

              res.cookie('token', token, {

                secure: true,
                sameSite: 'None',
                path: '/',
                maxAge: 24 * 60 * 60 * 1000, // 24 hours
              });

              // Return the token to the frontend along with a success message
              res.status(201).json({
                message: "User created successfully!",
                token: token, // Send the token back
                userId: user._id,
                userAdmin: user.is_admin
              });
            })
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.signin = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((existingUser) => {
      if (!existingUser) {
        return res.status(401).json({
          error: { message: "User not found", code: "user not found" },
        });
      }
      bcrypt
        .compare(req.body.password, existingUser.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: { message: "Wrong password", code: "wrong password" },
            });
          }
          const token = jwt.sign(
            { userId: existingUser._id, email: existingUser.email },
            "RANDOM_SECRET_TOKEN", // Use a secure secret key for signing the token
            { expiresIn: "24h" }, // Set the token to expire in 24 hours
          );

          res.cookie('token', token, {

            secure: true,
            sameSite: 'None',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
          });

          res.status(200).json({
            userId: existingUser._id,
            token: token,
            userAdmin: existingUser.is_admin
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  };

// Fonction de déconnexion (logout)
exports.logout = (req, res, next) => {

  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    path: '/',
  });
  res.status(200).json({ message: "Logged out successfully!" });
};

// Fetch user profile informations
exports.getUserProfileById = async (req, res, next) => {
  try {
    const userId  = req.auth.userId;
     // Validate the userId format
     if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Find the user by ID
    const userInformations = await User.findById(userId);
    if (!userInformations) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user information
    res.status(200).json(userInformations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
