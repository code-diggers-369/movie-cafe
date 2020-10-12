const mongoose = require("mongoose");

const MovieDataSchema = mongoose.Schema({
  Name: {
    required: true,
    type: String,
  },
  Img: {
    required: true,
    type: String,
  },
  Year: {
    required: true,
    type: Number,
  },
  Language: {
    required: true,
    type: String,
  },
  Quality: {
    required: true,
    type: String,
  },
  ScreenShots: {
    required: true,
    type: Array,
  },
  Trailer: {
    required: true,
    type: String,
  },
  DownloadLink: {
    required: true,
    type: Array,
  },
  OnlineWatch: {
    required: true,
    type: String,
  },
  Wood: {
    required: true,
    type: String,
  },
  TimeStamp: {
    required: true,
    type: String,
  },
  SeriesList: {
    type: Array,
  },
});

module.exports = mongoose.model("MovieData", MovieDataSchema);
