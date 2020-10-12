const Router = require("express").Router();

const MovieData = require("../models/MovieData");

Router.post("/add", async (req, res) => {
  try {
    const {
      secret,
      name,
      year,
      language,
      wood,
      thumblainImg,
      trailerUrl,
      movieQuality,
      onlineWatchingUrl,
      screenShotList,
      downloadLinkList,
      timestamp,
      episodDownloadLinkList,
    } = req.body;

    if (secret === process.env.SECRET_CODE) {
      const data = new MovieData({
        Name: name,
        Img: thumblainImg,
        Year: year,
        Language: language,
        Quality: movieQuality,
        ScreenShots: screenShotList,
        Trailer: trailerUrl,
        DownloadLink: downloadLinkList,
        OnlineWatch: onlineWatchingUrl,
        TimeStamp: timestamp,
        Wood: wood,
        SeriesList: wood === "Series" ? episodDownloadLinkList : null,
      });
      data.save();
      res.json(data);
    } else {
      res.json({ msg: "Secret Code Not Match" });
    }
  } catch (err) {
    res.json({ msg: err });
  }
});

Router.post("/update", async (req, res) => {
  try {
    const {
      uid,
      secret,
      name,
      year,
      language,
      wood,
      thumblainImg,
      trailerUrl,
      movieQuality,
      onlineWatchingUrl,
      screenShotList,
      downloadLinkList,
      timestamp,
      episodDownloadLinkList,
    } = req.body;

    if (secret === process.env.SECRET_CODE) {
      const data = await MovieData.updateOne(
        { _id: uid },
        {
          $set: {
            Name: name,
            Img: thumblainImg,
            Year: year,
            Language: language,
            Quality: movieQuality,
            ScreenShots: screenShotList,
            Trailer: trailerUrl,
            DownloadLink: downloadLinkList,
            OnlineWatch: onlineWatchingUrl,
            TimeStamp: timestamp,
            Wood: wood,
            SeriesList: wood === "Series" ? episodDownloadLinkList : null,
          },
        }
      );

      res.json(data);
    } else {
      res.json({ msg: "Secret Code Not Match" });
    }
  } catch (err) {
    res.json({ msg: err });
  }
});

Router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const data = await MovieData.deleteOne({ _id: id });
    res.json(data);
  } catch (err) {
    res.json({ msg: err });
  }
});

Router.post("/fetch", async (req, res) => {
  try {
    const data = await MovieData.find();

    res.json(data);
  } catch (err) {
    res.json({ msg: err });
  }
});

Router.post("/fetch/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const data = await MovieData.find({ _id: id });

    res.json(data);
  } catch (err) {
    res.json({ msg: err });
  }
});

module.exports = Router;
