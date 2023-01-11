import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const ColumnChart = ({ nameX, info, titleX, color, type }) => {
  const [data, setData] = useState({
    series: [
      {
        name: nameX || "data",
        data: info,
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
          enabled: false,
        },
      },
      title: {
        text: titleX || "",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "top",
              offsetX: 10,
              offsetY: 10,
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
          "Dec",
        ],
      },
      legend: {
        position: "right",
        offsetY: 20,
      },
      fill: {
        opacity: 1,
        colors: [color],
      },
    },
  });

  useEffect(() => {
    setData({
      series: [
        {
          name: nameX || "data",
          data: info,
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
            enabled: false,
          },
        },
        title: {
          text: titleX || "",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "top",
                offsetX: 10,
                offsetY: 10,
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
            "Dec",
          ],
        },
        legend: {
          position: "right",
          offsetY: 20,
        },
        fill: {
          opacity: 1,
          colors: [color],
        },
      },
    });
  }, [color, info, nameX, titleX]);

  return (
    <>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type={type}
        height={350}
      />
    </>
  );
};

export default ColumnChart;
