import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";

import Add from "./Add/Add";
import Edit from "./Edit/Edit";

import "./Dashboard.css";

export default function Dashboard() {
  const history = useHistory();
  var allMovieData = useSelector((state) => state.allmoviedata);

  const [movieData, setmovieData] = useState("");
  const [isSearch, setisSearch] = useState(false);

  const [isNewAdding, setisNewAdding] = useState(false);
  const [isEdit, setisEdit] = useState(false);

  const [dataObj, setdataObj] = useState("");

  useEffect(() => {
    const checkAdmin = async () => {
      const secret = localStorage.getItem("Site_New_Tokken");

      setTimeout(async () => {
        if (secret) {
          const res = await Axios.post("/admin/check", { secret: secret });

          if (res.data) {
            await history.push("/A_D_M_I_N/Dashboard");
          } else {
            localStorage.removeItem("Site_New_Tokken");
            history.push("/A_D_M_I_N");
          }
        } else {
          history.push("/A_D_M_I_N");
        }
      }, 1000);
    };
    checkAdmin();
  }, []);

  const logOut = () => {
    const confirm = window.confirm("Are You Sure To Logout");
    if (confirm) {
      localStorage.removeItem("Site_New_Tokken");
      history.push("/A_D_M_I_N");
    }
  };

  const filterData = async (search) => {
    if (search) {
      setisSearch(true);
      const data = await allMovieData.filter((list, i) => {
        const name = list.Name.toLowerCase();
        if (name.indexOf(search) !== -1) {
          return list;
        }
      });

      setmovieData(data);
    } else {
      setisSearch(false);
    }
  };

  return (
    <div className="container text-light" style={{ height: "100vh" }}>
      <div className="admin-head">
        <h1 className="d-inline mr-2">Welcome Admin</h1>
        <button onClick={() => logOut()} className="btn mb-3 btn-outline-light">
          Logout
        </button>
      </div>

      <div>
        {isNewAdding ? (
          <button
            onClick={() => setisNewAdding(false)}
            className="btn btn-block btn-outline-light"
          >
            Cancel
          </button>
        ) : (
          <div>
            {!isEdit ? (
              <button
                onClick={() => setisNewAdding(true)}
                className="btn btn-block btn-outline-light"
              >
                + Add New Movie
              </button>
            ) : (
              <button
                onClick={() => setisEdit(false)}
                className="btn btn-block btn-outline-light"
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </div>

      {!isNewAdding && !isEdit ? (
        <div>
          <input
            className="form-control mt-5 mb-3"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => filterData(e.target.value.toLowerCase())}
          />
          <div className="mb-5 movie-table">
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Lang</th>
                  <th scope="col">B/H</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {allMovieData && !isSearch ? (
                  allMovieData.map((list, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{list.Name}</td>
                      <td>{list.Language}</td>
                      <td>{list.Wood}</td>
                      <td>
                        <button
                          onClick={() => {
                            setisEdit(true);

                            setdataObj(list);
                          }}
                          className="btn btn-outline-light"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    {isSearch && movieData
                      ? movieData.map((list, i) => (
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{list.Name}</td>
                            <td>{list.Language}</td>
                            <td>{list.Wood}</td>
                            <td>
                              <button
                                onClick={() => {
                                  setisEdit(true);

                                  setdataObj(list);
                                }}
                                className="btn btn-outline-light"
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))
                      : null}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>{!isEdit ? <Add /> : <Edit data={dataObj} />}</div>
      )}
    </div>
  );
}
