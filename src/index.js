import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./Components/App/App";
import Profile from "./Components/Profile/Profile";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Link to="/profile">Profile</Link>
      <Switch>
        <Route path="/">
          <App />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
