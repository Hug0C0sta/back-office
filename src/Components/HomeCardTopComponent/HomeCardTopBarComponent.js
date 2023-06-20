import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import "./HomeCardTopComponent.css";

const MIN = 0;
const MAX = 10;

const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN);
export default function HomeCardTopBarComponent(props) {
  return (
    <div className="row cardInfo nowrap">
      <p style={{ marginTop: 0, marginBottom: 0 }}>{MIN}</p>
      <LinearProgress
        style={{ display: "block", width: "100%" }}
        variant="determinate"
        value={normalise(props.value)}
      />
      <p style={{ marginTop: 0, marginBottom: 0 }}>{MAX}</p>
    </div>
  );
}
