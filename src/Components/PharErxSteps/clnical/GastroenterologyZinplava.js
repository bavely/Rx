import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../medication";
import "../../../css/CuruRx_forms_Styles.css";

const GastroenterologyZinplava = (props) => {
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
        <div className="container container_gas">
          {/* <Steps data={{ ...rx }} /> */}
          <form onSubmit={handleSubmit}>
            {/* 3. INDICATION */}
            <h3 className="gas_h3"> Zinplava / Indication </h3>
            <div className="col-md-12">
              <label className="form-label form-control">
                {" "}
                Enterocolitis due to C difficile recurrent: <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Affected Area1"
                    defaultValue="Indication"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="yes">
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Affected Area1"
                    defaultValue="Indication"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="no">
                    No
                  </label>
                </div>
              </label>
            </div>
            <div className="col-md-12">
              <label className="form-label form-control">
                {" "}
                Enterocolitis due to C difficile: <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Affected Area2"
                    defaultValue="Indication"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="Yes">
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Affected Area2"
                    defaultValue="Indication"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="No">
                    No
                  </label>
                </div>
              </label>
            </div>
            <div className="col-md-12">
              <label className="form-label form-control">
                {" "}
                <strong>PMH:</strong> CHF, HF <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="PMH"
                    defaultValue="Yes"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="html">
                    {" "}
                    Yes{" "}
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="PMH"
                    defaultValue="No"
                    onChange={handleChange}
                  />
                  <label htmlFor="css"> No </label>
                </div>
              </label>
            </div>
            <div className="col-md-12">
              <label className="form-label form-control">
                Age: Greater than or equal to ≤18 years of age <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Age"
                    defaultValue="Age"
                    onChange={handleChange}
                  />
                  &nbsp;
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Age"
                    defaultValue="Age"
                    onChange={handleChange}
                  />
                  &nbsp;
                  <label className="form-check-label">No</label>
                </div>
              </label>
            </div>
            <div className="d-grid gap-2 col-md-12 mx-auto">
              <button className="btn btn-outline-primary btn_ast" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};
export default GastroenterologyZinplava;
