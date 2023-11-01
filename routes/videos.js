const express = require("express");
const router = express.Router();

const fs = require("fs");

router.get("/", (req, res) => {
  const videosJSON = fs.readFileSync("./data/videos.json");
  const videos = JSON.parse(videosJSON);
  res.send(videos);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(typeof id);
  const videosJSON = fs.readFileSync("./data/videos.json");

  const videos = JSON.parse(videosJSON);
  console.log(typeof videos[0].id);

  const foundVideo = videos.find((video) => video.id === id);
  if (foundVideo) {
    res.send(foundVideo);
  } else {
    res.status(400).send("video is not found");
  }
});

router.post("/", (req, res) => {
  console.log("POST / endopoint is called");
  const videosJSON = fs.readFileSync("./data/videos.json");
  console.log("Data from videos.json:", videosJSON);

  const videos = JSON.parse(videosJSON);
  console.log("Line 5: Parsed videos:", videos);

  const newVideo = req.body;
  console.log("Request body:", req.body);

  // why req.body again?
  videos.push(newVideo);

  const videosString = JSON.stringify(videos);
  fs.writeFileSync("./data/videos.json", videosString);

  // why videosString in the param?
  console.log("videos");
  res.send("video POST req is received");
});

module.exports = router;
