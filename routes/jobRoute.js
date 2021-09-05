const router = require("express").Router();
const Job = require("../models/Job");
const { verify } = require("../constants/functions");
const {
  createdSuccess,
  updatedSuccess,
  noPermission,
} = require("../constants/messages");

// create task
router.post("/createjob", verify, async (req, res) => {
  try {
    const job = await new Job({
      taskee: req.user.user._id,
      address: req.body.address,
      tasker: req.body.tasker,
      date: new Date(req.body.date),
      description: req.body.description,
    });
    await job
      .save()
      .then(res.status(200).json(createdSuccess))
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
});

// get jobs by user
router.get("/", verify, async (req, res) => {
  try {
    await Job.find({ taskee: req.user.user._id })
      .populate("taskee tasker address", "-__v -password")
      .then((jobs) => res.status(200).json(jobs))
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
});

// get job info
router.get("/:id", verify, async (req, res) => {
  try {
    await Job.findById(req.params.id)
      .populate("taskee tasker address", "-__v -password")
      .then((job) => {
        if (job.taskee._id.toString() === req.user.user._id.toString()) {
          res.status(200).json(job);
        } else {
          res.status(400).json(noPermission);
        }
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
});

// update particular job
router.put("/:id", verify, async (req, res) => {
  await Job.findById(req.params.id).then((job) => {
    if (job.taskee._id.toString() !== req.user.user._id.toString()) {
      res.status(400).json(noPermission);
    }
  });
  await Job.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(res.status(200).json(updatedSuccess))
    .catch((err) => res.status(400).json(err));
});

// delete particular job
router.delete("/:id", verify, async (req, res) => {
  try {
    await Job.findById(req.params.id).then((job) => {
      if (job.taskee._id.toString() !== req.user.user._id.toString()) {
        res.status(400).json(noPermission);
      }
    });
    await Job.findByIdAndDelete(req.params.id)
      .then(res.status(200).json(deleteSuccess))
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
