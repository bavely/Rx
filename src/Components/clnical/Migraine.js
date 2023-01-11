import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../Medication";

const Migraine = (props) => {
  // No Changes for the state

  console.log(props);
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
              <h3 className="hemo_h3"> Migraine / Clinical Information </h3>
              <label className="form-label form-control"> Diagnosis: <br/>
                {/* Q1 */}
                <label className="form-label"> Migraine Prophylaxis: &nbsp;
                 <div className="form-check form-check-inline">
                   <input type="radio" className="form-check-input" name="Migraine Prophylaxis:" defaultValue="Yes" onChange={handleChange}/>
                   <label className="form-check-label"> Yes </label>
                </div>
                  <div className="form-check form-check-inline">
                    <input type="radio" className="form-check-input" name="Migraine Prophylaxis:" defaultValue="No" onChange={handleChange}/>
                    <label className="form-check-label">No</label>
                  </div>
                </label>
              </label>
              {/* Q2 */}
              <label className="form-label form-control"> Pregnancy: <br/>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Pregnancy:" defaultValue="Yes" onChange={handleChange}/>
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Pregnancy:" defaultValue="No" onChange={handleChange}/>
                  <label className="form-check-label">No</label>
                </div>
              </label>
              {/* Q3 */}
              <label className="form-label form-control"> Breast Feeding: <br/>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Breast Feeding:"/>
                  <label className="form-check-label"> Yes </label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Breast Feeding:" defaultValue="No" onChange={handleChange}/>
                  <label className="form-check-label">No</label>
                </div>
              </label>
              {/* Q4 */}
              <label className="form-label form-control"> Failed prior therapy: <br/>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Failed prior therapy:" onChange={handleChange}/>
                  <label className="form-check-label"> Yes </label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Failed prior therapy:" defaultValue="No" onChange={handleChange}/>
                  <label className="form-check-label">No</label>
                </div>
                <label className="form-label"> If yes Indicate:
                  <input type="text" className="form-control" name="If yes Indicate:" size="60" onChange={handleChange}/>
                </label>
              </label>
              {/* Q5 */}
              <label className="form-label form-control"> Allergy:
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Allergy1:" defaultValue="Ajovy" onChange={handleChange}/>
                  <label className="form-check-label"> Ajovy </label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Allergy2:" defaultValue="Emgality" onChange={handleChange}/>
                  <label className="form-check-label"> Emgality </label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Allergy3:" defaultValue="Aimovig" onChange={handleChange}/>
                  <label className="form-check-label"> Aimovig </label>
                 </div>
                 <div className="form-check">
                   <input type="checkbox" className="form-check-input" name="Allergy4:" defaultValue="Other" onChange={handleChange}/>
                   <label className="form-check-label"> Other:
                     <input type="text" name="Other:" className="form-control" size="60" onChange={handleChange}/>
                   </label>
                </div>
              </label>
              {/* Q6 */}
              <label className="form-label form-control"> Provided by: <br/>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Provided by1:" defaultValue="Doctor office" onChange={handleChange}/>
                  <label className="form-check-label"> {"Doctor’s Office"} </label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Provided by2:" defaultValue="Caregiver" onChange={handleChange}/>
                  <label className="form-check-label">Caregiver</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Provided by3:" defaultValue="Patient" onChange={handleChange}/>
                  <label className="form-check-label"> Patient </label>
                </div>
              </label>
              {/* Q7 */}
              <label className="form-label form-control"> Training Required: <br/>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Training Required:" defaultValue="Yes" onChange={handleChange}/>
                  <label className="form-check-label"> Yes </label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Training Required:" defaultValue="No" onChange={handleChange}/>
                  <label className="form-check-label"> No </label>
                </div>
              </label>
              <label className="form-label form-control"> Notes:
                <textarea name="Notes:" className="form-control" onChange={handleChange}/>
              </label>
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
export default Migraine;
