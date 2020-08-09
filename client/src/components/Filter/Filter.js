import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import List from "./List/List";

export default function Filter() {
  const filter = useParams().type;

  const all = useSelector((state) => state.allmoviedata);
  const series = useSelector((state) => state.series);
  const bollywood = useSelector((state) => state.bollywood);
  const hollywood = useSelector((state) => state.hollywood);

  return (
    <div className="container">
      {filter === "all" ? <List filter={filter} data={all} /> : null}
      {filter === "series" ? (
        <List filter="Series / Neflix" data={series} />
      ) : null}
      {filter === "bollywood" ? (
        <List filter="Bollywood / South (Hindi)" data={bollywood} />
      ) : null}
      {filter === "hollywood" ? (
        <List filter={filter} data={hollywood} />
      ) : null}
    </div>
  );
}
