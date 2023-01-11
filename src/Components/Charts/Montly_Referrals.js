import React, { useState } from "react";
import { cloneDeep } from "lodash";
import { render } from "react-dom";
import * as agCharts from "ag-charts-community";
import { AgChartsReact } from "ag-charts-react";

const monthly_Referrals = () => {
  const [data, setData] = useState({
    options: {
      autoSize: true,
      data: [
        {
          month: "Jan",
          New: 10,
          Pending: 5,
          Delivered: 1,
        },
        {
          month: "Feb",
          New: 20,
          Pending: 7,
          Delivered: 10,
        },
        {
          month: "Mar",
          New: 30,
          Pending: 20,
          Delivered: 15,
        },
        {
          month: "Abr",
          New: null,
          Pending: 30,
          Delivered: 33,
        },
        {
          month: "May",
          New: 10,
          Pending: 1,
          Delivered: 22,
        },
        {
          month: "Jun",
          New: 50,
          Pending: 12,
          Delivered: 1,
        },
        {
          month: "Jul",
          New: undefined,
          Pending: null,
          Delivered: 55,
        },
        {
          month: "Aug",
          New: NaN,
          Pending: 30,
          Delivered: 60,
        },
        {
          month: "Sep",
          New: 1,
          Pending: 20,
          Delivered: 55,
        },
        {
          month: "Oct",
          New: Infinity,
          Pending: 15,
          Delivered: 11,
        },
        {
          month: "Nov",
          New: 7,
          Pending: 5,
          Delivered: 60,
        },
        {
          month: "Dec",
          New: 100,
          Pending: 22,
          Delivered: 0,
        },
      ],
      title: { text: "Referral Status By Month" },
      subtitle: { text: "2008-2020" },

      series: [
        {
          type: "column",
          xKey: "month",
          yKeys: ["New", "Pending", "Delivered"],
        },
      ],
    },
  });

  return <AgChartsReact options={data.options} />;
};

export default monthly_Referrals;
