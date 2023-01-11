import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../Medication";

const MultipleSclerosisTecfidera = (props) => {
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
    console.log(event.target.value);
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
              {/* 3. CLINICAL INFORMATION */}
              <h3 className="hemo_h3"> MULTIPLE SCLEROSIS TECFIDERA / CLINICAL INFORMATION </h3>
              <div className="form-control mb-2">
                <label className="form-label"><b> Past Medical History </b></label> <br/>
                <label className="form-label"> Liver problems:</label><br/>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Liver problems:" defaultValue="Yes" onChange={handleChange}/>
                  <label className="form-check-label"> Yes </label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Liver problems:" defaultValue="No" onChange={handleChange}/>
                  <label className="form-check-label"> No </label>
                </div>
                <label className="form-label"> Specify: </label>&nbsp;
                <input type="text" className="form-control-sm" name="Specify:" size="40" onChange={handleChange}/><br/>
                <label className="form-label"> Herps zoster:</label> &nbsp;
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Herps zoster:" defaultValue="Yes" onChange={handleChange}/>
                  <label className="form-check-label"> Yes </label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Herps zoster:" defaultValue="No" onChange={handleChange}/>
                  <label className="form-check-label"> No </label>
                </div><br/>
                <label className="form-label"> Flushing: </label>&nbsp;
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Flushing" defaultValue="Yes" onChange={handleChange}/>
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Flushing:" defaultValue="No" onChange={handleChange}/>
                  <label className="form-check-label"> No </label>
                </div><br/>
                <label className="form-label"> PML:</label> &nbsp;
                <div className="form-check form-check-inline">
                  <input type="radio" name="PML:" className="form-check-input" defaultValue="Yes" onChange={handleChange}/>
                  <label className="form-check-label"> Yes </label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio"name="PML:" className="form-check-input" defaultValue="No" onChange={handleChange}/>
                  <label className="form-check-label"> No </label>
                </div><br/>
                <label className="form-label"> Pregnancy:</label> &nbsp;
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Pregnancy:" defaultValue="Yes" onChange={handleChange}/>
                  <label className="form-check-label"> Yes </label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" name="Pregnancy:" className="form-check-input" defaultValue="No" onChange={handleChange}/>
                  <label className="form-check-label"> No </label>
                </div><br/>
                <label className="form-label"> Breast Feeding:</label> &nbsp;
                <div className="form-check form-check-inline">
                  <input type="radio" name="Breast Feeding:" className="form-check-input" defaultValue="Yes" onChange={handleChange}/>
                  <label className="form-check-label"> Yes </label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Breat Feeding:" defaultValue="No" onChange={handleChange}/>
                  <label className="form-check-label"> No </label>
                </div><br/>
                <label className="form-label"> Other: </label>
                <input type="text" className="form-control" name="Other:" size="60"></input>
              </div>
              <div className="form-control mb-2">
                <label className="form-label"><b>Indication(s)</b> Relapsing forms of Multiple Sclerosis (MS), including:</label> <br/>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Indication1:" onChange={handleChange}/>
                  <label className="form-check-label"> Clinically isolated syndrome </label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Indication2:" defaultValue="Relapsing-remitting disease" onChange={handleChange}/>
                  <label className="form-check-label"> Relapsing-remitting disease </label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Indication3:" defaultValue="Active secondary progressive disease" onChange={handleChange}/>
                  <label className="form-check-label"> Active secondary progressive disease </label>
                </div>
              </div>
              <div className="form-control mb-2">
                <label className="form-label"><b> Current or most recent therapy </b></label> <br/>
                <label> Prior Disease Modifying Therapy: </label> &nbsp;
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Prior Disease Modifying Therapy:" defaultValue="Yes" onChange={handleChange}/>
                  <label className="form-check-label"> Yes </label>
                </div>
                <div className="form-check form-check-inline">
                  <input type="radio" className="form-check-input" name="Prior Disease Modifying Therapy:" defaultValue="No" onChange={handleChange}/>
                  <label className="form-check-label"> No </label>
                </div><br/>
                <label className="form-label"> Drug name: </label>&nbsp;
                <input type="text" name="Drug name:" className="form-control-sm" size="10" onChange={handleChange}/>&nbsp;
                <label className="form-label"> Date: </label> &nbsp;
                <input type="date" name="Date:" className="form-control-sm" onChange={handleChange}/> <br/>
                <label className="form-label"> Therapy Duration: </label>&nbsp;
                <input type="text" name="Therapy Duration:" className="form-control-sm" size="20" onChange={handleChange}/>
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
export default MultipleSclerosisTecfidera;
