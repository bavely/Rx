import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const Monochrome = () => {
  const [data, setData] = useState({
    series: [25, 15, 44, 55, 41],
    options: {
      chart: {
        width: "100%",
        type: "pie",
      },
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
       
      ],
      theme: {
        monochrome: {
          enabled: true,
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5,
          },
        },
      },
      title: {
        text: "Last Week Progress",
      },
      dataLabels: {
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex];
          return [name, val.toFixed(1) + "%"];
        },
      },
      legend: {
        show: false,
      },
    },
  });

  return (
    <div>
      <ReactApexChart
        id="chart"
        options={data.options}
        series={data.series}
        type="pie"
        height={350}
        width="100%"
        height="300px"
      />
    </div>
  );
};

export default Monochrome;
