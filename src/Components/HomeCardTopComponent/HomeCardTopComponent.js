import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Spacer } from "@react-native-material/core";

import "./HomeCardTopComponent.css";

export default function HomeCardTopComponent(props) {
  const IconComponent = props.icon;
  return (
    <Card sx={{ height: 100 }}>
      <div className="cardRow" style={{ height: 100 }}>
        <div
          style={{ backgroundColor: props.col, width: "10px", height: "100px" }}
          className="cardColumn"
        ></div>
        <div className="cardColumn" style={{ marginLeft: "20px" }}>
          <CardContent style={{ padding: "0", margin: "0" }}>
            <p
              className="cardTitle"
              style={{ color: "green", marginTop: "0", marginBottom: "0" }}
            >
              {props.name}
            </p>
            <div>{props.children}</div>
          </CardContent>
        </div>
        <Spacer />
        <div className="cardColumn" style={{ marginRight: "20px" }}>
          <CardContent
            style={{ marginRight: "20px", padding: "0", margin: "0" }}
          >
            {IconComponent && (
              <IconComponent style={{ fontSize: "45px", color: "#818589" }} />
            )}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
