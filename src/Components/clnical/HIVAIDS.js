import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../Medication";
import "../../css/CuruRx_forms_Styles.css";

const HIVAIDS = (props) => {
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
          <div className="container container_hiv">
            <form onSubmit={handleSubmit}>
              {/* 3. Diagnosis/Clinical Information */}
              <h3 className="hiv_h3"> HIV-AIDS / Clinical Information </h3>
              <div className="form-control mb-2">
                <label className="form-label"> <strong>Diagnosis:</strong></label>
                <textarea name="Diagnosis:" className="form-control" size="20" onChange={handleChange}/>
              </div>
              <div className="form-control mb-2">
                <label className="form-label"> ICD-10: </label> &nbsp;
                <input type="text" className="form-control-sm" name="ICD-10:" size="10" onChange={handleChange}/>
              </div>
              <div className="form-control mb-2">
                <label className="form-label"> Serum Creatinine: </label> &nbsp;
                <input type="text" className="form-control-sm" name="Serum Creatinine:" size="20" onChange={handleChange}/>
              </div>
               <div className="form-control mb-2">
                 <label className="form-label"> CD4 Count: </label> &nbsp;
                 <input type="text" className="form-control-sm" name="CD4 Count:" size="20" onChange={handleChange}/>
              </div>
               <div className="form-control mb-2">
                 <label className="form">Viral Load:</label> &nbsp;
                 <input type="text" name="Viral Load:" size="20" onChange={handleChange}/>
              </div>
              <div className="form-control mb-2">
                <label> Date of labs: </label> &nbsp;
                <input type="date" name="Date of labs:" onChange={handleChange}/>
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
export default HIVAIDS;
