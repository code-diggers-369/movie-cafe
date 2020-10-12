import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "./List.css";

export default function List(props) {
  const { data, filter } = props;
  const [count, setcount] = useState(8);

  const finalData = data ? data.slice(0, count) : null;

  useEffect(() => {
    document.addEventListener("scroll", trackScrolling);
    return () => {
      document.removeEventListener("scroll", trackScrolling);
    };
  }, []);

  const trackScrolling = async () => {
    const listDiv = document.getElementById("scroll-tracker");

    if (isBottom(listDiv)) {
      setcount((state) => state + 8);
    }
  };

  const isBottom = (element) => {
    return element.getBoundingClientRect().bottom <= window.innerHeight + 2;
  };

  return (
    <div className="text-light" id="scroll-tracker">
      <h1 className="text-center mt-4">{filter.toUpperCase()}</h1>

      <div className="row mt-5 ">
        {finalData
          ? finalData.map((list, i) => (
              <div key={i} className="col-lg-3 col-md-6 col-sm-6">
                <Link to={`/download/${list._id}`} className="text-light">
                  <center>
                    <div className="custom-cards p-3">
                      <div className="slide-show-img my-card ">
                        <img
                          alt="img"
                          src={list.Img}
                          className="full-width img-radius"
                        />
                      </div>
                      <h5 className="mt-2">{list.Name}</h5>
                    </div>
                  </center>
                </Link>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
