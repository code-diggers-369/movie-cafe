import React from "react";
import { Link } from "react-router-dom";

import "./Page404.css";

export default function Page404() {
  return (
    <div className="text-light center div-border p-5">
      <div className="page-not-found">404</div>
      <div>
        <h2>Page Not Found</h2>

        <h4 className="mt-3">
          Go To
          <Link to="/" className="ml-2">
            Home
          </Link>
        </h4>
      </div>
    </div>
  );
}
