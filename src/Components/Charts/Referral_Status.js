import React, { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import providerHelper from "../../../utils/Provider_Helper";
import Logedout from "../../../Components/Logout/Logedout";
const Referral_Status = () => {
  const logedin = sessionStorage.getItem("logedin");

  const [referrals, setReferrals] = useState([]);

  const [data, setData] = useState({
    options: {
      data: [
        {
          os: "New",
          share: 0,
        },
        {
          os: "Pending",
          share: 0,
        },
        {
          os: "Delivered",
          share: 0,
        },
      ],

      series: [
        {
          type: "pie",
          labelKey: "os",
          angleKey: "share",
          innerRadiusOffset: -70,
        },
      ],
    },
  });
  useEffect(() => {
    setData({
      options: {
        data: [
          {
            os: "New",
            share: referrals.filter((x) => x.Status === "New").length,
          },
          {
            os: "Pending",
            share: referrals.filter((x) => x.Status === "Pending").length,
          },
          {
            os: "Delivered",
            share: referrals.filter((x) => x.Status === "Delivered").length,
          },
        ],
      },
    });
  }, [referrals]);

  const [msg, setMsg] = useState("init");
  useEffect(async () => {
    await providerHelper
      .getAllReferrals(sessionStorage.getItem("user"))
      .then((res) => {
        if (res.status === 200) {
          setReferrals(res.data.Result);
        } else {
          setMsg("fail");
        }
      });
  }, [referrals.length !== 0]);

  return (
    <div>
      {logedin ? (
        <div className="card shadow">
          {msg === "fail" ? (
            <>
              {" "}
              <div className="alert alert-danger" role="alert">
                Something Went Wrong. Please Refresh The Page And Try Again. If
                You Keep Getting This Error Please Contact The Admin.
              </div>
            </>
          ) : (
            <></>
          )}
          <AgChartsReact options={data.options} />
        </div>
      ) : (
        <Logedout />
      )}
    </div>
  );
};

export default Referral_Status;
