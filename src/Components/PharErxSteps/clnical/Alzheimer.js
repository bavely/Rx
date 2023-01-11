import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../medication";
import "../../../css/bootstrap.min.css";
import "../../../css/CuruRx_forms_Styles.css";

const Alzheimer = (props) => {
  // No Changes for the state

  console.log(props);
  const [QA, setQA] = useState();
  const [rx, setRx] = useState({
    step: props.data.step,
    therapy: props.data.therapy !== "" ? props.data.therapy : "",
    ICD10: props.data.ICD10 !== "" ? props.data.ICD10 : "",
    diagnose: props.data.diagnose !== "" ? props.data.diagnose : "",
    provider_id:
      props.data.provider_id !== "" ? props.data.provider_id : "",
    patient_id: props.data.patient_id !== "" ? props.data.patient_id : "",
    clinicalinfo: props.data.clinicalinfo !== [] ? props.data.clinicalinfo : [],
    medications: props.data.medications !== [] ? props.data.medications : [],
    provider_name: props.data.provider_name !== ""  ? props.data.provider_name : "",
    patient_name: props.data.patient_name !== ""  ? props.data.patient_name : "",
  });

  console.log(rx, "from heellsdj");

  // No Changes  handleChange

  const handleChange = (event) => {
    setQA({ ...QA, [event.target.name]: event.target.value });
    console.log(QA);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(QA);
    if (QA) {
      var arr = Object.keys(QA).map(function (key) {
        return { [key]: QA[key] };
      });

      const ms = arr.map((x) => {
        for (const [key, value] of Object.entries(x)) {
          return { question: key, answer: value };
        }
      });
      setRx({ ...rx, clinicalinfo: [ms] });
      rx.clinicalinfo = [ms];
      props.updata("medication", rx);
    } else if (!QA) {
      setRx({ ...rx, clinicalinfo: [] });
      props.updata("medication", rx);
    }
  };
  console.log(rx, "rx");
  return (
    <>
      {rx.step === "clinical" ? (
        <div>
          {/* <Steps data={{ ...rx }} /> */}
          <div className="container container_alzheimer">
            <form onSubmit={handleSubmit}>
              <h3 className="alzheimer_h3 mb-3">
                {" "}
                Alzheimer / Clinical Information{" "}
              </h3>
              <div className="col-md-12">
                <div className="form-control mb-2">
                  <label className="form-label">
                    Baseline Brain MRI within last year:
                  </label>{" "}
                  <br />
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Baseline Brain MRI within last year"
                      id="inlineRadio1"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />{" "}
                    <label
                      htmlFor="html"
                      for="Baseline Brain MRI within last year"
                      className="form-check-label"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Baseline Brain MRI within last year"
                      id="inlineRadio2"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="css"
                      for="Baseline Brain MRI within last year"
                      className="form-check-label"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
              {/* 3. DIAGNOSIS / CLINICAL INFORMATION */}
              <div className="col-md-12">
                <div className="form-control mb-2">
                  <label className="form-label">Date of last Brain MRI: </label>
                  <input
                    className="form-control"
                    type="date"
                    name="Date of last Brain MRI"
                    onChange={handleChange}
                  />{" "}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-control mb-2">
                  <label className="form-label">
                    Brain MRI before 7th dose:
                  </label>
                  <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Brain MRI before 7th dose"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="Brain MRI before 7th dose Yes"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Brain MRI before 7th dose"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="Brain MRI before 7th dose No"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-control mb-2">
                  <label className="form-label">
                    Date of MRI before 7th dose:{" "}
                  </label>
                  <input
                    className="form-control mb-2"
                    type="date"
                    name="Date of MRI before 7th dose"
                    onChange={handleChange}
                  ></input>{" "}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-control mb-2">
                  <label className="form-label">
                    Brain MRI before 12th dose:{" "}
                  </label>
                  <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Brain MRI before 12th dose"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="Brain MRI before 12th dose"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Brain MRI before 12th dose"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="Brain MRI before 12th dose No"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <label className="form-label form-control">
                  Date of MRI before 12th dose:
                  <input
                    className="form-control"
                    type="date"
                    name="Date of MRI before 12th dose"
                    onChange={handleChange}
                  ></input>{" "}
                </label>
              </div>
              <div className="form-control mb-2">
                <label className="form-label">
                  Cognitive Assessment done:{" "}
                </label>
                <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Cognitive Assessment done"
                    defaultValue="Yes"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="Cognitive Assessment done Yes"
                  >
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Cognitive Assessment done"
                    defaultValue="No"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="Cognitive Assessment done No"
                  >
                    No
                  </label>
                </div>
              </div>
              <div className="col-md-12">
                <label className="form-label form-control">
                  {" "}
                  Date of Cognitive Assessment:
                  <input
                    className="form-control"
                    type="date"
                    name="Date of Cognitive Assessment"
                    onChange={handleChange}
                  ></input>{" "}
                </label>
              </div>

              <div className="col-md-12">
                <label className="form-label form-control">
                  {" "}
                  Name of Assessment:
                  <textarea
                    className="form-control"
                    type="text"
                    name="Name of Assessment"
                    onChange={handleChange}
                  ></textarea>{" "}
                </label>
              </div>

              <div className="col-md-12">
                <label className="form-label form-control">
                  {" "}
                  Date of Assessment:
                  <input
                    className="form-control"
                    type="date"
                    name="Date of Assessment"
                    onChange={handleChange}
                  ></input>{" "}
                </label>
              </div>
              <div className="d-grid gap-2 col-md-12 mb-2 mx-auto">
                <button
                  className="btn btn-outline-primary btn_alz"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
            <br />
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Alzheimer;
