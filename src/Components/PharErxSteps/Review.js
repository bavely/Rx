import React, { useState, useEffect } from "react";
import Steps from "./steps";
import helper from "../../utils/helper";
import pharmacistHelper from "../../utils/Pharmacist_Helper";
function Review(props) {
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState("");

  const [rx, setRx] = useState({
    step: props.data.step,
    therapy: props.data.therapy !== "" ? props.data.therapy : "",
    ICD10: props.data.ICD10 !== "" ? props.data.ICD10 : "",
    diagnose: props.data.diagnose !== "" ? props.data.diagnose : "",
    provider_id: props.data.provider_id !== "" ? props.data.provider_id : "",
    patient_id: props.data.patient_id !== "" ? props.data.patient_id : "",
    clinicalinfo: props.data.clinicalinfo !== [] ? props.data.clinicalinfo : [],
    medications: props.data.medications !== [] ? props.data.medications : [],
    provider_name:
      props.data.provider_name !== "" ? props.data.provider_name : "",
    patient_name: props.data.patient_name !== "" ? props.data.patient_name : "",
  });

  useEffect(() => {
    // return () => {
    setRx({
      step: props.data.step,
      therapy: props.data.therapy !== "" ? props.data.therapy : "",
      ICD10: props.data.ICD10 !== "" ? props.data.ICD10 : "",
      diagnose: props.data.diagnose !== "" ? props.data.diagnose : "",
      provider_id: props.data.provider_id !== "" ? props.data.provider_id : "",
      patient_id: props.data.patient_id !== "" ? props.data.patient_id : "",
      clinicalinfo:
        props.data.clinicalinfo !== [] ? props.data.clinicalinfo : [],
      medications: props.data.medications !== [] ? props.data.medications : [],
      provider_name:
        props.data.provider_name !== "" ? props.data.provider_name : "",
      patient_name:
        props.data.patient_name !== "" ? props.data.patient_name : "",
    });
    // };
  }, [props.data]);
  console.log(rx, "final");
  const sendReferral = (event) => {
    const new_ref = {
      ICD10: rx.ICD10,
      diagnose: rx.diagnose,
      provider_id: rx.provider_id,
      patient_id: rx.patient_id,
      clinicalinfo: rx.clinicalinfo[0],
      medications: rx.medications,
    };

    pharmacistHelper.handleAddReferral(new_ref).then((res) => {
      if (res.status === 200) {
        setDone(true);
        setMsg(res.data.message);
      }else{
        setDone(false);
        setMsg("Something went wrong");
      }
    });
  };
  const clinical = rx.clinicalinfo[0];
  return (
    <div>
      {rx.step === "review" && done == false ? (
       
        <div>
           <div className="alert alert-danger" role="alert">{msg}</div>
          {/* <Steps data={{ ...rx }} /> */}
          <div className="container container_medication mb-3">
            <ul>
              <label className="form-label form-control">
                <strong>Provider Information:</strong>
                <br />
                {rx.provider_id ? <ul>{rx.provider_id}</ul> : <>N/F</>}
                <br />
                {rx.provider_name ? <ul>{rx.provider_name}</ul> : <>N/F</>}
              </label>
              <label className="form-label form-control">
                <strong>Patient Information:</strong>
                <br />
                {rx.patient_id ? <ul>{rx.patient_id}</ul> : <>N/F</>}
                <br />
                {rx.patient_name ? <ul>{rx.patient_name}</ul> : <>N/F</>}
              </label>
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
    </div>
  );
}

export default Review;
