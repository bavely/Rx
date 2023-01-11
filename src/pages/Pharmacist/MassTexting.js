import React, { useState, useEffect } from "react";
import pharmacistHelper from "../../utils/Pharmacist_Helper";
import helper from "../../utils/helper";
import Logedout from "../../Components/Logout/Logedout";
import Nav from "./Nav";
import Header from "./Header";
import { Checkbox, Divider } from "antd";
import MassTextSummary from "./MassTextSummary";

const MassTexting = () => {
  const logedin = sessionStorage.getItem("logedin");
  const pharmacy_id = sessionStorage.getItem("pharmacy");

  const [patients, setPatients] = useState([]);
  const [text, setText] = useState("");
  const [options, setOptions] = useState([""]);
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [isSummary, setIsSummary] = useState(false);
  const [summary, setSummary] = useState([]);
  const [button, setButton] = useState("Send");
  const [success, setSuccess] = useState(0);
  const [failed, setFailed] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
    setIsCompleted(false);
    setSuccess(0);
    setFailed(0);
    setSummary([]);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? options : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    setIsCompleted(false);
    setSuccess(0);
    setFailed(0);
    setSummary([]);
  };

  useEffect(() => {
    setOptions(
      patients.map(
        (el) => `patient id: ${el.id} - ${el.first} ${el.last} - ${el.phone}`
      )
    );
  }, [patients]);

  const textChangeHandler = (e) => {
    setText(e.target.value);
    setIsCompleted(false);
    setSuccess(0);
    setFailed(0);
    setSummary([]);
  };

  const SendClickHandler = async (e) => {
    e.preventDefault();
    setSummary([]);
    let successCount = 0;
    let failedCount = 0;
    setButton("Sending...");
    setIsSending(true);

    let numbers = checkedList.map((el) => el.split("-")[2].trim());

    await Promise.all(
      // eslint-disable-next-line array-callback-return
      patients.map((el) => {
        if (numbers.includes(el.phone)) {
          el.isRecepient = true;
          return helper
            .handleMassText({ message: text, phone: el.phone })
            .then(() => {
              successCount++;
              setSuccess(successCount);
              el.sent = true;
            })
            .catch((err) => {
              failedCount++;
              setFailed(failedCount);
              el.sent = false;
              el.notes = err.response.data;
            });
        }
      })
    );

    setButton("Send");
    setIsCompleted(true);
    setIsSending(false);
    setCheckedList([]);
    setCheckAll(false);
    setIndeterminate(false);
    setText("");
  };

  const summaryClickHandler = (e) => {
    setSummary(
      // eslint-disable-next-line array-callback-return
      patients
        .filter((el) => el.isRecepient)
        .map((el) => {
          return {
            id: el.id,
            first: el.first,
            last: el.last,
            phone: el.phone,
            sent: el.sent,
            notes: el.notes,
          };
        })
    );
    setIsSummary(!isSummary);
  };

  useEffect(() => {
    pharmacistHelper.getPatients(pharmacy_id).then((res) => {
      setPatients(
        res.data.data
          .map((el) => {
            return {
              first: el.user.first,
              last: el.user.last,
              phone: el.user.phone
                .split("")
                .filter((el) => !isNaN(el))
                .join(""),
              id: el.user.id,
              isRecepient: false,
            };
          })
          .filter((el, idx) => el.phone.length > 9 && idx < 20)
      );
    });
  }, [pharmacy_id]);

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
                  <h1>Mass Texting</h1>
                </div>
                <div className="row gy-3">
                  {!isSummary ? (
                    <div className="col-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="text-body col-12 col-md-11 col-lg-5 mb-4 mx-auto">
                              <form>
                                <div className="form-group">
                                  <label htmlFor="text-msg">
                                    <h5 className="mb-3"> Message</h5>
                                  </label>
                                  <textarea
                                    className="form-control w-100 mb-2"
                                    maxLength={500}
                                    id="text-msg"
                                    placeholder="Enter your Message"
                                    rows={6}
                                    value={text}
                                    onChange={textChangeHandler}
                                  />
                                </div>
                                <button
                                  className="btn btn-success col-12 col-sm-4 col-xl-3"
                                  type="submit"
                                  onClick={SendClickHandler}
                                  disabled={
                                    !text.length || !checkedList.length
                                  }>
                                  {button}
                                </button>
                                {(isCompleted || isSending) && (
                                  <div className="my-1 d-flex flex-wrap justify-content-around col-11 col-sm-12 mx-auto">
                                    <p className="my-3 ">
                                      {success} messages sent
                                      successfully,&nbsp;
                                      {failed} failed
                                    </p>
                                    {isCompleted && (
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-success  h-25 mt-2"
                                        onClick={() => summaryClickHandler()}>
                                        Summary
                                      </button>
                                    )}
                                  </div>
                                )}
                              </form>
                            </div>
                            <div className="patients-list col-12 col-lg-7 align-items-center justify-content-center">
                              <h5 className="ms-4 mb-3"> Select Recepients </h5>

                              <div className="card col-12 col-md-11  mx-auto mt-2 ">
                                <div className="card-body">
                                  <div className="d-flex gap-2 col-12 justify-content-between">
                                    <Checkbox
                                      indeterminate={indeterminate}
                                      onChange={onCheckAllChange}
                                      checked={checkAll}>
                                      Select All
                                    </Checkbox>
                                    <small className="d-inline-block me-3">
                                      {checkedList.length} Selected
                                    </small>
                                  </div>
                                  <Divider className="mt-2" />
                                  <div id="patients-long-list">
                                    {!options.length ? (
                                      <p>Loading Patients....</p>
                                    ) : (
                                      <Checkbox.Group
                                        options={options}
                                        value={checkedList}
                                        onChange={onChange}
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: "0.5rem",
                                        }}
                                      />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <button
                        className="btn btn-sm btn-success my-3"
                        onClick={() => setIsSummary(!isSummary)}>
                        go back
                      </button>
                      <MassTextSummary summary={summary} />
                    </div>
                  )}
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
};

export default MassTexting;
