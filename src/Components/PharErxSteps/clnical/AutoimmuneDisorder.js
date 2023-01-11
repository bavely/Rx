import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../medication";

const AutoimmuneDisorder = (props) => {
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

  console.log(rx, "from heellsdj");

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
          <Steps data={{ ...rx }} />
          <form onSubmit={handleSubmit}>
            {/* 3) Clinical Information */}
            <h3> Autoimmune Disorder / Clinical Information </h3>
            {/* Q1 */}
            <label> {"Other drugs used to treat patient’s condition:"} </label>
            <input
              type="text"
              name="Drugs used fot the condition"
              size="30"
              onChange={handleChange}
            ></input>{" "}
            <br />
            {/* Q2*/}
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
            {/* Q3*/}
            <label> Prior IGIV products tried: </label>
            <input
              type="text"
              name="Prior IGIV products"
              size="30"
              onChange={handleChange}
            ></input>{" "}
            <br />
            {/* Q4*/}
            <label> Adverse reactions with previous IGIV treatments: </label>
            <input
              type="text"
              name="Adverse reactions with previous IGIV treatments:"
              size="50"
              onChange={handleChange}
            ></input>{" "}
            <br />
            <label> ICD-10: </label>
            <input
              type="text"
              name="ICD-10"
              size="10"
              onChange={handleChange}
            ></input>{" "}
            &nbsp;&nbsp;&nbsp;
            {/* Q5*/}
            <input
              type="checkbox"
              name="Adverse reactions with previous IGIV treatments 1:"
              defaultValue="Acute Infective Polyneuritis (Guillain-Barre Syndrome)"
              onChange={handleChange}
            />
            <label>
              {" "}
              Acute Infective Polyneuritis (Guillain-Barre Syndrome){" "}
            </label>{" "}
            &nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              name="Adverse reactions with previous IGIV treatments 2:"
              defaultValue="Pemphigus (Foliaceus / Vulgaris)"
              onChange={handleChange}
            />
            <label> Pemphigus (Foliaceus / Vulgaris) </label> &nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              name="Adverse reactions with previous IGIV treatments 3:"
              defaultValue="Myasthenia Gravis with Exacerbation"
              onChange={handleChange}
            />
            <label> Myasthenia Gravis with (Acute) Exacerbation </label>{" "}
            &nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              name="Adverse reactions with previous IGIV treatments 4:"
              defaultValue="Myasthenia Gravis without Exacerbation"
              onChange={handleChange}
            />
            <label> Myasthenia Gravis without (Acute) Exacerbation </label>{" "}
            &nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              name="Adverse reactions with previous IGIV treatments 5:"
              defaultValue="Chronic Inflammatory Demyelinating Polyneuropathy"
              onChange={handleChange}
            />
            <label>
              {" "}
              Chronic Inflammatory Demyelinating Polyneuropathy (CIDP){" "}
            </label>{" "}
            &nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              name="Adverse reactions with previous IGIV treatments 6:"
              defaultValue="Inflammatory Polyneuropathy, Unspecified"
              onChange={handleChange}
            />
            <label> Inflammatory Polyneuropathy, Unspecified </label> <br />
            <input
              type="checkbox"
              name="Adverse reactions with previous IGIV treatments 7:"
              defaultValue="Dermatomyositis"
              onChange={handleChange}
            />
            <label> Dermatomyositis </label> &nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              name="Adverse reactions with previous IGIV treatments 8:"
              defaultValue="Multiple Sclerosis"
              onChange={handleChange}
            />
            <label> Multiple Sclerosis (MS) </label> &nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              name="Adverse reactions with previous IGIV treatments 9:"
              defaultValue="Multifocal Neuropathy"
              onChange={handleChange}
            />
            <label> Multifocal Neuropathy (MMN) </label> <br />
            <input
              type="checkbox"
              name="Adverse reactions with previous IGIV treatments 10:"
              defaultValue="Pemphigoid"
              onChange={handleChange}
            />
            <label> Pemphigoid </label>
            <input
              type="checkbox"
              name="Adverse reactions with previous IGIV treatments 11:"
              defaultValue="Polymyositis"
              onChange={handleChange}
            />
            <label> Polymyositis </label>
            <input
              type="checkbox"
              name="Adverse reactions with previous IGIV treatments 12:"
              defaultValue="Stiff-Person Syndrome"
              onChange={handleChange}
            />
            <label> Stiff-Person Syndrome </label> <br />
            <input
              type="checkbox"
              name="Adverse reactions with previous IGIV treatments 13:"
              defaultValue="Other"
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
      ) : rx.step === "medication" ? (
        <Mediaction data={{ ...rx }} />
      ) : null}
    </>
  );
};
export default AutoimmuneDisorder;
