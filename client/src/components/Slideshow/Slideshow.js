import React, { useRef, useEffect } from "react";
import Slicker from "react-slick";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./Slideshow.css";

import { settings } from "./settings";

export default function Slideshow(props) {
  const data = props.data;
  const slider = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      slider.current.slickGoTo(0, true);
    }, 100);
  }, []);

  return (
    <div className="container mt-5" data-aos={props.aos}>
      <div>
        <h3 className="mb-3 d-inline">{props.category}</h3>
        <Link to={`/filter/${props.filter}`} className="text-light">
          <h5 className="float-right">More{">>"}</h5>
        </Link>
      </div>

      <Slicker ref={slider} {...settings}>
        {data
          ? data.map((list, i) => (
              <div key={i} className="my-3">
                <Link to={`/download/${list._id}`}>
                  <center>
                    <div className="custom-cards p-3">
                      <div className="slide-show-img card-width">
                        <img
                          alt="img"
                          src={list.Img}
                          className="full-width img-radius"
                        />
                      </div>
                    </div>
                  </center>
                </Link>
              </div>
            ))
          : null}
      </Slicker>
    </div>
  );
}
