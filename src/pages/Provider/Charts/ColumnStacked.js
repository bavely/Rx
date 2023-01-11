import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ColumnStacked = () => {
  const [data, setData] = useState({
    series: [
      {
        name: "New",
        data: [44, 55, 41, 67, 22, 43,44, 55, 41, 67, 22, 43],
      },
      {
        name: "Pending",
        data: [13, 23, 20, 8, 13, 27,44, 55, 41, 67, 22, 43],
      },
      {
        name: "Delivered",
        data: [11, 17, 15, 15, 21, 14,44, 55, 41, 67, 22, 43],
      },
      {
        name: "Rejected",
        data: [21, 7, 25, 13, 22, 8,44, 55, 41, 67, 22, 43],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },title: {
        text: "Referral Progress per Month",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
        },
      },
      xaxis: {
        type: "date",
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    },
  });

  return (
    <div>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ColumnStacked;
