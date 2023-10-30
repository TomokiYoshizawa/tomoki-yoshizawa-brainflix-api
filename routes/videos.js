const express = require("express");
const router = express.Router();

const fs = require("fs");

router.get("/", (req, res) => {
  const videosJSON = fs.readFileSync("./data/videos.json");
  const videos = JSON.parse(videosJSON);
  res.send(videos);
});

// router.get("/videos", (req, res) => {
//   console.log("videos GET made it to server!");
//   res.send("video GET req is received");
// });

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const videosJSON = fs.readFileSync("./data/videos.json");
  const videos = JSON.parse(videosJSON);

  const foundVideo = videos.find((video) => video.id === Number(id));
  if (foundVideo) {
    res.send(foundVideo);
  } else {
    res.status(400).send("video is not found");
  }
});

router.post("/videos", (req, res) => {
  console.log("videos POST made it to server!");
  res.send("video POST req is received");
});

module.exports = router;
