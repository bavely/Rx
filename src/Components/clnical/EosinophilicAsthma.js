import React, { useState } from "react";
import "../../css/CuruRx_forms_Styles.css";
import { Dropdown } from "react-bootstrap";
import Steps from "../steps";
import Mediaction from "../Medication";

const EosinophilicAsthma = (props) => {
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

  console.log(rx, "from heellsdj");

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
        <div className="container container_eos">
          <Steps data={{ ...rx }} />
          <form className="mb-3" onSubmit={handleSubmit}>
            {/* 3) Diagnosis/Clinical Information */}
            <h3 className="Eos_h3"> Eosinophilic / Clinical Information </h3>
            <div className="col-md-12">
              <label className="form-label form-control" htmlFor="yes">
                {" "}
                Patient is 12 years or older: <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="EosAst"
                    defaultValue="Patient is 12 years or older"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="EosAst"
                    defaultValue="Patient is 12 years or older"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">No</label>
                </div>
              </label>
            </div>
            <div className="col-md-12">
              <label className="form-label form-control" htmlFor="no">
                {" "}
                Patient is 18 years or older: <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="EosinophilicAsthma"
                    defaultValue="Patient is 18 years or older"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="EosinophilicAsthma"
                    defaultValue="Patient is 18 years or older"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">No</label>
                </div>
              </label>
            </div>
            <div className="col-md-12">
              <label className="form-label form-control" htmlFor="Diagnosis1">
                {" "}
                Eosinophilic Granulomatosis with polyangiitis (EGPA): <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Diagnosis1"
                    defaultValue="Eosinophilic Granulomatosis"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Diagnosis1"
                    defaultValue="Eosinophilic Granulomatosis"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">No</label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="Eosinophilic Granulomatosis"
                  size="50"
                  onChange={handleChange}
                ></input>
              </label>
            </div>
            <div className="col-md-12">
              <label className="form-label form-control" htmlFor="Diagnosis2">
                {" "}
                Severe Persistent Asthma (uncomplicated) ICD.10-CM J45.50:
                <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Diagnosis2"
                    defaultValue="Severe Persistent Asthma"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Diagnosis2"
                    defaultValue="Severe Persistent Asthma"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">No</label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="Severe Persistent Asthma"
                  size="45"
                  onChange={handleChange}
                ></input>
              </label>
            </div>
            <div className="col-md-12">
              <label className="form-label form-control" htmlFor="Diagnosis3">
                {" "}
                Severe Persistent Asthma (with acute exacerbation) ICD.10-CM
                J45.51: <br />
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Diagnosis3"
                    defaultValue="Severe Persistent Asthma with acute"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Diagnosis3"
                    defaultValue="Severe Persistent Asthma with acute"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">No</label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="Severe Persistent Asthma with acute"
                  size="36"
                  onChange={handleChange}
                ></input>
              </label>
            </div>
            <div className="col-md-12">
              <label className="form-label form-control" htmlFor="Diagnosis4">
                {" "}
                <span> </span>Absolute Eosinophil Count:&nbsp;
                <input
                  type="text"
                  className="form-control-sm"
                  name="Absolute Eosinophil Count"
                  size="10"
                  onChange={handleChange}
                ></input>
              </label>
              <label className="form-label form-control">
                {" "}
                Cells/ML: &nbsp;
                <input
                  type="text"
                  className="form-control-sm"
                  name="Cells/ML"
                  size="10"
                  onChange={handleChange}
                ></input>{" "}
                &nbsp;
                <label>
                  {" "}
                  or relative %: &nbsp;
                  <input
                    type="text"
                    className="form-control-sm"
                    name="relative"
                    size="10"
                    onChange={handleChange}
                  ></input>
                </label>
              </label>
              <label htmlFor="" className="form-control mb-2">
                <div className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="Diagnosis5"
                    defaultValue="Attach copy of lab results"
                    onChange={handleChange}
                  />
                  <label className="form-check-label mb-2" htmlFor="Diagnosis5">
                    {" "}
                    Attach copy of lab results
                  </label>{" "}
                  <br />
                </div>
              </label>
            </div>
            <div className="col-md-12">
              <label className="form-label form-control" htmlFor="Diagnosis6">
                {" "}
                Pregnancy/Breast Feeding: <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Diagnosis6"
                    defaultValue="Pregnancy/Breast Feeding"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="">
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Diagnosis6"
                    defaultValue="Pregnancy/Breast Feeding"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="">
                    No
                  </label>
                </div>
                <textarea
                  type="text"
                  className="form-control"
                  name="Pregnancy/Breast Feeding"
                  size="40"
                  onChange={handleChange}
                ></textarea>
              </label>
            </div>
            {/* 4) Prior Medical History */}
            <h3 className="Eos_h3"> Prior Medical History </h3>
            <div className="col-md-12">
              <label
                className="form-label form-control"
                htmlFor="Medical History"
              >
                Number of Asthma Exacerbation (that requires systemic steroids
                in take or hospitalization) in the past 12 months: <br />
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    id="dropdown-basic"
                  >
                    Dropdown Button
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">1</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">2</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">3</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">4</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">5</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">6</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">7</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">8</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">9</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">10</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </label>
            </div>
            <div className="col-md-12">
              <label className="form-label form-control">
                {" "}
                Does patient have (benralizumab), (reslizumab) and/or
                (mepolizumab) allergy? <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Allergy"
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
                    name="Allergy"
                    defaultValue="No"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="css">
                    {" "}
                    No{" "}
                  </label>
                </div>{" "}
                <br />
                <label className="form-label form-control" htmlFor="Reaction">
                  {" "}
                  Reaction Type:
                  <textarea className="form-control" name="Reaction Type" />
                </label>
              </label>
            </div>
            <div className="col-md-12">
              <label
                className="form-label form-control"
                htmlFor="Medical History1"
              >
                {" "}
                Rescue Inhalers more than 2 days/week in the past 3 months:{" "}
                <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Medical History1"
                    defaultValue="Rescue Inhalers"
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
                    name="Medical History1"
                    defaultValue="Rescue Inhalers"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="no">
                    No
                  </label>
                </div>
                <label className="form-control mb-2" htmlFor="">
                  <label
                    className="form-label form-control"
                    htmlFor="Medical History1"
                  >
                    {" "}
                    Drug Name: &nbsp;
                    <input
                      type="text"
                      className="form-control"
                      name="Drug Name"
                      size="10"
                      onChange={handleChange}
                    ></input>
                  </label>
                  <label className="form-label form-control">
                    Dose: &nbsp;
                    <input
                      type="text"
                      className="form-control-sm"
                      name="Dose"
                      size="10"
                      onChange={handleChange}
                    ></input>{" "}
                    &nbsp;
                    <label className="form-label">
                      {" "}
                      Frequency: &nbsp;
                      <input
                        type="text"
                        className="form-control-sm"
                        name="Frequency"
                        size="10"
                        onChange={handleChange}
                      ></input>
                    </label>
                  </label>
                </label>
              </label>
            </div>
            <div className="col-md-12">
              <label
                className="form-label form-control"
                htmlFor="Medical History2"
              >
                {" "}
                ICS use in the past 6 months: <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Medical History2"
                    defaultValue="ICS use"
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
                    name="Medical History2"
                    defaultValue="ICS use"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="Yes">
                    No
                  </label>
                </div>
                <label className="form-label form-control">
                  <label className="form-label form-control" htmlFor="">
                    Drug Name:
                    <input
                      type="text"
                      className="form-control"
                      name="Frequency"
                      size="10"
                      onChange={handleChange}
                    ></input>
                  </label>
                  <label className="form-control">
                    {" "}
                    Dose: &nbsp;
                    <input
                      type="text"
                      className="form-control-sm"
                      name="Drug Name"
                      size="10"
                      onChange={handleChange}
                    ></input>{" "}
                    &nbsp;
                    <label className="form-label">
                      {" "}
                      Frequency: &nbsp;
                      <input
                        type="text"
                        className="form-control-sm"
                        name="Dose"
                        size="10"
                        onChange={handleChange}
                      ></input>
                    </label>
                  </label>
                </label>
              </label>
            </div>
            <div className="col-md-12">
              <label
                className="form-label form-control"
                htmlFor="Medical History3"
              >
                {" "}
                Oral Steroids in the past 6 months: <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Medical History3"
                    defaultValue="ICS use"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="">
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="Medical History3"
                    defaultValue="ICS use"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="">
                    No
                  </label>
                </div>
                <label className="form-label form-control" htmlFor="">
                  <label className="form-control" htmlFor="Medical History3">
                    {" "}
                    Drug Name:
                    <input
                      type="text"
                      className="form-control"
                      name="Drug Name"
                      size="10"
                      onChange={handleChange}
                    ></input>
                  </label>
                  <label className="form-control form-label">
                    {" "}
                    Dose: &nbsp;
                    <input
                      type="text"
                      className="form-control-sm"
                      name="Dose"
                      size="10"
                      onChange={handleChange}
                    ></input>{" "}
                    &nbsp;
                    <label className="form-label">
                      {" "}
                      Frequency: &nbsp;
                      <input
                        type="text"
                        className="form-control-sm"
                        name="Frequency"
                        size="10"
                        onChange={handleChange}
                      ></input>
                    </label>
                  </label>
                </label>
              </label>
            </div>
            <div className="col-md-12">
              <label className="form-label form-control" htmlFor="">
                <label className="form-label form-control" htmlFor="Infiction1">
                  {" "}
                  Parasitic Infection (Helminth):
                  <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Infiction1"
                      defaultValue="Parasitic Infection"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="">
                      Yes
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Infiction1"
                      defaultValue="Parasitic Infection"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="">
                      No
                    </label>
                  </div>
                </label>
                <label className="form-label form-control" htmlFor="Infiction2">
                  Myalgia: <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Infiction2"
                      defaultValue="Myalgia"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Infiction2"
                      defaultValue="Myalgia"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                </label>
                <label className="form-label form-control" htmlFor="Infiction3">
                  {" "}
                  Varicella Zoster Vaccine (Herpes Zoster): <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Infiction3"
                      defaultValue="Varicella Zoster Vaccine"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Infiction3"
                      defaultValue="Varicella Zoster Vaccine"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                </label>
                <label className="form-label form-control" htmlFor="Infiction4">
                  {" "}
                  Malignancy (please specify type): <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Infiction4"
                      defaultValue="Malignancy"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Infiction4"
                      defaultValue="Malignancy"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="Malignancy"
                    size="20"
                    onChange={handleChange}
                  ></input>
                </label>
              </label>
            </div>
            <div className="col-md-12">
              <label className="form-label form-control">
                {" "}
                Is patient currently on any other biological drugs? <br />
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="biological drugs"
                    defaultValue="Yes"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="html">
                    {" "}
                    Yes{" "}
                  </label>{" "}
                  &nbsp;
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="biological drugs"
                    defaultValue="No"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="css">
                    {" "}
                    No{" "}
                  </label>
                </div>
                <label className="form-label form-control">
                  {" "}
                  Medications:
                  <textarea
                    type="text"
                    className="form-control"
                    name="Medications"
                    size="50"
                    onChange={handleChange}
                  ></textarea>
                </label>
              </label>
              <div className="d-grid gap-2 col-md-12 mx-auto">
                <button
                  className="btn btn-outline-primary btn_ast"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : rx.step === "medication" ? (
        <Mediaction data={{ ...rx }} />
      ) : null}
    </>
  );
};
export default EosinophilicAsthma;
