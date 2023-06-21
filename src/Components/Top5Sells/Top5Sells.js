import React from "react";
import "./Top5Sells.css";

export default function Top5Sells(props) {
  return (
    <div className="top5SellsContainer">
      <p
        style={{
          textAlign: "center",
          fontWeight: "lighter",
          fontSize: "30px",
          color: "#005F73",
        }}
      >
        {props.item.totalAmount}€
      </p>
      <p
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "20px",
          color: "#9B2226",
        }}
      >
        {props.item.createdString.substring(0, 9)}
      </p>
    </div>
  );
}
