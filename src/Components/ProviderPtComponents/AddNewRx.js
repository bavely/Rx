import React from "react";
import { useState, useEffect, useCallback } from "react";
// import { useState, useEffect } from "react/cjs/react.development";
import { v4 as uuidv4 } from "uuid";
import providerHelper from "../../utils/Provider_Helper";

export default function AddNewRx(props) {
  const ProviderId = sessionStorage.getItem("user");
  const [ptInfo, setPt] = useState({});
  const [drugs, setDrugs] = useState([]);
  const [ICD10, setICD10] = useState([]);
  const [msg, setMsg] = useState("init");
  useEffect(() => {
    return setPt(props.pt);
  }, [props]);

  useEffect(() => {
    providerHelper.getDrugs().then((res) => {
      setDrugs(res);
    });
    providerHelper.getICD10().then((res) => {
      setICD10(res);
      console.log(res);
    });
  }, []);

  const [Rx, setRx] = useState({
    Post_ID: uuidv4(),
    Provider_ID: ProviderId,
    Patient_ID: props.pt.id,
    Diagnosis: "",
    ICD10: "",
    Has_Been_On_This_Condition: "",
    Is_on_Therapy: "",
    Current_Medications: "",
    Wil_Patient_Stop_Taking_Med: "",
    Status: "New",
  });

  const [medFields, setMedFields] = useState([
    {
      id: uuidv4(),
      Medication_Name_Strengh: "",
      Sig: "",
      Quantity: "",
      Refills: "",
    },
  ]);

  const [resf, setResf] = useState(true);

  const [btnf, setBtn] = useState("init");

  const handleDate = (date) => {
    const [yyyy, mm, dd] = date.split("-");
    const rev = `${mm}/${dd}/${yyyy}`;
    return rev;
  };

  const handleAddFields = () => {
    setMedFields([
      ...medFields,
      {
        id: uuidv4(),
        Medication_Name_Strengh: "",
        Sig: "",
        Quantity: "",
        Refills: "",
      },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...medFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setMedFields(values);
  };

  const handleChange = (event) => {
    setRx({
      ...Rx,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeMeds = (id, event) => {
    const newInputFields = medFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setMedFields(newInputFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setBtn("loading");

    providerHelper.handleAddrx(Rx, medFields).then((res) => {
      console.log(res);
      if (Object.values(ptfiles).length > 0) {
        const formData = new FormData();
        Object.values(ptfiles).forEach((obj) => {
          formData.append("file", obj);
        });
        formData.append("Pt_ID", res.r1[0].ID);
        providerHelper.addFiles(formData).then((filecreated) => {
          if (filecreated.data) {
            providerHelper.storeRxFilesName(filecreated.data, res.r1[0].ID);
          } else {
            // alert("file not created");
            setResf(false);
            return false;
          }
        });
      }

      res.r2.some((ele) => {
        ele.then((r) => {
          if (r !== 201) {
            setResf(false);
            setMsg("fail");
            setBtn("init");
            return true;
          }
          setBtn("loaded");

          console.log(resf);
        });
      });
    });
  };

  const [ptfiles, setPtfiles] = useState([]);
  console.log(ptfiles);
  const onDrop = (event) => {
    event.preventDefault();
    // Do something with the files
    console.log(event.target.files[0]);

    setPtfiles(event.target.files);
  };

  return (
    <div className="card shadow mb-3 p-5">
      {ptInfo.ID === undefined ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <form className="row g-3" onSubmit={handleSubmit}>
          <h5>Referral Information</h5>
          <div className="col-md-12">
            <h6>
              <strong>Create New Prescription for {ptInfo.Full_Name}</strong>
              <br />
              <strong>DOB: </strong>
              {handleDate(ptInfo.DOB)}
              <br />
              <strong>ID:</strong> {ptInfo.ID}
            </h6>
          </div>
          <div className="col-md-6">
            <label htmlFor="Diagnosis" className="form-label">
              Diagnosis:
            </label>
            <input
              list="Diagnosis"
              type="text"
              name="Diagnosis"
              placeholder="Diagnosis"
              value={Rx.Diagnosis}
              className="form-control"
              onChange={handleChange}
            />
            <datalist id="Diagnosis">
              {ICD10.map((each) => {
                return <option key={each.Diagnosis}>{each.Diagnosis}</option>;
              })}
            </datalist>
          </div>

          <div className="col-md-6">
            <label htmlFor="ICD10" className="form-label">
              ICD10:
            </label>
            <input
              list="ICD10"
              type="text"
              name="ICD10"
              placeholder="ICD10"
              value={Rx.ICD10}
              className="form-control"
              onChange={handleChange}
            />
            <datalist id="ICD10">
              {ICD10.map((each) => {
                return <option key={each.Code}>{each.Code}</option>;
              })}
            </datalist>
          </div>
          <div className="col-md-6">
            <label htmlFor="Has_Been_On_This_Condition" className="form-label">
              Has patient previously been treated for this condition?
            </label>
            <select
              name="Has_Been_On_This_Condition"
              defaultValue="Select an option"
              className="form-control"
              onChange={handleChange}
            >
              <option>Select an option</option>
              <option value="yes">YES</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="Is_on_Therapy" className="form-label">
              Is patient currently on therapy?
            </label>
            <select
              name="Is_on_Therapy"
              defaultValue="Select an option"
              className="form-control"
              onChange={handleChange}
            >
              <option>Select an option</option>
              <option value="Yes">YES</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="Current_Medications" className="form-label">
              Current Medications
            </label>
            <textarea
              type="text"
              name="Current_Medications"
              placeholder=""
              value={Rx.Current_Medications}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="Wil_Patient_Stop_Taking_Med" className="form-label">
              Wil patient stop taking the above medication(s) before the new
              medication?
            </label>
            <select
              name="Wil_Patient_Stop_Taking_Med"
              defaultValue="Select an option"
              className="form-control"
              onChange={handleChange}
            >
              <option>Select an option</option>
              <option value="Yes">YES</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            {medFields.map((ele, i) => {
              console.log(ele);

              return (
                <div className="row" key={ele.id}>
                  <div className="col-md-6">
                    <label htmlFor="exampleDataList" className="form-label">
                      Medication Name
                    </label>
                    <input
                      list="drug"
                      id="exampleDataList"
                      placeholder="Type to search..."
                      type="Text"
                      name={`Medication_Name_Strengh`}
                      
                      value={Rx.Medication_Name_Strengh}
                      className="form-control"
                      onChange={(e) => handleChangeMeds(ele.id, e)}
                    />
                    <datalist id="drug">
                      {drugs.map((drug) => {
                        return <option key={drug.Drug}>{drug.Drug}</option>;
                      })}
                    </datalist>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor={`Sig`} className="form-label">
                      SIG
                    </label>
                    <input
                      type="Text"
                      name={`Sig`}
                      placeholder="SIG - Srength In Grams"
                      value={Rx.Sig}
                      className="form-control"
                      onChange={(e) => handleChangeMeds(ele.id, e)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor={`Quantity`} className="form-label">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name={`Quantity`}
                      placeholder=""
                      value={Rx.Quantity}
                      className="form-control"
                      onChange={(e) => handleChangeMeds(ele.id, e)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor={`Refills`} className="form-label">
                      Refills Number
                    </label>
                    <input
                      type="number"
                      name={`Refills`}
                      placeholder="Refills Number"
                      value={Rx.Refills_count}
                      className="form-control"
                      onChange={(e) => handleChangeMeds(ele.id, e)}
                    />
                  </div>

                  <div className="row float-start mt-2 mb-2">
                    <div className="col-md-6">
                      <div
                        className="btn-group "
                        role="group"
                        aria-label="Basic mixed styles example"
                      >
                        <button
                          type="button"
                          onClick={handleAddFields}
                          className="btn btn-outline-success "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-plus"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                          </svg>
                        </button>
                        <button
                          disabled={medFields.length === 1}
                          onClick={() => handleRemoveFields(ele.id)}
                          className="btn btn-outline-danger"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-dash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-md-6">
            <label htmlFor="front" className="form-label">
              Choose File
            </label>
            <input
              className="form-control"
              type="file"
              name="front"
              multiple
              onChange={onDrop}
              id="formFile"
            />
            <ul className="list-group">
              {Object.values(ptfiles).map((file, i) => {
                return (
                  <li className="list-group-item" key={i}>
                    {file.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="row">
            {msg === "fail" ? (
              <>
                {" "}
                <div className="alert alert-danger" role="alert">
                  Something Went Wrong. Please Refresh The Page And Try Again.
                  If You Keep Getting This Error Please Contact The Admin.
                </div>
              </>
            ) : (
              <></>
            )}
            {btnf === "init" ? (
              <button
                className="btn btn-primary index-login-button"
                type="submit"
              >
                Submit
              </button>
            ) : btnf === "loading" ? (
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            ) : btnf === "loaded" ? (
              <button
                className="btn btn-primary index-login-button"
                type="submit"
                disabled
              >
                Submited
              </button>
            ) : (
              <button
                className="btn btn-primary index-login-button"
                type="submit"
              >
                Submit
              </button>
            )}
          </div>
          <div className="row mt-3">
            <a href="/rx_manage" className="btn btn-secondary">
              Close
            </a>
          </div>
        </form>
      )}
    </div>
  );
};

// export default AddNewRx;
