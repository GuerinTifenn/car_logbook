const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.signup = (req, res, next) => {
  User.findOne({email: req.body.email})
    .then((existingUser) => {
  if (existingUser) {
    return res.status(400).json({
      error :{message: "Email is already in use", code: "email in use"},
    })
  }
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      last_name: req.body.last_name,
      first_name: req.body.first_name,
      email: req.body.email,
      password: hash
    });
    user.save()
      .then(() => res.status(201).json({ message: 'User created !' }))
      .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
})
};
