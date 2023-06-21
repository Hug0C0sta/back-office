import React from "react";
import "./FundsEachAcountBusiness.css";

export default function FundsEachAcountBusiness(props) {
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
        {props.item.balance}€
      </p>
      <p
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "20px",
          color: "#9B2226",
        }}
      >
        {props.item.name}
      </p>
    </div>
  );
}
