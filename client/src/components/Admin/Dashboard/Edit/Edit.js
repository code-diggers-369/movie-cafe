import React, { useState } from "react";
import Axios from "axios";
import { StatusAlertService } from "react-status-alert";

export default function Edit({ data }) {
  const [screenShotList, setscreenShotList] = useState(data.ScreenShots);
  const [screenshot, setscreenshot] = useState("");

  const [downloadLinkList, setdownloadLinkList] = useState(
    data.DownloadLink ? data.DownloadLink : null
  );
  const [episodDownloadLinkList, setEpisodDownloadLinkList] = useState(
    data.SeriesList ? data.SeriesList : null
  );

  const [downloadLink, setdownloadLink] = useState("");
  const [quality, setquality] = useState("480p");
  const [episodDownloadLink, setEpisodDownloadLink] = useState("");

  // main data

  const [name, setname] = useState(data.Name);
  const [year, setyear] = useState(data.Year);

  const [language, setlanguage] = useState(data.Language);
  const [wood, setwood] = useState(data.Wood);
  const [season, setSeason] = useState(1);
  const [episod, setEpisod] = useState(1);

  const [thumblainImg, setthumblainImg] = useState(data.Img);
  const [trailerUrl, settrailerUrl] = useState(data.Trailer);

  const [movieQuality, setmovieQuality] = useState(data.Quality);
  const [onlineWatchingUrl, setonlineWatchingUrl] = useState(data.OnlineWatch);

  console.log(data.Timestamp);
  const [timestamp, settimestamp] = useState(data.TimeStamp);
  const [uid, setuid] = useState(data._id);

  const addToList = (type) => {
    if (type === "screen-shot") {
      screenShotList.push(screenshot);
      setscreenshot("");
    } else if (type === "download-link") {
      downloadLinkList.push({
        Quality: quality,
        Url: downloadLink,
      });

      setdownloadLink("");
    } else if (type === "episod-link") {
      episodDownloadLinkList.push({
        Quality: quality,
        Url: episodDownloadLink,
        Episod: episod,
        Season: parseInt(season),
      });

      setEpisodDownloadLink("");
    }
  };

  const removeFromList = (type, index) => {
    if (type === "screen-shot") {
      const listFilter = screenShotList.filter((list, i) => {
        if (index !== i) {
          return list;
        }
      });
      setscreenShotList(listFilter);
    } else if (type === "download-link") {
      const listFilter = downloadLinkList.filter((list, i) => {
        if (index !== i) {
          return list;
        }
      });
      setdownloadLinkList(listFilter);
    } else if (type === "episod-link") {
      const listFilter = episodDownloadLinkList.filter((list, i) => {
        if (index !== i) {
          return list;
        }
      });
      setEpisodDownloadLinkList(listFilter);
    }
  };

  const deleteData = async () => {
    try {
      const confirm = window.confirm("Are You Sure To Delete?");

      if (!confirm) {
        return;
      }

      const res = await Axios.delete(`/movie_data/delete/${uid}`);
      if (res.data.msg) {
        await StatusAlertService.showError("Something Want Wrong");
      } else {
        await StatusAlertService.showSuccess("delete Successfully");
        var time = setTimeout(() => {
          window.location.reload();
          clearTimeout(time);
        }, 2000);
      }
    } catch (err) {
      await StatusAlertService.showError(err);
    }
  };

  const updateData = async () => {
    try {
      if (
        name &&
        year &&
        language &&
        wood &&
        thumblainImg &&
        trailerUrl &&
        movieQuality &&
        onlineWatchingUrl &&
        screenShotList.length > 0
      ) {
        const secret = localStorage.getItem("Site_New_Tokken");

        const res = await Axios.post("/movie_data/update", {
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
        });

        console.log(res.data);

        if (res.data.msg) {
          await StatusAlertService.showError("Something Want Wrong");
          console.log(res.data);
        } else {
          await StatusAlertService.showSuccess("Successfully Updated");

          var time = setTimeout(() => {
            window.location.reload();
            clearTimeout(time);
          }, 2000);
        }
      } else {
        await StatusAlertService.showError("Please Enter All Data");
      }
    } catch (err) {
      await StatusAlertService.showError(err);
    }
  };

  return (
    <div className="mt-5 container text-center">
      <h1>Edit</h1>
      <hr className="bg-light mb-5" />
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group ">
          <h4>Name</h4>

          <input
            type="text"
            className="form-control mr-1"
            aria-describedby="emailHelp"
            placeholder="Movie Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />

          <h4 className="mt-5">Year</h4>
          <input
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Year"
            value={year}
            onChange={(e) => setyear(e.target.value)}
          />
        </div>
        <div className="form-group d-flex mt-5">
          <select
            value={language}
            onChange={(e) => setlanguage(e.target.value)}
            className="browser-default custom-select mr-1"
          >
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Hindi/English">Hindi & English</option>
          </select>

          <select
            value={wood}
            onChange={(e) => setwood(e.target.value)}
            className="browser-default custom-select"
          >
            <option value="Bollywood">Bollywood</option>
            <option value="Hollywood">Hollywood</option>
            <option value="Series">Series</option>
          </select>
        </div>

        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/* season wise */}
        {wood && wood === "Series" ? (
          <div className="list-input mt-5">
            <div className="mt-5 text-center custom-list p-2">
              <h4>Season Wise</h4>
              <hr className="bg-light" />
              {/*  */}
              <div className="form-group">
                <h4>Season Number</h4>

                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Season Number"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                />
              </div>
              <br />
              <div className=" mb-4">
                <div className="d-flex">
                  <input
                    className="form-control mr-1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Episod  Number"
                    value={episod}
                    onChange={(e) => setEpisod(e.target.value)}
                  />

                  <input
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Episod Download Links"
                    value={episodDownloadLink}
                    onChange={(e) => setEpisodDownloadLink(e.target.value)}
                  />

                  <select
                    value={quality}
                    onChange={(e) => setquality(e.target.value)}
                    className="browser-default custom-select ml-3"
                  >
                    <option disabled>Quality</option>
                    <option>480p</option>
                    <option>720p</option>
                    <option>1080p</option>
                  </select>
                </div>

                <button
                  onClick={() => addToList("episod-link")}
                  className="btn btn-block btn-outline-light mt-3"
                  type="button"
                >
                  Add
                </button>
              </div>

              {episodDownloadLinkList.length > 0 ? (
                <ol>
                  {episodDownloadLinkList.map((list, i) => (
                    <li className="mt-2" key={i}>
                      Quality - {list.Quality} : Url - {list.Url} : Episod -{" "}
                      {list.Episod} : Season - {list.Season}
                      <button
                        onClick={() => removeFromList("episod-link", i)}
                        className="btn btn-outline-light ml-2"
                        type="button"
                      >
                        DEL
                      </button>
                    </li>
                  ))}
                </ol>
              ) : (
                <h6>No Links</h6>
              )}
            </div>
          </div>
        ) : null}
        {/*  */}

        <div className="form-group ">
          <h4 className="mt-5">Thumbnail</h4>
          <input
            className="form-control mr-1"
            aria-describedby="emailHelp"
            placeholder="Enter Url Of Thumblain Img"
            value={thumblainImg}
            onChange={(e) => setthumblainImg(e.target.value)}
          />

          <h4 className="mt-5">Trailer Url</h4>
          <input
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Url Of Trailer"
            value={trailerUrl}
            onChange={(e) => settrailerUrl(e.target.value)}
          />
        </div>

        <div className="form-group ">
          <h4 className="mt-5">Quality</h4>
          <input
            className="form-control mr-1"
            aria-describedby="emailHelp"
            placeholder="Enter Quality"
            value={movieQuality}
            onChange={(e) => setmovieQuality(e.target.value)}
          />

          <h4 className="mt-5">Online Watching Url</h4>
          <input
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Url Of Online Watching"
            value={onlineWatchingUrl}
            onChange={(e) => setonlineWatchingUrl(e.target.value)}
          />
        </div>

        <h4 className="mt-5">Timestamp</h4>

        <input
          className="form-control"
          aria-describedby="emailHelp"
          placeholder="Timestamp"
          value={timestamp}
          onChange={(e) => settimestamp(e.target.value)}
        />

        <div className="list-input mt-5">
          <div className="mt-5 text-center custom-list p-2">
            <h4>Screenshots</h4>
            <hr className="bg-light" />

            <div className="mb-4">
              <input
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Screenshots Links"
                value={screenshot}
                onChange={(e) => setscreenshot(e.target.value)}
                onKeyUp={(e) => {
                  if (e.keyCode === 13) {
                    addToList("screen-shot");
                  }
                }}
              />

              <button
                onClick={() => addToList("screen-shot")}
                className="btn mt-3 btn-block btn-outline-light "
                type="button"
              >
                Add
              </button>
            </div>

            {screenShotList.length > 0 ? (
              <ol>
                {screenShotList.map((list, i) => (
                  <li className="mt-2" key={i}>
                    {list}
                    <button
                      onClick={() => removeFromList("screen-shot", i)}
                      className="btn btn-outline-light ml-2"
                      type="button"
                    >
                      DEL
                    </button>
                  </li>
                ))}
              </ol>
            ) : (
              <h6>No Screenshots</h6>
            )}
          </div>
        </div>

        {/* download links */}

        {wood && wood !== "Series" ? (
          <div className="list-input mt-5">
            <div className="mt-5 text-center custom-list p-2">
              <h4>Download Links</h4>
              <hr className="bg-light" />

              <div className=" mb-4">
                <div className="d-flex">
                  <input
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Download Links"
                    value={downloadLink}
                    onChange={(e) => setdownloadLink(e.target.value)}
                    onKeyUp={(e) => {
                      if (e.keyCode === 13) {
                        addToList("download-link");
                      }
                    }}
                  />

                  <select
                    value={quality}
                    onChange={(e) => setquality(e.target.value)}
                    className="browser-default custom-select ml-3"
                  >
                    <option disabled>Quality</option>
                    <option>480p</option>
                    <option>720p</option>
                    <option>1080p</option>
                  </select>
                </div>

                <button
                  onClick={() => addToList("download-link")}
                  className="btn btn-block btn-outline-light mt-3"
                  type="button"
                >
                  Add
                </button>
              </div>

              {downloadLinkList.length > 0 ? (
                <ol>
                  {downloadLinkList.map((list, i) => (
                    <li className="mt-2" key={i}>
                      Quality - {list.Quality} : Url - {list.Url}
                      <button
                        onClick={() => removeFromList("download-link", i)}
                        className="btn btn-outline-light ml-2"
                        type="button"
                      >
                        DEL
                      </button>
                    </li>
                  ))}
                </ol>
              ) : (
                <h6>No Download Links</h6>
              )}
            </div>
          </div>
        ) : null}
      </form>

      <button
        onClick={() => deleteData()}
        className="btn my-5 btn-block btn-outline-light"
      >
        Delete
      </button>

      <button
        onClick={() => updateData()}
        className="btn my-5 btn-block btn-outline-light"
      >
        Submit
      </button>
    </div>
  );
}
