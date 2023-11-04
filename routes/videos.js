const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");
// to get a video list
router.get("/", (req, res) => {
  const videosJSON = fs.readFileSync("./data/videos.json");
  const videos = JSON.parse(videosJSON);
  const videoList = videos.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: `http://localhost:8083/${video.image}`,
    };
  });
  res.send(videoList);

  console.log(videoList);
});

// to get a sinlge video

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

// to post a single video
router.post("/", (req, res) => {
  const videosJSON = fs.readFileSync("./data/videos.json");

  const videos = JSON.parse(videosJSON);

  const newVideo = {
    id: uuidv4(),
    title: req.body.title,
    channel: "Tomoki Smokes",
    description: req.body.description,
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
