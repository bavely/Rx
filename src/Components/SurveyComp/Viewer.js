import React, { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useReduxDispatch } from "./redux";
import { load } from "./redux/results";
// import { get } from './redux/surveys'

import { Model } from "survey-core";
import SurveyHelper from "../../utils/SurveyHelper";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  onValue,
  onChildAdded,
  update,
  remove,
} from "firebase/database";
import "tabulator-tables/dist/css/tabulator.css";
import "survey-analytics/survey.analytics.tabulator.css";
const SurveyAnalyticsTabulator = require("survey-analytics/survey.analytics.tabulator");

const Viewer = (props) => {
  var options = {
    haveCommercialLicense: true, //Add this line
  };
  // var visPanel = new SurveyAnalytics.VisualizationPanel(survey.getAllQuestions(), surveyResultsData, options);
  // visPanel.render(YourSurveyResultNode);

  const id = props.id;
  const visContainerRef = useRef(null);
  // const dispatch = useReduxDispatch()
  const [dateinput, setDateinput] = React.useState({
    from: "",
    to: "",
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setDateinput({
      ...dateinput,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(dateinput);
    //console.log(new Date(dateinput.from));
    //console.log(new Date(dateinput.to));
    if (new Date(dateinput.to) >= new Date(dateinput.from)) {
      setRes(
        res.filter((item) => {
          return (
            new Date(item.created_at) >= new Date(dateinput.from) &&
            new Date(item.created_at) <= new Date(dateinput.to)
          );
        })
      );
    }
  };
  const [res, setRes] = React.useState([]);
  const getresBy = () => {
    SurveyHelper.getAllRes().then((res) => {
      //console.log(res);
      if (res.data.All_Patients_Response.length > 0) {
        Promise.all(
          res.data.All_Patients_Response.filter(
            (item) => item.survey_response !== "Hello this is my response"
          )
            .map((i) => {
              //console.log(JSON.parse(i.survey_response));
              i.survey_response = JSON.parse(i.survey_response);
              return i;
            })
            .filter((item) => item.survey_response.surveyId === id)
            .map((i) => {
              //console.log(i);
              i.survey_response.response.created_at = `${
                i.created_at.split("T")[0]
              } ${i.created_at.split("T")[1].split("Z")[0].slice(0, -4)}`;
              return SurveyHelper.handleGetptbyid(i.pt_id).then((res) => {
                //console.log(res);
                i.survey_response.response.firstName =
                  res.data.patient.firstName;
                i.survey_response.response.lastName = res.data.patient.lastName;
                i.survey_response.response.DOB = res.data.patient.DOB;
                i.survey_response.response.providingPharmacy =
                  res.data.patient.providing_pharmacy;
                // i.survey_response.response.phone = res.data.patient.phone;
                return i.survey_response.response;
              });
            })
        ).then((res) => {
          //console.log(res);
          setRes(res);
        });
      } else {
        setRes([]);
      }
    });
  };

  useEffect(() => {
    getresBy();
    // props?.surveys?.pages?.length &&
      props.survey.pages[0].elements.unshift(
        { name: "firstName", type: "text" },
        { name: "lastName", type: "text" },
        { name: "DOB", type: "text" },
        { name: "providingPharmacy", type: "text" },
        // { name: "phone", type: "text" },
        { name: "created_at", type: "text" }
      );
  }, []);

  useEffect(() => {
    //console.log(res);
    (async () => {
      const S = props.survey;
      // S.pages[0].elements.push(
      //   { name: "firstName", type: "text" },
      //   { name: "lastName", type: "text" },
      //   { name: "DOB", type: "text" },
      //   { name: "providingPharmacy", type: "text" },
      //   // { name: "phone", type: "text" },
      //   { name: "created_at", type: "text" }
      // );
      if (visContainerRef.current) {
        var model = new Model(S);
        visContainerRef.current.innerHTML = "";
        var surveyAnalyticsTabulator = new SurveyAnalyticsTabulator.Tabulator(
          model,
          res.map((item) =>
            typeof item === "string" ? JSON.parse(item) : item
          ),
          options
        );
        surveyAnalyticsTabulator.render(visContainerRef.current);
        //console.log(visContainerRef.current);

        // let z = document.createElement('form'); // is a node

        // z.className = " gx-3 gy-2 align-items-center"
        //  z.innerHTML = `
        //  <div class="col-6 mt-2">
        //    <label  for="from">From</label>
        //    <div class="input-group">
        //      <input type="Date" class="form-control" id="from" placeholder="From Date" value={dateinput.from} onChange={handleChanges} />
        //    </div>
        //  </div>
        //  <div class="col-6 mt-2">
        //    <label  for="inlineFormInputGroupUsername">To</label>
        //    <div class="input-group">
        //      <input type="Date" class="form-control" id="inlineFormInputGroupUsername" placeholder="To Date" value={dateinput.to} onChange={handleChanges} />
        //    </div>
        //  </div>

        //  <div class="col-auto mt-2">
        //    <button type="button" class="btn btn-outline-primary" onClick={handleSubmit}>Search</button>
        //  </div>
        // `;
        // document.getElementsByClassName("sa-tabulator__header")[0].appendChild(z);
        // visContainerRef.current.append(z);
      }
    })();
  }, [props.survey, res, options]);

  return (
    <>
      {props.survey === undefined ? (
        <div
          clasNames="spinner-border text-center text-primary"
          style={{ Width: "3rem", Height: "3rem" }}
          role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <form className="row gx-3 gy-2 align-items-center">
            {/* <div className="col-4 mt-2"> */}
            <label htmlFor="from">From</label>
            <div className="input-group">
              <input
                name="from"
                type="Date"
                className="form-control"
                id="from"
                placeholder="From Date"
                value={dateinput.from}
                onChange={handleChanges}
              />
            </div>
            {/* </div> */}
            {/* <div className="col-4 mt-2"> */}
            <label htmlFor="inlineFormInputGroupUsername">To</label>
            <div className="input-group">
              <input
                name="to"
                type="Date"
                className="form-control"
                id="inlineFormInputGroupUsername"
                placeholder="To Date"
                value={dateinput.to}
                onChange={handleChanges}
              />
            </div>
            {/* </div> */}

            {/* <div className="col-2 "> */}
            <div className="input-group">
              <button
                type="button"
                className="btn btn-outline-primary "
                onClick={handleSubmit}>
                Filter
              </button>
              {/* </div> */}
            </div>
            <div className="input-group">
              <button
                type="button"
                className="btn btn-outline-primary "
                onClick={() => {
                  getresBy();
                }}>
                Reset Filter
              </button>
              {/* </div> */}
            </div>
          </form>
          <div className="sjs-results-content" ref={visContainerRef}>
            <div className="sjs-results-placeholder">
              <span>This survey doesn't have any answers yet</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Viewer;
