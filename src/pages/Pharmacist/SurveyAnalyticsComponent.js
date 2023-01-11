/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Analytics from "../../Components/SurveyComp/Analytics";
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

const SurveyAnalyticsComponent = () => {
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
          ////console.log(survey.val().json);
          //       survey.val().json.pages[0].elements = survey.val().json.pages[0].elements.concat(

          // [         { name: "firstName", type: "text" },
          // { name: "lastName", type: "text" },
          // { name: "DOB", type: "text" },
          // { name: "providingPharmacy", type: "text" },
          // { name: "phone", type: "text" },
          // { name: "created_at", type: "text" }]
          // );
          setSurvey(survey.val().json);
          ////console.log(survey.val().json.pages[0].elements);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
              i.survey_response.response.created_at = i.created_at;
              return SurveyHelper.handleGetptbyid(i.pt_id).then((res) => {
                //console.log(res);
                // i.survey_response.response.firstName = res.data.patient.firstName;
                // i.survey_response.response.lastName = res.data.patient.lastName;
                // i.survey_response.response.DOB = res.data.patient.DOB;
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
    //   return  onValue(ref(database, 'res/'), (snapshot) => {
    //       //console.log(snapshot.val())
    //       if(snapshot.val() !== null){
    //           setRes( Object.values( snapshot.val()).filter(i => i.res).map(i => {return i.res}));
    //         //console.log(Object.values( snapshot.val()).filter(i => i.res).map(i => { return i.res}))
    //       }else{
    //           setRes([])
    //       }
    //     }

    //    // ...
    //  , {
    //    onlyOnce: true
    //  });
  };

  useEffect(() => {
    getresBy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                    className="spinner-border text-center text-primary"
                    style={{ Width: "3rem", Height: "3rem" }}
                    role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <div className="sjs-results-container">
                    <div className="pagetitle">
                      <h1>{`${survey.title} results`}</h1>
                    </div>
                    <>
                      <Analytics id={id} survey={survey} res={res} />
                    </>
                  </div>
                )}
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

export default SurveyAnalyticsComponent;
