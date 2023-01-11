import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../medication";
import "../../../css/CuruRx_forms_Styles.css";

const Gastroenterology = (props) => {
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
        <div className="container container_gas">
          {/* <Steps data={{ ...rx }} /> */}
          <form className="mb-3" onSubmit={handleSubmit}>
            {/* 4. Diagnosis/Clinical Information */}

            <h3 className="gas_h3">
              {" "}
              Gastroenterology / Clinical Information{" "}
            </h3>
            <div className="col-md-12">
              <label
                className="form-label form-control"
                htmlFor="Gastroenterology"
              >
                {" "}
                Diagnosis:
                <textarea
                  className="form-control"
                  name="Gastroenterology"
                  onChange={handleChange}
                ></textarea>
              </label>
            </div>
            <div className="col-md-12">
              <label
                className="form-label form-control"
                htmlFor="Gastroenterology1"
              >
                {" "}
                ICD-10:
                <input
                  type="text"
                  className="form-control"
                  name="Gastroenterology1"
                  size="30"
                  onChange={handleChange}
                ></input>
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
export default Gastroenterology;
