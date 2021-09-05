const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("rating route");
});

module.exports = router;
