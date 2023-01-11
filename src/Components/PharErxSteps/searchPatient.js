import React from "react";
import { useState, useEffect } from "react";
import Steps from "./steps";
import pharmacistHelper from "../../utils/Pharmacist_Helper";
import Addpatient from "./Addpatient";
// import Therapy from "./therapy";
function SearchPatient(props) {
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
  console.log(props.data);


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

  const [msg, setMsg] = useState("");

  const [formInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    DOB: "",
  });


  const handleChange = (event) => {
    event.preventDefault();
    setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    console.log(rx);
    event.preventDefault();
    console.log(formInfo);
    if (
      formInfo.firstName === "" &&
      formInfo.lastName === "" &&
      formInfo.DOB === ""
    ) {
      setMsg("Please fill at least one fields");
    } else {
      pharmacistHelper.handleSearchPatient(formInfo).then((res) => {
        if (res.status !== 200 || !res.status) {
          setMsg("Patinet Not Found");
        } else {
          setMsg("");
          console.log(rx);
          rx.patient_id = res.data.Patient.id;
          rx.patient_name = res.data.Patient.firstName + " " + res.data.Patient.lastName;
          // setRx({...rx, patient_id: res.data.Patient.id, patient_name: res.data.Patient.firstName + " " + res.data.Patient.lastName});
          console.log(rx);
          props.updata("therapy", rx);
        }
      });
    }
  };

  const handleAddPatient = (firstName, lastName, DOB) => {
    let obj = {firstName, lastName, DOB}
    pharmacistHelper.handleSearchPatient(obj).then((res) => {
      if (res.status !== 200 || !res.status) {
        setMsg("Patinet Not Found");
      } else {
        setMsg("");
        rx.patient_id = res.data.Patient.id;
        rx.patient_name = res.data.Patient.firstName + " " + res.data.Patient.lastName;
        setRx(rx);
        props.updata("therapy", rx);
      }
    });
  }

  return (
    <div className="App">
      <>{msg ===  "Patinet Not Found" ? <> <Addpatient data={rx} onAddpt = {handleAddPatient}/></>:
      <>
      <h1>Find Patient</h1>
      <>{msg === "" ? <></> : <>{msg}</>}</>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              aria-label="First name"
              name="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              aria-label="Last name"
              name="lastName"
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              placeholder="DOB"
              aria-label="DOB"
              name="DOB"
              onChange={handleChange}
            />
          </div>
          <div className="d-grid gap-2 col-md-12 mx-auto">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
      </>
      }</>
    </div>
   
  );
}

export default SearchPatient;
