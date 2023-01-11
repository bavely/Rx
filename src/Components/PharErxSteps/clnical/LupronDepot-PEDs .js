import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../medication";

const LupronDepotPeds = (props) => {
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
                Lupron Depot-PEDS / Clinical Information{" "}
              </h3>
              {/* Q1 */}
              <div className="form-control mb-2">
                <label className="form-label">
                  Has patient been previously treated for this condition?
                </label>{" "}
                <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Has patient been previously treated for this condition:"
                    defaultValue="Yes"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" defaultValue="Yes">
                    {" "}
                    Yes{" "}
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Has patient been previously treated for this condition:"
                    defaultValue="No"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" defaultValue="No">
                    {" "}
                    No{" "}
                  </label>
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
                <label className="form-label mt-2">
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
                  <label className="form-check-label">Yes</label>
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
              </div>
              <div className="form-control mb-2">
                <label className="form-label">
                  <b> Diagnosis: </b>
                </label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Diagnosis1:"
                    defaultValue="Central precocious puberty- Peds"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    Central precocious puberty- Peds (ICD-10):{" "}
                  </label>{" "}
                  &nbsp;
                  <input
                    type="text"
                    className="form-control-sm mb-1"
                    name="Central precocious puberty- Peds (ICD-10):"
                    size="10"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Diagnosis2:"
                    defaultValue="precocious puberty"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    Precocious puberty (ICD-10):{" "}
                  </label>{" "}
                  &nbsp;
                  <input
                    type="text"
                    className="form-control-sm mb-1"
                    name="Precocious puberty (ICD-10):"
                    size="10"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Diagnosis3:"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    Disorder of puberty, unspecified (ICD-10):{" "}
                  </label>{" "}
                  &nbsp;
                  <input
                    type="text"
                    className="form-control-sm"
                    name="Disorder of puberty, unspecified (ICD-10):"
                    size="10"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Diagnosis4:"
                    defaultValue="Other"
                    onChange={handleChange}
                  />
                  <label className="form-label">Other: </label> &nbsp;
                  <input
                    type="text"
                    className="form-control-sm"
                    name="Other:"
                    size="10"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Diagnosis5"
                    defaultValue="ICD-10"
                    onChange={handleChange}
                  />
                  <label className="form-label">(ICD-10): </label> &nbsp;
                  <input
                    type="text"
                    className="form-control-sm"
                    name="ICD-10:"
                    size="10"
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* 4. PATIENT MEDICAL HISTORY */}
              <h3 className="hemo_h3"> PATIENT MEDICAL HISTORY </h3>
              {/* Q6 */}
              <div className="form-control mb-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Medical history1:"
                    defaultValue="Seizure or epilepsy"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    {" "}
                    Seizure or epilepsy{" "}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Medical history2:"
                    defaultValue="Abnormal electrolytes"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    {" "}
                    Abnormal electrolytes{" "}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Medical history3:"
                    defaultValue="CBC w. differential"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    {" "}
                    CBC w. differential{" "}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Medical history4"
                    defaultValue="Testosterone level"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    Testosterone level at baseline:{" "}
                  </label>{" "}
                  &nbsp;
                  <input
                    type="text"
                    className="form-control-sm"
                    name="Testosterone level at baseline:"
                    size="10"
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    defaultValue="Estrogen level at baseline"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    Estrogen level at baseline:{" "}
                  </label>{" "}
                  &nbsp;
                  <input
                    type="text"
                    className="form-control-sm"
                    name="Estrogen level at baseline: "
                    size="10"
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Medical history6"
                    defaultValue="BG at baseline"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">BG at baseline: </label>{" "}
                  &nbsp;
                  <input
                    type="text"
                    className="form-control-sm"
                    name="BG at baseline:"
                    size="10"
                  />
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Medical history7"
                    defaultValue="Total Cholesterol's"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Total Cholesterol</label>{" "}
                  &nbsp;
                  <input
                    type="text"
                    className="form-control-sm"
                    name="Total Cholesterol's:"
                    size="10"
                    onChange={handleChange}
                  />{" "}
                  &nbsp;
                  <label className="form-check-label">Mg/dl </label>
                </div>
                <label className="form-label">
                  {" "}
                  Cardiac problems (<strong>please specify</strong>):{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="Cardiac problems (please specify):"
                  size="60"
                />
                <label className="form-label"> Other (please specify): </label>
                <input
                  type="text"
                  className="form-control"
                  name="Other (please specify):"
                  size="60"
                  onChange={handleChange}
                />
              </div>
              <div className="form-control mb-2">
                <label className="form-label">
                  <b> Allergies: </b>
                </label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Allergy1:"
                    defaultValue="GnRH"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">GnRH</label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Allergy2:"
                    defaultValue="GnRH agonist"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">GnRH agonist </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Allergy3:"
                    defaultValue="Lupron Depot"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Lupron Depot </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Allergy4:"
                    defaultValue="Other"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    Other (please specify):{" "}
                  </label>{" "}
                  &nbsp;
                  <input
                    type="text"
                    className="form-control-sm"
                    name="Other (please specify):"
                    size="20"
                  />
                </div>
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
export default LupronDepotPeds;
