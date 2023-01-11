import React, { useState, useEffect } from "react";
import { Importer, ImporterField } from "react-csv-importer";
import Logedout from "../../Components/Logout/Logedout";
import Nav from "./Nav";
import Header from "./Header";
import TableViewer from "react-js-table-with-csv-dl";
import SurveyHelper from "../../utils/SurveyHelper";
import { v4 as uuidv4 } from "uuid";
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
// include the widget CSS file whichever way your bundler supports it
import "react-csv-importer/dist/index.css";
import helper from "../../utils/helper";

function UploadCSV() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  const logedin = sessionStorage.getItem("logedin");
  const [table, setTable] = useState({
    columns: [],
    data: [],
  });
  const [errors, setErrors] = useState({
    count: 0,
    flag: false,
  });
  // const [data, setData] = useState([]);
  const [validData, setValidData] = useState([]);
  const [loadingflag, setLoadingflag] = useState("init");

  const data = [];
  const [tokList, setTokList] = useState([]);
  const sixweeks = [];
  const [sixweekscount, setSixweeksCount] = useState(0);
  const optedout = [];
  const [optedoutcount, setOptedoutCount] = useState(0);
  const database = getDatabase(SurveyHelper.app());

  const gettBy = () => {
    return onValue(
      ref(database, `${helper.fireBaseURL.tokens}/`),
      (to) => {
        if (to.val() !== null) {
          //console.log(Object.values(to.val()));
          setTokList(Object.values(to.val()));
        } else {
          setTokList([]);
        }

        // ...
      },
      {
        onlyOnce: true,
      }
    );
  };

  useEffect(() => {
    if (table.data.length > 0) {
      let count = table.data.filter((i) => i.success === false).length;
      if (count > 0) {
        setErrors({
          count: count,
          flag: true,
        });
      }
      gettBy();
    }
  }, [table]);

  const handleChange = (e) => {
    setErrors({
      count: errors.count,
      flag: false,
    });
    setTable({
      columns: table.columns,
      data: table.data.filter((i) => i.success === true),
    });
  };

  const handleSend = () => {
    // const map1 = {}
    setLoadingflag("loading");
    let sorted = table.data.sort(function (a, b) {
      if (a.fname < b.fname) {
        return -1;
      }
      if (a.fname > b.fname) {
        return 1;
      }
      return 0;
    });

    //    let u = unique(sorted,(a, b) => (a.fname === b.fname) & (a.lname === b.lname) & (a.dob === b.dob) );

    //   //  (a.fname === b.fname) & (a.lname === b.lname) & (a.dob === b.dob)
    // //console.log(u);

    const vdata = table.data.map((i) => {
      let hash = `${i.fname}${i.lname}${i.dob}`;

      return [hash, i];
    });
    Promise.all(vdata).then((values) => {
      let uniquekeys = [];
      let uniquevalues = [];

      Promise.all(
        values.map((c) => {
          if (!uniquekeys.includes(c[0])) {
            uniquekeys.push(c[0]);
            uniquevalues.push(c[1]);
          } else {
            // uniquekeys.indexOf(c[0])
            if (
              uniquevalues[uniquekeys.indexOf(c[0])].dispenseDate <
              c[1].dispenseDate
            ) {
              uniquevalues[uniquekeys.indexOf(c[0])] = c[1];
            } else {
              uniquevalues[uniquekeys.indexOf(c[0])] =
                uniquevalues[uniquekeys.indexOf(c[0])];
            }
          }
        })
      ).then((values) => {
        setTable({
          columns: table.columns,
          data: uniquevalues.sort(function (a, b) {
            if (a.fname < b.fname) {
              return -1;
            }
            if (a.fname > b.fname) {
              return 1;
            }
            return 0;
          }),
        });

        uniquevalues.map((i) => {
          return SurveyHelper.hendleStorPts(i, id).then((res) => {
            if (res.status === 200) {
              // res.data.patinet_id
              console.log(res);
              console.log(tokList);
              SurveyHelper.handleGetptbyid(res.data.patinet_id).then((r) => {
                ////console.log(r);
                if (r.status === 200) {
                  if (
                    r.data.patient === undefined ||
                    r.data.message === "No patient found!" ||
                    r.data.patient.optOut === false ||
                    r.data.patient.optOut === 0
                  ) {
                    let sorted =
                      tokList.length > 0
                        ? tokList
                            .filter(
                              (t) =>
                                t.ptid === res.data.patinet_id &&
                                t.servid === id
                            )
                            .sort((b, a) => {
                              return a.created_at > b.created_at
                                ? -1
                                : b.created_at > a.created_at
                                ? 1
                                : 0;
                            })
                        : [];
                    ////console.log(sorted);
                    let now = new Date();
                    let last =
                      sorted[0] === undefined
                        ? new Date(
                            "Mon Sep 26 2005 02:09:04 GMT-0700 (Pacific Daylight Time)"
                          )
                        : new Date(sorted[0].date);
                    let diff = Math.abs(now - last);
                    let sixweeksms = 6 * 7 * 24 * 60 * 60 * 1000;
                    ////console.log(diff);
                    ////console.log(sixweeksms);
                    ////console.log(diff > sixweeksms);
                    ////console.log(sorted.length === 0);
                    if (diff > sixweeksms || sorted.length === 0) {
                      ////console.log("Test");
                      let token = uuidv4();
                      SurveyHelper.setrToken(
                        id,
                        i.dispenseDate,
                        res.data.patinet_id,
                        false,
                        token,
                        i.patientCompany,
                        i.pharmacyNPI
                      );
                      const EmailMessage = `<!DOCTYPE html>
      <html style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
      <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Actionable emails e.g. reset password</title>
      
      
      <style type="text/css">
      img {
      max-width: 100%;
      }
      body {
      -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;
      }
      body {
      background-color: #f6f6f6;
      }
      @media only screen and (max-width: 640px) {
        body {
          padding: 0 !important;
        }
        h1 {
          font-weight: 800 !important; margin: 20px 0 5px !important;
        }
        h2 {
          font-weight: 800 !important; margin: 20px 0 5px !important;
        }
        h3 {
          font-weight: 800 !important; margin: 20px 0 5px !important;
        }
        h4 {
          font-weight: 800 !important; margin: 20px 0 5px !important;
        }
        h1 {
          font-size: 22px !important;
        }
        h2 {
          font-size: 18px !important;
        }
        h3 {
          font-size: 16px !important;
        }
        .container {
          padding: 0 !important; width: 100% !important;
        }
        .content {
          padding: 0 !important;
        }
        .content-wrap {
          padding: 10px !important;
        }
        .invoice {
          width: 100% !important;
        }
      }
      </style>
      </head>
      
      <body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">
      
      <table class="body-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
          <td class="container" width="600" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">
            <div class="content" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
              <table class="main" width="100%" cellpadding="0" cellspacing="0" itemprop="action" itemscope itemtype="http://schema.org/ConfirmAction" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">
                    <meta itemprop="name" content="Confirm Email" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" /><table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                       Dear ${i.fname} ${i.lname} (or legal guardian),
                        </td>
                      </tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                      At ${i.patientCompany}, providing you the very best in health care is our top priority. We gauge success on maintaining the satisfaction of our patients and their families. As a promise to continually improve our services, we ask for your feedback both in areas we can improve and where you think we do well.
                      It's our mission to take this feedback and improve the patient experience for you and others. We appreciate your time and ask that you spend just a few minutes with this short survey by using the link below. Anything that you share is confidential, and you are encouraged to tell us exactly what you think.  
                      Thank you for your feedback.
                        </td>
                      </tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                          <a href="${helper.frontEndBaseUrl}/run/?id=${id}&pid=${res.data.patinet_id}&pdate=${i.dispenseDate}&token=${token}" class="btn-success" itemprop="url" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #348eda; margin: 0; border-color: #348eda; border-style: solid; border-width: 10px 20px;">Start Survey</a>
                        </td>
                      </tr><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                          &mdash; Sincerely,
                          Admin/Compliance Officer ${i.patientCompany}
                        </td>
                      </tr></table></td>
                </tr></table><div class="footer" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">
                <table width="100%" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="aligncenter content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; color: #999; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top">If you do not wish to participate, please click on the follwing link ${helper.frontEndBaseUrl}/optout/?id=${res.data.patinet_id} to opt out of this survey.</td>
                  </tr></table></div></div>
          </td>
          <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
        </tr></table></body>
      </html>`;

                      let SmsMessage = `River's Edge Pharmacy would like your feedback. Please rate them at ${helper.frontEndBaseUrl}/run/?id=${id}&pid=${res.data.patinet_id}&pdate=${i.dispenseDate}&token=${token}  .
      To opt out, click on the follwing link ${helper.frontEndBaseUrl}/optout/?id=${res.data.patinet_id} .`;

                      // //console.log(
                      //   `https://curo-frontend-stag.azurewebsites.net/run/?id=${id}&pid=${res.data.patinet_id}&pdate=${i.dispenseDate}&token=${token}`
                      // );
                      if (
                        i.patientPhone &&
                        i.patientPhone !== "Invalid or blank phone number"
                      ) {
                        SurveyHelper.surveySMS(i.patientPhone, SmsMessage).then(
                          (res) => {
                            if (res.status === 200) {
                              //console.log(res);
                              setLoadingflag("sent");
                            }
                          }
                        );
                      } else if (i.email) {
                        SurveyHelper.surveyEmail(i.email, EmailMessage).then(
                          (res) => {
                            //console.log(res);
                            setLoadingflag("sent");
                          }
                        );
                      }
                    } else {
                      sixweeks.push(i);
                      ////console.log(sixweeks);
                      setSixweeksCount(sixweeks.length);
                      setLoadingflag("sent");
                    }

                    // //console.log(diff <= sixweeksms)
                  } else if (
                    r.data.patient.optOut === true ||
                    r.data.patient.optOut === 1
                  ) {
                    optedout.push(i);
                    setOptedoutCount(optedout.length);
                  }
                }
              });
            }
          });
        });
      });
    });
    // Start to find patient id and check if it exists and set the newest dispence date from the file.
    // Get all responses and check if it is more than 6 weeks.
    // Send the survey url with pt id and survey id to the patient who is due for a survey.
  };

  //console.log(sixweeks);

  return (
    <div>
      {logedin === "true" ? (
        <div id="wrapper">
          <Nav />
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <Header />

              <div className="container-fluid">
                <div className="pagetitle">
                  <h1>Surveys Recipents CSV </h1>
                </div>

                <Importer
                  chunkSize={100000} // optional, internal parsing chunk size in bytes
                  assumeNoHeaders={false} // optional, keeps "data has headers" checkbox off by default
                  restartable={false} // optional, lets user choose to upload another file when import is complete
                  skipEmptyLines={"greedy"} // optional, skips empty lines in the CSV file
                  onStart={({ file, fields }) => {
                    // optional, invoked when user has mapped columns and started import
                  }}
                  processChunk={async (rows) => {
                    // required, receives a list of parsed objects based on defined fields and user column mapping;
                    // may be called several times if file is large
                    // (if this callback returns a promise, the widget will wait for it before parsing more data)

                    rows.map((row) => {
                      data.push(row);
                    });

                    // mock timeout to simulate processing
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                  }}
                  onComplete={({ file, fields, preview }) => {
                    function formatPhoneNumber(phoneNumberString) {
                      var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
                      var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
                      if (match) {
                        const inv = [
                          "800",
                          "888",
                          "877",
                          "866",
                          "855",
                          "844",
                          "833",
                          "800",
                          "888",
                          "877",
                          "866",
                          "855",
                          "844",
                          "833",
                          "001",
                          "011",
                          "002",
                          "000",
                        ];
                        if (inv.includes(match[1])) {
                          return "Invalid or blank phone number";
                        }
                        return match[1] + match[2] + match[3];
                      }
                      return "Invalid or blank phone number";
                    }

                    fields.push("Notes");

                    setTable({
                      columns: fields,
                      data:
                        data.length > 0
                          ? data.map((item) => {
                              item.patientPhone = formatPhoneNumber(
                                item.patientPhone
                              );
                              if (
                                (item.patientPhone ===
                                  "Invalid or blank phone number" &&
                                  item.email === "") ||
                                item.dob === "" ||
                                item.fname === "" ||
                                item.lname === ""
                              ) {
                                item.Notes = "Missing required fields";
                                item.success = false;
                              } else {
                                item.success = true;
                                item.Notes = "";
                              }
                              return item;
                            })
                          : [],
                    });

                    // optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
                  }}
                  // onClose={() => {
                  //   // optional, invoked when import is done and user clicked "Finish"
                  //   // (if this is not specified, the widget lets the user upload another file)
                  //   //console.log("importer dismissed");
                  //   //console.log(data);
                  //   // send RUN url to the server to send emails or sms (get survey id from url)
                  // }}
                >
                  <ImporterField name="fname" label="Patient First Name" />
                  <ImporterField name="lname" label="Patient Last Name" />
                  <ImporterField name="dob" label="Date of Birth" />
                  <ImporterField name="mrn" label="Patient MRN" optional />
                  <ImporterField
                    name="patientPhone"
                    label="Patient Phone"
                    optional
                  />
                  <ImporterField name="email" label="Patient Email" optional />
                  <ImporterField
                    name="zipCode"
                    label="Patient Zip Code"
                    optional
                  />
                  <ImporterField
                    name="patientCompany"
                    label="Patient Company"
                  />
                  <ImporterField name="dispenseDate" label="Dispense Date" />
                  <ImporterField
                    name="dispensePayorType"
                    label="Dispense Payor Type"
                  />
                  <ImporterField name="pharmacyNPI" label="Pharmacy NPI" />
                  <>
                    {table.data.length > 0 ? (
                      <>
                        <>
                          {errors.flag ? (
                            <div
                              className="alert alert-danger mt-2 p-2"
                              role="alert">
                              {errors.count} errors have been detected in the
                              file. Please review and fix them to continue. You
                              can achive that by download CSV file using
                              "Download Table Data" button bellow. If you wish
                              to
                              <strong>
                                ignore the incomplete data and send survey with
                                complete data only
                              </strong>
                              please flip the following switch
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  onChange={handleChange}
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                />
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </>
                        {loadingflag === "sent" ? (
                          <div
                            className="alert alert-warning mt-2 p-2"
                            role="alert">
                            {table.data.length - sixweekscount - optedoutcount}{" "}
                            records have been sent. {sixweekscount} records not
                            send as been sent within last six weeks.{" "}
                            {optedoutcount} patient/s requested opt-out.
                          </div>
                        ) : (
                          <div
                            className="alert alert-info mt-2 p-2"
                            role="alert">
                            {table.data.length} records have been detected in
                            the file.
                          </div>
                        )}
                        <TableViewer
                          title="Data Preview"
                          content={table.data}
                          headers={table.columns}
                          minHeight={0}
                          maxHeight={400}
                          searchEnabled={true}
                          pagination={50}
                          renderLineNumber={true}
                          activateDownloadButton={true}
                        />{" "}
                        <>
                          {errors.flag ? (
                            <button
                              type="button"
                              className="btn btn-success float-end mr-5"
                              disabled>
                              Send
                            </button>
                          ) : loadingflag === "loading" ? (
                            <button
                              className="btn btn-success float-end mr-5"
                              type="button"
                              disabled>
                              <span
                                class="spinner-grow spinner-grow-sm"
                                role="status"
                                aria-hidden="true"></span>
                              Sending...
                            </button>
                          ) : loadingflag === "sent" ? (
                            <button
                              type="button"
                              className="btn btn-success float-end mr-5"
                              disabled>
                              Sent
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-success float-end mr-5"
                              onClick={handleSend}>
                              Send
                            </button>
                          )}
                        </>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                </Importer>
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

export default UploadCSV;
