import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../Medication";

const OralOncology = (props) => {
  // No Changes for the state

  const [QA, setQA] = useState();
  const [rx, setRx] = useState({
    step: props.data.step,
    therapy: props.data.therapy,
    ICD10: props.data.ICD10,
    diagnose: props.data.diagnose,
    provider_id: props.data.provider_id,
    patient_id: props.data.patient_id,
    clinicalinfo: [],
    medications: [],
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
      setRx({ ...rx, clinicalinfo: [ms], step: "medication" });
    } else if (!QA) {
      setRx({ ...rx, clinicalinfo: [], step: "medication" });
    }

    event.preventDefault();
  };

  return (
    <>
      {rx.step === "clinical" ? (
        <div>
          <Steps data={{ ...rx }} />
          <div className="container container_hemat">
            <form onSubmit={handleSubmit}>
              {/* 3. Diagnosis/Clinical Information */}
              <h3 className="hemo_h3"> Oral Oncology / Clinical Information </h3>
              {/* Q1 */}
              <div className="form-control mb-2">
                <label className="form-label">Has patient been previously treated for this condition?</label> <br/>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Has patient been previously treated for this condition:" defaultValue="Yes" onChange={handleChange}/>
                  <label className="form-check-label"> Yes </label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Has patient been previously treated for this condition:" defaultValue="No" onChange={handleChange}/>
                  <label className="form-check-label" defaultValue="No"> No </label>
                </div>
              </div>

              {/* Q2 */}
              <div className="form-control mb-2">
                <label className="form-label"> Is patient currently on therapy? </label> <br/>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Is patient currently on therapy:" defaultValue="Yes" onChange={handleChange}/>
                  <label className="form-check-label" defaultValue="Yes"> Yes </label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Is patient currently on therapy:" defaultValue="No" onChange={handleChange}/>
                  <label className="form-check-label" defaultValue="No">No</label>
                </div>
              </div>

              {/* Q3 */}
              <div className="form-control mb-2">
                <label className="form-label"> Current Medications: </label>
                <input type="text" className="form-control" name="Current Medications:" size="60" onChange={handleChange}/>
              </div>

              {/* Q4 */}
              <div className="form-control mb-2">
                <label>Will patient stop taking the above medication(s) before the new medication?</label> <br/>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Will patient stop taking the above medication(s) before the new medication:" defaultValue="Yes" onChange={handleChange}/>
                  <label className="form-label" defaultValue="Yes"> Yes </label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Will patient stop taking the above medication(s) before the new medication:" defaultValue="No" onChange={handleChange}/>
                  <label className="form-check-label" defaultValue="No">No</label>
                </div>
              </div>
              <div className="form-control mb-2">
                <label className="form-label">Diagnosis (ICD-10):</label> &nbsp;
                <input type="text" className="form-control-sm" name="Diagnosis (ICD-10):" size="10" onChange={handleChange}/>
              </div>
              <div className="d-grid gap-2 col-md-12 mx-auto">
                <button className="btn btn-outline-primary btn_ast" type="submit">Submit</button>
              </div>
            </form>
          </div>

        </div>
      ) : rx.step === "medication" ? (
        <Mediaction data={{ ...rx }} />
      ) : null}
    </>
  );
};
export default OralOncology;
