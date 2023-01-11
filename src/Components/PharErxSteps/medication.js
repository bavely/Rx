import React, { useState } from "react";
import Steps from "./steps";
import helper from "../../utils/helper";

const Mediaction = (props) => {
  const [medName, setMedName] = useState("");
  const [found, setFound] = useState([]);
  const [asp, setAsp] = useState({ quantity: "", refills: "" });
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState("");

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
    setRx({ ...rx, medications: [...filtered] });
  }

  const handleSubmit2 = (event) => {
    if (rx.medications !== []) {
      setRx({ ...rx });
      console.log(rx);
      console.log(rx.medications);
      props.updata("review", rx);
    }

    event.preventDefault();
  };

  return (
    <>
      {rx.step === "medication" ? (
        <div>
          {" "}
          {/* <Steps data={{ ...rx }} /> */}
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
      ) : null}
    </>
  );
};
export default Mediaction;
