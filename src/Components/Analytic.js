import React, { useState, useEffect } from "react";

import Item from "./Item";
import axios from "axios";
import { useAuth } from "../context/auth";


let Analytic = ({ analytic }) => {
  const [loading, setLoading] = useState(true);
  // const [show, setShow] = useState("off");
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);
  const { authTokens } = useAuth();

  useEffect(() => {
    setLoading(true);
    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: authTokens
    // };

    axios
      .get("https://localhost:44380/Product/Popular")
      .then((response) => {
        setTimeout(() => {
          setLoading(false);
          setItems(response.data);
          setError("");
        }, 2000);
      })
      .catch((error) => {
        setLoading(true);
        setItems([]);
        setError("Something went wrong");
      });
  }, []);

  // let toggle = () => {
  //   setShow(show === "off" ? "on" : "off");
  // };

// const data = Object.values(items);


  return (
    <div className="content_main">
      <h2>Popular</h2>
      <div className="items">
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          items.map((item, i) => <Item key={i} item={item} />)
        )}
        {error.length > 0 ? <h3>{error}</h3> : null}
      </div>
    </div>
  );
};

export default Analytic;
