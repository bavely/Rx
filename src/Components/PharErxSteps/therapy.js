import React from "react";
import { useState, useEffect } from "react";
import Steps from "./steps";
import Diagnosis from "./diagnose";

function Therapy(props) {
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
console.log(props.data, "therapy");

useEffect(() => {
    
  // return () => {
    setRx({
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
  // };
}, [props.data]);


const [formInfo, setFormInfo] = useState({therapy: ""});
  const handleChange = (event) => {
    event.preventDefault();
    setFormInfo({ ...formInfo, therapy: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // if (rx.therapy !== "") {
      // setRx({ ...rx });
      rx.therapy = formInfo.therapy;
      console.log(rx, "therapy");
      props.updata("diagnose", rx);
    // }
    
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="container_therapy">
          <label className="form-label form-control" htmlFor="form">
            Choose a form:
            <select
              className="form-select"
              value={rx.therepy}
              onChange={handleChange}
            >
              <option defaultValue={""}>Choose</option>
              <option value="Alzheimer">1- Alzheimer</option>
              <option value="Asthma">2- Asthma</option>
              <option value="Covid19">3- Covid19</option>
              <option value="Dermatology">4- Dermatology</option>
              <option value="EosinophilicAsthma">5- Eosinophilic Asthma</option>
              <option value="Gastroenterology">6- Gastroenterology</option>
              <option value="GastroenterologyZinplava">
                7- Gastroenterology Zinplava
              </option>
              <option value="Hematopoietic">8- Hematopoietic</option>
              <option value="Hemophilia">9- Hemophili A</option>
              <option value="HepatitisB">10- Hepatitis B</option>
              <option value="HepatitisC">11- Hepatitis C</option>
              <option value="HepatitisSovaldi">12- Hepatitis Sovaldi</option>
              <option value="HIVAIDS">13- HIVAIDS</option>
              <option value="AutoimmuneDisorder">
                14- Autoimmune Disorder
              </option>
              <option value="ImmuneGlobulin">15- Immune Globulin</option>
              <option value="KrystexxaIVInfusionForGout">
                16- Krystexxa IV Infusion For Gout
              </option>
              <option value="Migraine">17- Migraine</option>
              <option value="MigraineVyepti">18- Migraine Vyepti</option>
              <option value="MultipleSclerosis">19- Multiple Sclerosis</option>
              <option value="MultipleSclerosisTecfidera">
                20- Multiple Sclerosis Tecfidera
              </option>
              <option value="OncologyIV">21- Oncology IV</option>
              <option value="OncologyIVOpdivo">22- Oncology IV Opdivo</option>
              <option value="OralOncology">23- Oral Oncology</option>
              <option value="Osteoporosis">24- Osteoporosis</option>
              <option value="Rheumatology">25- Rheumatology</option>
              <option value="LupronDepot">26- Lupron Depot</option>
              <option value="LupronDepotPeds">27- Lupron Depot Peds</option>
            </select>
          </label>
          <div className="d-grid gap-2 col-md-12 mx-auto">
            <button className="btn btn-outline-primary btn_ast" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Therapy;
