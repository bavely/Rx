import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../medication";

const PrimaryImmuneDeficiency = (props) => {
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
          <form onSubmit={handleSubmit}>
            {/* 3) Clinical Information */}
            <h3> Primary Immune Deficiency / Clinical Information </h3>
            {/* Q1 */}
            <label> {"Other drugs used to treat patient’s condition:"} </label>
            <input
              type="text"
              name="Other drugs used to treat this condition:"
              size="30"
              onChange={handleChange}
            ></input>{" "}
            <br />
            {/* Q2 */}
            <label> First dose of IGIV: </label>
            <input
              type="radio"
              name="First dose of IGIV:"
              defaultValue="Yes"
              onChange={handleChange}
            />
            <label> Yes </label>
            <input
              type="radio"
              name="First dose of IGIV:"
              defaultValue="No"
              onChange={handleChange}
            />
            <label> No </label> &nbsp;&nbsp;&nbsp;
            {/* Q3 */}
            <label> Prior IGIV products tried: </label>
            <input
              type="text"
              name="Prior IGIV products tried:"
              size="30"
              onChange={handleChange}
            ></input>{" "}
            <br />
            {/* Q4 */}
            <label> Adverse reactions with previous IGIV treatments: </label>
            <input
              type="text"
              name="Adverse reactions with previous IGIV treatments:"
              size="50"
              onChange={handleChange}
            ></input>{" "}
            <br />
            {/* Q4 */}
            <label> ICD-10: </label>
            <input
              type="text"
              name="ICD-10:"
              size="10"
              onChange={handleChange}
            ></input>{" "}
            &nbsp;&nbsp;&nbsp;
            {/* Q5 */}
            <input
              type="checkbox"
              name="What kind of Immune Deficieny 1:"
              defaultvalue="Acute Infective Polyneuritis"
              onChange={handleChange}
            />
            <label>
              {" "}
              Acute Infective Polyneuritis (Guillain-Barre Syndrome){" "}
            </label>{" "}
            &nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              name="What kind of Immune Deficieny 2:"
              defaultvalue="Pemphigus (Foliaceus/Vulgaris)"
              onChange={handleChange}
            />
            <label> Pemphigus (Foliaceus / Vulgaris) </label> <br />
            <input
              type="checkbox"
              name="What kind of Immune Deficieny 3:"
              defaultvalue="Myasthenia Gravis with (Acute) Exacerbation"
              onChange={handleChange}
            />
            <label> Myasthenia Gravis with (Acute) Exacerbation </label>{" "}
            &nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              name="What kind of Immune Deficieny 4:"
              defaultvalue="Myasthenia Gravis without (Acute) Exacerbation"
              onChange={handleChange}
            />
            <label> Myasthenia Gravis without (Acute) Exacerbation </label>{" "}
            &nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              name="What kind of Immune Deficieny 5:"
              defaultvalue="Chronic Inflammatory Demyelinating Polyneuropathy(CIDP)"
              onChange={handleChange}
            />
            <label>
              {" "}
              Chronic Inflammatory Demyelinating Polyneuropathy (CIDP){" "}
            </label>{" "}
            <br />
            <input
              type="checkbox"
              name="What kind of Immune Deficieny 6:"
              defaultvalue="Inflammatory Polyneuropathy, Unspecified"
              onChange={handleChange}
            />
            <label> Inflammatory Polyneuropathy, Unspecified </label>{" "}
            &nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              name="What kind of Immune Deficieny 7:"
              defaultvalue="Dermatomyositis"
              onChange={handleChange}
            />
            <label> Dermatomyositis </label> &nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              name="What kind of Immune Deficieny 8:"
              defaultvalue="Multiple Sclerosis (MS)"
              onChange={handleChange}
            />
            <label> Multiple Sclerosis (MS) </label> <br />
            <input
              type="checkbox"
              name="What kind of Immune Deficieny 9:"
              defaultvalue="Multifocal Neuropathy (MMN)"
              onChange={handleChange}
            />
            <label> Multifocal Neuropathy (MMN) </label> &nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              name="What kind of Immune Deficieny 10:"
              defaultvalue="Pemphigoid"
              onChange={handleChange}
            />
            <label> Pemphigoid </label> <br />
            <input
              type="checkbox"
              name="What kind of Immune Deficieny 11:"
              defaultvalue="Polymyositis"
              onChange={handleChange}
            />
            <label> Polymyositis </label> &nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              name="What kind of Immune Deficieny 12:"
              defaultvalue="Stiff-Person Syndrome"
              onChange={handleChange}
            />
            <label> Stiff-Person Syndrome </label> &nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              name="What kind of Immune Deficieny 13:"
              defaultvalue="Other"
              onChange={handleChange}
            />
            <label> Other: </label>
            <input
              type="text"
              name="Other"
              size="20"
              onChange={handleChange}
            ></input>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : null}
    </>
  );
};
export default PrimaryImmuneDeficiency;
