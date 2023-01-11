import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../medication";

const HepatitisC = (props) => {
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

  // No Changes  handleChange

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
          <div className="container container_hepC">
            <form onSubmit={handleSubmit}>
              {/* 3) Diagnosis/Clinical Information */}
              <h3 className="hepC_h3"> Hepatitis C / Clinical Information </h3>
              <div className="col-md-12">
                <label className="form-label form-control">
                  <b> Diagnosis </b> <br />
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Diagnosis1:"
                      defaultValue="B18.2 Hepatitis C"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      {" "}
                      B18.2 Hepatitis C{" "}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Diagnosis2:"
                      defaultValue="K72.9 Hepatic Encephalopathy"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      {" "}
                      K72.9 Hepatic Encephalopathy{" "}
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Diagnosis3:"
                      defaultValue="Other"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      Other: &nbsp;
                      <textarea
                        name="Other:"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </label>
              </div>
              {/* Q1 */}
              <div className="col-md-12">
                <label className="form-label form-control">
                  <b> Genotype: </b> <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Genotype1:"
                      defaultValue="1a"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> 1a </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Genotype2:"
                      defaultValue="1b"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> 1b </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Genotype3:"
                      defaultValue="2"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> 2 </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Genotype4:"
                      defaultValue="3"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> 3 </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Genotype5:"
                      defaultValue="4"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> 4 </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Genotype6:"
                      defaultValue="5"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> 5 </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Genotype7:"
                      defaultValue="6"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> 6 </label>
                  </div>
                </label>
              </div>
              {/* Q2 */}
              <div className="col-md-12">
                <label className="form-label form-control">
                  <b> For XIFAXAN: </b>
                  <label> {"Prior drug tried & failed:"} </label> <br />
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Prior drug tried/failed1:"
                      defaultValue="Cipro"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Cipro </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Prior drug tried/failed2:"
                      defaultValue="Neomycin"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Neomycin </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Prior drug tried/failed3:"
                      defaultValue="Flagyl"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Flagyl </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Prior drug tried/failed4:"
                      defaultValue="Lactulose"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Lactulose </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Prior drug tried/failed5:"
                      defaultValue="Tetracycline"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Tetracycline </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Prior drug tried/failed6:"
                      defaultValue="Other"
                      onChange={handleChange}
                    />
                    <textarea
                      name="Other"
                      className="form-control"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </label>
              </div>
              {/* Q4 */}
              <div className="col-md-12">
                <label className="form-label form-control">
                  {" "}
                  Does patient have Cirrhosis? <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Does patient have Cirrhosis:"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Yes </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Does patient have Cirrhosis:"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> No </label>
                  </div>
                </label>
              </div>
              {/* Q5 */}
              <div className="col-md-12">
                <label className="form-label form-control">
                  {" "}
                  Fibrosis Score: &nbsp;
                  <input
                    type="text"
                    name="Fibrosis Score:"
                    className="form-control-sm"
                    size="20"
                    onChange={handleChange}
                  ></input>{" "}
                  &nbsp;
                  <label>
                    {" "}
                    Date: &nbsp;
                    <input
                      type="date"
                      className="form-control-sm"
                      name="Fibrosis Score Date:"
                      onChange={handleChange}
                    ></input>
                  </label>
                </label>
              </div>
              {/* Q6 */}
              <div className="col-md-12">
                <label className="form-label form-control">
                  <b> For Hepatitis: </b> Most recent lab date: <br />
                  <label className="form-label">
                    {" "}
                    AST:
                    <input
                      type="text"
                      name="AST:"
                      className="form-control"
                      onChange={handleChange}
                    ></input>
                  </label>
                  <br />
                  <label className="form-label">
                    {" "}
                    ALT:
                    <input
                      type="text"
                      className="form-control"
                      name="ALT:"
                      onChange={handleChange}
                    ></input>
                  </label>{" "}
                  <br />
                  <label className="form-label">
                    {" "}
                    HCV RNA: (viral load)
                    <input
                      type="text"
                      className="form-control"
                      name="HCV RNA"
                      onChange={handleChange}
                    ></input>
                  </label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="For Hepatitis1:"
                      defaultValue="Naive patient"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Naive patient</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="For Hepatitis2:"
                      defaultValue="Non-responder"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Non-responder* </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="For Hepatitis3:"
                      defaultValue="Relapser"
                      onChange={handleChange}
                    />
                    <label className="form-check-label"> Relapser* </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="For Hepatitis4"
                      defaultValue="Therapy"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      {" "}
                      Initial therapy <br />
                      <label> Start Date: </label>
                      <input
                        type="date"
                        className="form-control"
                        name="Start Date:"
                        onChange={handleChange}
                      ></input>
                    </label>
                    &nbsp;&nbsp;&nbsp;
                    <label>
                      {" "}
                      Length:
                      <input
                        type="text"
                        name="Lenght"
                        className="form-control"
                        size="15"
                        onChange={handleChange}
                      ></input>
                    </label>
                  </div>
                  <label className="form-label">
                    {" "}
                    Does patient need nurse training? <br />
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="Does patient need nurse training:"
                        defaultValue="Yes"
                        onChange={handleChange}
                      />
                      <label className="form-check-label"> Yes </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="Does patient need nurse training:"
                        defaultValue="No"
                        onChange={handleChange}
                      />
                      <label className="form-check-label"> No </label>
                    </div>
                  </label>
                </label>
              </div>
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
        </div>
      ) : null}
    </>
  );
};
export default HepatitisC;
