import React from "react";
import "./ExchangeRateHome.css";

export default function ExchangeRateHome(props) {
  return (
    <div className="exchangeRateHomeRow">
      <div className="exchangeRateHomeCol">{props.item.imageUrl}</div>
      <div className="exchangeRateHomeCol">
        <div
          className="exchangeRateHomeRow"
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            color: props.item.color,
          }}
        >
          {" "}
          {props.item.coin}
        </div>
        <div className="exchangeRateHomeRow"> {props.item.value}€</div>
      </div>
    </div>
  );
}
