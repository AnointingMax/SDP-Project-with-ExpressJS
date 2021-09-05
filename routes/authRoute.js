const router = require("express").Router();
const User = require("../models/User");
const Worker = require("../models/Worker");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { returnPerson } = require("../constants/functions");
const { wrongCredentials, createdSuccess } = require("../constants/messages");

// register new user
router.post("/register/user", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      location: req.body.location,
      email: req.body.email,
      password: hashedpassword,
    });
    await newUser.save().then(res.status(200).json(createdSuccess));
  } catch (err) {
    res.status(500).json(err);
  }
});

// login user
router.post("/login/user", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json(wrongCredentials);

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (validated) {
      // GENERATE TOKEN
      const token = jwt.sign({ user: user }, process.env.JWT_KEY, {
        expiresIn: "3600s",
      });
      res.status(200).json({ user: returnPerson(user), token: token });
    } else {
      res.status(400).json(wrongCredentials);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// register worker
router.post("/register/worker", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    const newWorker = new Worker({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      location: req.body.location,
      job: req.body.job,
      email: req.body.email,
      password: hashedpassword,
    });
    await newWorker.save().then(res.status(200).json(createdSuccess));
  } catch (err) {
    res.status(500).json(err);
  }
});

// login worker
// router.post("/login/worker", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     !user && res.status(400).json(wrongCredentials);

//     const validated = await bcrypt.compare(req.body.password, user.password);
//     if (validated) {
//       // GENERATE TOKEN
//       const token = jwt.sign({ user: user }, process.env.JWT_KEY, {
//         expiresIn: "3600s",
//       });
//       res.status(200).json({ user: returnPerson(user), token: token });
//     } else {
//       res.status(400).json(wrongCredentials);
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
