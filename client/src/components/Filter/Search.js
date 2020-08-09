import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import List from "./List/List";

export default function Filter() {
  const search = useParams().search.toLowerCase();

  const all = useSelector((state) => state.allmoviedata);

  const searchData = all ? getSearchData(all, search) : "";

  console.log(searchData);

  return (
    <div className="container">
      {searchData.length > 0 ? (
        <List filter="Search" data={searchData} />
      ) : (
        <h1 className="text-light mt-5 text-center">No Data Found</h1>
      )}
    </div>
  );
}

const getSearchData = (allData, search) => {
  try {
    const filter = allData.filter((list) => {
      const name = list.Name.toLowerCase();

      if (name.indexOf(search) !== -1) {
        return list;
      }
    });

    return filter;
  } catch (err) {
    console.log(err);
  }
};
