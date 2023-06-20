import React, { useRef } from "react";
import { Pie } from "react-chartjs-2";
import { COLORS } from "../../colors";

export const PieChartComponent = (props) => {
  const ref = useRef();

  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.data,
        backgroundColor: [
          COLORS.azul_medio,
          COLORS.azul_claro,
          COLORS.azul_escuro,
          COLORS.vermelho_claro,
          COLORS.vermelho_escuro,
        ],
      },
    ],
  };

  return (
    <Pie
      ref={ref}
      data={data}
      height={300}
      width={300}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "right",
          },
        },
      }}
    />
  );
};
