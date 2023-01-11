import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
// import { useReduxSelector } from '../../Components/SurveyComp/redux';
import Viewer from "../../Components/SurveyComp/Viewer";
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
import Logedout from "../../Components/Logout/Logedout";
import Nav from "./Nav";
import Header from "./Header";
import helper from "../../utils/helper";

const Results = () => {
  const logedin = sessionStorage.getItem("logedin");
  const [survey, setSurvey] = useState([]);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  const database = getDatabase(SurveyHelper.app());

  const getsBy = (id) => {
    return onValue(
      ref(database, `${helper.fireBaseURL.surveys}/` + id),
      (survey) => {
        if (survey.val() !== null) {
          //console.log(survey.val().json);

          setSurvey(survey.val().json);
          //console.log(survey.val().json);
        }

        // ...
      },
      {
        onlyOnce: true,
      }
    );
  };

  useEffect(() => {
    getsBy(id);
  }, [id]);

  return (
    <div>
      {logedin === "true" ? (
        <div id="wrapper">
          <Nav />
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <Header />

              <div className="container-fluid">
                {survey.title === undefined ? (
                  <div
                    class="spinner-border text-center text-primary"
                    style={{ Width: "3rem", Height: "3rem" }}
                    role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <div className="sjs-results-container">
                    <>
                      <div className="pagetitle">
                        <h1>{`${survey.title}  results`}</h1>
                      </div>
                      <Viewer id={id} survey={survey} />
                    </>
                  </div>
                )}{" "}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Logedout />
      )}
    </div>
  );
};

export default Results;
