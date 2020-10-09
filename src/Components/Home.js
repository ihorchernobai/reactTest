import React, { useEffect, useState } from "react";
import "../App.css";

import Analytic from "./Analytic";
import Manager from "./Manager";
import Head from "./Head";

import { useAuth } from "../context/auth";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from "axios";

let Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const [analytic, setAnalytic] = useState("off");
  const [manager, setManager] = useState("off");
  const [head, setHead] = useState("off");
  const [roleId, setRoleId] = useState(null);
  const [removeRole, setRemoveRole] = useState(null)
  const { authToken } = useAuth();

  useEffect(() => {
 if(roleId === 1 || roleId === 2 || roleId === 3){
   let authTokenAuth = localStorage.getItem("token");
  let cleanup = false;
  const req = () => {
    axios
    .post(`https://localhost:44380/User/addRole/${roleId}`, {
      Authorization : `Bearer ${authTokenAuth}`
    })
    .then((res) => console.log(res.data));
  }
  req();

  return ()=> cleanup = true;
 }
  },[roleId]);


  useEffect(()=> {
    if(removeRole === 1 || removeRole === 2 || removeRole === 3){
      let authTokenAuthForRemove = localStorage.getItem("token");
      let cleanupClone = false;
      const remRole = () => {
        axios
        .post(`https://localhost:44380/User/removeRole/${removeRole}`, {
          Authorization : `Bearer ${authTokenAuthForRemove}`
        })
        .then((res) => console.log(res.data));
      }
      remRole();
    
      return ()=> cleanupClone = true;
    }
  }, [removeRole])

  let toggle = (setter, getter, id) => {
    setter(getter === "off" ? "on" : "off");
    setRoleId(id);

    if(getter === "on"){
      setRemoveRole(id);
    }
  };

  let logOut = () => {
    setIsLoggedIn(false);
    // return <Redirect to="/login" />;
  };

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <Router>
      <div className="App">
        <div className="navbar">
          <h2>Roles</h2>
          <button onClick={logOut}>Log Out</button>
          <div className="nav">
            <ul>
              <li>
                <button onClick={() => toggle(setAnalytic, analytic, 1)}>
                  Analytic
                </button>
              </li>
              <li>
                <button onClick={() => toggle(setManager, manager, 2)}>
                  Manager
                </button>
              </li>
              <li>
                <button onClick={() => toggle(setHead, head, 3)}>Head</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="content">
          <nav>
            <ul>
              <li className={`${analytic}`}>
                <Link to="/popular">Popular</Link>
              </li>
              <li className={`${manager}`}>
                <Link to="/actual">Actual</Link>
              </li>
              <li className={`${head}`}>
                <Link to="/top">Top 5</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/popular">
              <Analytic />
            </Route>
            <Route path="/actual">
              <Manager />
            </Route>
            <Route path="/top">
              <Head />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Home;
