import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/dashboard.css";

export default function Cards({ providers, patients }) {
  const navigate = useNavigate();

  let date = new Date();
  const options1 = {
    weekday: "long",
  };
  const options2 = {
    month: "long",
    day: "numeric",
  };
  let day_text = Intl.DateTimeFormat("en-US", options1).format(date);
  let date_text = Intl.DateTimeFormat("en-US", options2).format(date);

  return (
    <div className="row main mb-3">
      <div
        className="col-sm-3 dash-card my-1 "
        onClick={() => {
          navigate("/patient_manage_ph");
        }}>
        <div className="card py-2 py-md-0">
          <img
            className="card-img-top d-none d-lg-block"
            src={require("../../images/drdesk.png")}
            alt="Card cap"
          />
          <div className="card-body">
            <h5 className="card-title my-0">PATIENTS</h5>
            <p className="card-text card-text_num fw-bold my-0">
              {patients || 0}
            </p>
          </div>
        </div>
      </div>
      <div
        className="col-sm-3  dash-card my-1 "
        onClick={() => {
          navigate("/provider_manage");
        }}>
        <div className="card py-2 py-md-0">
          <img
            className="card-img-top d-none d-lg-block"
            src={require("../../images/TaeAugust11.jpg")}
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title  my-0">PROVIDERS</h5>
            <p className="card-text card-text_num fw-bold my-0">
              {providers || 0}
            </p>
          </div>
        </div>
      </div>
      <div className="col-sm-3  dash-card my-1 ">
        <div className="card py-2 py-md-0">
          <img
            className="card-img-top d-none d-lg-block"
            src={require("../../images/AdobeStock_311305302.png")}
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title  my-0">REFERRALS</h5>
            <p className="card-text card-text_num fw-bold my-0">
              {window.sessionStorage.getItem("ref") || 0}
            </p>
          </div>
        </div>
      </div>
      <div className="col-sm-3 dash-card my-1 ">
        <div className="card py-2 py-md-0">
          <img
            className="card-img-top d-none d-lg-block py-0 my-0"
            src={require("../../images/Doctor prescribing drug to happy family.png")}
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title  my-0 text-uppercase">{day_text}</h5>
            <p className="card-text card-text_num fw-bold my-0">
              {date_text}
              {date_text && date_text.split(" ") === 1
                ? "st"
                : date_text.split(" ") === 2
                ? "nd"
                : date_text.split(" ") === 3
                ? "rd"
                : "th"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
