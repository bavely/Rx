import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../medication";

const MultipleSclerosis = (props) => {
  // No Changes for the state

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
  };

  const handleSubmit = (event) => {
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

    event.preventDefault();
  };

  return (
    <>
      {rx.step === "clinical" ? (
        <div>
          {/* <Steps data={{ ...rx }} /> */}
          <div className="container container_hemat">
            <form onSubmit={handleSubmit}>
              {/* 3. Diagnosis/Clinical Information */}
              <h3 className="hemo_h3">
                {" "}
                Multiple Sclerosis / Clinical Information{" "}
              </h3>
              {/* Q1 */}
              <div className="form-control mb-2">
                <label className="form-label">
                  Has patient been previously treated for this condition?
                </label>
                <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="Has patient been previously treated for this condition:"
                    className="form-check-input"
                    defaultValue="Yes"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> Yes </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Has patient been previously treated for this condition:"
                    defaultValue="No"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> No </label>
                </div>
              </div>
              {/* Q2 */}
              <div className="form-control mb-2">
                <label className="form-label">
                  {" "}
                  Is patient currently on therapy?{" "}
                </label>{" "}
                <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Is patient currently on therapy:"
                    defaultValue="Yes"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="Is patient currently on therapy:"
                    className="form-check-input"
                    defaultValue="No"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
              {/* Q3 */}
              <div className="form-control mb-2">
                <label className="form-label"> Current Medications: </label>
                <input
                  type="text"
                  className="form-control"
                  name="Current Medications:"
                  size="60"
                  onChange={handleChange}
                />
              </div>
              {/* Q4 */}
              <div className="form-control mb-2">
                <label className="form-label">
                  Will patient stop taking the above medication(s) before the
                  new medication?
                </label>{" "}
                <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Will patient stop taking the above medication(s) before the new medication:"
                    defaultValue="Yes"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> Yes </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Will patient stop taking the above medication(s) before the new medication:"
                    defaultValue="No"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
              <div className="form-control mb-2">
                <label className="form-label"> Diagnosis (ICD-10 code): </label>
                &nbsp;
                <input
                  type="text"
                  className="form-control-sm"
                  name="Other:"
                  size="5"
                  onChange={handleChange}
                />
              </div>
              <div className="d-grid gap-2 col-md-12 mx-auto">
                <button
                  className="btn btn-outline-primary btn_ast"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default MultipleSclerosis;
