import React, { useEffect, useState } from "react";
import "./messages.css";
import "animate.css";

function Channels(props) {
  const [classVar, setClassVar] = useState("");
  const [showhideflag, setShowhideflag] = useState(true);

  useEffect(() => {
    setClassVar(props.channel.className);
    setShowhideflag(props.channel.show);
  }, [props.channel.className, props.channel.show]);

  return (
    <>
      {props.channel.user[0] !== undefined && (
        <li
          className={`clearfix chat-about ${classVar} mx-0 ${
            props.channel.show ? "show" : "hide"
          }`}
          onClick={() => {
            props.channel.className = "active";
            props.onChannelUpdate(props.channel);
          }}>
          <div id={props.channel.ID} className={`mx-0 px-0`}>
            <button
              style={{ zIndex: 1000 }}
              type="button"
              className="btn-close closebtn"
              aria-label="Close"
              onClick={() => {
                props.onClose(props.channel.ID);
              }}></button>

            <div
              id={props.channel.scroll}
              onClick={() => props.setMobHide("dont-show")}>
              {props.channel.user.length === 1
                ? props.channel.user.map((u) => {
                    return (
                      <>
                        <img
                          src={require("../../images/patient_placeholder.png")}
                          className="mx-2"
                          alt="avatar"
                        />
                        <h6 className="m-b-0">
                          {u["first Name"]} {u["last name"]}
                        </h6>
                      </>
                    );
                  })
                : props.channel.user.length > 1
                ? props.channel.user.map((u, idx) => {
                    return u === undefined ? (
                      ""
                    ) : (
                      <>
                        {idx === 0 && (
                          <img
                            src={require("../../images/group_placeholder.png")}
                            className="mx-2"
                            alt="avatar"
                          />
                        )}
                        <h6 className="m-b-0 d-inline">
                          {u["first Name"]} {u["last name"]}
                          {idx !== props.channel.user.length - 1 && ", "}
                        </h6>
                      </>
                    );
                  })
                : ""}
            </div>
          </div>
        </li>
      )}
    </>
  );
}

export default Channels;
