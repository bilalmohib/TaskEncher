import { useEffect } from "react";
import { Chart } from "chart.js";

interface ChartDataset {
  data: number[];
  label: string;
  borderColor: string;
  backgroundColor: string;
  fill: boolean;
}

interface LineChartProps {
  reportID: string;
  reportData: any
}

const Line: React.FC<LineChartProps> = ({
  reportID,
  reportData
}) => {
  useEffect(() => {
    // @ts-ignore
    const ctx = document.getElementById(reportID)?.getContext("2d");
    if (ctx) {
      const myChart = new Chart(ctx, {
        type: "line",
        data: reportData
        // data: {
        //   labels: [
        //     "Sunday",
        //     "Monday",
        //     "Tuesday",
        //     "Wednesday",
        //     "Thursday",
        //     "Friday",
        //     "Saturday"
        //   ],
        //   datasets: [
        //     {
        //       data: [5],
        //       backgroundColor: "#7bb6dd",
        //       label: "Applied",
        //       borderColor: "#3e95cd",
        //       fill: false,
        //     },
        //     {
        //       data: [70, 90, 44, 60, 83, 90, 100],
        //       label: "Accepted",
        //       borderColor: "#3cba9f",
        //       backgroundColor: "#71d1bd",
        //       fill: false,
        //     },
        //     {
        //       data: [10, 21, 60, 44, 17, 21, 17],
        //       label: "Pending",
        //       borderColor: "#ffa500",
        //       backgroundColor: "#ffc04d",
        //       fill: false,
        //     },
        //     {
        //       data: [6, 3, 2, 2, 7, 0, 16],
        //       label: "Rejected",
        //       borderColor: "#c45850",
        //       backgroundColor: "#d78f89",
        //       fill: false,
        //     },
        //   ],
        // },
      });
    }
  }, []);

  return (
    <div className="mt-10">
      {/* line chart */}
      <div className="w-auto flex mx-auto my-auto">
        <div className="pt-0 rounded-xl w-full h-fit my-auto">
          <canvas id={reportID}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Line;