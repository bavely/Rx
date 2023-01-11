import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Header from "./Header";
import Logedout from "../../Components/Logout/Logedout";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

function RxProcessing() {
  const logedin = sessionStorage.getItem("logedin");

  const steps = [
    { status: "orderReceived" },
    { status: "insuranceVerification" },
    {
      status: "claim/benefitsVerification",
    },
    {
      status: "patientContact",
    },
    {
      status: "rxVerification",
    },
    {
      status: "printLabel",
    },
    {
      status: "orderVerification",
    },
    {
      status: "deliveryScheduled",
    },
    {
      status: "delivered",
    },
  ];
  const [transfer, setTransfer] = useState({
    status: "",
  });

  const getStepPosition = (transferStatus) => {
    return steps.findIndex(({ status }) => status === transferStatus) + 1;
  };
const [counter, setCounter] = useState(0);
console.log(Math.floor( (100 * (getStepPosition(transfer.status) / steps.length)))-getStepPosition(transfer.status));

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
                    <button onClick={() => {setTransfer ({status : steps[counter].status}); setCounter(counter+1)}}>Click</button>
                  <ProgressBar
                    width={"100%"}
                    percent={
                        Math.floor( (100 * (getStepPosition(transfer.status) / steps.length)) - getStepPosition(transfer.status))
                    }
                    filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                  >
                    {steps.map((step, index, arr) => {
                      return (
                        <Step
                        key = {index}
                          position={Math.floor(100 * (index / arr.length))}
                          transition="scale"
                          children={({ accomplished }) => (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50%",
                                width: 20,
                                height: 20,
                                color: "white",
                                backgroundColor: accomplished
                                  ? "green"
                                  : "gray",
                              }}
                            >
                              {index + 1}
                              
                            </div>
                          )}
                        />
                      );
                    })}
                  </ProgressBar>
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
}

export default RxProcessing;
