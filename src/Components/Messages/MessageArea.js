import React, { useEffect, useState } from "react";
import "./messages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPaperclip,
  faSearch,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import helper from "../../utils/helper";
import firebase from "../../utils/Firebase_Helper";

function MessageArea(props) {
  // -----------------------------------------

  const scrollToBottom = () => {
    var elem = document.getElementById("chat-area");
    elem.scrollTop = elem.scrollHeight;
  };

  const userId =
    sessionStorage.getItem("user") ||
    props.dataFromChannel.myInfo.id.toString();

  const pharmacy_id =
    sessionStorage.getItem("pharmacy") || props.dataFromChannel.phId;
  const [messages, setMessages] = useState([]);
  const [messagetosent, setMessageTosent] = useState("");
  const [files, setFiles] = useState([]);
  const [findval, setFindval] = useState("");
  const [filteredmsgs, setFilteredmsgs] = useState([]);
  const [count, setCount] = useState(0);
  const [numoffind, setNumoffind] = useState(0);

  const [loadedInd, setLoaded] = useState(false);

  useEffect(() => {
    if (props.dataFromChannel.ID !== "9999n") {
      setLoaded(false);
      helper
        .handleGetMessages({
          channel_id: props.dataFromChannel.ID,
        })
        .then((res) => {
          if (res.data.data && res.data.data.length > 0) {
            setMessages(res.data.data);
            setLoaded(true);
            scrollToBottom();
          } else {
            setMessages([]);
          }
        });
    } else {
      setMessages([]);
      setLoaded(true);
    }
  }, [props.dataFromChannel.ID]);

  const handleChange = (e) => {
    setMessageTosent(e.target.value);
  };

  // eslint-disable-next-line no-extend-native
  String.prototype.hexEncode = function () {
    var hex, i;

    var result = "";
    for (i = 0; i < this.length; i++) {
      hex = this.charCodeAt(i).toString(16);
      result += ("000" + hex).slice(-4);
    }

    return result;
  };

  const handleSendMsg = (m) => {
    if (m === "" && Object.values(files).length === 0) {
      return;
    } else {
      if (Object.values(files).length > 0) {
        const formData = new FormData();
        // Object.values(files).forEach((obj) => {
        formData.append("file", Object.values(files)[0]);
        helper.handleFiles(formData).then((res) => {
          if (res.status === 200) {
            handleSend(m, res.data.url);
          }
        });
        // });
      } else {
        handleSend(m, "");
      }
    }
  };

  const handleSend = (m, url) => {
    if (props.dataFromChannel.ID === "9999n") {
      setMessages([]);
      setLoaded(true);
      helper
        .handleSendMessage({
          sender: {
            ID: userId,
            name:
              props.dataFromChannel.myInfo["first Name"] +
              " " +
              props.dataFromChannel.myInfo["last name"],
          },
          recepints: props.dataFromChannel.user.map((u) => {
            return {
              ID: u.id,
              name: u["first Name"] + " " + u["last name"],
            };
          }),
          message: m,
          URL: url,
        })
        .then((r) => {
          setMessageTosent("");
          setFiles([]);
          //console.log(r)
          setMessageTosent("");
          setFiles([]);
          setLoaded(false);
          r?.data?.data && props.onNewId(r.data.data);
          helper
            .handleGetMessages({
              channel_id: r.data.data,
            })
            .then((res) => {
              //console.log(res.data.data);
              setLoaded(true);
              if (res.data.data && res.data.data.length > 0) {
                setMessages(res.data.data);

                handleSendNotification(m, props.dataFromChannel.ID);
                scrollToBottom();
              } else {
                setMessages([]);
              }
            });
          //           helper.handleGetChannels(userId).then((res) => {
          //             // let newch = res.data.data.map((channel) => channel[0]).find((channel) =>channel.users.split(",").filter((user) => user !== userId).sort((a, b)=>{return b - a}).toString() === props.dataFromChannel.forignIds.sort((a, b)=>{return b - a}).toString())
          // //console.log(res)
          //             let newch = res.data.data.map((channel) => channel[0])
          //               .map((channel) => {
          //                 if (
          //                   channel.users
          //                     .split(",")
          //                     .filter((user) => user !== userId)
          //                     .sort((a, b) => {
          //                       return b - a;
          //                     })
          //                     .toString() ===
          //                   props.dataFromChannel.forignIds
          //                     .sort((a, b) => {
          //                       return b - a;
          //                     })
          //                     .toString()
          //                 ) {
          //                   return channel;
          //                 }
          //               });
          //               //console.log(newch)
          //             props.onNewId(newch.filter((ch) => ch !== undefined)[0]);
          //             handleSendNotification(
          //               m,
          //               newch.filter((ch) => ch !== undefined)[0].ID
          //             );
          //           });
        });
    } else {
      helper
        .handleSendMessage({
          sender: {
            ID: userId,
            name:
              props.dataFromChannel.myInfo["first Name"] +
              " " +
              props.dataFromChannel.myInfo["last name"],
          },
          recepints: props.dataFromChannel.user.map((u) => {
            return {
              ID: u.id,
              name: u["first Name"] + " " + u["last name"],
            };
          }),
          message: m,
          URL: url,
        })
        .then((r) => {
          setMessageTosent("");
          setFiles([]);
          setLoaded(false);
          helper
            .handleGetMessages({
              channel_id: props.dataFromChannel.ID,
            })
            .then((res) => {
              if (res.data.data && res.data.data.length > 0) {
                setMessages(res.data.data);
                setLoaded(true);
                handleSendNotification(m, props.dataFromChannel.ID);
                scrollToBottom();
              } else {
                setMessages([]);
              }
            });
        });
    }
  };

  const handleSendNotification = (m, chId) => {
    if (props.dataFromChannel.user && props.dataFromChannel.user.length > 0) {
      props.dataFromChannel.user.forEach((u) => {
        if (u.phone) {
          helper
            .handleSms({
              number: u.phone,
              message: m,
              channel_id: chId,
              sender: pharmacy_id,
              receiver: u.id,
            })
            .then((res) => {
              if (u.email) {
                helper.handleSendEmail({ email: u.email, message: m });
              }
            });
        }

        firebase.set(
          ` ${
            props.dataFromChannel.myInfo["first Name"] +
            " " +
            props.dataFromChannel.myInfo["last name"]
          }`,
          m,
          userId.toString(),
          u.id.toString(),
          `You have received a new message from
          Sender Name: ${
            props.dataFromChannel.myInfo["first Name"] +
            " " +
            props.dataFromChannel.myInfo["last name"]
          }  ${m}`,
          true,
          `/messages#${chId}`
        );
      });
    }
  };

  const handleAddFiles = (e) => {
    setFiles(e.target.files);
  };

  const [arrowsFlag, setArrowsFlag] = useState(false);

  const getFindval = (e) => {
    setFindval(e.target.value.trim());
  };

  const handleFind = () => {
    setCount(0);
    setMessages(
      messages.map((message) => {
        message.className = "";
        return message;
      })
    );
    if (findval === "") {
      setFilteredmsgs([]);
      setNumoffind("");
      setArrowsFlag(false);

      return;
    } else {
      let reg = new RegExp(findval, "i");
      let msgarr = messages.filter(
        (message) => message.Message.search(reg) !== -1
      );

      Promise.all(msgarr).then((res) => {
        setFilteredmsgs(res);
        setNumoffind(msgarr.length);
        setArrowsFlag(true);
      });
    }
  };

  const handleNext = (c) => {
    if (filteredmsgs.length > 0) {
      if (filteredmsgs.length - 1 === c) {
        setMessages(
          messages.map((message) => {
            if (message.ID === filteredmsgs[c].ID) {
              message.className = "x";
            } else {
              message.className = "";
            }
            return message;
          })
        );
        setCount(0);
      } else {
        setMessages(
          messages.map((message) => {
            if (message.ID === filteredmsgs[c].ID) {
              message.className = "x";
            } else {
              message.className = "";
            }
            return message;
          })
        );
        setCount(c + 1);
      }
    } else {
      return null;
    }
  };

  const handlePrev = (c) => {
    if (filteredmsgs.length > 0) {
      if (c === 0) {
        setMessages(
          messages.map((message) => {
            if (message.ID === filteredmsgs[c].ID) {
              message.className = "x";
            } else {
              message.className = "";
            }
            return message;
          })
        );
        setCount(filteredmsgs.length - 1);
      } else {
        setMessages(
          messages.map((message) => {
            if (message.ID === filteredmsgs[c].ID) {
              message.className = "x";
            } else {
              message.className = "";
            }
            return message;
          })
        );
        setCount(c - 1);
      }
    } else {
      return null;
    }
  };

  return (
    <div className={`chat chat-messages col-12 col-lg-8 ${props.mobHide}`}>
      <div className="col-12">
        <div className="chat-header clearfix ">
          <div className="row ">
            <span className="chat-close-btn">
              <button
                type="button"
                className="btn-close closebtn fs-6 "
                aria-label="Close"
                onClick={() => {
                  props.setMobHide("");
                }}></button>
            </span>
            <div className="chat-about d-flex flex-row flex-wrap justify-content-center">
              {props.dataFromChannel.user.length === 1 ? (
                <img
                  src={require("../../images/patient_placeholder.png")}
                  alt="avatar"
                />
              ) : (
                <img
                  src={require("../../images/group_placeholder.png")}
                  alt="Group-avatar"
                />
              )}
              <h5 className="mt-2 mx-2">
                {props.dataFromChannel.user.length > 0
                  ? props.dataFromChannel.user.reduce(
                      (acc, current, i, arr) => {
                        return (
                          acc +
                          `${current["first Name"]} ${current["last name"]}${
                            i === arr.length - 1 ? "" : ", "
                          } `
                        );
                      },
                      ""
                    )
                  : null}
              </h5>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between">
          <div className="chat-history">
            <div className="row">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Messages..."
                  value={findval}
                  onChange={getFindval}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="inputGroupFileAddon04"
                  onClick={handleFind}>
                  <FontAwesomeIcon size="xs" icon={faSearch} />
                </button>
              </div>
              <div className="mt-2">
                {arrowsFlag ? (
                  <>
                    <span>
                      <a
                        href="#x"
                        className="link-danger"
                        onClick={() => handlePrev(count)}>
                        <FontAwesomeIcon size="xl" icon={faArrowLeft} />{" "}
                      </a>
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    {numoffind > 0 ? <span>{numoffind} found</span> : numoffind}
                    &nbsp;&nbsp;&nbsp;
                    <span>
                      <a
                        href="#x"
                        className="link-success"
                        onClick={() => handleNext(count)}>
                        <FontAwesomeIcon size="xl" icon={faArrowRight} />{" "}
                      </a>
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div>
              <ul className="m-b-0" id="chat-area">
                {loadedInd ? <></> : <p>Loading...</p>}
                {messages.length > 0 ? (
                  messages
                    .sort(function (b, a) {
                      return a.createdAt > b.createdAt
                        ? -1
                        : b.createdAt > a.createdAt
                        ? 1
                        : 0;
                    })
                    .map((m, i) => {
                      return (
                        <>
                          {m.senderID === userId ? (
                            <li
                              className={`clearfix ${m.className}`}
                              id={`${m.className}`}
                              key={m.ID}>
                              <div className="message-data text-end ">
                                <span className="message-data-time chat-time">
                                  {m.createdAt.split("T")[0]}{" "}
                                  {m.createdAt.split("T")[1].split(".")[0]}
                                </span>
                              </div>
                              <div
                                className="message my-message float-right"
                                id={`${m.className}`}>
                                {m.Message}
                                {m.URL ? (
                                  <a
                                    href={m.URL}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="link-warning">
                                    <img
                                      src={m.URL}
                                      alt={`${
                                        m.URL.split("/")[
                                          m.URL.split("/").length - 1
                                        ]
                                      }`}
                                      className="message-img"
                                    />
                                  </a>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </li>
                          ) : (
                            <>
                              <li
                                className={`clearfix ${m.className}`}
                                key={m.ID}>
                                <div className="message-data">
                                  <span className="fw-bold">
                                    {m.senderName}
                                  </span>
                                  <span className="message-data-time fs-6 chat-time">
                                    {m.createdAt.split("T")[0]}{" "}
                                    {m.createdAt.split("T")[1].split(".")[0]}
                                  </span>
                                </div>
                                <div
                                  className="message other-message"
                                  id={`${m.className}`}>
                                  {m.Message}
                                  {m.URL ? (
                                    <a
                                      href={m.URL}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="link-warning">
                                      <img
                                        src={m.URL}
                                        alt={`${
                                          m.URL.split("/")[
                                            m.URL.split("/").length - 1
                                          ]
                                        }`}
                                        className="message-img"
                                      />
                                    </a>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </li>
                            </>
                          )}
                        </>
                      );
                    })
                ) : (
                  <div className="text-center">No messages yet</div>
                )}
              </ul>
            </div>
          </div>
          <div className="chat-input">
            <div className="image-upload btn btn-outline-secondary ">
              <label htmlFor="formFileSm" className="form-label py-0 m-0 ">
                <FontAwesomeIcon size="sm" icon={faPaperclip} />
              </label>
              <input
                className="form-control form-control-sm"
                id="formFileSm"
                type="file"
                onChange={handleAddFiles}
              />
            </div>
            <div>
              <div className="input-group">
                {Object.values(files).length > 0 ? (
                  <textarea
                    className="form-control"
                    type="text"
                    value={Object.values(files).map((f) => {
                      return `${f.name}  \n`;
                    })}
                    aria-label="Disabled input example"
                    disabled
                    readonly></textarea>
                ) : (
                  ""
                )}
                <textarea
                  className="form-control"
                  placeholder="Type a message..."
                  id="floatingTextarea"
                  name="message"
                  value={messagetosent}
                  onChange={handleChange}></textarea>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => handleSendMsg(messagetosent)}>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageArea;
