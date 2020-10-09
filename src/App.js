import React, { useState } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

//Components

import Home from "./Components/Home";
import Login from "./Components/Login";

import { AuthContext } from "./context/auth";

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("token"));
  const [authToken, setAuthToken] = useState(existingTokens);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setToken = (data) => {
    localStorage.setItem("token", JSON.stringify(data));
    setAuthToken(data);
  };
  // if (!isLoggedIn) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
      <Router>
        <div>
          <Route exact path="/">
            <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/login">
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
