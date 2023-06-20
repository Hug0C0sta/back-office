import { useRef } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export const LineChartComponent = (props) => {
  const ref = useRef();

  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        fill: true,
        backgroundColor: props.backgroundColor,
        borderColor: props.chart_border_color,
      },
    ],
  };

  return (
    <Line
      ref={ref}
      data={data}
      height={props.height}
      options={{
        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    ></Line>
  );
};
