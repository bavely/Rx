import React from "react";
import { useState, useEffect } from "react";
import providerHelper from "../../utils/Provider_Helper";
import Logedout from "../../Components/Logout/Logedout";
import Nav from "./Nav";
import Header from "./Header";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import Cards from "./Cards";
import ColumnChart from "./Charts/ColumnChart";
import DonutChart from "./Charts/DonutChart";
import FadeContent from "./Animation/Fade";
import Example from "./Animation/Commercial";
import ColumnStacked from "./Charts/ColumnStacked";
import Monochrome from "./Charts/Monochrome";
import { each } from "jquery";

function Referrals() {
  const TotalValueRenderer = (x) => {
    const cellValue = x.valueFormatted ? x.valueFormatted : x.value;
    const buttonClicked = () => {
      const scoreArr = Object.entries(x.data);
      const filteredArr = scoreArr.filter(function ([key, value]) {
        return value !== "";
      });
      handleDetails(Object.fromEntries(filteredArr));
    };

    return (
      <span>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => buttonClicked()}>
          Details
        </button>
      </span>
    );
  };

  const logedin = sessionStorage.getItem("logedin");

  const [referrals, setReferrals] = useState([]);
  const [refDetails, setRefDetails] = useState({ flag: false, Data: "" });
  const [meds, setMeds] = useState([]);
  const [files, setFiles] = useState({});
  useEffect(async () => {
    await providerHelper
      .getAllReferrals(sessionStorage.getItem("user"))
      .then((res) => {
        console.log(res.data.referrals);
        // const Pending=(res.data.Result).filter(x=> x.Status==="Pending")
        // sessionStorage.setItem("pending",Pending.length)
        setReferrals(
          res.data.referrals.map((each) => {
            console.log(each);
            each.Updated_at_Date = handleCraetedat(each.updated_at).date;
            each.Updated_at_Time = handleCraetedat(each.updated_at).time;
            each.Created_At_Date = handleCraetedat(each.created_at).date;
            each.Created_At_Time = handleCraetedat(each.created_at).time;
            each.ICD10 = each.Diag[0].ICD10;
            each.diagnose = each.Diag[0].diagnose;
            return each;
          })
        );
        // setReferrals([res.data.referral])
      });
  }, []);

  sessionStorage.setItem("ref", referrals.length);

  // useEffect(async () => {
  //   // await providerHelper.getMeds().then((res) => {
  //   //   const filtered = res.filter((x) => x.Referral_ID === refDetails.Data.ID);
  //   //   setMeds(filtered);
  //   // });
  //   await providerHelper.getRefFiles(refDetails.Data.ID).then((res) => {
  //     if (res.length > 0) {
  //       setFiles({
  //         flag: true,
  //         files: res,
  //       });
  //     } else {
  //       setFiles({
  //         flag: false,
  //         files: [],
  //       });
  //     }
  //   });
  // }, [refDetails.flag]);

  console.log(meds);

  const handleDetails = (ref) => {
    setRefDetails({ flag: true, Data: ref });
  };

  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json").then(
      (resp) => resp.json()
    );
  };

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json").then(
      (result) => result.json()
    );
  }, []);

  const onBtnExport = () => {
    gridApi.exportDataAsCsv();
  };
  const handleDate = (date) => {
    const [yyyy, mm, dd] = date.split("-");
    const rev = `${mm}/${dd}/${yyyy}`;
    return rev;
  };

  const handleCraetedat = (data) => {
    const [date, time] = data.split("T");
    const correctdate = handleDate(date);
    const final = { date: correctdate, time: time };
    return final;
  };

  const getRowStyle = (params) => {
    console.log(params);
    if (params.data.Status === "New") {
      return { background: "#58BDFF" };
    } else if (params.data.Status === "Delivered") {
      return { background: "#7fd87c" };
    } else if (params.data.Status === "Rejected") {
      return { background: "#f16f6f" };
    } else {
      return { background: "#eda53f" };
    }
  };

  class App extends React.Component {
    componentDidMount() {
      const script = document.createElement("script");
      script.async = true;
      script.src = "../cjs/task.js";
      script.onload = () => this.scriptLoaded();

      //For head
      document.head.appendChild(script);

      // For body
      document.body.appendChild(script);

      // For component
      this.div.appendChild(script);
    }
  }

  return (
    <div>
      {logedin === "true" ? (
        <div>
          {refDetails.flag ? (
            <div id="wrapper">
              {" "}
              <Nav />
              <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                  <Header />

                  <div className="container-fluid">
                    <div className="pagetitle">
                      <h1>Rx Information</h1>
                      <nav>
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                            <a href="/provider-dashboard">Search RX</a>
                          </li>

                          <li className="breadcrumb-item active">Rx details</li>
                        </ol>
                      </nav>
                      <Cards />
                    </div>

                    <div className="card shadow">
                      <div
                        className="card-header py-3"
                        style={{ backgroundColor: "steelblue" }}>
                        <div className="d-flex text-light justify-content-between">
                          <div>
                            Prescription ID
                            <p className="text-primary text-light m-0 fw-bold1">
                              {refDetails.Data.id}
                            </p>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="container1">
                        <p
                          className="text-primary m-0 fw-bold1"
                          style={{
                            textDecorationLine: "underline",
                            fontSize: "20px",
                          }}>
                          Patient Information
                        </p>
                        <div className="row mt-2">
                          <div className="col">
                            <p
                              className="fw-bold1"
                              style={{ fontSize: "17px" }}>
                              Patient ID
                              <p
                                className="fw-normal"
                                style={{ fontSize: "17px" }}>
                                {refDetails.Data.patient_id}
                              </p>
                            </p>
                          </div>

                          {/* <div className="col">
                            <p className="fw-bold1">
                              Patient Name
                              <p className="fw-normal">
                                {refDetails.Data.Patient_Name
                                  ? refDetails.Data.Patient_Name
                                  : "N/F"}
                              </p>
                            </p>
                          </div> */}
                        </div>
                        <p
                          className="text-primary m-0 fw-bold1"
                          style={{
                            textDecorationLine: "underline",
                            fontSize: "20px",
                          }}>
                          Clinical Information
                        </p>
                        {refDetails.Data.Diag.map((e) => {
                          return (
                            <div className="row mt-2">
                              <div className="col-md-3">
                                <p
                                  className="fw-bold1"
                                  style={{ fontSize: "17px" }}>
                                  Diagnosis
                                  <p
                                    className="fw-normal"
                                    style={{ fontSize: "17px" }}>
                                    {e.diagnose ? e.diagnose : "N/F"}
                                  </p>
                                </p>
                              </div>

                              <div className="col">
                                <p
                                  className="fw-bold1"
                                  style={{ fontSize: "17px" }}>
                                  ICD10
                                  <p
                                    className="fw-normal"
                                    style={{ fontSize: "17px" }}>
                                    {e.ICD10 ? e.ICD10 : "N/F"}
                                  </p>
                                </p>
                              </div>
                            </div>
                          );
                        })}
                        <>
                          {" "}
                          <div className="row">
                            {refDetails.Data.clinical.map((e) => {
                              return (
                                <div className="col-md-3">
                                  <p
                                    className="fw-bold1"
                                    style={{ fontSize: "17px" }}>
                                    {e.question}
                                    <p
                                      className="fw-normal"
                                      style={{ fontSize: "17px" }}>
                                      {e.answer ? e.answer : "N/F"}
                                    </p>
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </>
                        {/* <div className="row">
                          <div className="col">
                            <p className="fw-bold1">
                              Current Medications
                              <p className="fw-normal">
                                {refDetails.Data.Current_Medications
                                  ? refDetails.Data.Current_Medications
                                  : "N/F"}
                              </p>
                            </p>
                          </div>
                          <div className="col">
                            <p className="fw-bold1">
                              Will patient stop taking these medications ?
                              <p className="fw-normal">
                                {refDetails.Data.Wil_Patient_Stop_Taking_Med
                                  ? refDetails.Data.Wil_Patient_Stop_Taking_Med
                                  : "N/F"}
                              </p>
                            </p>
                          </div>
                        </div> */}
                        {/* <div className="row">
                          <div className="col">
                            <p className="fw-bold1">
                              Notes
                              <p className="fw-normal">
                                {refDetails.Data.Notes
                                  ? refDetails.Data.Notes
                                  : "N/F"}
                              </p>
                            </p>
                          </div>
                        </div> */}
                        {refDetails.Data.medications.map((x) => {
                          return (
                            <div>
                              <p
                                className="text-primary m-0 fw-bold1"
                                style={{
                                  textDecorationLine: "underline",
                                  fontSize: "20px",
                                }}>
                                Medications
                              </p>
                              <div className="row mt-2">
                                <div className="col">
                                  <p
                                    className="fw-bold1"
                                    style={{ fontSize: "17px" }}>
                                    Medication Name
                                    <p
                                      className="fw-normal"
                                      style={{ fontSize: "17px" }}>
                                      {x.name}
                                    </p>
                                  </p>
                                </div>

                                <div className="col">
                                  <p
                                    className="fw-bold1"
                                    style={{ fontSize: "17px" }}>
                                    Sig
                                    <p
                                      className="fw-normal"
                                      style={{ fontSize: "17px" }}>
                                      {x.sig}
                                    </p>
                                  </p>
                                </div>
                                <div className="col">
                                  <p
                                    className="fw-bold1"
                                    style={{ fontSize: "17px" }}>
                                    Quantity
                                    <p
                                      className="fw-normal"
                                      style={{ fontSize: "17px" }}>
                                      {x.quantity}
                                    </p>
                                  </p>
                                </div>
                                <div className="col">
                                  <p className="fw-bold1">
                                    Refills
                                    <p
                                      className="fw-normal"
                                      style={{ fontSize: "17px" }}>
                                      {x.refills}
                                    </p>
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        {/* <p className="text-primary m-0 fw-bold1">Rx Status</p>
                        <br /> */}
                        {/* <div className="row">
                          <div className="col">
                            <p className="fw-bold1">
                              Status
                              <p className="fw-normal">
                                {refDetails.Data.Status
                                  ? refDetails.Data.Status
                                  : "N/F"}
                              </p>
                            </p>
                          </div>
                          <div className="col">
                            <p className="fw-bold1">
                              Rx Progress
                              <p className="fw-normal">
                                {refDetails.Data.Provider_Status_Update
                                  ? refDetails.Data.Provider_Status_Update
                                  : "N/F"}
                              </p>
                            </p>
                          </div>{" "}
                          <div className="col">
                            <p className="fw-bold1">
                              Pending Reason
                              <p className="fw-normal">
                                {refDetails.Reason_Pending_Prescription
                                  ? refDetails.Reason_Pending_Prescription
                                  : "N/F"}
                              </p>
                            </p>
                          </div>
                        </div> */}

                        <p
                          className="text-primary m-0 fw-bold1"
                          style={{
                            textDecorationLine: "underline",
                            fontSize: "20px",
                          }}>
                          Attachments
                        </p>
                        {files.flag ? (
                          <div>
                            {files.files.map((Obj) => {
                              return (
                                <li>
                                  <a
                                    href={Obj.Files}
                                    key={Obj.PK_ID}
                                    target="_blank"
                                    download>
                                    Open Attachment
                                  </a>
                                </li>
                              );
                            })}
                          </div>
                        ) : (
                          <p>No Files Attached</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <footer className="bg-white sticky-footer">
                  <div className="container my-auto">
                    <div className="text-center my-auto copyright">
                      <span>Copyright © NEXTEHEALTH</span>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          ) : (
            <div id="wrapper">
              <Nav />
              <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                  <Header />

                  <div>
                    <div className="d-flex flex-column" id="content-wrapper">
                      <div id="content">
                        <div className="container-fluid">
                          <div className="pagetitle">
                            {/*<h1>Search Prescription</h1>*/}
                          </div>
                          <div>{/* <Cards /> */}</div>
                          <div className="row">
                            <div className="col-md-7">
                              <div
                                className="card mb-2"
                                style={{
                                  backgroundColor: "steelblue",
                                  height: "7rem",
                                }}>
                                <div className="row card-body justify-content-between">
                                  <div className="col-md-6">
                                    <h3
                                      className="card-title mt-3 text-light"
                                      style={{ marginLeft: "10px" }}>
                                      Hello, Dr.Grinberg!
                                    </h3>
                                    <p
                                      className="card-text text-light"
                                      style={{ marginLeft: "10px" }}>
                                      Have a nice day at work
                                    </p>
                                  </div>
                                  <img
                                    src={require("../../images/heartofdrs.png")}
                                    className="col-md-3"
                                    style={{ margin: "0px", width: "118px" }}
                                    alt="img of docs in  heart"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row main">
                            <div className="col-sm-3">
                              <div className="card">
                                <img
                                  className="card-img-top"
                                  src={require("../../images/drdesk.png")}
                                  alt="Card image cap"
                                />
                                <div className="card-body">
                                  <h5 className="card-title" card-title_Upper>
                                    PATIENTS
                                  </h5>
                                  <p className="card-text card-text_num">
                                    {sessionStorage.getItem("pet")}
                                  </p>
                                  <small className="text-muted">
                                    Last updated 3 mins ago
                                  </small>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="card">
                                <img
                                  className="card-img-top"
                                  src={require("../../images/TaeAugust11.jpg")}
                                  alt="..."
                                />
                                <div className="card-body">
                                  <h5 className="card-title card-title_Upper">
                                    TASKS
                                  </h5>
                                  <p className="card-text card-text_num">25</p>
                                  <small className="text-muted">
                                    Last updated 3 mins ago
                                  </small>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="card">
                                <img
                                  className="card-img-top"
                                  src={require("../../images/AdobeStock_311305302.png")}
                                  alt="..."
                                />
                                <div className="card-body">
                                  <h5 className="card-title card-title_Upper ">
                                    REFERRALS
                                  </h5>
                                  <p className="card-text card-text_num">
                                    {sessionStorage.getItem("ref")}
                                  </p>
                                  <small className="text-muted">
                                    Last updated 3 mins ago
                                  </small>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="card">
                                <img
                                  className="card-img-top"
                                  src={require("../../images/Doctor prescribing drug to happy family.png")}
                                  alt="..."
                                />
                                <div className="card-body">
                                  <h5 className="card-title card-title_Upper">
                                    TUESDAY
                                  </h5>
                                  <p className="card-text card-text_num">
                                    May 10th
                                  </p>
                                  <small className="text-muted cal">
                                    Last updated 3 mins ago
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row d-flex justify-content-center align-items-center h-100 mt-2">
                            <div className="col-md-6">
                              <div className="card">
                                <div className="card-body p-5">
                                  <form className="d-flex justify-content-center align-items-center mb-4">
                                    <div className="form-outline flex-fill">
                                      <input
                                        type="text"
                                        id="form2"
                                        placeholder="New Task..."
                                        className="form-control"
                                      />
                                    </div>
                                    <button
                                      type="submit"
                                      className="btn btn-info ms-2 text-light"
                                      style={{
                                        backgroundColor: "steelblue",
                                        borderColor: "steelblue",
                                      }}>
                                      Add
                                    </button>
                                  </form>

                                  {/*// <!-- Tabs navs -->*/}
                                  <ul
                                    className="nav nav-tabs mb-4 pb-2"
                                    id="ex1"
                                    role="tablist">
                                    <li
                                      className="nav-item"
                                      role="presentation">
                                      <a
                                        className="nav-link active"
                                        id="ex1-tab-1"
                                        data-mdb-toggle="tab"
                                        href="#ex1-tabs-1"
                                        role="tab"
                                        aria-controls="ex1-tabs-1"
                                        aria-selected="true">
                                        All
                                      </a>
                                    </li>
                                    <li
                                      className="nav-item"
                                      role="presentation">
                                      <a
                                        className="nav-link"
                                        id="ex1-tab-2"
                                        data-mdb-toggle="tab"
                                        href="#ex1-tabs-2"
                                        role="tab"
                                        aria-controls="ex1-tabs-2"
                                        aria-selected="false">
                                        Active
                                      </a>
                                    </li>
                                    <li
                                      className="nav-item"
                                      role="presentation">
                                      <a
                                        className="nav-link"
                                        id="ex1-tab-3"
                                        data-mdb-toggle="tab"
                                        href="#ex1-tabs-3"
                                        role="tab"
                                        aria-controls="ex1-tabs-3"
                                        aria-selected="false">
                                        Completed
                                      </a>
                                    </li>
                                  </ul>
                                  {/*// <!-- Tabs navs -->*/}

                                  {/*// <!-- Tabs content -->*/}
                                  <div className="tab-content" id="ex1-content">
                                    <div
                                      className="tab-pane fade show active"
                                      id="ex1-tabs-1"
                                      role="tabpanel"
                                      aria-labelledby="ex1-tab-1">
                                      <ul className="list-group mb-0">
                                        <li
                                          className="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                          style={{
                                            backgroundColor: "#f4f6f7",
                                          }}>
                                          <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            aria-label="..."
                                            checked
                                          />
                                          <s>Cras justo odio</s>
                                        </li>
                                        <li
                                          className="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                          style={{
                                            backgroundColor: "#f4f6f7",
                                          }}>
                                          <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            aria-label="..."
                                            checked
                                          />
                                          <s>Dapibus ac facilisis in</s>
                                        </li>
                                        <li
                                          className="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                          style={{
                                            backgroundColor: "#f4f6f7",
                                          }}>
                                          <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            aria-label="..."
                                          />
                                          Morbi leo risus
                                        </li>
                                        <li
                                          className="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                          style={{
                                            backgroundColor: "#f4f6f7",
                                          }}>
                                          <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            aria-label="..."
                                          />
                                          Porta ac consectetur ac
                                        </li>
                                        <li
                                          className="list-group-item d-flex align-items-center border-0 mb-0 rounded"
                                          style={{
                                            backgroundColor: "#f4f6f7",
                                          }}>
                                          <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            aria-label="..."
                                          />
                                          Vestibulum at eros
                                        </li>
                                      </ul>
                                    </div>
                                    <div
                                      className="tab-pane fade"
                                      id="ex1-tabs-2"
                                      role="tabpanel"
                                      aria-labelledby="ex1-tab-2">
                                      <ul className="list-group mb-0">
                                        <li
                                          className="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                          style={{
                                            backgroundColor: "#f4f6f7",
                                          }}>
                                          <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            aria-label="..."
                                          />
                                          Morbi leo risus
                                        </li>
                                        <li
                                          className="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                          style={{
                                            backgroundColor: "#f4f6f7",
                                          }}>
                                          <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            aria-label="..."
                                          />
                                          Porta ac consectetur ac
                                        </li>
                                        <li
                                          className="list-group-item d-flex align-items-center border-0 mb-0 rounded"
                                          style={{
                                            backgroundColor: "#f4f6f7",
                                          }}>
                                          <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            aria-label="..."
                                          />
                                          Vestibulum at eros
                                        </li>
                                      </ul>
                                    </div>
                                    <div
                                      className="tab-pane fade"
                                      id="ex1-tabs-3"
                                      role="tabpanel"
                                      aria-labelledby="ex1-tab-3">
                                      <ul className="list-group mb-0">
                                        <li
                                          className="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                          style={{
                                            backgroundColor: "#f4f6f7",
                                          }}>
                                          <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            aria-label="..."
                                            checked
                                          />
                                          <s>Cras justo odio</s>
                                        </li>
                                        <li
                                          className="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                                          style={{
                                            backgroundColor: "#f4f6f7",
                                          }}>
                                          <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            aria-label="..."
                                            checked
                                          />
                                          <s>Dapibus ac facilisis in</s>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  {/*// <!-- Tabs content -->*/}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="card h-100">
                                <div className="card-body">
                                  <h5
                                    className="card-title mt-1 whatsNew"
                                    style={{ color: "steelblue" }}>
                                    What's new at River's Edge!
                                  </h5>
                                  <hr className="my-4" />
                                  <p className="card-text">
                                    Lorem ipsum dolor sit amet, quando omittam
                                    senserit in eam, nulla eleifend at vel, has
                                    an illud iudicabit. Qui summo eligendi
                                    insolens no, meis erant errem has ei. Id sea
                                    ponderum interpretaris, summo ignota
                                    conclusionemque id mel. Nam ad dicant audiam
                                    indoctum, cu per quis iuvaret, cu justo
                                    posidonium concludaturque qui.Lorem ipsum
                                    dolor sit amet, quando omittam senserit in
                                    eam, nulla eleifend at vel, has an illud
                                    iudicabit. Qui summo eligendi insolens no,
                                    meis erant errem has ei. Id sea ponderum
                                    interpretaris, summo ignota conclusionemque
                                    id mel. Nam ad dicant audiam indoctum, cu
                                    per quis iuvaret, cu justo posidonium
                                    concludaturque qui.Lorem ipsum dolor sit
                                    amet, quando omittam senserit in eam, nulla
                                    eleifend at vel, has an illud iudicabit. Qui
                                    summo eligendi insolens no, meis erant errem
                                    has ei. Id sea ponderum interpretaris, summo
                                    ignota conclusionemque id mel. Nam ad dicant
                                    audiam indoctum, cu per quis iuvaret, cu
                                    justo posidonium concludaturque qui.Lorem
                                    ipsum dolor sit amet, quando omittam
                                    senserit in eam, nulla eleifend at vel, has
                                    an illud iudicabit. Qui summo eligendi
                                    insolens no, meis erant errem has ei. Id sea
                                    ponderum interpretaris, summo ignota
                                    conclusionemque id mel. Nam ad dicant audiam
                                    indoctum, cu per quis iuvaret, cu justo
                                    posidonium concludaturque qui.Lorem ipsum
                                    dolor sit amet, quando omittam senserit in
                                    eam, nulla eleifend at vel, has an illud
                                    iudicabit. Qui summo eligendi insolens no,
                                    meis erant errem has ei.{" "}
                                    <a href="https://repharmacy.com/articles-news-headlines">
                                      {" "}
                                      River's Edge...
                                    </a>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/*<div className="row">*/}
                          {/*  <div className="col-sm-6">*/}
                          {/*    <div className="card" style={{ backgroundColor: "steelblue", height: "20.2rem"}}>*/}
                          {/*      <div className="card-body">*/}
                          {/*        <label className="form-control form-label" htmlFor="" style={{ backgroundColor: "white"}}>*/}
                          {/*          <h5 className="card-title task" style={{ color: "steelblue"}}>What's New at River's Edge</h5>*/}
                          {/*        </label>*/}
                          {/*        <label className="form-label form-control" htmlFor="" style={{ backgroundColor: "white", height: "15.2rem"}}>*/}
                          {/*          <p className="card-text" style={{color: "steelblue", fontSize: "20px"}}>*/}

                          {/*            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Nisl nisi scelerisque eu ultrices.*/}
                          {/*          </p>*/}
                          {/*          /!*<p className="card-text" style={{ color: "white", fontSize: "20px"}}>*!/*/}
                          {/*          /!*  <ul style={{ listStyle: "none",  marginLeft: "-2rem"}}>*!/*/}
                          {/*          /!*    <label className="form-label form-control" htmlFor="" style={{backgroundColor: "steelblue"}}>*!/*/}
                          {/*          /!*      <li style={{ color: "white"}}>Patient 1</li>*!/*/}
                          {/*          /!*    </label>*!/*/}
                          {/*          /!*    <label className="form-label form-control" htmlFor="" style={{backgroundColor: "steelblue"}}>*!/*/}
                          {/*          /!*    <li style={{ color: "white"}}>Patient 2</li>*!/*/}
                          {/*          /!*     </label>*!/*/}
                          {/*          /!*    <label className="form-label form-control" htmlFor="" style={{backgroundColor: "steelblue"}}>*!/*/}

                          {/*          /!*    <li style={{ color: "white"}}>Patient 3</li>*!/*/}
                          {/*          /!*     </label>*!/*/}
                          {/*          /!*    <label className="form-label form-control" htmlFor="" style={{backgroundColor: "steelblue"}}>*!/*/}
                          {/*          /!*    <li style={{ color: "white"}}>Patient 4</li>*!/*/}
                          {/*          /!*     </label>*!/*/}
                          {/*          /!*    <label className="form-label form-control" htmlFor="" style={{backgroundColor: "steelblue"}}>*!/*/}
                          {/*          /!*    <li style={{ color: "white"}}>Patient 5</li>*!/*/}
                          {/*          /!*     </label>*!/*/}
                          {/*          /!*  </ul>*!/*/}
                          {/*          /!*</p>*!/*/}
                          {/*        </label>*/}
                          {/*      </div>*/}
                          {/*    </div>*/}
                          {/*  </div>*/}
                          {/*  <div className="col-sm-6">*/}
                          {/*    <div className="card" style={{ width: "21rem"}}>*/}
                          {/*      <div className="card-body cal">*/}
                          {/*        <div className="container cal">*/}
                          {/*          <h5 className="text datime">Friday, April 29th 2022</h5>*/}
                          {/*        </div>*/}

                          {/*        /!*<p className="card-text">With supporting text below as a natural lead-in to additional*!/*/}
                          {/*        /!*  content.</p>*!/*/}
                          {/*        /!*<a href="#" className="btn btn-success">Go somewhere</a>*!/*/}
                          {/*      </div>*/}
                          {/*    </div>*/}
                          {/*  </div>*/}
                          {/*  <div className="col-sm-6">*/}
                          {/*    <div className="card" style={{ width: "21rem"}}>*/}
                          {/*      <div className="card-body cal">*/}
                          {/*        <div className="container cal">*/}
                          {/*          <h5 className="text datime">Friday, April 29th 2022</h5>*/}
                          {/*        </div>*/}

                          {/*        /!*<p className="card-text">With supporting text below as a natural lead-in to additional*!/*/}
                          {/*        /!*  content.</p>*!/*/}
                          {/*        /!*<a href="#" className="btn btn-success">Go somewhere</a>*!/*/}
                          {/*      </div>*/}
                          {/*    </div>*/}
                          {/*  </div>*/}
                          {/*</div>*/}

                          {/*<div className="container-fluid mb-4">*/}
                          {/*  <div className="row justify-content-center row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">*/}
                          {/*    <div className="col mt-4">*/}
                          {/*      <div className="card">*/}
                          {/*        <img src="https://via.placeholder.com/340x440/7fec59/FFFFFF" alt="..."/>*/}
                          {/*      </div>*/}
                          {/*    </div>*/}
                          {/*    <div className="col mt-4">*/}
                          {/*      <div className="card">*/}
                          {/*        <img src="https://via.placeholder.com/340x440/f9d737/FFFFFF" alt="..."/>*/}
                          {/*      </div>*/}
                          {/*    </div>*/}
                          {/*    <div className="col mt-4">*/}
                          {/*      <div className="card">*/}
                          {/*        <img src="https://via.placeholder.com/340x440/81f0f4/FFFFFF" alt="..."/>*/}
                          {/*      </div>*/}
                          {/*    </div>*/}
                          {/*    <div className="col mt-4">*/}
                          {/*      <div className="card">*/}
                          {/*        <img src="https://via.placeholder.com/340x440/a1adfa/FFFFFF" alt="..."/>*/}
                          {/*      </div>*/}
                          {/*    </div>*/}
                          {/*  </div>*/}
                          {/*</div>*/}
                          {/*<div className="container py-5 h-100">*/}
                          {/*  <div className="row d-flex justify-content-center align-items-center h-100">*/}
                          {/*    <div className="col col-xl-10">*/}

                          {/*      <div className="card">*/}
                          {/*        <div className="card-body p-5">*/}

                          {/*          <form className="d-flex justify-content-center align-items-center mb-4">*/}
                          {/*            <div className="form-outline flex-fill">*/}
                          {/*              <input type="text" id="form2" className="form-control" />*/}
                          {/*              <label className="form-label" for="form2">New task...</label>*/}
                          {/*            </div>*/}
                          {/*            <button type="submit" className="btn btn-info ms-2">Add</button>*/}
                          {/*          </form>*/}

                          {/*          <ul className="nav nav-tabs mb-4 pb-2" id="ex1" role="tablist">*/}
                          {/*            <li className="nav-item" role="presentation">*/}
                          {/*              <a className="nav-link active" id="ex1-tab-1" data-mdb-toggle="tab" href="#ex1-tabs-1" role="tab"*/}
                          {/*                 aria-controls="ex1-tabs-1" aria-selected="true">All</a>*/}
                          {/*            </li>*/}
                          {/*            <li className="nav-item" role="presentation">*/}
                          {/*              <a className="nav-link" id="ex1-tab-2" data-mdb-toggle="tab" href="#ex1-tabs-2" role="tab"*/}
                          {/*                 aria-controls="ex1-tabs-2" aria-selected="false">Active</a>*/}
                          {/*            </li>*/}
                          {/*            <li className="nav-item" role="presentation">*/}
                          {/*              <a className="nav-link" id="ex1-tab-3" data-mdb-toggle="tab" href="#ex1-tabs-3" role="tab"*/}
                          {/*                 aria-controls="ex1-tabs-3" aria-selected="false">Completed</a>*/}
                          {/*            </li>*/}
                          {/*          </ul>*/}

                          {/*          <div className="tab-content" id="ex1-content">*/}
                          {/*            <div className="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel"*/}
                          {/*                 aria-labelledby="ex1-tab-1">*/}
                          {/*              <ul className="list-group mb-0">*/}
                          {/*                <li className="list-group-item d-flex align-items-center border-0 mb-2 rounded"*/}
                          {/*                    style={{backgroundColor: "#f4f6f7"}}>*/}
                          {/*                  <input className="form-check-input me-2" type="checkbox" value="" aria-label="..." checked />*/}
                          {/*                  <s>Cras justo odio</s>*/}
                          {/*                </li>*/}
                          {/*                <li className="list-group-item d-flex align-items-center border-0 mb-2 rounded"*/}
                          {/*                    style={{backgroundColor: "#f4f6f7"}}>*/}
                          {/*                  <input className="form-check-input me-2" type="checkbox" value="" aria-label="..." checked />*/}
                          {/*                  <s>Dapibus ac facilisis in</s>*/}
                          {/*                </li>*/}
                          {/*                <li className="list-group-item d-flex align-items-center border-0 mb-2 rounded"*/}
                          {/*                    style={{backgroundColor: "#f4f6f7"}}>*/}
                          {/*                  <input className="form-check-input me-2" type="checkbox" value="" aria-label="..." />*/}
                          {/*                  Morbi leo risus*/}
                          {/*                </li>*/}
                          {/*                <li className="list-group-item d-flex align-items-center border-0 mb-2 rounded"*/}
                          {/*                    style={{backgroundColor: "#f4f6f7"}}>*/}
                          {/*                  <input className="form-check-input me-2" type="checkbox" value="" aria-label="..." />*/}
                          {/*                  Porta ac consectetur ac*/}
                          {/*                </li>*/}
                          {/*                <li className="list-group-item d-flex align-items-center border-0 mb-0 rounded"*/}
                          {/*                    style={{backgroundColor: "#f4f6f7"}}>*/}
                          {/*                  <input className="form-check-input me-2" type="checkbox" value="" aria-label="..." />*/}
                          {/*                  Vestibulum at eros*/}
                          {/*                </li>*/}
                          {/*              </ul>*/}
                          {/*            </div>*/}
                          {/*            <div className="tab-pane fade" id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">*/}
                          {/*              <ul className="list-group mb-0">*/}
                          {/*                <li className="list-group-item d-flex align-items-center border-0 mb-2 rounded"*/}
                          {/*                    style={{backgroundColor: "#f4f6f7"}}>*/}
                          {/*                  <input className="form-check-input me-2" type="checkbox" value="" aria-label="..." />*/}
                          {/*                  Morbi leo risus*/}
                          {/*                </li>*/}
                          {/*                <li className="list-group-item d-flex align-items-center border-0 mb-2 rounded"*/}
                          {/*                    style={{backgroundColor: "#f4f6f7"}}>*/}
                          {/*                  <input className="form-check-input me-2" type="checkbox" value="" aria-label="..." />*/}
                          {/*                  Porta ac consectetur ac*/}
                          {/*                </li>*/}
                          {/*                <li className="list-group-item d-flex align-items-center border-0 mb-0 rounded"*/}
                          {/*                    style={{backgroundColor: "#f4f6f7"}}>*/}
                          {/*                  <input className="form-check-input me-2" type="checkbox" value="" aria-label="..." />*/}
                          {/*                  Vestibulum at eros*/}
                          {/*                </li>*/}
                          {/*              </ul>*/}
                          {/*            </div>*/}
                          {/*            <div className="tab-pane fade" id="ex1-tabs-3" role="tabpanel" aria-labelledby="ex1-tab-3">*/}
                          {/*              <ul className="list-group mb-0">*/}
                          {/*                <li className="list-group-item d-flex align-items-center border-0 mb-2 rounded"*/}
                          {/*                    style={{backgroundColor: "#f4f6f7"}}>*/}
                          {/*                  <input className="form-check-input me-2" type="checkbox" value="" aria-label="..." checked />*/}
                          {/*                  <s>Cras justo odio</s>*/}
                          {/*                </li>*/}
                          {/*                <li className="list-group-item d-flex align-items-center border-0 mb-2 rounded"*/}
                          {/*                    style={{backgroundColor: "#f4f6f7"}}>*/}
                          {/*                  <input className="form-check-input me-2" type="checkbox" value="" aria-label="..." checked />*/}
                          {/*                  <s>Dapibus ac facilisis in</s>*/}
                          {/*                </li>*/}
                          {/*              </ul>*/}
                          {/*            </div>*/}
                          {/*          </div>*/}

                          {/*        </div>*/}
                          {/*      </div>*/}

                          {/*    </div>*/}
                          {/*  </div>*/}
                          {/*</div>*/}
                          {/*<div className="container-fluid container_task">*/}
                          {/*  <h2>TASK LIST</h2>*/}
                          {/*  <h3>Add Item</h3>*/}
                          {/*  <p>*/}
                          {/*    <input id="new-task" className="form-control-sm mt-3"  size="50" type="text"/>*/}
                          {/*      <button style={{ float: 'right', fontSize: '20px'}}>Add</button>*/}
                          {/*  </p>*/}
                          {/*  <h3>To-do</h3>*/}
                          {/*  <ul id="incomplete-tasks">*/}
                          {/*    <li>*/}
                          {/*      <div className="form-check form-check-inline">*/}
                          {/*        <input className="form-check-input" type="checkbox"/>*/}
                          {/*        <label className="form-check-label">Pay Bills</label>*/}
                          {/*      </div>*/}
                          {/*      <button className="delete">Delete</button>*/}
                          {/*      <button className="edit">Edit</button>*/}
                          {/*    </li>*/}
                          {/*    <li>*/}
                          {/*    <div className="form-check form-check-inline">*/}
                          {/*     <input className="form-check-input" type="checkbox"/>*/}
                          {/*        <label className="form-check-label">Go Shopping</label>*/}
                          {/*    </div>*/}
                          {/*      <button className="delete">Delete</button>*/}
                          {/*      <button className="edit">Edit</button>*/}
                          {/*    </li>*/}
                          {/*  </ul>*/}
                          {/*  <h3>Completed</h3>*/}
                          {/*  <ul id="completed-tasks">*/}
                          {/*    <li>*/}
                          {/*      <div className="form-check form-check-inline">*/}
                          {/*        <input type="checkbox" className="form-check-input" checked/>*/}
                          {/*        <label className="form-check-label">See the Doctor</label>*/}
                          {/*      </div>*/}
                          {/*      <input type="text"/>*/}
                          {/*      <button className="delete">Delete</button>*/}
                          {/*      <button className="edit">Edit</button>*/}
                          {/*    </li>*/}
                          {/*  </ul>*/}
                          {/*</div>*/}
                          {/*<div className="container">*/}
                          {/*  <div className="calendar-container">*/}
                          {/*    <header>*/}
                          {/*      <div className="day">26</div>*/}
                          {/*      <div className="month">April</div>*/}
                          {/*    </header>*/}
                          {/*    <table className="calendar">*/}
                          {/*      <thead>*/}
                          {/*      <tr>*/}
                          {/*        <td>Sun</td>*/}
                          {/*        <td>Mon</td>*/}
                          {/*        <td>Tue</td>*/}
                          {/*        <td>Wed</td>*/}
                          {/*        <td>Thu</td>*/}
                          {/*        <td>Fri</td>*/}
                          {/*        <td>Sat</td>*/}
                          {/*      </tr>*/}
                          {/*      </thead>*/}
                          {/*      <tbody>*/}
                          {/*      <tr>*/}
                          {/*        <td className="prev-month">27</td>*/}
                          {/*        <td className="prev-month">28</td>*/}
                          {/*        <td className="prev-month">29</td>*/}
                          {/*        <td className="prev-month">30</td>*/}
                          {/*        <td className="prev-month">31</td>*/}
                          {/*        <td>1</td>*/}
                          {/*        <td>2</td>*/}
                          {/*      </tr>*/}
                          {/*      <tr>*/}
                          {/*        <td>3</td>*/}
                          {/*        <td>4</td>*/}
                          {/*        <td>5</td>*/}
                          {/*        <td>6</td>*/}
                          {/*        <td>7</td>*/}
                          {/*        <td>8</td>*/}
                          {/*        <td>9</td>*/}
                          {/*      </tr>*/}
                          {/*      <tr>*/}
                          {/*        <td>10</td>*/}
                          {/*        <td>11</td>*/}
                          {/*        <td>12</td>*/}
                          {/*        <td>13</td>*/}
                          {/*        <td>14</td>*/}
                          {/*        <td>15</td>*/}
                          {/*        <td>16</td>*/}
                          {/*      </tr>*/}
                          {/*      <tr>*/}
                          {/*        <td>17</td>*/}
                          {/*        <td>18</td>*/}
                          {/*        <td>19</td>*/}
                          {/*        <td>20</td>*/}
                          {/*        <td>21</td>*/}
                          {/*        <td>22</td>*/}
                          {/*        <td>23</td>*/}
                          {/*      </tr>*/}
                          {/*      <tr>*/}
                          {/*        <td>24</td>*/}
                          {/*        <td>25</td>*/}
                          {/*        <td className="current-day">26</td>*/}
                          {/*        <td>27</td>*/}
                          {/*        <td>28</td>*/}
                          {/*        <td>29</td>*/}
                          {/*        <td>30</td>*/}
                          {/*      </tr>*/}
                          {/*      </tbody>*/}
                          {/*    </table>*/}
                          {/*    <div className="ring-left"></div>*/}
                          {/*    <div className="ring-right"></div>*/}
                          {/*  </div>*/}

                          {/*</div>*/}

                          {/*<div className="row row-cols-1 row-cols-md-3 g-4">*/}
                          {/*  <div className="col">*/}
                          {/*    <div className="card" style={{ width: '18rem'}}>*/}
                          {/*      <img className="card-img-top" src={require('../../images/TaeAugust07.jpg')} alt="Card image cap"/>*/}
                          {/*      <div className="card-body">*/}
                          {/*        <h5 className="card-title">PATIENTS</h5>*/}
                          {/*        <p className="card-text card-text_num">253</p>*/}
                          {/*        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>*/}
                          {/*      </div>*/}
                          {/*    </div>*/}
                          {/*    <div className="col">*/}
                          {/*      <div className="card" style={{ width: '18rem'}}>*/}
                          {/*        <img className="card-img-top" src={require('../../images/TaeAugust07.jpg')} alt="Card image cap"/>*/}
                          {/*        <div className="card-body">*/}
                          {/*          <h5 className="card-title">PATIENTS</h5>*/}
                          {/*          <p className="card-text card-text_num">253</p>*/}
                          {/*          <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>*/}
                          {/*        </div>*/}
                          {/*      </div>*/}
                          {/*    </div>*/}
                          {/*  </div>*/}
                          {/*</div>*/}

                          {/*<div className="card-deck">*/}
                          {/*    <Card style={{ width: '18rem' }}>*/}
                          {/*      <Card.Img variant="top" src={require('../../images/TaeAugust07.jpg')}/>*/}
                          {/*      <Card.Body>*/}
                          {/*        <Card.Title>PATIENTS</Card.Title>*/}
                          {/*        <Card.Text>*/}
                          {/*          253*/}
                          {/*        </Card.Text>*/}
                          {/*      </Card.Body>*/}
                          {/*    </Card>*/}
                          {/*  </div>*/}
                          {/*  <div className="col-sm-6">*/}
                          {/*    <Card style={{ width: '18rem' }}>*/}
                          {/*      <Card.Img variant="top" src={require('../../images/TaeAugust07.jpg')}/>*/}
                          {/*      <Card.Body>*/}
                          {/*        <Card.Title>PATIENTS</Card.Title>*/}
                          {/*        <Card.Text>*/}
                          {/*          253*/}
                          {/*        </Card.Text>*/}
                          {/*      </Card.Body>*/}
                          {/*    </Card>*/}
                          {/*  </div>*/}

                          <br />
                          <div className="row">
                            <div style={{ width: "100%", height: 550 }}>
                              <div
                                className="ag-theme-alpine"
                                style={{ width: "100%", height: "96%" }}>
                                {" "}
                                <button onClick={() => onBtnExport()}>
                                  Download CSV export file
                                </button>
                                <AgGridReact
                                  rowData={referrals}
                                  getRowStyle={getRowStyle}
                                  frameworkComponents={{
                                    totalValueRenderer: TotalValueRenderer,
                                  }}
                                  defaultColDef={{
                                    flex: 1,
                                    minWidth: 100,
                                    filter: true,
                                    resizable: true,
                                  }}
                                  enableRangeSelection={true}
                                  rowSelection={"multiple"}
                                  statusBar={{
                                    statusPanels: [
                                      {
                                        statusPanel:
                                          "agTotalAndFilteredRowCountComponent",
                                        align: "left",
                                      },
                                      {
                                        statusPanel: "agTotalRowCountComponent",
                                        align: "center",
                                      },
                                      {
                                        statusPanel:
                                          "agFilteredRowCountComponent",
                                      },
                                      {
                                        statusPanel:
                                          "agSelectedRowCountComponent",
                                      },
                                      { statusPanel: "agAggregationComponent" },
                                    ],
                                  }}
                                  sideBar={{
                                    toolPanels: [
                                      {
                                        id: "columns",
                                        labelDefault: "Columns",
                                        labelKey: "columns",
                                        iconKey: "columns",
                                        toolPanel: "agColumnsToolPanel",
                                      },
                                      {
                                        id: "filters",
                                        labelDefault: "Filters",
                                        labelKey: "filters",
                                        iconKey: "filter",
                                        toolPanel: "agFiltersToolPanel",
                                      },
                                    ],
                                  }}
                                  columnHoverHighlight={true}
                                  onGridReady={onGridReady}>
                                  <AgGridColumn
                                    field="id"
                                    sortable={true}
                                    filter="agMultiColumnFilter"
                                    checkboxSelection={true}></AgGridColumn>
                                  <AgGridColumn
                                    field="diagnose"
                                    sortable={true}
                                    filter="agMultiColumnFilter"></AgGridColumn>
                                  <AgGridColumn
                                    field="ICD10"
                                    headerName="ICD10"
                                    sortable={true}
                                    filter="agMultiColumnFilter"></AgGridColumn>
                                  <AgGridColumn
                                    field="patient_id"
                                    headerName="Patient ID"
                                    sortable={true}
                                    filter="agMultiColumnFilter"></AgGridColumn>

                                  <AgGridColumn
                                    field="Created_At_Date"
                                    headerName="Created At Date"
                                    filter="agMultiColumnFilter"
                                    sortable={true}></AgGridColumn>
                                  <AgGridColumn
                                    field="Created_At_Time"
                                    headerName="Created At Time"
                                    filter="agMultiColumnFilter"
                                    sortable={true}></AgGridColumn>
                                  {/* <AgGridColumn
                                    field="Status"
                                    filter="agDateColumnFilter"
                                  ></AgGridColumn> */}
                                  <AgGridColumn
                                    field="Updated_at_Date"
                                    headerName="Updated At Date"
                                    hide="true"
                                    sortable={true}
                                    filter="agMultiColumnFilter"></AgGridColumn>
                                  <AgGridColumn
                                    field="Updated_at_Time"
                                    headerName="Updated At Time"
                                    hide="true"
                                    sortable={true}
                                    filter="agMultiColumnFilter"></AgGridColumn>
                                  <AgGridColumn
                                    minWidth={175}
                                    headerName="Details"
                                    cellRenderer="totalValueRenderer"></AgGridColumn>
                                </AgGridReact>
                              </div>
                            </div>

                            {/* Chart */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <footer className="bg-white sticky-footer">
                  <div className="container my-auto">
                    <div className="text-center my-auto copyright">
                      <span>Copyright © NEXTEHEALTH</span>
                    </div>
                  </div>
                </footer>
              </div>{" "}
            </div>
          )}
        </div>
      ) : (
        <Logedout />
      )}
    </div>
  );
}

export default Referrals;
