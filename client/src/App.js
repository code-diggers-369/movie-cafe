import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import StatusAlert from "react-status-alert";

import { useDispatch } from "react-redux";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Filter from "./components/Filter/Filter";
import DownloadPage from "./components/Download/DownloadPage";
import Admin from "./components/Admin/Admin";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Page404 from "./components/404/Page404";
import Search from "./components/Filter/Search";

import "./App.css";
import Axios from "axios";

export default function App() {
  const [isload, setisload] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      if (isload) {
        await fetchData(dispatch);
        setisload(false);
      }
    };
    getData();
  }, []);

  return (
    <div style={{ backgroundColor: "#020D18" }}>
      <Router>
        <Header />
        <StatusAlert />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/filter/:type" component={Filter} />
          <Route path="/download/:id" component={DownloadPage} />
          <Route exact path="/A_D_M_I_N" component={Admin} />
          <Route exact path="/A_D_M_I_N/Dashboard" component={Dashboard} />
          <Route path="/search/:search" component={Search} />
          <Route component={Page404} />
        </Switch>
      </Router>
    </div>
  );
}

const fetchData = async (dispatch) => {
  const allData = await (await Axios.post("/movie_data/fetch")).data;

  const filterDataWithTimeStamp = await filterWithTimeStamp(allData);

  await setAllMoviesData(filterDataWithTimeStamp, dispatch);
  await setNewMovies(filterDataWithTimeStamp, dispatch);
  await setBollywoodMovies(filterDataWithTimeStamp, dispatch);
  await setHollywoodMovies(filterDataWithTimeStamp, dispatch);
  await setSeries(filterDataWithTimeStamp, dispatch);
};

const filterWithTimeStamp = async (allData) => {
  const filterData = await allData.sort((a, b) => {
    if (a.TimeStamp < b.TimeStamp) {
      return 1;
    } else if (b.TimeStamp < a.TimeStamp) {
      return -1;
    }
    return 0;
  });

  return filterData;
};

const setAllMoviesData = async (allData, dispatch) => {
  await dispatch({ type: "ALL_MOVIE_DATA", data: allData });
};

const setNewMovies = async (allData, dispatch) => {
  await dispatch({ type: "NEW_MOVIE_DATA", data: allData.slice(0, 8) });
};

const setBollywoodMovies = async (allData, dispatch) => {
  const bollywood = await allData.filter((list) => {
    if (list.Wood === "Bollywood") {
      return list;
    }
  });
  await dispatch({ type: "BOLLYWOOD_MOVIE", data: bollywood });
};

const setHollywoodMovies = async (allData, dispatch) => {
  const hollywood = await allData.filter((list) => {
    if (list.Wood === "Hollywood") {
      return list;
    }
  });
  await dispatch({ type: "HOLLYWOOD_MOVIE", data: hollywood });
};

const setSeries = async (allData, dispatch) => {
  const series = await allData.filter((list) => {
    if (list.Wood === "Series") {
      return list;
    }
  });
  await dispatch({ type: "SERIES", data: series });
};
