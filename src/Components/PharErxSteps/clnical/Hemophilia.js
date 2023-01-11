import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../medication";

const Hemophilia = (props) => {
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
          <div className="container container_hemo">
            <form onSubmit={handleSubmit}>
              {/* 3. Diagnosis/Clinical Information */}
              <h3 className="hemo_h3"> Hemophilia / Clinical Information </h3>
              {/* Q1 */}
              <div className="col-md-12">
                <label className="form-label form-control">
                  Has patient been previously treated for this condition? <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Has patient been previously treated for this condition:"
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
                </label>
              </div>
              {/* Q2 */}
              <div className="col-md-12">
                <label className="form-label form-control">
                  {" "}
                  Is patient currently on therapy?
                  <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Is patient currently on therapy:"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Yes </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Is patient currently on therapy:"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                </label>
              </div>
              {/* Q3 */}
              <div className="col-md-12">
                <label className="form-label form-control">
                  {" "}
                  Current Medications:
                  <textarea
                    className="form-control"
                    name="Current Medications:"
                    onChange={handleChange}
                  ></textarea>
                </label>
              </div>
              {/* Q4 */}
              <div className="col-md-12">
                <label className="form-label form-control">
                  Will patient stop taking the above medication(s) before the
                  new medication? <br />
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
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Will patient stop taking the above medication(s) before the new medication:"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                </label>
              </div>
              <label className="form-label form-control">
                {" "}
                Diagnosis (ICD-10 code): &nbsp;
                <input
                  type="text"
                  className="form-control-sm"
                  name="IU/mL"
                  size="10"
                  onChange={handleChange}
                ></input>
              </label>
              {/* Q5 */}
              <div className="col-md-12">
                <label className="form-label form-control">
                  {" "}
                  Provided by: <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Provided by1:"
                      defaultValue="Doctor office"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      {" "}
                      {"Doctor’s Office"}{" "}
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Provided by2:"
                      defaultValue="Caregiver"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Caregiver </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Provided by3"
                      defaultValue="Patient"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Patient </label>
                  </div>
                </label>
              </div>
              {/* Q6 */}
              <div className="col-md-12">
                <label className="form-label form-control">
                  {" "}
                  Training Required:
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Training Required:"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Yes </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-label"
                      name="Training Required:"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> No </label>
                  </div>
                </label>
              </div>
              <label className="form-label form-control" htmlFor="Notes">
                {" "}
                Notes:
                <textarea
                  className="form-control"
                  name="Notes:"
                  onChange={handleChange}
                ></textarea>
              </label>
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
export default Hemophilia;
