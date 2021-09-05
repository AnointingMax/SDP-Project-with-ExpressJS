const router = require("express").Router();
const { verify } = require("../constants/functions");
const { noPermission, updatedSuccess } = require("../constants/messages");
const User = require("../models/User");

// update user account
router.put("/:id", verify, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.id === req.user.user._id) {
      await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      )
        .then(res.status(200).json(updatedSuccess))
        .catch((err) => res.status(400).json(err));
    } else {
      res.status(400).json(noPermission);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
