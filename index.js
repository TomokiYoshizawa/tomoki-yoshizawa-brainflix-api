const express = require("express");
const app = express();
const cors = require("cors");

const videosRoute = require("./routes/videos");

const PORT = 8083;

app.use(express.json());
app.use(cors());

app.use("/videos", videosRoute);

// app.get("/", (req, res) => {
//   res.send("welcome to tomoki's server");
// });
app.listen(PORT, () => {
  console.log(`Express server running at port ${PORT}`);
});
