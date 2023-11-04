const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const videosRoute = require("./routes/videos");

const { PORT } = process.env;

app.use(express.json());
app.use(cors());
app.use(express.static("public/images"));

app.use("/videos", videosRoute);

app.listen(PORT, () => {
  console.log(`Express server running at port ${PORT}`);
});
