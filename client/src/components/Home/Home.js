import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import SlideShow from "../Slideshow/Slideshow";

import "./Home.css";

export default function Home() {
  const newMovies = useSelector((state) => state.newmoviedata);
  const bollywood = useSelector((state) => state.bollywood);
  const hollywood = useSelector((state) => state.hollywood);
  const series = useSelector((state) => state.series);

  return (
    <div className="container-fluid p-0 m-0">
      <div className="slider-items text-light">
        <SlideShow
          filter="all"
          aos="fade-up"
          category="New Trending"
          data={newMovies}
        />
        <SlideShow
          filter="series"
          aos="fade-up"
          category="Series"
          data={series ? series.slice(0, 8) : []}
        />
        <SlideShow
          filter="bollywood"
          // aos="fade-up"
          category="Bollywood/Hindi"
          data={bollywood ? bollywood.slice(0, 8) : []}
        />
        <SlideShow
          filter="hollywood"
          // aos="fade-up"
          category="Hollywood"
          data={hollywood ? hollywood.slice(0, 8) : []}
        />
      </div>
    </div>
  );
}
