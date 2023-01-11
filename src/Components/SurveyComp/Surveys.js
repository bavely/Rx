import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useModal } from "react-hooks-use-modal";
import "./Surveys.css";
import SurveyHelper from "../../utils/SurveyHelper";
import Accordion from "react-bootstrap/Accordion";
import helper from "../../utils/helper";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  onValue,
  onChildAdded,
  update,
  remove,
} from "firebase/database";



const Surveys = () => {
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    focusTrapOptions: {
      clickOutsideDeactivates: false,
    },
  });
  // () => handleDelete(survey[0])
  const [thissurv, setThisSurv] = useState([]);

  // Initialize Realtime Database and get a reference to the service
  const database = getDatabase(SurveyHelper.app());

  //  const db = getDatabase();

  const [surveys, setSurveys] = useState([]);
  const [newNotification, setNewNotification] = useState({});
  // let newNotification = {}
  // let notifications = []

  const commentsRef = ref(database, `${helper.fireBaseURL.surveys}/`);

  useEffect(() => {

    getNots();
    onChildAdded(commentsRef, (data) => {
      setNewNotification(data.val());
      getNots();
    });
  }, []);
// ${helper.fireBaseURL.surveys}
// `surveysbeta/`
  const getNots = () => {
    return onValue(
      ref(database, `${helper.fireBaseURL.surveys}/`),
      (snapshot) => {
        if (snapshot.val() !== null) {
          setSurveys(Object.entries(snapshot.val()));
        } else {
          setSurveys([]);
        }

        // ...
      },
      {
        onlyOnce: true,
      }
    );
  };

  const handleDelete = (s) => {
    const updates = {};
    updates[`/${helper.fireBaseURL.surveys}/` + s] = null;
    update(ref(database), updates);
    getNots();
  };

  // =================== Firebase ===================
  // const surveys =[JSON.parse (localStorage.getItem("survey-json"))]
  // useReduxSelector(state => state.surveys.surveys)
  // const dispatch = useReduxDispatch()

  // const postStatus = useReduxSelector(state => state.surveys.status)

  const [inputval, setInputval] = useState("");
  const [msg, setMsg] = useState("");
  const handleChanges = (e) => {
    setInputval(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputval === "yes") {
      handleDelete(thissurv[0]);
      close();
      setInputval("");
    } else {
      setMsg('Please type "yes" to confirm');
    }
  };

  return (
    <div className="survey-container">
      {surveys.length > 0 ? (
        <Accordion defaultActiveKey="0" className="survey-container">
          {surveys.map((survey, idx) => {
            return (
              <Accordion.Item eventKey={idx} key={idx}>
                <Accordion.Header>{survey[1].json.title}</Accordion.Header>
                <Accordion.Body>
                  <div className="survey-options d-flex flex-wrap justify-content-between col-12 align-items-center  px-0 gap-1">
                    <button className="survey-option btn survey-option-btn btn-outline-success col-12 col-sm-auto my-2">
                      <a href={`/uploadcsv?id=${survey[0]}`}>
                        <span className="fc-success">
                          <i className="fas fa-upload color-success"></i> Upload
                          CSV file
                        </span>
                      </a>
                    </button>
                    <button className="survey-option btn survey-option-btn btn-outline-success col-12 col-sm-auto my-2">
                      <a href={"edit/?id=" + survey[0]}>
                        <span>
                          <i className="fas fa-edit"></i> Edit
                        </span>
                      </a>
                    </button>
                    <button className="survey-option btn survey-option-btn btn-outline-success col-12 col-sm-auto my-2">
                      <a href={"results/?id=" + survey[0]}>
                        <span>
                          <i className="fas fa-poll-h"></i> Results
                        </span>
                      </a>
                    </button>

                    <button className="survey-option btn survey-option-btn btn-outline-success col-12 col-sm-auto my-2">
                      <a href={"survey_analytics/?id=" + survey[0]}>
                        <span>
                          <i className="fas fa-chart-area"></i> Analytics
                        </span>
                      </a>
                    </button>

                    <button className="survey-option btn survey-option-btn btn-outline-success col-12 col-sm-auto my-2">
                      <a href={"recipients/?id=" + survey[0]}>
                        <span>
                          <i className="fas fa-users"></i>
                          <span id="hide">Survey Notification Recipients </span>
                        </span>
                      </a>
                    </button>
                    {/* <span className='sjs-button sjs-remove-btn' style={{fontsize:"10px", borderRadius: "0px"}} onClick={() => {open(); setThisSurv(survey)}}><i className="fas fa-trash"></i> Remove</span> */}
                    {/* <Modal>
<div className="card">
<h5 className="card-header">Delete survey permanently</h5>
<div className="card-body">
  <p className="card-text">Are you sure you wish to permanently delete {survey[1].json.title} Survey?</p>
  <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={close}>Cancel</button>
      <button type="button" class="btn btn-primary" onClick={() => handleDelete(survey[0])}>Confirm</button>
    </div>
</div>
</div>
    </Modal>   */}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      ) : (
        <div>No surveys yet</div>
      )}
      <span
        className="sjs-button sjs-add-btn float-end mt-3 mb-3"
        style={{ width: "auto" }}
        title="increment"
        onClick={() => {
          SurveyHelper.set({ title: "Untitled" }, "Untitled");
        }}>
        Add Survey
      </span>
      <div className="sjs-surveys-list__footer">
        <Modal>
          {thissurv.length > 0 ? (
            <div className="card">
              <h5
                className="card-header"
                style={{ background: "steelblue", color: "white" }}>
                Delete survey permanently
              </h5>
              <div className="card-body">
                <p className="card-text">
                  Are you sure you wish to permanently delete{" "}
                  <span className="h5" style={{ color: "red" }}>
                    {thissurv[1].json.title}
                  </span>{" "}
                  Survey?
                </p>
                <p className="fw-lighter" style={{ color: "red" }}>
                  Please type "yes" in the field below to confirm{" "}
                </p>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Enter your confirmation here."
                  aria-label=".form-control-sm example"
                  onChange={handleChanges}
                  value={inputval}
                />
                {msg === 'Please type "yes" to confirm' ? (
                  <p style={{ color: "red" }}>{msg}</p>
                ) : (
                  <></>
                )}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary m-2"
                    data-bs-dismiss="modal"
                    onClick={close}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger m-2"
                    onClick={handleSubmit}>
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Surveys;
