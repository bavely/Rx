import React, { useEffect, useState } from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

function Steps(props) {
  console.log(props.data, "jjj");

  const steps = [
    { status: "sprovider" },
    { status: "spatient" },
    {
      status: "therapy",
    },
    {
      status: "diagnose",
    },
    {
      status: "clinical",
    },
    {
      status: "medication",
    },
    {
      status: "review",
    },
  ];
  const [transfer, setTransfer] = useState({
    status: "",
  });

  useEffect(() => {
    console.log(props.data.step);
    if (props.data.step) {
      setTransfer({ status: props.data.step });
    } else {
      setTransfer({ status: "sprovider" });
    }
    // if (props.data.step === "diagnose") {
    //   setTransfer({ status: props.data.step });
    // } else if (props.data.step === "clinical") {
    //   setTransfer({ status: props.data.step });
    // } else if (props.data.step === "medication") {
    //   setTransfer({ status: props.data.step });
    // } else if (props.data.step === "review") {
    //   setTransfer({ status: props.data.step });
    // }
  }, [props.data.step]);

  const getStepPosition = (transferStatus) => {
    return steps.findIndex(({ status }) => status === transferStatus) + 1;
  };

  return (
    <div style={{ margin: 30 }}>
      <ProgressBar
        width={"100%"}
        percent={100 * (getStepPosition(transfer.status) / steps.length)}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      >
        {steps.map((step, index, arr) => {
          return (
            <Step
              position={100 * (index / arr.length)}
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
                    backgroundColor: accomplished ? "green" : "gray",
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
  );
}

export default Steps;
