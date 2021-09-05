const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

// IMPORT ROUTES
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const addressRoute = require("./routes/addressRoute");
const jobRoute = require("./routes/jobRoute");
const ratingRoute = require("./routes/ratingRoute");
const otherRoute = require("./routes/otherRoute");

const app = express();

// CONFIG
dotenv.config();
const port = process.env.PORT || 3000;

// CONNECT DATABASE
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("MongoDB Database Conncected");
  }
);

// MIDDLEWARE
app.use(morgan("common"));
app.use(express.json());

// ROUTES
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/address", addressRoute);
app.use("/job", jobRoute);
app.use("/rating", ratingRoute);
app.use("/other", otherRoute);

app.listen(port, () => {
  console.log(`App running on localhost:${port}`);
});
