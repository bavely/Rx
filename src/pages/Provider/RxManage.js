import React from "react";
import { useState, useEffect } from "react";
import providerHelper from "../../utils/Provider_Helper";
import { Link } from "react-router-dom";
import Logedout from "../../Components/Logout/Logedout";
import AddNewPt from "../../Components/ProviderPtComponents/AddNewPt";
import AddNewRx from "../../Components/ProviderPtComponents/AddNewRx";
import Therapy from "../../Components/therapy";
import Nav from "./Nav";
import Header from "./Header";
import Cards from "./Cards";

let initPatient = {
  first: "",
  last: "",
  email: "",
  phone: "",
  DOB: "",
  gender: "",
  race: "",
  height: "",
  weight: "",
  SSN: "",
  address: [
    {
      name: "",
      relation: "",
      street: "",
      city: "",
      zip: "",
      state: "",
    },
  ],
  ContactInfo: [
    {
      emName: "",
      emRelation: "",
      altPhone: "",
    },
  ],
  pharmacyID: "",
  providerID: "",
};

export default function RxManage() {
  const logedin = sessionStorage.getItem("logedin");
  const userId = sessionStorage.getItem("user");
  const [patients, setPatients] = useState([]);
  const [addnewptflag, setAddnewptflag] = useState(false);
  const [patient, setPatient] = useState(initPatient);
  const [notfoundflag, setNotfoundflag] = useState(false);
  const [inputs, setInputs] = useState({
    first: "",
    last: "",
    DOB: "",
  });
  const [selectedvalue, setSelectedvalue] = useState("");

  useEffect(() => {
    providerHelper
      .getPatients(userId)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setPatients(res.data.data);
        } else {
          setPatients([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

console.log(patients)

  const handleGetPts = (e) => {
    switch (e.target.name && e.target.value !== "") {
      case "first":
        setPatients(
          patients.filter((patient) => patient.first === e.target.value)
        );
        break;
      case "last":
        setPatients(
          patients.filter((patient) => patient.last === e.target.value)
        );
        break;
      case "DOB":
        setPatients(
          patients.filter((patient) => patient.DOB === e.target.value)
        );
        break;
      default:
        setPatients(patients);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedvalue(value);

    let patientSlected = value.split(" - ");

    setInputs((inputs) => ({ ...inputs, first: patientSlected[1], last: patientSlected[2], DOB: patientSlected[3] }));
  }

  const handleAddNewPt = () => {
    console.log(inputs);
    let patientSlected = selectedvalue.split(" - ");

    console.log(patients.some(i =>i.user.id.toString()  === patientSlected[0]));
    if (patients.some(i => i.user.id.toString()  === patientSlected[0])) {
      let patientTosend = patients.find(i => i.user.id.toString() === patientSlected[0])
      patientTosend.user.address = patientTosend.address.map(i =>{
        delete i.id;
        delete i.userID;
        return i;
      });
      patientTosend.user.ContactInfo = patientTosend.contacts.map(i =>{
        delete i.id;
        delete i.userID;
        return i;
      });
      delete patientTosend.address;
      delete patientTosend.contacts;
      console.log(patientTosend.user);
      setPatient(patientTosend.user);
     
      setAddnewptflag(true);
    } else {
      setPatient(initPatient);
      setNotfoundflag(true);
    }
  }

  const handleBack = () => {
    setAddnewptflag(false);
    setPatient(initPatient);
  setNotfoundflag(false);
    setInputs({
      first: "",
      last: "",
      DOB: "",
    });
    setSelectedvalue("");
  }

  return (
    <div>
      {logedin === "true" ? (
        <div id="wrapper">
          <Nav />
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <Header />
              <div className="container-fluid">
                <div className="pagetitle">
                  <h1>E-Prescribe</h1>
                </div>
                <div className="wrapper">
                  {addnewptflag ? (
                    <AddNewPt data = {patient} found = {!notfoundflag} onBackClicked = {handleBack}/>
                  ) : (
                    <div class="row g-3">
                      <div class="col-sm-2">
                        <input
                          type="text"
                          class="form-control"
                          list="first"
                          placeholder="First Name"
                          aria-label="City"
                          name="first"
                          onKeyUp={handleGetPts}
                          value={inputs.first}
                          onChange={handleChange}
                        />
                        <datalist id="first">
                          {patients.length > 0 &&
                            patients.map((patient) => {
                              return (
                                <option
                                  value={`${patient.user.id} - ${patient.user.first} - ${patient.user.last} - ${patient.user.DOB}`}
                                />
                              );
                            })}
                        </datalist>
                      </div>
                      <div class="col-sm-2">
                        <input
                          type="text"
                          class="form-control"
                          list="last"
                          placeholder="Last Name"
                          aria-label="State"
                          name="last"
                          onKeyUp={handleGetPts}
                          value={inputs.last}
                          onChange={handleChange}
                        />
                        <datalist id="last">
                          {patients.length > 0 &&
                            patients.map((patient) => {
                              return (
                                <option
                                  value={`${patient.user.id} - ${patient.user.first} - ${patient.user.last} - ${patient.user.DOB}`}
                                />
                              );
                            })}
                        </datalist>
                      </div>
                      <div class="col-sm-2">
                        <input
                          type="text"
                          class="form-control"
                          list="DOB"
                          placeholder="Date Of Birth"
                          aria-label="Zip"
                          name="DOB"
                          onKeyUp={handleGetPts}
                          value={inputs.DOB}
                          onChange={handleChange}
                        />
                        <datalist id="DOB">
                          {patients.length > 0 &&
                            patients.map((patient) => {
                              return (
                                <option
                                  value={`${patient.user.id} - ${patient.user.first} - ${patient.user.last} - ${patient.user.DOB}`}
                                />
                              );
                            })}
                        </datalist>
                      </div>
                      <div class="col-sm-auto">
                        <button type="button" className="btn btn-success" onClick={handleAddNewPt}>
                          Find Patient
                        </button>
                      </div>
                      {notfoundflag || patients.length === 0 ?  (
                        <>
                          <div class="col-sm-auto">
                            <p>OR</p>
                          </div>
                          <div class="col-sm-auto">
                            <button type="button" className="btn btn-success" onClick={()=>{
                              setAddnewptflag(true)
                            }}>
                              Add New Patient
                            </button>
                          </div>
                        </>
                      ) : <></>}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <footer className="bg-white sticky-footer">
              <div className="container my-auto">
                <div className="text-center my-auto copyright">
                  <span>Copyright © NEXTEHEALTH</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      ) : (
        <Logedout />
      )}
    </div>
  );
}
