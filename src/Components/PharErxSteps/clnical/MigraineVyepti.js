import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../medication";

const MigraineVyepti = (props) => {
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
          <div className="container container_hemat">
            <form onSubmit={handleSubmit}>
              {/* 4. DIAGNOSIS / CLINICAL INFORMATION */}
              <h3 className="hemo_h3">
                {" "}
                Migraine Vyepti / CLINICAL INFORMATION{" "}
              </h3>
              {/* Q1 */}
              <label className="form-label form-control">
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Migraine1:"
                    defaultValue="Acute Migraine"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> Acute Migraine </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Migraine2:"
                    defaultValue="Chronic Migraine"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> Chronic Migraine </label>
                </div>
              </label>
              {/* Q2 */}
              <label className="form-label form-control">
                <b> Indication: </b>
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="Indication1:"
                    className="form-check-input"
                    defaultValue="Preventive treatment of Migraine in Adult"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    {" "}
                    Preventive treatment of Migraine in Adult{" "}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Indication2:"
                    defaultValue="Other"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    {" "}
                    Other: &nbsp;
                    <input
                      type="text"
                      name="Other:"
                      className="form-control"
                      size="60"
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </label>
              {/* Q3 */}
              <label className="form-label form-control">
                <b>
                  {" "}
                  History of headaches: <br />
                </b>
                <label className="form-label">
                  {" "}
                  Date headaches began:
                  <input
                    type="date"
                    className="form-control"
                    name="Date headaches began:"
                    onChange={handleChange}
                  />
                </label>{" "}
                <br />
                <label className="form-label">
                  {" "}
                  Duration of daily headaches: &nbsp;
                  <input
                    type="text"
                    className="form-control-sm"
                    name="Duration of daily headaches:"
                    size="10"
                    onChange={handleChange}
                  />
                </label>
                &nbsp;
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Duration of daily headaches:"
                    defaultValue="Hours"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> Hours </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Duration of daily headaches:"
                    defaultValue="Minutes"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> Minutes </label>
                </div>
                <label className="form-label">
                  {" "}
                  Frequency - Number of daily headaches per month : &nbsp;
                  <input
                    type="text"
                    name="Frequency - Number of daily headaches per month :"
                    className="form-control-sm"
                    size="10"
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <strong style={{ marginLeft: "8rem" }}> OR </strong>
                  <br />
                  Number of headache-free days per month: &nbsp;
                  <input
                    type="text"
                    name="Number of headache-free days per month:"
                    className="form-control-sm"
                    size="10"
                    onChange={handleChange}
                  />
                </label>
              </label>
              {/* Q5 */}
              <label htmlFor="" className="form-label form-control">
                <label className="form-label">
                  {" "}
                  <b>Symptoms:</b>
                  <br />
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="Symptom1:"
                      className="form-check-input"
                      defaultValue="Moderate/severe pain"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      {" "}
                      Moderate/severe pain{" "}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Symptom2:"
                      defaultValue="Nausea"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Nausea </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="Symptom3:"
                      className="form-check-input"
                      defaultValue="Vomiting"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Vomiting </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="Symptom4:"
                      className="form-check-input"
                      defaultValue="Photophobia"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Photophobia </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="Symptom5:"
                      className="form-check-input"
                      defaultValue="Phonophobia"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Phonophobia </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="Symptom6:"
                      className="form-check-input"
                      defaultValue="Unilateral"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Unilateral </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="Symptom7:"
                      className="form-check-input"
                      defaultValue="Pulsating"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Pulsating </label>
                  </div>
                  <label> Other considerations (please describe): </label>
                  <textarea
                    style={{ width: "530px" }}
                    name="Other considerations (please describe):"
                    className="form-control"
                    onChange={handleChange}
                  />
                </label>
              </label>
              {/* Q6 */}
              <label className="form-label form-control">
                <label className="form-label">
                  <b>
                    Previous Prophylactic or Treatment Drug Class Prescribed
                    within the past three months:
                  </b>{" "}
                </label>{" "}
                <br />
                <label className="form-label">
                  {" "}
                  Drug Name:&nbsp;
                  <input
                    type="text"
                    className="form-control-sm"
                    name="Drug Name:"
                    size="12"
                    onChange={handleChange}
                  />
                </label>
                &nbsp;
                <label>
                  {" "}
                  Dose:&nbsp;
                  <input
                    type="text"
                    name="Dose:"
                    className="form-control-sm"
                    size="5"
                    onChange={handleChange}
                  />
                </label>
                &nbsp;
                <label>
                  {" "}
                  Duration:&nbsp;
                  <input
                    type="text"
                    className="form-control-sm"
                    name="Duration:"
                    size="10"
                    onChange={handleChange}
                  />
                </label>
                <label className="form-label"> Outcome(s): </label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="Outcome1:"
                    className="form-check-input"
                    defaultValue="Not effective"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> Not effective </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="Outcome2:"
                    className="form-check-input"
                    defaultValue="Contraindicated"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> Contraindicated </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="Outcome3:"
                    className="form-check-input"
                    defaultValue="Intolerant"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> Intolerant </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="Outcome4:"
                    className="form-check-input"
                    defaultValue="Failed"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> Failed </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="Outcome5:"
                    className="form-check-input"
                    defaultValue="Suboptimal"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> Suboptimal </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Outcome6:"
                    defaultValue="Other"
                    onChange={handleChange}
                  />
                  <label className="form-label">
                    {" "}
                    Other:
                    <input
                      type="text"
                      name="Other:"
                      className="form-control"
                      size="60"
                      onChange={handleChange}
                    />
                  </label>
                </div>
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
export default MigraineVyepti;
