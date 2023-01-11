import React, { useState } from "react";
import Steps from "./steps";
import helper from "../utils/helper";

const Mediaction = (props) => {
  const [medName, setMedName] = useState("");
  const [found, setFound] = useState([]);
  const [asp, setAsp] = useState({ quantity: "", refills: "" });
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState("");

  const [rx, setRx] = useState({
    step: props.data.step,
    therapy: props.data.therapy,
    ICD10: props.data.ICD10,
    diagnose: props.data.diagnose,
    provider_id: props.data.provider_id,
    patient_id: props.data.patient_id,
    clinicalinfo: props.data.clinicalinfo,
    medications: [],
  });
  console.log(rx);
  const handleChange = (event) => {
    setMedName(event.target.value);
    setFound([]);
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    helper.getDrug(medName).then((res) => {
      if (res.data.results[0].products) {
        setFound(res.data.results[0].products);
      }
    });
    event.preventDefault();
  };

  function addMedication(medOBJ) {
    if (medOBJ !== []) {
      const getObj = {
        name: medOBJ.brand_name,
        type: medOBJ.dosage_form,
        sig: medOBJ.active_ingredients[0].strength,
        quantity: asp.quantity,
        refills: asp.refills,
      };
      rx.medications.push(getObj);
      setAsp({ quantity: "", refills: "" });
    } else {
      setRx({ medications: [...rx.medications] });
    }
  }

  function removeMedication(medOBJ) {
    var filtered = rx.medications.filter(function (el) {
      return el !== medOBJ;
    });
    setRx({ medications: [...filtered] });
  }

  const handleSubmit2 = (event) => {
    if (rx.medications !== []) {
      setRx({ ...rx, step: "review" });
    }

    event.preventDefault();
  };

  const sendReferral = (event) => {
    const new_ref = {
      ICD10: rx.ICD10,
      diagnose: rx.diagnose,
      provider_id: rx.provider_id,
      patient_id: rx.patient_id,
      clinicalinfo: rx.clinicalinfo[0],
      medications: rx.medications,
    };

    helper.addReferral(new_ref).then((res) => {
      if (res) {
        setDone(true);
        setMsg(res.data.message);
      }
    });
  };

  const clinical = rx.clinicalinfo[0];

  return (
    <>
      {rx.step === "medication" ? (
        <div>
          {" "}
          <Steps data={{ ...rx }} />
          <div
            className="container container_medication"
            style={{ marginLeft: "21px" }}
          >
            <h1 className="diagnose_h3">Medication</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control"
                name="medName"
                placeholder="Search Medication"
                value={medName}
                onChange={handleChange}
              />
              <button className="btn btn-outline-primary search" type="submit">
                Search
              </button>
            </form>
            {found.length === 1 ? (
              <div>
                <br />
                <br />
                <span>
                  <label>Medication Name:{found[0].brand_name}</label>
                </span>
                <br />
                <label>
                  Strength: {found[0].active_ingredients[0].strength}
                </label>
                <br />
                <label>Dosage Form: {found[0].dosage_form}</label>
                <br />
                <label>
                  Quantity:{" "}
                  <input
                    type="number"
                    className="form-control"
                    name="quantity"
                    min="1"
                    max="1000"
                    onChange={(event) =>
                      setAsp({ ...asp, quantity: event.target.value })
                    }
                  />
                </label>
                <br />
                <label>
                  Refills:{" "}
                  <input
                    type="number"
                    className="form-control"
                    name="refills"
                    min="0"
                    max="1000"
                    onChange={(event) =>
                      setAsp({ ...asp, refills: event.target.value })
                    }
                  />
                </label>
                <br />

                <button
                  className="btn btn-outline-success"
                  onClick={() => addMedication({ ...found[0], asp })}
                >
                  yrs
                </button>

                <br />
              </div>
            ) : found.length > 1 ? (
              found.map((x, i) => (
                <div>
                  <label className="form-label form-control">
                    <strong>Medication Name:</strong> {x.brand_name}
                    <br />
                    <label className="form-label">
                      <strong>Strength:</strong>{" "}
                      {x.active_ingredients[0].strength}
                    </label>
                    <br />
                    <label className="form-label">
                      <strong>Dosage Form:</strong> {x.dosage_form}
                    </label>
                    <br />
                    <label className="form-label">
                      <strong>Quantity: </strong>
                      <input
                        type="number"
                        className="form-control-sm"
                        name="quantity"
                        min="1"
                        max="1000"
                        onChange={(event) =>
                          setAsp({ ...asp, quantity: event.target.value, i })
                        }
                      />
                    </label>
                    <br />
                    <label className="form-label">
                      <strong>Refills: </strong>
                      <input
                        type="number"
                        className="form-control-sm"
                        name="refills"
                        min="0"
                        max="1000"
                        onChange={(event) =>
                          setAsp({ ...asp, refills: event.target.value, i })
                        }
                      />
                    </label>
                    <button
                      className="btn btn-outline-primary add"
                      onClick={() => addMedication({ ...x, asp })}
                    >
                      Add
                    </button>
                  </label>
                </div>
              ))
            ) : null}
            {rx.medications.length === 1 ? (
              <div className="form-control">
                <strong>Rx1</strong>
                <ul>
                  <li style={{ fontSize: "20px" }}>
                    <strong>Medication name:</strong>{" "}
                    <span className="others">{rx.medications[0].name}</span>
                  </li>
                  <li style={{ fontSize: "20px" }}>
                    <strong>Strength:</strong>{" "}
                    <span className="others">{rx.medications[0].sig}</span>
                  </li>
                  <li style={{ fontSize: "20px" }}>
                    <strong>Dosage Form:</strong>{" "}
                    <span className="others">{rx.medications[0].type}</span>
                  </li>
                  <li style={{ fontSize: "20px" }}>
                    <strong>Quantity:</strong>{" "}
                    <span className="others">{rx.medications[0].quantity}</span>
                  </li>
                  <li style={{ fontSize: "20px" }}>
                    <strong>Refills:</strong>{" "}
                    <span className="others">{rx.medications[0].refills}</span>
                  </li>
                </ul>
                <button
                  className="btn btn-outline-primary remove"
                  onClick={() => removeMedication(rx.medications[0])}
                >
                  Remove
                </button>
              </div>
            ) : rx.medications.length > 1 ? (
              rx.medications.map((x, i) => (
                <div className="container container_medication rrx">
                  <div className="row">
                    <div className="col">
                      <div className="form-control mb-3 Rx">
                        <ul>
                          <label>Rx</label>
                          <li style={{ fontSize: "20px" }}>
                            <strong>Medication Name:</strong> {x.name}
                          </li>
                          <li style={{ fontSize: "20px" }}>
                            <strong>Strength:</strong> {x.sig}
                          </li>
                          <li style={{ fontSize: "20px" }}>
                            <strong>Dosage Form:</strong> {x.type}
                          </li>
                          <li style={{ fontSize: "20px" }}>
                            <strong>Quantity:</strong> {x.quantity}
                          </li>
                          <li style={{ fontSize: "20px" }}>
                            <strong>Refills:</strong> {x.refills}
                          </li>
                          <button
                            className="btn btn-outline-primary remove"
                            onClick={() => removeMedication(x)}
                          >
                            Remove
                          </button>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-outline-primary continue"
                    onClick={handleSubmit2}
                  >
                    Continue
                  </button>
                </div>
              ))
            ) : null}
            <button
              className="btn btn-outline-primary continue"
              onClick={handleSubmit2}
            >
              Continue
            </button>
          </div>
        </div>
      ) : rx.step === "review" && done == false ? (
        <div>
          <Steps data={{ ...rx }} />
          <div className="container container_medication mb-3">
            <ul>
              <label className="form-label form-control">
                <strong>Diagnosis Information:</strong>
                <br />
                {rx.ICD10 ? <ul>{rx.ICD10}</ul> : <ul>{rx.diagnose}</ul>}
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
                      Rx1: &nbsp;&nbsp;{rx.medications[0].name}{" "}
                      {rx.medications[0].sig} {rx.medications[0].type}
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
                        <strong>Rx{i + 1}:</strong> &nbsp;{x.name} {x.sig}{" "}
                        {x.type}
                      </label>
                      <br />
                      <label>
                        <strong>Quantity:</strong> {x.quantity}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        <strong>Refills:</strong> {x.refills}
                      </label>
                      <br />
                    </ul>
                  ))
                ) : null}
              </label>
            </ul>
            <div className="d-grid gap-2 col-md-12 mx-auto">
              <button
                className="btn btn-outline-primary send"
                onClick={() => {
                  sendReferral();
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : done == true ? (
        <div>
          <h1>{msg}</h1>
        </div>
      ) : null}
    </>
  );
};
export default Mediaction;
