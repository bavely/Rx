import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../Medication";

const HepatitisSovaldi = (props) => {
  // No Changes for the state

  console.log(props);
  const [QA, setQA] = useState();
  const [rx, setRx] = useState({
    step: props.data.step,
    therapy: props.data.therapy,
    ICD10: props.data.ICD10,
    diagnose: props.data.diagnose,
    provider_id: props.data.provider_id,
    patient_id: props.data.patient_id,
    clinicalinfo: [],
    medications: [],
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
      setRx({ ...rx, clinicalinfo: [ms], step: "medication" });
    } else if (!QA) {
      setRx({ ...rx, clinicalinfo: [], step: "medication" });
    }

    event.preventDefault();
  };

  return (
    <>
      {rx.step === "clinical" ? (
        <div>
          <Steps data={{ ...rx }} />
          <div className="container container_hemat">
            <form onSubmit={handleSubmit}>
              {/* 3) Diagnosis/Clinical Information */}
              <h3 className="hemo_h3"> Hepatitis Sovaldi / Clinical Information </h3>
              <div className="form-control mb-2">
                <label className="form-label"><b> Diagnosis: </b></label>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Diagnosis1:" defaultValue="B18.2 Hepatitis C" onChange={handleChange}/>
                  <label className="form-check-label"> B18.2 Hepatitis C </label>
                </div>
                <div className="form-check">
                  <input type="checkbox"  className="form-check-input" name="Diagnosis2:" defaultValue="K72.9 Hepatic Encephalopathy" onChange={handleChange}/>
                  <label className="form-check-label">K72.9 Hepatic Encephalopathy</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Diagnosis3:" defaultValue="Other"/>
                  <label className="form-check-label">Other</label> &nbsp;
                  <input type="text" className="form-control-sm" name="Other:" size="15" onChange={handleChange}/>
                </div>
              </div>
              <div className="form-control mb-2">
                <label className="form-label"><b> Genotype: </b></label> <br/>
                <div className="form-check form-check-inline">
                  <input type="checkbox" className="form-check-input" name="Genotype1:" defaultValue="1a" onChange={handleChange}/>
                  <label className="form-check-label">1a</label>
                </div>
                 <div className="form-check form-check-inline">
                   <input type="checkbox" className="form-check-input" name="Genotype2:" defaultValue="1b" onChange={handleChange}/>
                   <label className="form-check-label"> 1b </label>
                </div>
               <div className="form-check form-check-inline">
                 <input type="checkbox" className="form-check-input" name="Genotype3:" defaultValue="2" onChange={handleChange}/>
                 <label className="form-check-label"> 2 </label>
               </div>
               <div className="form-check form-check-inline">
                 <input type="checkbox" className="form-check-input" name="Genotype4:" defaultValue="3" onChange={handleChange}/>
                 <label className="form-check-label"> 3 </label>
               </div>
              <div className="form-check form-check-inline">
                <input type="checkbox" className="form-check-input" name="Genotype5:" defaultValue="4" onChange={handleChange}/>
                <label className="form-check-label"> 4 </label>
               </div>
               <div className="form-check form-check-inline">
                 <input type="checkbox" className="form-check-input" name="Genotype6:" defaultValue="5" onChange={handleChange}/>
                 <label className="form-check-label"> 5 </label>
               </div>
                <div className="form-check form-check-inline">
                  <input type="checkbox" className="form-check-input" name="Genotype7:" defaultValue="6" onChange={handleChange}/>
                  <label className="form-check-label"> 6 </label>
                </div>
              </div>
              <div className="form-control mb-2">
                <label className="form-label"><b> For XIFAXAN: </b></label> <br/>
                <label className="form-label"> {"Prior drug tried & failed:"} </label> <br />
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Prior drug tried/failed1:" defaultValue="Cipro" onChange={handleChange}/>
                  <label className="form-check-label">Cipro</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Prior drug tried/failed2:" defaultValue="Neomycin" onChange={handleChange}/>
                  <label className="form-check-label">Neomycin</label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Prior drug tried/failed3:" defaultValue="Flagyl" onChange={handleChange}/>
                  <label className="form-check-label"> Flagyl </label>
                </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" name="Prior drug tried/failed4:" defaultValue="Lactulose" onChange={handleChange}/>
                    <label className="form-check-label"> Lactulose </label>
                 </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Prior drug tried/failed5:" defaultValue="Tetracycline" onChange={handleChange}/>
                  <label className="form-check-label"> Tetracycline </label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="Prior drug tried/failed6:" defaultValue="Other" onChange={handleChange}/>
                  <label className="form-check-label">Other</label> &nbsp;
                  <input type="text" className="form-control-sm" name="Other" size="20" onChange={handleChange}/>
                </div>
              </div>
              <div className="form-control mb-2">
                <label className="form-label"> Does patient have Cirrhosis? </label> <br/>
                <div className="form-check">
                  <input type="radio" className="form-check-input" name="Does patient have Cirrhosis:" defaultValue="Yes" onChange={handleChange}/>
                  <label className="form-check-label"> Yes </label>
                </div>
                <div className="form-check">
                  <input type="radio" className="form-check-input" name="Does patient have Cirrhosis:" defaultValue="No" onChange={handleChange}/>
                  <label className="form-check-label"> No </label>
                </div>
                <label className="form-label"> Fibrosis Score: </label> &nbsp;
                <input type="text" className="form-control-sm" name="Fibrosis Score:" size="10" onChange={handleChange}/> &nbsp;
                <label className="form-check-label"> Date: </label> &nbsp;
                <input type="date" className="form-control-sm" name="Fibrosis Score Date:" onChange={handleChange}/>
              </div>
              {/* Q5 */}
              <div className="form-control mb-2">
                <label className="form-label"><b> For Hepatitis: </b></label> <br/>
                <label className="form-label"> Most recent lab date: </label> <br/>
                <label className="form-label"> AST:
                  <input type="text" className="form-control" name="AST:" size="15" onChange={handleChange}/>
                </label><br/>
                <label className="form-label"> ALT:
                  <input type="text" name="ALT:" className="form-control" size="15" onChange={handleChange}/>
                </label> <br/>
                <label className="form-label"> HCV RNA: (viral load)
                  <input type="text" className="form-control" name="HCV RNA" size="15" onChange={handleChange}/>
                </label> <br/>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="For Hepatitis1:" defaultValue="Naive patient" onChange={handleChange}/>
                  <label className="form-check-label"> Naive patient </label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="For Hepatitis2:" defaultValue="Non-responder" onChange={handleChange}/>
                  <label className="form-check-label"> Non-responder* </label>
                </div>
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" name="For Hepatitis3:" defaultValue="Relapser" onChange={handleChange}/>
                  <label className="form-check-label"> Relapser* </label>
                </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" name="initial Therapy" defaultValue="initial Therapy" onChange={handleChange}/>
                <label className="form-check-label"> *Initial therapy <br/>
                  <label className="form-label"> Start Date:
                    <input type="date" className="form-control" name="Start Date:" onChange={handleChange}/>
                  </label> &nbsp;
                  <label className="form-check-label"> Length:
                    <input type="text" className="form-control" name="Lenght" size="15" onChange={handleChange}/>
                  </label>
                </label>
              </div>
                <label className="form-label"> Does patient need nurse training? </label>
                <div className="form-check">
                  <input type="radio" className="form-check-input" name="Does patient need nurse training:" defaultValue="Yes" onChange={handleChange}/>
                  <label className="form-check-label" defaultValue="Yes"> Yes </label>
                </div>
                <div className="form-check">
                  <input type="radio" className="form-check-input" name="Does patient need nurse training:" defaultValue="No" onChange={handleChange}/>
                  <label className="form-check-label" defaultValue="No"> No </label>
                </div>
              </div>
              <div className="d-grid gap-2 col-md-12 mx-auto">
                <button className="btn btn-outline-primary btn_ast" type="submit">Submit</button>
              </div>
            </form>
          </div>

        </div>
      ) : rx.step === "medication" ? (
        <Mediaction data={{ ...rx }} />
      ) : null}
    </>
  );
};
export default HepatitisSovaldi;
