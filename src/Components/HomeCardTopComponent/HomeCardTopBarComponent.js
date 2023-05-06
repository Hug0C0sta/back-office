import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import "./HomeCardTopComponent.css"

const MIN = 0
const MAX = 10
// Function to normalise the values (MIN / MAX could be integrated)
const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN);
export default function HomeCardTopBarComponent(props) {
    return (
        <div className="row">
            <p>{MIN}</p>
            <LinearProgress variant="determinate" value={normalise(props.value)}/>
            <p>{MAX}</p>
        </div>
    );
}
