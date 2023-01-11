import React from "react";
import { useEffect, useState, useRef } from "react";
import pharmacistHelper from "../../utils/Pharmacist_Helper";
import Logedout from "../../Components/Logout/Logedout";
import Nav from "./Nav";
import Header from "./Header";
import SearchProvider from "../../Components/PharErxSteps/searchProvider";
import Steps from "../../Components/PharErxSteps/steps";
import SearchPatient from "../../Components/PharErxSteps/searchPatient";
import Therapy from "../../Components/PharErxSteps/therapy";
import Diagnosis from "../../Components/PharErxSteps/diagnose";
import Mediaction from "../../Components/PharErxSteps/medication";
// import Mediaction from "../../Components/PharErxSteps/Mediaction";
import Alzheimer from "../../Components/PharErxSteps/clnical/Alzheimer";
import Asthma from "../../Components/PharErxSteps/clnical/Asthma";
import Covid19 from "../../Components/PharErxSteps/clnical/Covid19";
import Dermatology from "../../Components/PharErxSteps/clnical/Dermatology";
import EosinophilicAsthma from "../../Components/PharErxSteps/clnical/EosinophilicAsthma";
import Gastroenterology from "../../Components/PharErxSteps/clnical/Gastroenterology";
import GastroenterologyZinplava from "../../Components/PharErxSteps/clnical/GastroenterologyZinplava";
import Hematopoietic from "../../Components/PharErxSteps/clnical/Hematopoietic";
import Hemophilia from "../../Components/PharErxSteps/clnical/Hemophilia";
import HepatitisB from "../../Components/PharErxSteps/clnical/HepatitisB";
import HepatitisC from "../../Components/PharErxSteps/clnical/HepatitisC";
import HepatitisSovaldi from "../../Components/PharErxSteps/clnical/HepatitisSovaldi";
import HIVAIDS from "../../Components/PharErxSteps/clnical/HIVAIDS";
import ImmuneGlobulin from "../../Components/PharErxSteps/clnical/ImmuneGlobulin";
import GoutKrystexxa from "../../Components/PharErxSteps/clnical/KrystexxaIVInfusionForGout";
import Migraine from "../../Components/PharErxSteps/clnical/Migraine";
import MigraineVyepti from "../../Components/PharErxSteps/clnical/MigraineVyepti";
import MultipleSclerosis from "../../Components/PharErxSteps/clnical/MultipleSclerosis";
import MultipleSclerosisTecfidera from "../../Components/PharErxSteps/clnical/MultipleSclerosisTecfidera";
import OncologyIV from "../../Components/PharErxSteps/clnical/OncologyIV";
import OralOncology from "../../Components/PharErxSteps/clnical/OralOncology";
import Osteoporosis from "../../Components/PharErxSteps/clnical/Osteoporosis";
import Rheumatology from "../../Components/PharErxSteps/clnical/Rheumatology";
import AutoimmuneDisorder from "../../Components/PharErxSteps/clnical/AutoimmuneDisorder";
import PrimaryImmuneDeficiency from "../../Components/PharErxSteps/clnical/PrimaryImmuneDeficiency";
import LupronDepotPeds from "../../Components/PharErxSteps/clnical/LupronDepot-PEDs ";
import LupronDepot from "../../Components/PharErxSteps/clnical/LupronDepot";
import Review from "../../Components/PharErxSteps/Review";

function ManageRx() {
  const steps = [
    "sprovider",
    "spatient",
    "therapy",
    "diagnose",
    "clinical",
    "medication",
    "review",
  ];
  const logedin = sessionStorage.getItem("logedin");
  const [currentStep, setCurrentStep] = useState("sprovider");
  const [rx, setRx] = useState({
    step: "",
    therapy: "",
    ICD10: "",
    diagnose: "",
    provider_id: "",
    provider_name: "",
    patient_id: "",
    patient_name: "",
    clinicalinfo: [],
    medications: [],
  });
  const handleSteps = (step, rx) => {
    console.log(step, rx, "step");
    setCurrentStep(step);
    rx.step = step;
    setRx(rx);
  };

  useEffect(() => {
    
      setRx(rx);
  
  }, [rx]);
  console.log(currentStep);
  console.log(rx);
  let clinical;
  if (rx.clinicalinfo.length > 0) {
    clinical = rx.clinicalinfo[0];
  } else {
    clinical = undefined;
  }
  console.log(steps[steps.indexOf(currentStep)+1], currentStep);
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
                  <h1>E-Prescribe </h1>
                  <div className="row">
                    <div className="col-md-6">
                      <Steps data={{ step: currentStep }} />
                      {currentStep === "sprovider" ? (
                        <SearchProvider updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "spatient" ? (
                        <>
                          <SearchPatient
                            updata={handleSteps}
                            data={{  ...rx }}
                          />
                        </>
                      ) : currentStep === "therapy" ? (
                        <>
                          <Therapy updata={handleSteps} data={{ ...rx }} />
                        </>
                      ) : currentStep === "diagnose" ? (
                        <>
                          <Diagnosis updata={handleSteps} data={{ ...rx }} />
                        </>
                      ) : currentStep === "clinical" &&
                        rx.therapy === "Alzheimer" ? (
                        <Alzheimer updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "Asthma" ? (
                        <Asthma updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "Covid19" ? (
                        <Covid19 updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "Dermatology" ? (
                        <Dermatology updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "EosinophilicAsthma" ? (
                        <EosinophilicAsthma
                          updata={handleSteps}
                          data={{ ...rx }}
                        />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "Gastroenterology" ? (
                        <Gastroenterology
                          updata={handleSteps}
                          data={{ ...rx }}
                        />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "GastroenterologyZinplava" ? (
                        <GastroenterologyZinplava
                          updata={handleSteps}
                          data={{ ...rx }}
                        />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "Hematopoietic" ? (
                        <Hematopoietic updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "Hemophilia" ? (
                        <Hemophilia updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "HepatitisB" ? (
                        <HepatitisB updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "HepatitisC" ? (
                        <HepatitisC updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "HepatitisSovaldi" ? (
                        <HepatitisSovaldi
                          updata={handleSteps}
                          data={{ ...rx }}
                        />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "HIVAIDS" ? (
                        <HIVAIDS updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "AutoimmuneDisorder" ? (
                        <AutoimmuneDisorder
                          updata={handleSteps}
                          data={{ ...rx }}
                        />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "ImmuneGlobulin" ? (
                        <ImmuneGlobulin updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "KrystexxaIVInfusionForGout" ? (
                        <GoutKrystexxa updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "Migraine" ? (
                        <Migraine updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "MigraineVyepti" ? (
                        <MigraineVyepti updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "MultipleSclerosis" ? (
                        <MultipleSclerosis
                          updata={handleSteps}
                          data={{ ...rx }}
                        />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "MultipleSclerosisTecfidera" ? (
                        <MultipleSclerosisTecfidera
                          updata={handleSteps}
                          data={{ ...rx }}
                        />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "OncologyIV" ? (
                        <OncologyIV updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "OralOncology" ? (
                        <OralOncology updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "Osteoporosis" ? (
                        <Osteoporosis updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "Rheumatology" ? (
                        <Rheumatology updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "PrimaryImmuneDeficiency" ? (
                        <PrimaryImmuneDeficiency
                          updata={handleSteps}
                          data={{ ...rx }}
                        />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "LupronDepo" ? (
                        <LupronDepot updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "clinical" &&
                        rx.therapy === "LupronDepotPeds" ? (
                        <LupronDepotPeds
                          updata={handleSteps}
                          data={{ ...rx }}
                        />
                      ) : currentStep === "medication" ? (
                        <Mediaction updata={handleSteps} data={{ ...rx }} />
                      ) : currentStep === "review" ? (
                        <Review updata={handleSteps} data={{ ...rx }} />
                      ) : null}
                      <>
                        {currentStep === "sprovider" ? null : (
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => {setCurrentStep(steps[steps.indexOf(currentStep)-1]); rx.step = steps[steps.indexOf(currentStep)-1]; setRx(rx); console.log(rx, "button")}}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-arrow-left-short"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                              />
                            </svg>
                            Back
                          </button>
                        )}
                      </>
                    </div>
                    {/* Confirmation */}
                    <>
                      {currentStep === "review" ? null : (
                        <div className="col-md-6">
                          <div>
                            <div className="container container_medication mb-3">
                              <ul>
                                <label className="form-label form-control">
                                  <strong>Provider Information:</strong>
                                  <br />
                                  {rx.provider_id ? (
                                    <ul>{rx.provider_id}</ul>
                                  ) : (
                                    <>N/F</>
                                  )}
                                  <br />
                                  {rx.provider_name ? (
                                    <ul>{rx.provider_name}</ul>
                                  ) : (
                                    <>N/F</>
                                  )}
                                </label>
                                <label className="form-label form-control">
                                  <strong>Patient Information:</strong>
                                  <br />
                                  {rx.patient_id ? (
                                    <ul>{rx.patient_id}</ul>
                                  ) : (
                                    <>N/F</>
                                  )}
                                  <br />
                                  {rx.patient_name ? (
                                    <ul>{rx.patient_name}</ul>
                                  ) : (
                                    <>N/F</>
                                  )}
                                </label>
                                <label className="form-label form-control">
                                  <strong>Diagnosis Information:</strong>
                                  <br />
                                  {rx.ICD10 ? (
                                    <ul>{rx.ICD10}</ul>
                                  ) : (
                                    <ul>{rx.diagnose}</ul>
                                  )}
                                </label>
                                <label className="form-label form-control">
                                  <strong>Clinical Information:</strong>
                                  {clinical === undefined ? (
                                    <div>
                                      <label>No Information</label>
                                    </div>
                                  ) : clinical.length === 1 ? (
                                    <ul>
                                      <li>
                                        <strong>Question:</strong>
                                        <br />{" "}
                                        <span style={{ fontSize: "15px" }}>
                                          {clinical[0].question}
                                        </span>
                                      </li>
                                      <li>
                                        <strong>Answer:</strong>
                                        <br /> {clinical[0].answer}
                                      </li>
                                    </ul>
                                  ) : clinical.length > 1 ? (
                                    clinical.map((x, i) => (
                                      <ul>
                                        <li>
                                          <strong>Question:</strong>
                                          <br /> {x.question}
                                        </li>
                                        <li>
                                          <strong>Answer:</strong>
                                          <br /> {x.answer}
                                        </li>
                                      </ul>
                                    ))
                                  ) : null}
                                </label>
                                <label className="form-label form-control">
                                  <strong>Rx Information</strong>
                                  {rx.medications.length === 1 ? (
                                    <ul>
                                      <label>
                                        Rx1: &nbsp;&nbsp;
                                        {rx.medications[0].name}{" "}
                                        {rx.medications[0].sig}{" "}
                                        {rx.medications[0].type}
                                      </label>

                                      <label>
                                        Quantity: {rx.medications[0].quantity}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Refills:{" "}
                                        {rx.medications[0].refills}
                                      </label>
                                      <span />
                                    </ul>
                                  ) : rx.medications.length > 1 ? (
                                    rx.medications.map((x, i) => (
                                      <ul>
                                        <label>
                                          <strong>Rx{i + 1}:</strong> &nbsp;
                                          {x.name} {x.sig} {x.type}
                                        </label>
                                        <br />
                                        <label>
                                          <strong>Quantity:</strong>{" "}
                                          {x.quantity}
                                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                          <strong>Refills:</strong> {x.refills}
                                        </label>
                                        <br />
                                      </ul>
                                    ))
                                  ) : null}
                                </label>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Logedout />
      )}
    </div>
  );
}

export default ManageRx;
