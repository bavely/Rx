import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../medication";

const GoutKrystexxa = (props) => {
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
      rx.clinicalinfo = [ms];
      props.updata("medication", rx);
    } else if (!QA) {
      setRx({ ...rx, clinicalinfo: [], step: "medication" });
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
              {/* 3. CLINICAL INFORMATION */}
              <h3 className="hemo_h3">
                {" "}
                KRYSTEXXEL FOR GROUT / CLINICAL INFORMATION{" "}
              </h3>
              <label className="form-label form-control">
                {" "}
                Indication: <br />
                <label className="form-label">
                  Chronic Gout uncontrolled with conventional therapy{" "}
                </label>
              </label>
              {/* Q1 */}
              <label className="form-label form-control">
                {" "}
                Number of Gout Flare per year:
                <input
                  type="text"
                  name="Number of Gout Flare per year:"
                  className="form-control"
                  size="20"
                  onChange={handleChange}
                ></input>
              </label>
              {/* Q2 */}
              <label className="form-label form-control">
                {" "}
                Initial G6PD Screened: <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Initial G6PD Screened:"
                    defaultValue="Yes"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> Yes </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Initial G6PD Screened:"
                    defaultValue="No"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> No </label>
                </div>
              </label>
              {/* Q3 */}
              <label className="form-label form-control">
                <label className="form-label">
                  {" "}
                  Uric acid level at baseline: &nbsp;
                  <input
                    type="text"
                    name="Uric acid level at baseline:"
                    className="form-control-sm"
                    size="10"
                    onChange={handleChange}
                  ></input>{" "}
                  &nbsp;
                  <label> mg/dl </label>
                </label>
                {/* Q4 */}
                <label className="form-label">
                  {" "}
                  Uric acid level prior to infusion: &nbsp;
                  <input
                    type="text"
                    name="Uric acid level prior to infusion:"
                    className="form-control-sm"
                    size="10"
                    onChange={handleChange}
                  ></input>{" "}
                  &nbsp;
                  <label> mg/d </label>
                </label>
              </label>

              {/* Q5 */}
              <label className="form-label form-control">
                Past/Current Medical History (
                <strong>select all that apply</strong>)
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Past/Current Medical History1:"
                    defaultValue="CHF"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> CHF </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    name="BP Controlled or uncontrolled:"
                    className="form-check-input"
                    defaultValue="Controlled"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    {" "}
                    BP: &nbsp; &nbsp; &nbsp; &nbsp;
                    <label className="form-check-label">
                      {" "}
                      Controlled
                      <input
                        type="radio"
                        name="BP Controlled or uncontrolled:"
                        className="form-check-input"
                        defaultValue="Controlled"
                        onChange={handleChange}
                      />
                    </label>
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="BP Controlled or uncontrolled:"
                    defaultValue="UnControlled"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> UnControlled </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Past/Current Medical History2:"
                    defaultValue="Pregnant"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> Pregnant </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="Past/Current Medical History3:"
                    className="form-check-input"
                    defaultValue="Breast feeding"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> Breast feeding </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="Past/Current Medical History4:"
                    className="form-check-input"
                    defaultValue="Anaphylactic reaction to previous IV therapy"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    {" "}
                    Anaphylactic reaction to previous IV therapy{" "}
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Past/Current Medical5:"
                    defaultValue="Tophus"
                    onChange={handleChange}
                  />
                  <label className="form-check-label"> Tophus </label>
                </div>
                <label className="form-label">
                  {" "}
                  Joints affected:
                  <input
                    type="text"
                    name="Joints affected:"
                    className="form-control"
                    size="60"
                    onChange={handleChange}
                  />
                </label>
              </label>
              {/* 3. CLINICAL INFORMATION (CONT.) */}
              <h3 className="hemo_h3"> CLINICAL INFORMATION (CONT.) </h3>
              <label className="form-label form-control">
                Previous Prophylactic or Treatment Drug Class Prescribed: <br />
                <label className="form-label">
                  {" "}
                  <strong>Drug Name:</strong> <br />
                  <label className="form-label">
                    {" "}
                    Uloric (Febuxostat) &nbsp;
                    <label className="form-label">
                      {" "}
                      Dose: &nbsp;
                      <input
                        type="text"
                        name="Uloric (Febuxostat) Dose:"
                        size="10"
                        onChange={handleChange}
                      />
                    </label>
                    &nbsp;
                    <label className="form-label">
                      {" "}
                      Duration: &nbsp;
                      <input
                        type="text"
                        name="Duration:"
                        size="10"
                        onChange={handleChange}
                      />
                    </label>
                  </label>
                  <label className="form-label">
                    {" "}
                    Colcrys (Colchicine) &nbsp;
                    <label className="form-label">
                      {" "}
                      Dose: &nbsp;
                      <input
                        type="text"
                        name="Colcrys (Colchicine) Dose:"
                        size="10"
                        onChange={handleChange}
                      />
                    </label>{" "}
                    &nbsp;
                    <label className="form-label">
                      {" "}
                      Duration: &nbsp;
                      <input
                        type="text"
                        name="Duration:"
                        size="10"
                        onChange={handleChange}
                      />
                    </label>
                  </label>
                  <label className="form-label">
                    {" "}
                    Zyloprium (Allopurinol) &nbsp;
                    <label className="form-label">
                      {" "}
                      Dose: &nbsp;
                      <input
                        type="text"
                        name="Zyloprium (Allopurinol) Dose:"
                        size="10"
                        onChange={handleChange}
                      />
                    </label>{" "}
                    &nbsp;
                    <label className="form-label">
                      {" "}
                      Duration: &nbsp;
                      <input
                        type="text"
                        name="Duration:"
                        size="10"
                        onChange={handleChange}
                      />
                    </label>
                  </label>
                  <label className="form-label">
                    {" "}
                    Other drugs:
                    <input
                      type="text"
                      className="form-control"
                      name="Other drugs:"
                      size="60"
                      onChange={handleChange}
                    />
                    <label className="form-label">
                      {" "}
                      Outcomes: <br />
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="Outcome1:"
                          defaultValue="Not effective"
                          onChange={handleChange}
                        />
                        <label className="form-check-label">
                          {" "}
                          Not effective{" "}
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="Outcome2:"
                          defaultValue="Contraindicated"
                          onChange={handleChange}
                        />
                        <label className="form-check-label">
                          {" "}
                          Contraindicated{" "}
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="Outcome3:"
                          defaultValue="Intolerant"
                          onChange={handleChange}
                        />
                        <label className="form-check-label"> Intolerant </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="Outcome4:"
                          defaultValue="Failed"
                          onChange={handleChange}
                        />
                        <label className="form-check-label"> Failed </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="Outcome5:"
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
                          defaultValue="Uncontrolled serum Uric acid level"
                          onChange={handleChange}
                        />
                        <label className="form-check-label">
                          {" "}
                          Uncontrolled serum Uric acid level{" "}
                        </label>
                      </div>
                    </label>
                    <label className="form-label">
                      {" "}
                      Other outcomes:
                      <input
                        type="text"
                        className="form-control"
                        name="Other outcomes:"
                        size="60"
                        onChange={handleChange}
                      />
                    </label>
                  </label>
                </label>
              </label>
              <br />
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
export default GoutKrystexxa;
