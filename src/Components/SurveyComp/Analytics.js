/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "survey-analytics/survey.analytics.min.css";
import { Model } from "survey-core";
import { VisualizationPanel } from "survey-analytics";
import SurveyHelper from "../../utils/SurveyHelper";
import { Chart } from "react-google-charts";
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

function Analytics(props) {
  //console.log(props.survey)
  //console.log(props.res)
  var vizPanelOptions = {
    haveCommercialLicense: true, //Add this line
    allowHideQuestions: false,
  };

  let surveyResults = props.res;
  let surveyJson = props.survey;
  const [survey, setSurvey] = useState(null);
  const [vizPanel, setVizPanel] = useState(null);
  const [totalSurSent, setTotalSurSent] = useState([]);
  const [totalSurCompleted, setTotalSurCompleted] = useState([]);
  const [totalSurCompletedPd, setTotalSurCompletedPd] = useState([]);
  const [totalSurCompletedIrv, setTotalSurCompletedIrv] = useState([]);
  const [totalAgree, setTotaltotalAgree] = useState([]);
  const [totalDisagree, setTotaltotalDisagree] = useState([]);
  const [totalAgreePd, setTotaltotalAgreePd] = useState([]);
  const [totalDisagreePd, setTotaltotalDisagreePd] = useState([]);
  const [totalAgreeIrv, setTotaltotalAgreeIrv] = useState([]);
  const [totalDisagreeIrv, setTotaltotalDisagreeIrv] = useState([]);
  const database = getDatabase(SurveyHelper.app());
  const [dateinput, setDateinput] = useState({
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
      handleData(
        totalSurSent.filter((item) => {
          return (
            new Date(item.date) >= new Date(dateinput.from) &&
            new Date(item.date) <= new Date(dateinput.to)
          );
        })
      );

      handleAgree(
        surveyResults.filter((item) => {
          return (
            new Date(item.created_at) >= new Date(dateinput.from) &&
            new Date(item.created_at) <= new Date(dateinput.to)
          );
        })
      );
    }
  };

  const getAllTokens = () => {
    return onValue(
      ref(database, "tokens/"),
      (snapshot) => {
        if (snapshot.val() !== null) {
          //console.log(snapshot.val())
          handleData(
            Object.values(snapshot.val()).filter(
              (item) => item.servid === props.id
            )
          );
        } else {
          handleData([]);
        }

        // ...
      },
      {
        onlyOnce: true,
      }
    );
  };

  useEffect(() => {
    // surveyJson.pages[0].elements.push(
    //   {
    //     choices: [
    //         {
    //             text: "River's Edge Pharmacy - IRV",
    //             value: "item1"
    //         },
    //         {
    //             text: "River's Edge Pharmacy - PD",
    //             value: "item2"
    //         }
    //     ],
    //     name: "Providing Pharmacy",
    //     type: "radiogroup"
    //   }
    //   );
    getAllTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleData = (data) => {
    //console.log(data)
    setTotalSurSent(data);
    setTotalSurCompleted(data.filter((item) => item.resflag === true));
    setTotalSurCompletedPd(
      data.filter(
        (item) =>
          item.resflag === true &&
          item.location === "River's Edge Pharmacy - PD"
      )
    );
    setTotalSurCompletedIrv(
      data.filter(
        (item) =>
          item.resflag === true &&
          item.location === "River's Edge Pharmacy - IRV"
      )
    );
  };

  const handleAgree = (data) => {
    let good = [];
    let bad = [];
    let pDgood = [];
    let pDbad = [];
    let irvGood = [];
    let irvBad = [];
    //console.log(data)
    //console.log()
    Promise.all(
      // eslint-disable-next-line array-callback-return
      data.map((i) => {
        // eslint-disable-next-line array-callback-return
        Object.values(i).map((item) => {
          if (
            item === "Agree" ||
            item === "Strongly Agree" ||
            item === "item1" ||
            item === "item2"
          ) {
            good.push(item);
          } else if (
            item === "Disagree" ||
            item === "Strongly Disagree" ||
            item === "item4" ||
            item === "item5"
          ) {
            bad.push(item);
          }
          // River's Edge Pharmacy - PD
          //console.log(i)
          if (i.providingPharmacy === "River's Edge Pharmacy - PD") {
            if (
              item === "Agree" ||
              item === "Strongly Agree" ||
              item === "item1" ||
              item === "item2"
            ) {
              pDgood.push(item);
            } else if (
              item === "Disagree" ||
              item === "Strongly Disagree" ||
              item === "item4" ||
              item === "item5"
            ) {
              pDbad.push(item);
            }
          }
          if (i.providingPharmacy === "River's Edge Pharmacy - IRV") {
            if (
              item === "Agree" ||
              item === "Strongly Agree" ||
              item === "item1" ||
              item === "item2"
            ) {
              irvGood.push(item);
            } else if (
              item === "Disagree" ||
              item === "Strongly Disagree" ||
              item === "item4" ||
              item === "item5"
            ) {
              irvBad.push(item);
            }
          }
        });
      })
    ).then(() => {
      setTotaltotalAgree(good);
      setTotaltotalDisagree(bad);
      setTotaltotalAgreePd(pDgood);
      setTotaltotalDisagreePd(pDbad);
      setTotaltotalAgreeIrv(irvGood);
      setTotaltotalDisagreeIrv(irvBad);
    });

    // setTotaltotalAgree( data.filter((item) => Object.values (item).includes("Strongly Agree") || Object.values (item).includes("Agree") || Object.values (item).includes("item1") || Object.values (item).includes("item2")))
    // setTotaltotalDisagree(data.filter((item) => Object.values (item).includes("Strongly Disagree") || Object.values (item).includes("Disagree") || Object.values (item).includes("item4") || Object.values (item).includes("item5")))
  };

  //console.log(totalAgree)
  //console.log(totalDisagree)
  useEffect(() => {
    //  surveyResults = props.res;
    //  surveyJson = props.survey;
    //console.log(surveyJson)

    //console.log(surveyResults)

    handleAgree(surveyResults);
    let su = new Model(surveyJson);
    //console.log(su.getAllQuestions())

    document.getElementById("surveyVizPanel").innerHTML = "";
    let vizP = new VisualizationPanel(
      su.getAllQuestions(),
      surveyResults,
      vizPanelOptions
    );
    vizP.showHeader = false;
    vizP.render("surveyVizPanel");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.res, props.survey]);

  // , ["Satisfied", { v: totalAgree.length,  }], ["Not Satisfied", { v: totalDisagree.length,  }]
  // totalSurSent.length - totalSurCompleted.length
  return (
    <>
      <div className="container-fluid" style={{ overflow: "hidden" }}>
        <form className="row gx-3 my-1  align-items-center">
          <div className="row my-3">
            <div className="form-group col col-12 col-md-4 col-lg-3 col-xl-2">
              <label className="form-label" htmlFor="from">
                From
              </label>
              <div className="input-group">
                <input
                  name="from"
                  type="Date"
                  className="form-control"
                  id="from"
                  style={{ maxWidth: "20ch" }}
                  placeholder="From Date"
                  value={dateinput.from}
                  onChange={handleChanges}
                />
              </div>
            </div>
            <div className="form-group col col-12 col-md-4 col-lg-3 col-xl-2">
              <label
                className="form-label"
                htmlFor="inlineFormInputGroupUsername">
                To
              </label>
              <div className="input-group">
                <input
                  name="to"
                  type="Date"
                  className="form-control"
                  id="inlineFormInputGroupUsername"
                  style={{ maxWidth: "20ch" }}
                  placeholder="To Date"
                  value={dateinput.to}
                  onChange={handleChanges}
                />
              </div>
            </div>
          </div>
          <div className="col mb-3 gap-2 d-flex">
            <div className="form-group mx-1">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={handleSubmit}>
                Filter
              </button>
            </div>
            <div className="form-group d-inline">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => {
                  getAllTokens();
                  handleAgree(props.res);
                }}>
                Reset Filter
              </button>
            </div>
          </div>
        </form>

        <div className="border rounded mb-3 shadow">
          <Chart
            chartType="PieChart"
            data={[
              [`Total Surveys not Completed`, `Total Surveys Completed`],
              ["Completed", totalSurCompleted.length],
              ["Not Completed", totalSurSent.length - totalSurCompleted.length],
            ]}
            options={{
              title: "Total Surveys Completed",
              slices: {
                0: { color: "#19b394" },
                1: { color: "#87A2FB" },
              },
            }}
            width={"100%"}
            height={"400px"}
          />
        </div>

        <div className="border rounded mb-3 shadow">
          <Chart
            chartType="PieChart"
            data={[
              [`Total Surveys Completed-PD`, `Total Surveys Completed-IRV`],
              ["PD", totalSurCompletedPd.length],
              ["IRV", totalSurCompletedIrv.length],
            ]}
            options={{
              // is3D: true,
              title: "Total Surveys Completed Per Location",
              pieHole: 0.3,
              slices: {
                0: { color: "#bc5090" },
                1: { color: "#58508d" },
              },
            }}
            width={"100%"}
            height={"400px"}
          />
        </div>
        <div className="border rounded mb-3 shadow">
          <Chart
            chartType="PieChart"
            data={[
              [`Satisfied`, `Not Satisfied`],
              ["Satisfied", totalAgree.length],
              ["Not Satisfied", totalDisagree.length],
            ]}
            options={{
              title: "Satisfaction Rate",
              slices: {
                0: { color: "#00af63" },
                1: { color: "#ef2731" },
              },
            }}
            width={"100%"}
            height={"400px"}
          />
        </div>
        <div className="border rounded mb-3 shadow">
          <Chart
            chartType="PieChart"
            data={[
              [`Satisfied-PD`, `Not Satisfied-PD`],
              ["Satisfied", totalAgreePd.length],
              ["Not Satisfied", totalDisagreePd.length],
            ]}
            options={{
              title: "Satisfaction Rate-PD",
              slices: {
                0: { color: "#00af63" },
                1: { color: "#ef2731" },
              },
            }}
            width={"100%"}
            height={"400px"}
          />
        </div>
        <div className="border rounded mb-3 shadow">
          <Chart
            chartType="PieChart"
            data={[
              [`Satisfied-IRV`, `Not Satisfied-IRV`],
              ["Satisfied", totalAgreeIrv.length],
              ["Not Satisfied", totalDisagreeIrv.length],
            ]}
            options={{
              title: "Satisfaction Rate-IRV",
              slices: {
                0: { color: "#00af63" },
                1: { color: "#ef2731" },
              },
            }}
            width={"100%"}
            height={"400px"}
          />
        </div>
        <div className="row d-flex justify-content-center">
          <div className="border rounded mb-3 shadow col-11 col-md-6 col-lg-4 px-1">
            <Chart
              chartType="Table"
              data={[
                ["", ""],
                ["Total Surveys Sent", { v: totalSurSent.length }],
                ["Total Surveys Completed", { v: totalSurCompleted.length }],
                [
                  "Total Surveys Not Completed",
                  { v: totalSurSent.length - totalSurCompleted.length },
                ],
                [
                  "Total Surveys Completed-PD",
                  { v: totalSurCompletedPd.length },
                ],
                [
                  "Total Surveys Completed-IRV",
                  { v: totalSurCompletedIrv.length },
                ],
                ["Satisfied", { v: totalAgree.length }],
                ["Not Satisfied", { v: totalDisagree.length }],
                ["Satisfied PD Location", { v: totalAgreePd.length }],
                ["Not Satisfied PD Location", { v: totalDisagreePd.length }],
                ["Satisfied IRV Location", { v: totalAgreeIrv.length }],
                ["Not Satisfied IRV Location", { v: totalDisagreeIrv.length }],
              ]}
              options={{
                title: "Company Performance",
                curveType: "function",
                legend: { position: "bottom" },
                pageSize: 20,
                width: "100%",
                height: "auto",
                alternatingRowStyle: true,
              }}
            />
          </div>
        </div>
        <div id="surveyVizPanel"></div>
      </div>
    </>
  );
}

export default Analytics;
