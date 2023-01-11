import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../Medication";
import "../../css/CuruRx_forms_Styles.css";

const Hematopoietic = (props) => {
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
              <h3 className="hemat_h3">
                {" "}
                Hematopoietic / Clinical Information{" "}
              </h3>
              <div className="col-md-12">
                <label className="form-label form-control">
                  {" "}
                  Body Weight: &nbsp;
                  <input
                    type="text"
                    className="form-control-sm"
                    name="IU/mL"
                    size="5"
                    onChange={handleChange}
                  ></input>{" "}
                  &nbsp;
                  <label className="form-label"> Lb/Kg </label>&nbsp;&nbsp;
                  <label className="form-label">
                    {" "}
                    Age: &nbsp;
                    <input
                      className="form-control-sm"
                      type="text"
                      name="IU/mL"
                      size="5"
                      onChange={handleChange}
                    ></input>
                  </label>
                  &nbsp;&nbsp;
                  <label className="form-label">
                    {" "}
                    Adult/Pediatric: &nbsp;
                    <input
                      type="text"
                      className="form-control-sm"
                      name="IU/mL"
                      size="20"
                      onChange={handleChange}
                    ></input>
                  </label>
                </label>
              </div>
              <div className="col-md-12">
                <label className="form-label form-control">
                  <b> Diagnosis: </b> <br />
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Diagnoe2"
                      defaultValue="Dialysis/No Dialysis"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="html">
                      {" "}
                      Dialysis/No Dialysis{" "}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Diagnoe1"
                      defaultValue="Anemia"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="html">
                      {" "}
                      Anemia due to CKD{" "}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Diagnoe3"
                      defaultValue="Anemia due to myelosuppressive chemotherapy"
                      onChange={handleChange}
                    />
                    <label htmlFor="html">
                      {" "}
                      Anemia due to myelosuppressive chemotherapy{" "}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Diagnoe5"
                      defaultValue="Anemia due to Zidovudine Therapy"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="html">
                      {" "}
                      Anemia due to Zidovudine Therapy in HIV Patients{" "}
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Diagnoe4"
                      defaultValue="Type of Cancer"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="html">
                      {" "}
                      Type of Cancer:
                      <input
                        type="text"
                        className="form-control"
                        name="Type of Cancer"
                        size="20"
                        onChange={handleChange}
                      ></input>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor="html">
                      {" "}
                      Length of Therapy: &nbsp;
                      <input
                        type="text"
                        className="form-control mb-1"
                        name="Length of Therapy"
                        size="10"
                        onChange={handleChange}
                      ></input>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Diagnoe6"
                      defaultValue="Serum Erythropoietin Level"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="html">
                      {" "}
                      Serum Erythropoietin Level: &nbsp;
                      <input
                        type="text"
                        className="form-control-sm"
                        name="Type of Cancer"
                        size="10"
                        onChange={handleChange}
                      ></input>
                      &nbsp;
                      <label className="form-check-label">
                        {" "}
                        {"<mUnits/ml"}{" "}
                      </label>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Diagnoe6"
                      defaultValue="Elective Surgery"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="html">
                      {" "}
                      Elective Surgery{" "}
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Diagnoe7"
                      defaultValue="Type of Surgery"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="html">
                      {" "}
                      Type of Surgery: &nbsp;
                      <textarea
                        type="text"
                        className="form-control"
                        name="Type of Surgery"
                        onChange={handleChange}
                      ></textarea>
                    </label>
                  </div>
                </label>
              </div>

              <div className="col-md-12">
                <label className="form-label form-control">
                  <b>
                    {" "}
                    Lab Work: <br />{" "}
                  </b>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Lab Work1"
                      defaultValue="Scr."
                      onChange={handleChange}
                    />
                    <label className="form-label" htmlFor="html">
                      {" "}
                      SCr.: &nbsp;
                      <input
                        type="text"
                        className="form-control-sm"
                        name="Lab Work"
                        size="40"
                        onChange={handleChange}
                      ></input>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Lab Work2"
                      defaultValue="Scr."
                      onChange={handleChange}
                    />
                    <label className="form-check-label mb-1" htmlFor="html">
                      {" "}
                      Platelets Count: &nbsp;
                      <input
                        type="text"
                        className="form-control-sm"
                        name="Lab Work"
                        size="40"
                        onChange={handleChange}
                      ></input>
                    </label>
                  </div>{" "}
                  <br />
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Lab Work3"
                      defaultValue="Scr."
                      onChange={handleChange}
                    />
                    <label className="form-check-label mb-1" htmlFor="html">
                      {" "}
                      Crcl: &nbsp;
                      <input
                        type="text"
                        className="form-control-sm"
                        name="Lab Work"
                        size="40"
                        onChange={handleChange}
                      ></input>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Lab Work4"
                      defaultValue="Serum Ferritin (Iron Stores)"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="html">
                      {" "}
                      Serum Ferritin (Iron Stores): &nbsp;
                      <input
                        type="text"
                        className="form-control-sm mb-1"
                        name="Type of Cancer"
                        size="10"
                        onChange={handleChange}
                      ></input>{" "}
                      &nbsp;
                      <label
                        className="form-check-label"
                        onChange={handleChange}
                      >
                        {" "}
                        mcg/L{" "}
                      </label>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Lab Work5"
                      defaultValue="Hg Level"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="html">
                      {" "}
                      Hg Level: &nbsp;
                      <input
                        type="text"
                        className="form-control-sm"
                        name="Lab Work"
                        size="5"
                        onChange={handleChange}
                      ></input>{" "}
                      &nbsp;
                      <label className="form-check-label"> g/dl </label> &nbsp;
                      <label className="form-check-label">
                        {" "}
                        Date:
                        <input
                          type="date"
                          className="form-control-sm mb-1"
                          name="Date"
                          onChange={handleChange}
                        ></input>
                      </label>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Lab Work6"
                      defaultValue="TSAT Transferrin Saturation"
                      onChange={handleChange}
                    />
                    <label className="form-check-label mb-1" htmlFor="html">
                      {" "}
                      TSAT Transferrin Saturation: &nbsp;
                      <input
                        type="text"
                        className="form-control-sm"
                        name="Lab Work"
                        size="5"
                        onChange={handleChange}
                      ></input>{" "}
                      &nbsp;
                      <label className="form-check-label"> % </label>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Lab Work7"
                      defaultValue="Hematocrit"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="html">
                      {" "}
                      Hematocrit: &nbsp;
                      <input
                        type="text"
                        className="form-control-sm"
                        name="Hematocrit"
                        size="15"
                        onChange={handleChange}
                      ></input>{" "}
                      &nbsp;
                      <label> % </label>
                    </label>
                  </div>
                </label>
              </div>
              <div className="col-md-12">
                <label className="form-label form-control">
                  <b> History / Current Medical Status: </b> <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Current Medical Status2"
                      defaultValue="Uncontrolled BP"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="html">
                      {" "}
                      Uncontrolled BP - BP record: &nbsp;
                      <input
                        type="text"
                        className="form-control-sm mb-1"
                        name="Uncontrolled BP"
                        size="15"
                        onChange={handleChange}
                      ></input>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Current Medical Status1"
                      defaultValue="Stroke"
                      onChange={handleChange}
                    />
                    <label className="form-check-label mb-1" htmlFor="html">
                      {" "}
                      Stroke / DVT / PT: &nbsp;
                      <input
                        className="form-control-sm"
                        type="text"
                        name="Stroke"
                        size="15"
                        onChange={handleChange}
                      ></input>
                    </label>
                  </div>
                  <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Current Medical Status4"
                      defaultValue="Bleeding Disorder"
                      onChange={handleChange}
                    />
                    <label className="form-check-label mb-1" htmlFor="html">
                      {" "}
                      Bleeding Disorder - Specify: &nbsp;
                      <input
                        type="text"
                        className="form-control-sm"
                        name="Bleeding Disorder"
                        size="15"
                        onChange={handleChange}
                      ></input>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Current Medical Status5"
                      defaultValue="Seizures disorder"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="html">
                      {" "}
                      Seizures disorder - Specify:&nbsp;
                      <input
                        type="text"
                        className="form-control-sm mb-1"
                        name="Seizures disorder"
                        size="15"
                        onChange={handleChange}
                      ></input>
                    </label>
                  </div>
                  <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Current Medical Status6"
                      defaultValue="Any Allergy"
                      onChange={handleChange}
                    />
                    <label className="form-check-label mb-1" htmlFor="html">
                      {" "}
                      Any Allergy - Specify: &nbsp;
                      <input
                        type="text"
                        className="form-control-sm"
                        name="Any Allergy"
                        size="15"
                        onChange={handleChange}
                      ></input>
                    </label>
                  </div>{" "}
                  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Current Medical Status6"
                      defaultValue="Pregnant / Nursing"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="html">
                      {" "}
                      Pregnant / Nursing: &nbsp;
                      <input
                        type="text"
                        className="form-control-sm mb-1"
                        name="Seizures disorder"
                        size="15"
                        onChange={handleChange}
                      ></input>
                    </label>
                  </div>{" "}
                  <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Current Medical Status8"
                      defaultValue="Heart disease"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="html">
                      {" "}
                      Heart disease - Specify: &nbsp;
                      <input
                        type="text"
                        className="form-control-sm"
                        name="Heart disease"
                        size="15"
                        onChange={handleChange}
                      ></input>
                    </label>
                  </div>
                </label>
              </div>
              <div className="col-md-12">
                <label className="form-label form-control" htmlFor="html">
                  {" "}
                  Patient been previously on any ESA Therapy? <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="ESA Therapy"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="html">
                      Yes
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="ESA Therapy"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label htmlFor="css">No</label>
                  </div>
                  <br />
                  <label htmlFor="html">
                    {" "}
                    Drug Name:
                    <input
                      type="text"
                      className="form-control"
                      name="Drug Name"
                      size="20"
                      onChange={handleChange}
                    ></input>
                  </label>
                  <div className="form-check form-check-inline">
                    <label htmlFor="html">
                      {" "}
                      For how long?:
                      <input
                        type="text"
                        className="form-control"
                        name="How long"
                        size="20"
                        onChange={handleChange}
                      ></input>
                    </label>
                  </div>
                </label>
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
      ) : rx.step === "medication" ? (
        <Mediaction data={{ ...rx }} />
      ) : null}
    </>
  );
};
export default Hematopoietic;
