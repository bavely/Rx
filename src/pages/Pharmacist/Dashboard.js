import React from "react";
import { useState, useEffect } from "react";
import Pharmacist_Helper from "../../utils/Pharmacist_Helper";
import Logedout from "../../Components/Logout/Logedout";
import Nav from "./Nav";
import Header from "./Header";
import Cards from "./Cards";
import ColumnChart from "../../Components/Charts/ColumnChart";
import SurveyHelper from "../../utils/SurveyHelper";
import { getDatabase, ref, onValue, onChildAdded } from "firebase/database";
import helper from "../../utils/helper";
import "../../css/dashboard.css";

function Pharmacy_Dashboard() {
  const [providers, setProviders] = useState([]);
  const [patients, setPatients] = useState([]);
  const [patientsData, setPatientsData] = useState([]);
  const [providersData, setProvidersData] = useState([]);
  const [surveyRawData, setSurveyRawData] = useState([]);
  const [surveyData, setSurveyData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [surveyYear, setSurveyYear] = useState(`${new Date().getFullYear()}`);

  const logedin = sessionStorage.getItem("logedin");
  const userName = sessionStorage.getItem("userName");
  const id = window.sessionStorage.getItem("pharmacy");
  const database = getDatabase(SurveyHelper.app());
  const commentsRef = ref(database, "notifications/");

  useEffect(() => {
    getNots();
    onChildAdded(commentsRef, () => {
      getNots();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNots = () => {
    return onValue(
      ref(database, "notifications/"),
      (snapshot) => {
        if (snapshot.val() !== null) {
          setNotifications(
            Object.entries(snapshot.val())
              .filter(
                ([key, note]) =>
                  note.receiver === sessionStorage.getItem("user") &&
                  note.sender !== sessionStorage.getItem("user")
              )
              .map((el) => el[1])
              .sort(function (a, b) {
                return a.timestamp > b.timestamp
                  ? -1
                  : b.timestamp > a.timestamp
                  ? 1
                  : 0;
              })
          );
        } else {
          setNotifications([
            {
              sender_name: "Error",
              message: "couldn't retreive Messages",
              timestamp: "",
            },
          ]);
        }

        // ...
      },
      {
        onlyOnce: true,
      }
    );
  };

  // console.log("notifications", notifications);

  function monthlyCounter(arr) {
    const monthlyHash = {};
    const resultArr = [];
    const valuesArr =
      arr.length &&
      arr.map((el) => {
        return el.user.createdAt.split("-")[1];
      });

    valuesArr.length &&
      valuesArr.forEach((el) => {
        !monthlyHash[el] ? (monthlyHash[el] = 1) : monthlyHash[el]++;
      });

    for (let i = 1; i <= 12; i++) {
      monthlyHash[i] ? resultArr.push(monthlyHash[i]) : resultArr.push(0);
    }
    return resultArr;
  }

  const getAllTokens = () => {
    return onValue(
      ref(database, `${helper.fireBaseURL.tokens}/`),
      (snapshot) => {
        if (snapshot.val()) {
          setSurveyRawData(Object.values(snapshot.val()));
        }
      },
      {
        onlyOnce: true,
      }
    );
  };

  function yearSelect() {
    let year = 2022;
    let currentYear = new Date().getFullYear();
    const yearsArr = [];
    while (year <= currentYear) {
      yearsArr.push(year);
      year++;
    }
    return yearsArr;
  }

  function surveyCounter(arr, year) {
    const monthlyHash = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
    };
    let targetDate;
    let targetMonth;
    let targetYear;
    const resultArr = [];
    arr.length &&
      arr.forEach((el) => {
        if (el.date) {
          targetDate = el.date.split(" ");
          targetMonth = targetDate[1];
          targetYear = targetDate[3];
          if (targetYear === year) {
            targetMonth === "Jan"
              ? monthlyHash[0]++
              : targetMonth === "Feb"
              ? monthlyHash[1]++
              : targetMonth === "Mar"
              ? monthlyHash[2]++
              : targetMonth === "Apr"
              ? monthlyHash[3]++
              : targetMonth === "May"
              ? monthlyHash[4]++
              : targetMonth === "Jun"
              ? monthlyHash[5]++
              : targetMonth === "Jul"
              ? monthlyHash[6]++
              : targetMonth === "Aug"
              ? monthlyHash[7]++
              : targetMonth === "Sep"
              ? monthlyHash[8]++
              : targetMonth === "Oct"
              ? monthlyHash[9]++
              : targetMonth === "Nov"
              ? monthlyHash[10]++
              : targetMonth === "Dec"
              ? monthlyHash[11]++
              : void 0;
          }
        }
      });
    for (let i = 0; i < 12; i++) {
      monthlyHash[i] ? resultArr.push(monthlyHash[i]) : resultArr.push(0);
    }
    return resultArr;
  }

  useEffect(() => {
    getAllTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    surveyRawData.length &&
      setSurveyData(surveyCounter(surveyRawData, surveyYear));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyRawData, surveyYear]);

  function timeConvert(time) {
    let dateFormat = new Date(time);
    let date = dateFormat.getMonth() + 1 + "/" + dateFormat.getDate();

    let hours = `${
      dateFormat.getHours() > 12
        ? dateFormat.getHours() - 12
        : dateFormat.getHours() === 0
        ? 12
        : dateFormat.getHours()
    }:${
      dateFormat.getMinutes() < 10
        ? "0" + dateFormat.getMinutes()
        : dateFormat.getMinutes()
    } ${dateFormat.getHours() > 12 ? " pm" : " am"}`;

    return `${date} ${hours}`;
  }

  useEffect(() => {
    Pharmacist_Helper.getProviders(id)
      .then((res) => {
        res?.data?.data && setProviders(res.data.data);
      })
      .then(() => {
        Pharmacist_Helper.getPatients(id).then((res) => {
          res?.data?.data && setPatients(res.data.data);
        });
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    patients.length && setPatientsData(monthlyCounter(patients));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patients]);

  useEffect(() => {
    providers.length && setProvidersData(monthlyCounter(providers));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providers]);

  return (
    <div className="dashboard">
      {logedin === "true" ? (
        <div id="wrapper">
          <Nav />
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <Header />
              <div className="row card-body justify-content-between mb-3 mx-md-0 mx-2 ">
                <h1 className="col-5"> Pharmacy Dashboard</h1>
                <div className="col-md-5 bg-gradient-primary d-flex justify-content-between rounded d-none d-md-flex">
                  <div className="align-items-between mt-1">
                    <h3
                      className="card-title mt-2 mt-md-3 mb-2 text-light"
                      style={{ marginLeft: "10px" }}>
                      Hello {userName && userName.split(",")[1]}
                    </h3>
                    <p
                      className="card-text text-light mb-1"
                      style={{ marginLeft: "10px" }}>
                      Have a nice day at work
                    </p>
                  </div>
                  <img
                    src={require("../../images/heartofdrs.png")}
                    className="col-md-3 d-none d-xl-block "
                    style={{ margin: "5px", width: "5rem" }}
                    alt="doctors in heart"
                  />
                </div>
              </div>

              <div className="container">
                <div className="pagetitle">
                  <Cards
                    providers={providers.length || 0}
                    patients={patients.length || 0}
                  />
                </div>
                <div className="row">
                  <div className="col-md-7">
                    <div className="card pb-1 mb-2 mb-md-0">
                      <h5
                        className="card-title mt-1 mb-0 pt-3 pb-0 whatsNew"
                        style={{ color: "steelblue" }}>
                        Recent Messages
                      </h5>
                      <hr className="my-4" />
                      {notifications.length > 0 ? (
                        notifications.map((el, idx) => {
                          return (
                            idx < 4 && (
                              <div className="card mx-2 my-1" key={idx}>
                                <div className="card-body">
                                  <h5 className="card-title text-capitalize">
                                    {el.sender_name}
                                    <br />
                                    <small className="msg-timestamp text-lowercase ">
                                      {timeConvert(el.timestamp)}
                                    </small>
                                  </h5>

                                  <p className="card-text">{el.message}</p>
                                </div>
                              </div>
                            )
                          );
                        })
                      ) : (
                        <p className="text-center">no new messages</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="card h-100">
                      <div className="card-body">
                        <h5
                          className="card-title mt-1 whatsNew"
                          style={{ color: "steelblue" }}>
                          Pharmacy Announcements!
                        </h5>
                        <hr className="my-4" />
                        <p className="card-text">
                          Place-Holder Text <br /> Lorem ipsum dolor st amet,
                          consectetur adipisicing elit. Suscipit velit,
                          veritatis pariatur non illum numquam ut repellendus
                          vel eius error ex. Ipsam veritatis id quis excepturi
                          quibusdam et sequi aperiam. Minus alias possimus
                          pariatur quisquam aperiam quidem fuga, excepturi
                          repellendus odit reprehenderit accusamus officiis
                          blanditiis sed dolore expedita voluptate dolorum in
                          libero vel laboriosam adipisci repellat nam? Labore,
                          tempore reiciendis. Sint voluptate quo perspiciatis
                          sequi eos esse impedit.
                          <a href="https://repharmacy.com/articles-news-headlines">
                            River's Edge...
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row my-5">
                  {patientsData.length > 0 && (
                    <div className="col-12 col-lg-6">
                      <ColumnChart
                        nameX="Patients"
                        info={patientsData}
                        titleX="New Patients/Month"
                        color="#25649e"
                        type="bar"
                      />
                    </div>
                  )}

                  {providersData.length > 0 && (
                    <div className="col-12 col-lg-6">
                      <ColumnChart
                        nameX="Providers"
                        info={providersData}
                        titleX="New Providers/Month"
                        color="#00b7c7"
                        type="bar"
                      />
                    </div>
                  )}
                </div>
                <div className="row my-5">
                  {surveyData.length > 0 && (
                    <div className="col-12">
                      {yearSelect().length > 1 && (
                        <select
                          className="form-select form-select-sm mb-3 mx-2"
                          aria-label=".form-select-md example"
                          id="yearSelection"
                          onChange={(e) => setSurveyYear(`${e.target.value}`)}>
                          <option disabled selected>
                            Select Survey Year
                          </option>
                          {yearSelect().map((el) => (
                            <option key={el} value={`${el}`}>
                              {el}
                            </option>
                          ))}
                        </select>
                      )}
                      <ColumnChart
                        nameX="Surveys"
                        info={surveyData}
                        titleX={`Total Surveys/Month for ${surveyYear}`}
                        color="#25649e"
                        type="area"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Logedout />
      )}
    </div>
  );
}

export default Pharmacy_Dashboard;
