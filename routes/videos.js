const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");

router.get("/", (req, res) => {
  const videosJSON = fs.readFileSync("./data/videos.json");
  const videos = JSON.parse(videosJSON);
  res.send(videos);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  // console.log(typeof id);
  const videosJSON = fs.readFileSync("./data/videos.json");

  const videos = JSON.parse(videosJSON);
  // console.log(typeof videos[0].id);

  const foundVideo = videos.find((video) => video.id === id);
  if (foundVideo) {
    res.send(foundVideo);
  } else {
    res.status(400).send("video is not found");
  }
});

router.post("/", (req, res) => {
  const videosJSON = fs.readFileSync("./data/videos.json");

  const videos = JSON.parse(videosJSON);

  const newVideo = {
    id: uuidv4(),
    title: req.body.title,
    channel: "Tomoki Smokes",
    description: req.body.description,
    image: "default.jpeg",
    views: "3,092,284",
    likes: "75,985",
    duration: "4:20",
    timestamp: 1632344461000,
    commnets: [],
  };
  console.log(newVideo);

  // why req.body again?
  videos.push(newVideo);

  const videosString = JSON.stringify(videos);
  fs.writeFileSync("./data/videos.json", videosString);

  // why videosString in the param?

  res.send("video POST req is received");
});

module.exports = router;
