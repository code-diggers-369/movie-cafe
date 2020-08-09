import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import Aos from "aos";

// import css
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
import "react-status-alert/dist/status-alert.css";

// redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import Reducers from "./redux/reducers/reducers";
import ReduxThunk from "redux-thunk";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   Reducers,
//   composeEnhancers(applyMiddleware(ReduxThunk))
// );

const store = createStore(Reducers, applyMiddleware(ReduxThunk));

Aos.init({
  delay: 10,
  duration: 800,
  offset: 120,
  // mirror: true,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
