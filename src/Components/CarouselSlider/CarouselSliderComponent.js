import "./CarouselSliderStyle.css";
import React, { useState } from "react";
import clsx from "clsx"; // Import clsx for conditional class rendering
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function CarouselSliderComponent(props) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prevState) => prevState + 1);
  const previous = () => setIndex((prevState) => prevState - 1);

  return (
    <>
      <div className="carouselRow">
        <div className="carouselColumnIcon">
          {index > 0 ? (
            <KeyboardArrowLeftIcon
              onClick={previous}
              style={{ fontSize: "2.5rem", color: "#2E4150", padding: 0 }}
            >
              Next
            </KeyboardArrowLeftIcon>
          ) : (
            <KeyboardArrowLeftIcon
              style={{ fontSize: "2.5rem", color: "#A9A9A9", padding: 0 }}
            >
              Next
            </KeyboardArrowLeftIcon>
          )}
        </div>

        <div>
          {props.items.length > 0 &&
            React.cloneElement(props.children, { item: props.items[index] })}
        </div>

        <div className="carouselColumnIcon">
          {index < props.items.length - 1 ? (
            <KeyboardArrowRightIcon
              onClick={next}
              style={{ fontSize: "2.5rem", color: "#2E4150", padding: 0 }}
            >
              Next
            </KeyboardArrowRightIcon>
          ) : (
            <KeyboardArrowRightIcon
              style={{ fontSize: "2.5rem", color: "#A9A9A9", padding: 0 }}
            >
              Next
            </KeyboardArrowRightIcon>
          )}
        </div>
      </div>

      <div className="cardRow">
        <div className="cardCounter">
          {props.items.map((item, i) => (
            <div
              key={i}
              className={clsx("cardCircle", { active: i === index })}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CarouselSliderComponent;
