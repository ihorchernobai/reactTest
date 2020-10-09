import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/auth";

function Login({ isLoggedIn, setIsLoggedIn }) {
  // const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthToken, setToken } = useAuth();

  const [sendRequest, setSendRequest] = useState(false);

useEffect(()=> {
  let mounted = true;
  if(sendRequest){
    axios
    .post("https://localhost:44380/User/Login", {
      username: username,
      password: password
    })
    .then((result) => {
      if (result.status === 200) {
        setIsLoggedIn(true);
        setToken(result.data);
        // setAuthToken(result.data);
      } 
    })
    .catch((e) => {
      setIsError(e.message);
    });
  }
  return() => mounted = false;
}, [sendRequest])
  
 

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login">
      <div>
        <h3>Email: test</h3>
        <h3>Password: test</h3>
      </div>
      <div className="login_content">
        <form>
          <label>Email</label>
          <input
            type="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="email"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
          />
          <button onClick={(e)=> {
            e.preventDefault();
            setSendRequest(true);
          }}>Sign In</button>
        </form>
        {isError && <p>{isError}</p>}
      </div>
    </div>
  );
}

export default Login;
