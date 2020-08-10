import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

import "./DownloadPage.css";

export default function DownloadPage() {
  const id = useParams().id;

  const [data, setdata] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dt = await (await Axios.post(`/movie_data/fetch/${id}`)).data;

        await setdata(dt[0]);
        document.title = dt[0].Name;
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    return () => {
      document.title = "Movie Cafe";
    };
  }, []);

  const size = data ? data.Quality.split("|") : [];

  return (
    <div className="div-border container text-light my-5 text-center">
      {data ? (
        <div>
          <div className="div-border mt-3">
            <h1>{data.Name}</h1>
          </div>

          <div className="row my-5">
            <div className="col-lg-6">
              <img
                src={data.Img}
                alt="poster"
                className="poster-img img-radius div-border"
              />
            </div>
            <div className="col-lg-6 div-center ">
              <h5>Language: {data.Language}</h5>
              <h5 className="mt-2">Resolution: {data.Quality}</h5>
              <h5 className="mt-2">Release Year: {data.Year}</h5>
              <h5 className="mt-2">Category: {data.Wood}</h5>
            </div>
          </div>

          <div className="screen-shots mb-5">
            <h2 className="mb-2">Scenes (Must See Before Downloading) </h2>

            {data.ScreenShots.map((list, i) => (
              <div className="my-4" key={i}>
                <img className="ss-img" src={list} alt="ss" />
              </div>
            ))}
          </div>

          <div className="trailer mb-5">
            <h2 className="mb-2">Trailer On Youtube</h2>

            <center>
              <div className="iframe-container">
                <iframe
                  width="560"
                  height="315"
                  src={data.Trailer}
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowFullScreen={true}
                ></iframe>
              </div>
            </center>
          </div>

          <div className="download-links div-border p-5">
            <div className=" mb-4">
              <h2>Download Links</h2>
            </div>

            {data.DownloadLink.map((list, i) => (
              <a
                key={i}
                href={list.Url}
                target="_blank"
                className="btn btn-block btn-light"
              >
                {list.Quality}
              </a>
            ))}
          </div>

          {data.OnlineWatch !== "null" ? (
            <div className="online-watching mt-5 div-border p-5">
              <div className=" mb-5">
                <h2>Online Watching</h2>
              </div>

              <a
                href={data.OnlineWatch}
                target="_blank"
                className="btn btn-block btn-light"
              >
                Watch Online
              </a>
            </div>
          ) : null}

          <h4 className="my-5 div-border p-2">Thank You For Your Support</h4>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
