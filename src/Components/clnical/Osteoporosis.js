import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../Medication";

const Osteoporosis = (props) => {
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
              {/* 3) Diagnosis/Clinical Information */}
              <h3 className="hemo_h3"> Osteoporosis / Clinical Information </h3>
              {/* Q1 */}
              <div className="form-control mb-2">
                <label className="form-label">Diagnosis: </label>
                <input type="text" className="form-control" name="Diagnosis:" size="60" onChange={handleChange}/>
                <label className="form-label">Other: </label>
                <input type="text" className="form-control" name="Other:" size="30" onChange={handleChange}/>
              </div>

              {/* Q2 */}
              <div className="form-control mb-2">
                <label>Prior failed medications:  <br />
                  (<strong>medication and duration of treatment/reason for d/c</strong>):</label>
                <input type="text" className="form-control" name="Prior failed medications (medication and duration of treatment/reason for d/c):" size="30" onChange={handleChange}/>
              </div>
              {/* Q3 */}
              <div className="form-control mb-2">
                <label className="form-label"> Is patient currently on RA therapy? </label> <br/>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Is patient currently on RA therapy:" defaultValue="Yes" onChange={handleChange}/>
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Is patient currently on RA therapy:" defaultValue="No" onChange={handleChange}/>
                  <label className="form-check-label">No</label>
                </div><br/>
                <label className="form-label">Medications:</label>
                <input type="text" className="form-control" name="Medications:" size="60" onChange={handleChange}/>
                <label className="form-label mt-2">TB/PPD test given?</label>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="TB/PPD test given:" defaultValue="Yes" onChange={handleChange}/>
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="TB/PPD test given:" defaultValue="No" onChange={handleChange}/>
                  <label className="form-check-label">No</label>
                </div>
              </div>
              {/* Q6 */}
              <div className="form-control mb-2">
                <label className="form-label">BMD/T-score: </label> &nbsp;
                <input type="text" name="BMD/T-score:" className="form-control-sm" size="10" onChange={handleChange}/> &nbsp;
                <label className="form-label"> Date: </label>&nbsp;
                <input type="date" className="form-control-sm" name="Date:" onChange={handleChange}/>
              </div>
              {/* Q7 */}
              <div className="form-control mb-2">
                <label className="form-label"> Does patient have latex allergy? </label> <br/>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Does patient have latex allergy:" defaultValue="Yes" onChange={handleChange}/>
                  <label className="form-check-label" defaultValue="Yes">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Does patient have latex allergy:" defaultValue="No"/>
                  <label className="form-check-label" defaultValue="No">No</label>
                </div>
              </div>
              {/* Q8 */}
              <div className="form-control mb-2">
                <label className="form-label">Is Patient at risk for osteoporotic fracture as evident by any of the following?</label>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Is Patient at risk for osteoporotic fracture as evident 1:" defaultValue="History of osteoporotic fracture" onChange={handleChange}/>
                  <label className="form-check-label">History of osteoporotic fracture</label> <br/>
                  <label className="form-label"> Site: </label> &nbsp;
                  <input type="text" name="Site:" className="form-control-sm" size="10" onChange={handleChange}/>&nbsp;
                  <label className="form-label"> Date: </label> &nbsp;
                  <input type="date" className="form-control-sm" name="Date:" onChange={handleChange}/>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Is Patient at risk for osteoporotic fracture as evident 2:" defaultValue="Patient has tried and failed an oral bisphosphonate" onChange={handleChange}/>
                  <label className="form-check-label">Patient has tried and failed an oral bisphosphonate</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Is Patient at risk for osteoporotic fracture as evident 3:" defaultValue="Patient has documented contraindication/is intolerant to oral bisphosphonate therapy" onChange={handleChange}/>
                  <label className="form-check-label">Patient has documented contraindication/is intolerant to oral bisphosphonate therapy (please submit a copy of DEXA w/prescription)</label>
                </div>
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
export default Osteoporosis;
