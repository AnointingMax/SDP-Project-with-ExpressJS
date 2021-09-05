const router = require("express").Router();
const Worker = require("../models/Worker");
const { returnWorkers, verify } = require("../constants/functions");

// get workers by job
router.post("/getworkersbyjob", verify, async (req, res) => {
  try {
    await Worker.find({ job: req.body.job, location: req.user.user.location })
      .then((workerList) => res.status(200).json(returnWorkers(workerList)))
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
