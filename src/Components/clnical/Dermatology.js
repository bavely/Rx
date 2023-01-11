import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../Medication";
import "../../css/CuruRx_forms_Styles.css";

const Dermatology = (props) => {
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

  const [affecteArea, setaffecteArea] = useState({
    checkedItems: new Map(),
  });

  const handleChange = (event) => {
    setQA({ ...QA, [event.target.name]: event.target.value });
  };

  const handleCheckbox = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setaffecteArea((prevState) => ({
      checkedItems: prevState.checkedItems.set(value, isChecked),
    }));
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

      if (affecteArea.checkedItems.size !== 0) {
        const obj = Object.fromEntries(affecteArea.checkedItems);
        Object.keys(obj).forEach((key) => {
          if (!obj[key]) delete obj[key];
        });
        if (affecteArea.checkedItems.size !== 0) {
          const mn = Object.keys(obj).join(",");
          const NewQA = { question: "Affected Area", answer: mn };
          ms.push(NewQA);
        }
      }
      setRx({ ...rx, clinicalinfo: [ms], step: "medication" });
    } else if (affecteArea.checkedItems.size !== 0) {
      const obj = Object.fromEntries(affecteArea.checkedItems);
      Object.keys(obj).forEach((key) => {
        if (!obj[key]) delete obj[key];
      });
      if (affecteArea.checkedItems.size !== 0) {
        const mn = Object.keys(obj).join(",");
        const NewQA = { question: "Affected Area", answer: mn };
        setRx({ ...rx, clinicalinfo: [NewQA], step: "medication" });
      }
    } else {
      setRx({ ...rx, clinicalinfo: [], step: "medication" });
    }

    event.preventDefault();
  };

  return (
    <>
      {rx.step === "clinical" ? (
        <div>
          <Steps data={{ ...rx }} />
          <div className="container container_dermatology">
            <form className="mb-3" onSubmit={handleSubmit}>
              {/* 3) Clinical Information */}
              <h3 className="dermatology_h3">
                {" "}
                Dermatology / Clinical Information{" "}
              </h3>
              {/* Q1 */}
              <div className="col-md-12">
                <label className="form-label form-control">
                  Diagnosis: <br />
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Diagnosis:"
                      defaultValue="ICD-10"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">ICD-10</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Diagnosis:"
                      defaultValue="L40 (Plaque Psoriasis)"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      L40 (Plaque Psoriasis)
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Diagnosis:"
                      defaultValue="L40 (Psoriasis)"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">L40 (Psoriasis)</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Diagnosis:"
                      defaultValue="L40.5 (Psoriatic)"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      L40.5 (Psoriatic)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Diagnosis:"
                      defaultValue="L73.2 (Hidradenitis Supp.)"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      L73.2 (Hidradenitis Supp.)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Diagnosis:"
                      defaultValue="L40.8 (other Psoriasis)"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      L40.8 (other Psoriasis)
                    </label>
                  </div>
                </label>
              </div>
              <div className="col-md-12">
                <label className="form-label form-control">
                  Diagnosis Date
                  <input
                    type="date"
                    className="form-control"
                    name="Diagnosis Date:"
                  />
                </label>
              </div>
              {/* Q2 */}
              <div className="col-md-12">
                <label className="form-label form-control">
                  Affected Areas: <br />
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Affected Area"
                      defaultValue="Palms"
                      onChange={handleCheckbox}
                    />
                    <label className="form-check-label"> Palms </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Affected Area"
                      defaultValue="Soles"
                      onChange={handleCheckbox}
                    />
                    <label className="form-check-label"> Soles </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Affected Area"
                      defaultValue="Head"
                      onChange={handleCheckbox}
                    />
                    <label className="form-check-label"> Head </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Affected Area"
                      defaultValue="Neck"
                      onChange={handleCheckbox}
                    />
                    <label className="form-check-label"> Neck </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Affected Area"
                      defaultValue="Groin/Genitals"
                      onChange={handleCheckbox}
                    />
                    <label className="form-check-label"> Groin/Genitals </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Affected Area"
                      defaultValue="Other"
                      onChange={handleCheckbox}
                    />
                    <label className="form-check-label">
                      {" "}
                      Other
                      <textarea
                        type="text"
                        className="form-control area"
                        name="Eosinophil Level"
                        onChange={handleChange}
                      ></textarea>
                    </label>
                  </div>
                </label>
              </div>
              {/* Q4 */}
              <div className="col-md-12">
                <label className="form-label form-control">
                  Moderate to severe Atopic Dermatitis (AD) that is in
                  adequately controlled on current or prior topical therapy:{" "}
                  <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Moderate to severe Atopic Dermatitis (AD) that is in adequately controlled on current or prior topical therapy:"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Moderate to severe Atopic Dermatitis (AD) that is in adequately controlled on current or prior topical therapy:"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                </label>
              </div>
              {/* Q5 */}
              <div className="col-md-12">
                <label className="form-label form-control">
                  Indicate prior therapy:
                  <textarea
                    type="text"
                    className="form-control"
                    name="Indicate prior therapy:"
                    onChange={handleChange}
                  ></textarea>
                </label>
              </div>
              {/* Q6 */}
              <div className="col-md-12">
                <label className="form-label form-control">
                  BSA Level: <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="BSA Level:"
                      defaultValue=">10%"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">{">10%"}</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="BSA Level:"
                      defaultValue="<10%"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">{"<10%"}</label> <br />
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
export default Dermatology;
