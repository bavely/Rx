import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IdleTimerProvider } from "react-idle-timer";
import { useModal } from "react-hooks-use-modal";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function SessionTimeOut() {
  const navigate = useNavigate();

  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  const [countDownValue, setCountDownValue] = useState(20);
  const [intervalId, setIntervalId] = useState(0);
  const [timeOutId, setTimeOutId] = useState(0);

  let count = 20;

  const handleLogOut = () => {
    sessionStorage.setItem("logedin", false);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("pt");
    sessionStorage.removeItem("userName");
    close();
    navigate("/");
  };

  const countDown = () => {
    if (count <= 0) {
      clearInterval(intervalId);
      count = 20;
    } else {
      count = count - 1;
      setCountDownValue(count);
    }
  };

  const handleIdle = () => {
    if (sessionStorage.getItem("logedin") === "true") {
      open();
      let timeOut = setTimeout(handleLogOut, 20000);
      let timer = setInterval(countDown, 1000);
      setTimeOutId(timeOut);
      setIntervalId(timer);
    }
  };

  const handleClear = () => {
    clearInterval(intervalId);
    clearTimeout(timeOutId);
    setCountDownValue(20);
    count = 20;
  };

  const handleAction = () => {
    handleClear();
  };

  return (
    <>
      <IdleTimerProvider
        timeout={30 * 60 * 1000}
        onIdle={handleIdle}
        onAction={handleAction}></IdleTimerProvider>

      <Modal>
        <div className="card  mb-3" style={{ maxWidth: "35rem" }}>
          <div className="card-header bg-transparent fw-bold text-center">
            Session Timeout
          </div>
          <div className="card-body">
            {/* <h5 className="card-title">Success card title</h5> */}
            <p className="card-text text-center">
              No activity detected. Your session will expire in{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>
                {countDownValue}s{" "}
              </span>{" "}
              for security.
            </p>
          </div>
          <div className="card-footer bg-transparent text-center">
            <button
              type="button"
              className="btn btn-danger mx-2 mx-2"
              data-bs-dismiss="modal"
              onClick={() => {
                handleLogOut();
                close();
              }}>
              LogOut
            </button>
            <button
              type="button"
              className="btn btn-primary mx-2 mx-2"
              onClick={() => {
                close();
                handleClear();
              }}>
              Keep Logged In
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SessionTimeOut;
