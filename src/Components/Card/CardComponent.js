import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import "./CardComponent.css";

export default function CardComponent(props) {
  const IconComponent = props.icon;
  return (
    <Card
      sx={{
        width: props.width,
        height: props.height,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="cardColumn">
        <div>
          <CardContent style={{ paddingBottom: "10px" }}>
            <div className="cardTitleContainer">
              <div className="iconContainer">
                <IconComponent />
              </div>
              <span className="cardName" style={{ color: props.fontCol }}>
                {props.name}
              </span>
            </div>
          </CardContent>
        </div>
        <CardContent>
          <div style={{ height: "100%", width: "100%" }}>{props.children}</div>
        </CardContent>
      </div>
    </Card>
  );
}
