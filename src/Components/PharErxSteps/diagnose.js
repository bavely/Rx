import React, { useEffect, useState } from "react";
import Steps from "./steps";
import Alzheimer from "./clnical/Alzheimer";
import Asthma from "./clnical/Asthma";
import helper from "../../utils/helper";
import Covid19 from "./clnical/Covid19";
import Dermatology from "./clnical/Dermatology";
import EosinophilicAsthma from "./clnical/EosinophilicAsthma";
import Gastroenterology from "./clnical/Gastroenterology";
import GastroenterologyZinplava from "./clnical/GastroenterologyZinplava";
import Hematopoietic from "./clnical/Hematopoietic";
import Hemophilia from "./clnical/Hemophilia";
import HepatitisB from "./clnical/HepatitisB";
import HepatitisC from "./clnical/HepatitisC";
import HepatitisSovaldi from "./clnical/HepatitisSovaldi";
import HIVAIDS from "./clnical/HIVAIDS";
import ImmuneGlobulin from "./clnical/ImmuneGlobulin";
import GoutKrystexxa from "./clnical/KrystexxaIVInfusionForGout";
import Migraine from "./clnical/Migraine";
import MigraineVyepti from "./clnical/MigraineVyepti";
import MultipleSclerosis from "./clnical/MultipleSclerosis";
import MultipleSclerosisTecfidera from "./clnical/MultipleSclerosisTecfidera";
import OncologyIV from "./clnical/OncologyIV";
import OralOncology from "./clnical/OralOncology";
import Osteoporosis from "./clnical/Osteoporosis";
import Rheumatology from "./clnical/Rheumatology";
import "../../css/CuruRx_forms_Styles.css";
import AutoimmuneDisorder from "./clnical/AutoimmuneDisorder";
import PrimaryImmuneDeficiency from "./clnical/PrimaryImmuneDeficiency";
import LupronDepotPeds from "./clnical/LupronDepot-PEDs ";
import LupronDepot from "./clnical/LupronDepot";

const Diagnosis = (props) => {
  console.log(props.data, "yyy");
  const [value, setValue] = useState("");
  const [diag, setDiag] = useState([]);
  const [rx, setRx] = useState({
    step: props.data.step,
    therapy: props.data.therapy !== "" ? props.data.therapy : "",
    ICD10: props.data.ICD10 !== "" ? props.data.ICD10 : "",
    diagnose: props.data.diagnose !== "" ? props.data.diagnose : "",
    provider_id:
      props.data.provider_id !== undefined ? props.data.provider_id : "",
    patient_id: props.data.patient_id !== "" ? props.data.patient_id : "",
    clinicalinfo: props.data.clinicalinfo !== [] ? props.data.clinicalinfo : [],
    medications: props.data.medications !== [] ? props.data.medications : [],
    provider_name: props.data.provider_name !== ""  ? props.data.provider_name : "",
    patient_name: props.data.patient_name !== ""  ? props.data.patient_name : "",
  });

  useEffect(() => {
    helper.handleDiag().then((res) => {
      setDiag(res.res.data.diag);
    });
  }, []);

  const handleChoice = (e) => {
    setValue(e.target.value);
    e.preventDefault();
  };

  const handleChange = (event) => {
    setRx({ ...rx, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    if (rx.diagnose !== "" || rx.ICD10 !== "") {
      setRx({ ...rx, step: "clinical" });
      props.updata("clinical", rx);
    }
    event.preventDefault();
  };

  return (
    <>
      {rx.step === "diagnose" ? (
        <div>
          {" "}
          {/* <Steps data={{ ...rx }} /> */}
          <form>
            <div className="container container_diagnose mb-3">
              <h3 className="diagnose_h3"> Diagnosis </h3>
              <label className="form-label form-control" htmlFor="form">
                ICD10 OR Diagnosis:
                <select className="form-select" onChange={handleChoice}>
                  <option defaultValue="">Choose</option>
                  <option value="ICD10">ICD10</option>
                  <option value="Diagnosis">Diagnosis</option>
                </select>
              </label>
            </div>
          </form>
          {value === "ICD10" ? (
            <form onSubmit={handleSubmit}>
              <div className="container container_diagnose">
                <label className="form-label form-control" htmlFor="form">
                  ICD10:
                  <input
                    list="ICD10"
                    className="form-control"
                    type="text"
                    name="ICD10"
                    value={rx.ICD10}
                    onChange={handleChange}
                  />
                </label>
                <datalist id="ICD10">
                  {diag.map((each) => {
                    return <option>{each.ICD10}</option>;
                  })}
                </datalist>
                <div className="d-grid gap-2 col-md-12 mx-auto">
                  <button className="btn btn-outline-primary icd" type="submit">
                    {" "}
                    Continue
                  </button>
                </div>
              </div>
            </form>
          ) : value === "Diagnosis" ? (
            <div className="container container_diagnose mb-3">
              <form onSubmit={handleSubmit}>
                <label className="form-label form-control" htmlFor="form">
                  Diagnosis:
                  <input
                    list="diagnose"
                    placeholder="Choose"
                    className="form-control"
                    type="text"
                    name="diagnose"
                    value={rx.diagnose}
                    onChange={handleChange}
                  />
                </label>
                <datalist id="diagnose">
                  {diag.map((each) => {
                    return <option>{each.diagnose}</option>;
                  })}
                </datalist>
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
          ) : null}
        </div>
      ) : null}{" "}
    </>
  );
};
export default Diagnosis;
