import React, { useState } from "react";
import Chart from "react-apexcharts";

const DonutChart = () => {
  const [data, setData] = useState({
    options: {
      chart: {
        type: "donut",
        width: "100%",
      },title: {
        text: "All Time Referral Progress",
      },
      labels: ["New", "Pending", "Delivered", "Rejected"],
    },
    series: [44, 55, 41, 17],
    chartOptions: {},
  });
  return (
    <div className="mixed-chart">
      <Chart
        options={data.options}
        series={data.series}
        type="donut"
        width="100%"
        height="300px"
      />
    </div>
  );
};

export default DonutChart;
