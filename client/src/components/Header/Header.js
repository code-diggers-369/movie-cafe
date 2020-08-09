import React, { useState } from "react";

import { Link } from "react-router-dom";

import "./Header.css";

export default function Header() {
  const [search, setsearch] = useState("");

  return (
    <nav className="navbar container navbar-expand-lg text-light ">
      <Link className="navbar-brand text-light" to="/">
        Movie Cafe
      </Link>
      <button
        className="navbar-toggler bg-light"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        More
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link text-light" to="/filter/series">
              Series-Netflix
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link text-light " to="/filter/bollywood">
              Bollywood-South
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link text-light " to="/filter/hollywood">
              Hollywood
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link text-light " to="/filter/all">
              All
            </Link>
          </li>
        </ul>

        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
          {search ? (
            <Link to={`/search/${search}`}>
              <button
                className="btn btn-outline-light my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </Link>
          ) : (
            <button
              className="btn btn-outline-light my-2 my-sm-0"
              type="button"
            >
              Search
            </button>
          )}
        </form>
      </div>
    </nav>
  );
}
