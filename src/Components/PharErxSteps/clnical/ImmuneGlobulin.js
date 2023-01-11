import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../medication";

const ImmuneGlobulin = (props) => {
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
              {/* 4. Immune Globulin / Clinical Information */}
              <h3 className="hemo_h3">
                {" "}
                Immune Globulin / Clinical Information{" "}
              </h3>
              {/* Q1 */}
              <label className="form-label form-control">
                {" "}
                Current history of:
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Current history1:"
                    defaultValue="Renal Insufficiency"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    {" "}
                    Renal Insufficiency{" "}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Current history2:"
                    defaultValue="Diabetes"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> Diabetes </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Current history3:"
                    defaultValue="CHF"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> CHF </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Current history4:"
                    defaultValue="Thromboembolic Event"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    {" "}
                    Thromboembolic Event{" "}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Current history5"
                    defaultValue="HTN"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> HTN </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Current history6"
                    defaultValue="Other"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    {" "}
                    Other
                    <input
                      type="text"
                      name="Other"
                      className="form-control"
                      size="60"
                    ></input>
                  </label>
                </div>
              </label>
              {/* Q2 */}
              <label className="form-label form-control">
                {" "}
                Has patient previously been on IG therapy? <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Has patient previously been on IG therapy:"
                    defaultValue="Yes"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> Yes </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Has patient previously been on IG therapy:"
                    defaultValue="No"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> No </label>
                </div>
                <br />
                <label className="form-label">
                  {" "}
                  If yes: <br />
                  <label className="form-label">
                    {" "}
                    Date
                    <input
                      type="date"
                      className="form-control"
                      name="Date of previous IG therapy"
                      onChange={handleChange}
                    ></input>
                  </label>{" "}
                  &nbsp;
                  <label className="form-label">
                    {" "}
                    Brand:
                    <input
                      type="text"
                      className="form-control"
                      name="Brand"
                      size="10"
                      onChange={handleChange}
                    ></input>
                  </label>{" "}
                  &nbsp;
                  <label className="form-label">
                    {" "}
                    Dose:
                    <input
                      type="text"
                      className="form-control"
                      name="Dose"
                      size="10"
                      onChange={handleChange}
                    ></input>
                  </label>
                </label>
              </label>
              {/* Q4 */}
              <label className="form-label form-control">
                {" "}
                Does patient have a latex allergy? <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="latex allergy"
                    defaultValue="Yes"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> Yes </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="latex allergy"
                    defaultValue="No"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> No </label>
                </div>
              </label>
              <label className="form-label form-control">
                <b> Please Provide the Following Documentation: </b>
                <label className="form-label" htmlFor="myfile">
                  {" "}
                  Immune Deficiency: Detailed infection history, Baseline IgG
                  levels (including subclasses), Immune response to vaccinations
                  (including report):{" "}
                </label>
                <div className="input-group mb-2">
                  <input
                    type="file"
                    name="Baseline IgG levels (including subclasses):"
                    className="form-control"
                    onChange={handleChange}
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                  ></input>{" "}
                  &nbsp;
                </div>
                <div className="input-group mb-2">
                  <input
                    type="file"
                    name="Immune response to vaccinations (including report):"
                    onChange={handleChange}
                    className="form-control"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                  ></input>
                </div>
              </label>
              {/* Q6 */}
              <label className="form-label form-control">
                {" "}
                ITP: Platelet count:
                <input
                  type="text"
                  name="Platelet count:"
                  className="form-control"
                  onChange={handleChange}
                  style={{ width: "22ch" }}
                ></input>
                <label className="form-label">
                  {" "}
                  Post-BMT or BCT:
                  <input
                    type="text"
                    name="Post-BMT or BCT:"
                    className="form-control"
                    size="20"
                    onChange={handleChange}
                  ></input>
                </label>
                <br />
                <label className="form-label">
                  {" "}
                  Allogeneic:
                  <input
                    type="text"
                    className="form-control"
                    name="Allogeneic:"
                    size="20"
                    onChange={handleChange}
                  />
                </label>
                <br />
                <label>
                  {" "}
                  Autologous:
                  <input
                    type="text"
                    name="Autologous:"
                    className="form-control"
                    size="20"
                    onChange={handleChange}
                  ></input>
                </label>
              </label>
              {/*table*/}
              <label className="form-label form-control">
                {" "}
                <b> Pre-Protocols: </b>
                <label className="form-label">
                  {" "}
                  If applicable, flush intravenous access device per RE Pharmacy
                  protocol:{" "}
                </label>{" "}
                <br />
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Venous</th>
                      <th scope="col">NS</th>
                      <th scope="col">Heparin 100 u/ml</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Peripheral</td>
                      <td>1-3 ml before/after use</td>
                      <td>1-3 ml before/after NS</td>
                    </tr>
                    <tr>
                      <td> Midline, Central (Non-Port), PICC</td>
                      <td>3-5 ml before/after use, 5-10 ml after blood draw</td>
                      <td> 3-5 ml before/after NS </td>
                    </tr>
                    <tr>
                      <td> Implanted Port</td>
                      <td>
                        5-10 ml before/after use, 10-20 ml after blood draw
                      </td>
                      <td> 5 ml after last NS</td>
                    </tr>
                    <tr>
                      <td> Groshong PICC, Midline</td>
                      <td>
                        5-10 ml before/after use, 10-20 ml after blood draw
                      </td>
                      <td> none</td>
                    </tr>
                  </tbody>
                </table>
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
export default ImmuneGlobulin;
