import React from "react";
import "./LoadFundsHome.css";

export default function LoadFundsHome(props) {
  console.log(props);
  return (
    <div className="exchangeRateHomeRow">
      <div className="exchangeRateHomeCol" style={{ marginRight: "10px" }}>
        {props.item.icon}
      </div>
      <div className="exchangeRateHomeCol">
        <div
          className="exchangeRateHomeRow"
          style={{
            fontSize: "25px",
            fontWeight: "bold",
          }}
        >
          {props.item.method}
        </div>
        <div className="exchangeRateHomeRow"> {props.item.value}€</div>
      </div>
    </div>
  );
}
