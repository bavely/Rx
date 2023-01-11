import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../medication";
import "../../../css/bootstrap.min.css";
import "../../../css/CuruRx_forms_Styles.css";

const Covid19 = (props) => {
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

  // No Changes handelChange

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

  console.log(rx);
  return (
    <>
      {rx.step === "clinical" ? (
        <div>
          {/* <Steps data={{ ...rx }} /> */}
          <div className="container container_covid">
            <form className="mb-3" onSubmit={handleSubmit}>
              {/* 3. CLINICAL INFORMATION */}

              <h3 className="covid_h3"> COVID-19 / CLINICAL INFORMATION </h3>
              <div className="form-control mb-2">
                <label className="form-label">Patient Eligibility:</label>{" "}
                <br />
                <p>
                  Exclusion Criteria (Patients meeting any of the following
                  criteria are <strong>NOT ELIGIBLE</strong> for therapy){" "}
                </p>
                <p>
                  <strong>A.</strong> Hospitalized due to COVID-19 <br />
                  <strong>B.</strong> Require oxygen therapy due to COVID-19{" "}
                  <br />
                  <strong>C.</strong> Require an increase in baseline oxygen
                  flow rate due to COVID-19 in those on chronic oxygen therapy
                  due to underlying non-COVID-19 related comorbidity
                </p>
                <label className="form-label">
                  By signing this order, physician verifies that none of the
                  above criteria apply.
                </label>
                <label className="form-label">Check all that apply:</label>
              </div>
              {/* Q1 */}
              <div className="form-control mb-2">
                <label className="form-label">Covid-19 Test Positive: </label>
                <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Covid-19 Test:"
                    defaultValue="Yes"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Yes</label> &nbsp;
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Covid-19 Test:"
                    defaultValue="No"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
              {/* Q2 */}
              <div className="form-control mb-2">
                <label className="form-label">Date of test: </label>
                <input
                  type="date"
                  className="form-control"
                  name="Date of test:"
                  onChange={handleChange}
                />
              </div>
              {/* Q3 */}
              <div className="col-md-12">
                <label className="form-label form-control">
                  Date symptoms started:
                  <input
                    type="date"
                    className="form-control"
                    name="Date symptoms started:"
                    onChange={handleChange}
                  />
                </label>
              </div>
              {/* Q4 */}
              <div className="form-control mb-2">
                <label className="form-label">INDICATION:</label>
                <label className="form-label">
                  Treatment of mild to moderate COVID-19 patients (
                  <strong>check all that apply</strong>)
                </label>{" "}
                <br />
                <label className="form-label">
                  {"Age is > or equal to 12 years old:"} <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Age is > or equal to 12 years old: Yes"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Age is > or equal to 12 years old: No"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                </label>{" "}
                <br />
                <label className="form-label">
                  Patient has positive covid test: <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Patient has positive covid test: Yes"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Patient has positive covid test: No"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                </label>{" "}
                <br />
                <label className="form-label">
                  Patient weighs at least 40kg: <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Patient weighs at least 40kg:"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Patient weighs at least 40kg:"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label> <br />
                  </div>
                </label>
              </div>
              <div className="form-control mb-2">
                <label className="form-label">INDICATION (Cont): </label>
                <br />
                <label className="form-label">
                  At high risk for developing severe Covid 19 symptoms or
                  hospitalization or death:{" "}
                </label>
                <br />
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="At high risk for developing severe Covid 19 symptoms or hospitalization or death:"
                    defaultValue="Yes"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="At high risk for developing severe Covid 19 symptoms or hospitalization or death:"
                    defaultValue="No"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">No</label>
                </div>
                <label>
                  High risk criteria as any of the following (
                  <strong>Check all that apply</strong>) <br />
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="High risk criteria 1:"
                      defaultValue="Older age"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      {" "}
                      Older age (<strong>e.g. ≥65 years of age</strong>){" "}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="High risk criteria 3:"
                      defaultValue="Overweight"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      Overweight <strong>e.g. BMI {">"}25 kg/m2</strong>{" "}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="High risk criteria 4:"
                      defaultValue="Pregnancy"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Pregnancy</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="High risk criteria 12:"
                      defaultValue="Asthma"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Asthma </label> <br />
                  </div>
                  <div className="form-check ">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="High risk criteria 14:"
                      defaultValue="COPD"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> COPD </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="High risk criteria 2:"
                      defaultValue="Cystic fibrosis"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      Cystic fibrosis and/or pulmonary hypertension{" "}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="High risk criteria 5:"
                      defaultValue="Sickle cell disease"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      Sickle cell disease
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="High risk criteria 6:"
                      defaultValue="Chronic kidney disease"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      Chronic kidney disease
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="High risk criteria 7:"
                      defaultValue="Neurodevelopmental disorders"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      Neurodevelopmental disorders (
                      <strong>e.g. cerebral palsy</strong>){" "}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="High risk criteria 8:"
                      defaultValue="Genetic or metabolic syndromes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      {" "}
                      Genetic or metabolic syndromes{" "}
                    </label>{" "}
                    <br />
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="High risk criteria 9:"
                      defaultValue="Immunosuppressive disease"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      {" "}
                      Immunosuppressive disease or immunosuppressive treatment{" "}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="High risk criteria 10:"
                      defaultValue="Severe congenital anomalies"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      {" "}
                      Severe congenital anomalies{" "}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="High risk criteria 16:"
                      defaultValue="Race/ethnicity"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      {" "}
                      Race/ethnicity (<strong>
                        per provider discern
                      </strong>){" "}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="High risk criteria 15:"
                      defaultValue="CInterstitial lung disease"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      {" "}
                      Interstitial lung disease (
                      <strong>moderate-severe</strong>){" "}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="High risk criteria 11:"
                      defaultValue="Cardiovascular disease"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      {" "}
                      Cardiovascular disease (
                      <strong>
                        e.g. congenital heart disease or hypertension
                      </strong>
                      )
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="High risk criteria 13:"
                      defaultValue="Having a medical-related technological dependence"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      {" "}
                      Having a medical-related technological dependence (
                      <strong>
                        e.g. tracheostomy,gastrostomy, or positive pressure
                        ventilation not COVID 19 related
                      </strong>
                      ){" "}
                    </label>
                  </div>
                </label>
              </div>
              <div className="form-control mb-2">
                <label className="form-label">
                  Post exposure prophylaxis (
                  <strong>check all that apply</strong>){" "}
                </label>
                <br />
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Post exposure1"
                    defaultValue="Patient is not fully vaccinated"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    {" "}
                    Patient is not fully vaccinated{" "}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Post exposure2"
                    defaultValue="Patient is immune compromised"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    {" "}
                    Patient is immune compromised{" "}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Post exposure3"
                    defaultValue="Patient is immune compromised"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    {" "}
                    Patient is on immune suppressant medication{" "}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Post exposure4"
                    defaultValue="Patient is immune compromised"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    {" "}
                    Patient have been exposed to positive covid-19 individual
                    and consistent with close contact{" "}
                  </label>
                </div>
              </div>
              <div className="d-grid gap-2 col-md-12 mx-auto">
                <button
                  className="btn btn-outline-primary btn_covid"
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

export default Covid19;
