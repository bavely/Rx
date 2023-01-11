import React, { useState } from "react";
import Steps from "../steps";
import Mediaction from "../Medication";

const Asthma = (props) => {
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
    console.log(event.target.value);
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
          <div className="container container_asthma">
            <form className="mb-3" onSubmit={handleSubmit}>
              {/* 4. Diagnosis/Clinical Information */}
              <h3 className="asthma_h3 mb-3"> Asthma / Clinical Information </h3>
              {/* Q1 */}
              <div className="form-control mb-2">
                <label className="form-label">Asthma: </label> <br/>
                  <div className="form-check form-check-inline">
                    <input type="radio" className="form-check-input" name="Asthma" defaultValue="Yes" onChange={handleChange}/>{" "}
                    <label for="Asthma" className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input type="radio" className="form-check-input" name="Asthma" defaultValue="No"/>
                    <label className="form-check-label" for="Asthma">No</label>
                  </div>
              </div>
              {/* Q2 */}
              <div className="form-control mb-2">
                <label className="form-label">Type: </label> <br/>
                  <div className="form-check form-check-inline">
                    <input type="radio" className="form-check-input" name="SeverePersistent" defaultValue="Moderate persistent" onChange={handleChange}
                    />
                    <label for="SeverePersistent" className="form-check-label">Moderate persistent</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input type="radio" className="form-check-input" name="SeverePersistent" defaultValue="Severe persistent allergic" onChange={handleChange}/>
                    <label className="form-check-label" for="SeverePersistent">Severe persistent allergic</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="SeverePersistent"
                      defaultValue="Symptoms uncontrolled with ICS"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" for="UncontrolledICS">
                      Symptoms uncontrolled with ICS
                    </label>{" "}
                    <br />
                  </div>
              </div>
              {/* Q3   */}
              <div className="form-control mb-2">
                <label className="form-label">
                  IgE Level: <br />
                  <label className="form-label form-control form-control_IU">
                    IU/mL: &nbsp;
                    <input
                      type="text"
                      name="IgE Level"
                      size="8"
                      onChange={handleChange}
                    />
                  </label>
                </label>
                <label className="form-label form-control">
                  Test Date:
                  <input
                    type="date"
                    className="form-control mb-2"
                    name="IgE Level"
                    onChange={handleChange}
                  />
                </label>
                <label className="form-label form-control">
                  Patient Weight: &nbsp;
                  <input
                    type="text"
                    name="IgE Level"
                    size="5"
                    onChange={handleChange}
                  />{" "}
                  <label className="form-label">Kg</label>
                </label>
              </div>
              {/* Q4 */}

              <div className="col-md-12">
                <label className="form-label form-control">
                  {" "}
                  Eosinophil Level: &nbsp;
                  <input
                    type="text"
                    name="Eosinophil Level"
                    size="5"
                    onChange={handleChange}
                  />{" "}
                  <label className="form-label"> cells/ mcL </label> &nbsp;
                </label>
                <label className="form-label form-control">
                  Test Date: &nbsp;
                  <input
                    type="date"
                    className="form-control mb-2"
                    name="Eosinophil Level"
                    onChange={handleChange}
                  />
                </label>
              </div>
              {/* Q5  */}
              <div className="form-control mb-2">
                <label className="form-label">History of positive skin or RAST test to a perennial aeroallergen: </label> <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="History of positive skin or RAST test to a perennial aeroallergen"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="History of positive skin or RAST test to a perennial aeroallergen"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                <label className="form-label form-control">
                  {" "}
                  Severe exacerbation in the past 6 months: &nbsp;
                  <input
                    type="text"
                    name="Severe exacerbation in the past 6 months"
                    size="10"
                    onChange={handleChange}
                  />
                </label>
              </div>
              {/* Q6 */}
              <div className="form-control mb-2">
                <label className="form-label form-control">Moderate to severe eosinophilic phenotype Asthma:</label> <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Moderate to severe eosinophilic phenotype Asthma"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Moderate to severe eosinophilic phenotype Asthma"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
              </div>
              {/* Q7 */}
              <div className="form-control mb-2">
                <label className="form-label"> Oral corticosteroid dependent Asthma:</label> <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Oral corticosteroid dependent Asthma:"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label> &nbsp;
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Oral corticosteroid dependent Asthma:"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
              </div>
              {/* Q8 */}
              <div className="form-control mb-2">
                <label className="form-label">{"Age > or equal 6 years old:"}</label><br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Age > or equal 6 years old:"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Age > or equal 6 years old:"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No </label>
                  </div>
              </div>
              {/* Q9 */}
              <div className="form-control mb-2">
                <label className="form-label">{"Age > or equal to 12 years old:"} </label> <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Age > or equal to 12 years old:"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Age > or equal to 12 years old:"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
              </div>
              {/* Q10 */}
              <div className="form-control mb-2">
                <label className="form-label form-control">Chronic Idiopathic Urticaria (CIU):  </label><br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Chronic Idiopathic Urticaria (CIU):"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Chronic Idiopathic Urticaria (CIU):"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
              </div>
              {/* Q11 */}
              <div className="form-control mb-2">
                <label className="form-label">{"Prior CIU for > or equal 6 weeks:"} </label><br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Prior CIU for > or equal 6 weeks:"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Prior CIU for > or equal 6 weeks:"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
              </div>
              {/* Q12 */}
              <div className="form-control mb-2">
                <label className="form-label">Prior H1 antihistamines:</label> <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Prior H1 antihistamines:"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Prior H1 antihistamines:"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Prior H1 antihistamines:"
                      defaultValue="other"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Other</label>
                  </div>
                  <label className="form-label"> Indicate: &nbsp; </label>
                  <input
                    type="text"
                    name="Other Indication"
                    size="40"
                    onChange={handleChange}
                  />
              </div>
              {/* Q13 */}
              <div className="form-control mb-2">
                <label className="form-label">Failed prior Inhaled Corticosteroids therapy: </label><br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Failed prior Inhaled Corticosteroids therapy:"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Failed prior Inhaled Corticosteroids therapy:"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                  <label className="form-label">Indicate: &nbsp; </label>
                  <input
                    type="text"
                    name="Other Indication"
                    size="40"
                    onChange={handleChange}
                  />
              </div>
              {/* Q14 */}
              <div className="form-control mb-2">
                <label className="form-label">Prior biologic use:</label><br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Prior biologic use"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Prior biologic use"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Prior biologic use"
                      defaultValue="Other"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Other</label>
                  </div>
                  <label className="form-label"> Indicate: &nbsp; </label>
                  <input
                    type="text"
                    name="Indicate Other Prior biologic use"
                    size="40"
                    onChange={handleChange}
                  />
              </div>
              {/* Q15 */}
              <div className="form-control mb-2">
                <label className="form-label">Pregnancy:</label> <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Pregnancy"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Pregnancy"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
              </div>
              {/* Q16 */}
              <div className="form-control mb-2">
                <label className="form-label">Breast Feeding:</label> <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Breast Feeding"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Breast Feeding"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
              </div>
              {/* Q17 */}
              <div className="form-control mb-2">
                <label className="form-label">Allergy to Omalizumab:</label> <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Allergy to Omalizumab"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Allergy to Omalizumab"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Allergy to Omalizumab"
                      defaultValue="Other"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="html">
                      Other
                    </label>
                  </div>
                  <label>Indicate: &nbsp; </label>
                  <input
                    type="text"
                    name="Indicate Other Allergy to Omalizumab"
                    size="15"
                    onChange={handleChange}
                  />
              </div>
              {/* Q18 */}
              <div className="form-control mb-2">
                <label className="form-label">Provided by:</label> <br />
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Provided by Doctor Office"
                      defaultValue="Doctor Office"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      {"Doctor’s Office"}
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Provided by Nurse or caregiver"
                      defaultValue="Nurse or caregiver"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      Nurse or Caregiver
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Provided by Asthma Center"
                      defaultValue="Asthma Center"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Asthma Center</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="Provided by Infusion Center"
                      defaultValue="Infusion Center"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Infusion Center</label>
                  </div>
              </div>
              {/* Q19 */}
              <div className="form-control mb-2">
                <label className="form-label ">Training required: </label><br />
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Training required:"
                      defaultValue="Yes"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="Training required:"
                      defaultValue="No"
                      onChange={handleChange}
                    />
                    <label className="form-check-label">No</label>
                  </div>
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
      ) : rx.step === "medication" ? (
        <Mediaction data={{ ...rx }} />
      ) : null}
    </>
  );
};
export default Asthma;
