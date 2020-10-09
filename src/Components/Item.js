import React from "react";

let Item = ({ item }) => {
  return (
    <div className="item">
      <h3>Name: {item.name}</h3>
      <p>Cost: {item.cost}</p>
      <p>Amount: {item.amount}</p>
    </div>
  );
};

export default Item;
