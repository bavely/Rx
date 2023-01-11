import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../Medication";

const HepatitisB = (props) => {
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

  console.log(rx);

  return (
    <>
      {rx.step === "clinical" ? (
        <div>
          <Steps data={{ ...rx }} />
          <div className="container container_hepB">
            <form onSubmit={handleSubmit}>
              {/* 4. Diagnosis/Clinical Information */}
              <h3 className="hepB_h3"> Hepatitis B / Clinical Information </h3>
              <div className="col-md-12">
                <label className="form-label form-control">
                  {" "}
                  Diagnosis:
                  <textarea
                    className="form-control"
                    name="Diagnosis:"
                    onChange={handleChange}
                  ></textarea>{" "}
                </label>
              </div>
              <div className="col-md-12">
                <label className="form-label form-control">
                  {" "}
                  ICD-10:
                  <input
                    type="text"
                    className="form-control"
                    name="HepatitisB"
                    size="30"
                    onChange={handleChange}
                  ></input>{" "}
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
export default HepatitisB;
