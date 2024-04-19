import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

enum Colors {
  workDays = "#EA8A79",
  weekEnd = "#C4C4C4",
}

interface IDiagram {
  labels: string[];
  timeData: number[];
}

export function Diagram({ labels, timeData }: IDiagram) {
  const colors = [
    Colors.workDays,
    Colors.workDays,
    Colors.workDays,
    Colors.workDays,
    Colors.workDays,
    Colors.weekEnd,
    Colors.weekEnd,
  ];

  const data = {
    labels,
    datasets: [
      {
        data: timeData.map((item) => item),
        backgroundColor: colors.map((item) => item),
      },
    ],
  };

  return (
    <Chart
      style={{ display: "flex" }}
      type="bar"
      data={data}
      options={{
        scales: {
          x: {
            grid: { display: false },
          },
          y: {
            position: "right",

            ticks: {
              callback: function (value, index, ticks) {
                const hours = Math.trunc(Number(value) / 60);
                const minutes = Number(value) % 60;
                return hours + " ч " + minutes + " мин";
              },
            },
          },
        },
      }}
    />
  );
}
