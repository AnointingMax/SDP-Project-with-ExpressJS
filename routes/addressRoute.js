const router = require("express").Router();
const {
  verify,
  returnAddress,
  returnAddresses,
} = require("../constants/functions");
const {
  noPermission,
  deleteSuccess,
  createdSuccess,
  updatedSuccess,
} = require("../constants/messages");
const Address = require("../models/Address");
const User = require("../models/User");

// add new address
router.post("/", verify, async (req, res) => {
  try {
    const address = await new Address({
      user: req.user.user._id,
      address: req.body.address,
      city: req.user.user.location,
      landmark: req.body.landmark,
    });
    const savedAddress = await address.save();
    await User.findByIdAndUpdate(
      req.user.user._id,
      {
        $push: { addresses: savedAddress._id },
      },
      { new: true }
    )
      .then(res.status(200).json(createdSuccess))
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
});

// get user addresses
router.get("/", verify, async (req, res) => {
  try {
    await Address.find({ user: req.user.user._id })
      .populate("user", "-_id")
      .then((addresses) => res.status(200).json(returnAddresses(addresses)));
  } catch (error) {
    res.status(500).json(error);
  }
});

// get particular address
router.get("/:id", verify, async (req, res) => {
  try {
    await Address.findById(req.params.id)
      .then((address) => {
        if (address.user.toString() === req.user.user._id) {
          res.status(200).json(returnAddress(address));
        } else {
          res.status(400).json(noPermission);
        }
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
});

// update particular address
router.put("/:id", verify, async (req, res) => {
  try {
    await Address.findById(req.params.id).then((address) => {
      if (address.user.toString() !== req.user.user._id) {
        res.status(400).json(noPermission);
      }
    });
    await Address.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
      .then(res.status(200).json(updatedSuccess))
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete particular address
router.delete("/:id", verify, async (req, res) => {
  try {
    await Address.findById(req.params.id).then((address) => {
      if (address.user.toString() !== req.user.user._id) {
        res.status(400).json(noPermission);
      }
    });
    await Address.findByIdAndDelete(req.params.id)
      .then(res.status(200).json(deleteSuccess))
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
