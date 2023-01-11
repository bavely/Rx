import React, { useState, useEffect, useCallback } from "react";
import Nav from "./Nav";
import Header from "./Header";
import Logedout from "../../Components/Logout/Logedout";
import Channels from "../../Components/Messages/Channels";
import MessageArea from "../../Components/Messages/MessageArea";
import "../../Components/Messages/messages.css";
import helper from "../../utils/helper";
import { TagsInput } from "react-tag-input-component";
import "../../css/messages.css";

function MessagesProviders() {
  const logedin = sessionStorage.getItem("logedin");
  const userId = sessionStorage.getItem("user");
  const pharmacy_id = sessionStorage.getItem("pharmacy");
  const [usersList, setUsersList] = useState([]);
  const [searchFlag, setSearchFlag] = useState(false);
  const [channels, setChannels] = useState([]);
  const [messageAreaFlage, setMessageAreaFlage] = useState(false);
  const [incommingFromchannels, setIncommingFromchannels] = useState(false);
  const [userInput, setUserInput] = useState({
    value: "",
  });
  const [msg, setMsg] = useState("");
  const [selected, setSelected] = useState([]);

  const [usersa, setUsersa] = useState([]);
  const [usersb, setUsersb] = useState([]);
  const [mobHide, setMobHide] = useState("");

  useEffect(() => {
    helper.getAllusers(pharmacy_id).then((res) => {
      Promise.all(
        res.data.data.filter((user) => user.id === parseInt(userId, 10))
      ).then((res) => {
        setUsersb(res);
      });
      Promise.all(
        res.data.data.filter((user) => user.id !== parseInt(userId, 10))
      ).then((res) => {
        setUsersa(res);
      });
    });
  }, []);

  const handleSelect = (event) => {
    // 2- Here we are getting the type of the user to send to the Backend to get all the list of
    // the users of that type and set them in the usersList array.
    event.preventDefault();
    setSearchFlag(true);


    if (event.target.value === "2") {
      setUsersList(
        usersa.filter(
          (user) =>
            user.type === "pharmacist" ||
            user.type === "Pharmacist" ||
            user.type === "user" ||
            user.type === "User"
        )
      );
    }

    if (event.target.value === "3") {
      // pharmacistHelper.getPatients().then((res) => {
      //   setUsersList(res.data.Patients);
      // });
      setUsersList(
        usersa.filter(
          (user) => user.type === "patient" || user.type === "Patient"
        )
      );
    }
  };

  useEffect(() => {
    helper.getAllusers(pharmacy_id).then((resp) => {
      if (resp.data.data && resp.data.data.length > 0 && usersa.length > 0) {
        helper.handleGetChannels(userId).then((res) => {
          if (res.data.data.length > 0) {
            setChannels(
              res.data.data
                .map((channel) => channel[0])
                .map((channel) => {
                  channel.scroll = "";
                  channel.className = "";
                  channel.show = true;
                  channel.myInfo = resp.data.data.filter(
                    (user) => user.id === parseInt(userId, 10)
                  )[0];
                  let users = channel.users.split(",");
                  channel.forignIds = users.filter((user) => user !== userId);
                  channel.user = channel.forignIds.map((fid) => {
                    return usersa
                      .filter((user) => user.id !== parseInt(userId, 10))
                      .find((user) => user.id === parseInt(fid, 10));
                  });
                  return channel;
                })
            );
            setChannelsSeachStore(
              res.data.data
                .map((channel) => channel[0])
                .map((channel) => {
                  channel.scroll = "";
                  channel.className = "";
                  channel.show = true;
                  channel.myInfo = resp.data.data.filter(
                    (user) => user.id === parseInt(userId, 10)
                  )[0];
                  let users = channel.users.split(",");
                  channel.forignIds = users.filter((user) => user !== userId);
                  channel.user = channel.forignIds
                    .map((fid) => {
                      return usersa
                        .filter((user) => user.id !== parseInt(userId, 10))
                        .find((user) => user.id === parseInt(fid, 10));
                    })
                    .filter((i) => i !== undefined);
                  return channel;
                })
            );
          } else {
            setChannels([]);
          }
        });
        //1- Get all active channels from the backend. Every channel has many messages and 2 users regardless who is sender and who is the reciver.
      }
    });
  }, [usersa]);

  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const [messages, setMessages] = useState([]);
  const handleCreateCh = (e) => {
    e.preventDefault();
    setMsg("");
    let recep = selected.map((s) => {
      return s.split("-")[0].trim();
    });
    let patientCheck = recep
      .map((fid) => {
        return usersa.find((user) => user.id === parseInt(fid, 10));
      })
      .filter((i) => i.type === "patient" || i.type === "Patient");

    if (patientCheck.length > 1) {
      setMsg("You can't send message to more than one patient");
      return;
    }

    let data = {
      senderID: userId,
      recepints: recep,
    };

    helper.handleCheckChannel(data).then((res) => {
      if (res.status === 200 && res.data.data.length > 0) {
        let thisChannel = channels.find(
          (ch) =>
            ch.forignIds
              .sort((a, b) => {
                return b - a;
              })
              .toString() ===
            recep
              .sort((a, b) => {
                return b - a;
              })
              .toString()
        );

        setChannels(
          channels.map((ch) => {
            if (ch.ID === thisChannel.ID) {
              ch.className =
                "animate__animated animate__pulse animate__repeat-2 co";
              ch.scroll = "scroll";
            }
            return ch;
          })
        );
        setMessages(res.data.data);
        setSelected([]);
      } else {
        setMessages([]);
        setChannels([
          ...channels,
          {
            ID: "9999n",
            usersName: "Pending channel",
            scroll: "scroll",
            className: "animate__animated animate__pulse animate__repeat-2",
            show: true,
            forignIds: recep,
            user: recep.map((fid) => {
              return usersa.find((user) => user.id === parseInt(fid, 10));
            }),
            createdAt: Date(),
            myInfo: usersb[0],
          },
        ]);
        setSelected([]);
      }
    });
  };

  const setNewChannel = (channel) => {
    setChannels(
      channels.map((ch) => {
        if (ch.ID === "9999n") {
          ch.ID = channel;
        }
        return ch;
      })
    );
  };

  const handleChannleUpdate = (channel) => {
    // 4- Here we are getting the channel to send to the Backend to update the channel.
    setIncommingFromchannels(channel);
    setMessageAreaFlage(true);
    setChannels(
      channels.map((item) => {
        // rounded rounded-pill
        if (item.ID === channel.ID) {
          return item;
        } else {
          item.scroll = "";
          item.className = "";
          return item;
        }
      })
    );
  };

  const handleClose = (channelId) => {
    if (channelId === incommingFromchannels.ID) {
      setMessageAreaFlage(false);
    }
    setChannels(
      channels.map((ch) => {
        if (ch.ID === channelId) {
          ch.show = false;
        }
        return ch;
      })
    );
  };
  const [findval, setFindval] = useState("");
  const [channelsSeachStore, setChannelsSeachStore] = useState([]);
  const getFindval = (e) => {
    setFindval(e.target.value.trim());
  };

  useEffect(() => {
    if (findval === "") {
      setChannels(channelsSeachStore);
    } else {
      let reg = new RegExp(findval, "i");
      let Ch = channels.filter((ch) => ch.usersName.search(reg) !== -1);

      Promise.all(Ch).then((res) => {
        setChannels(res);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findval]);

  return (
    <div>
      {logedin === "true" ? (
        <div id="wrapper">
          <Nav />
          <div id="content-wrapper">
            <Header />
            <div id="content">
              <div className="container-fluid">
                <div className=" clearfix">
                  <div className=" chat-app row">
                    <div
                      id="plist"
                      className={`people-list col-12 col-lg-4 ${mobHide}`}>
                      <div className="input-group my-0">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={handleSelect}
                          defaultValue="Please Select User Type To Search">
                          <option>Please Select User Type To Search</option>
                          <option value="3">Patient</option>
                          <option value="2">Pharmacy User</option>
                        </select>
                      </div>
                      {searchFlag ? (
                        <div className="input-group mt-0">
                          <input
                            className="form-control "
                            list="users"
                            id="uDataList"
                            placeholder="Type to search for a recipient..."
                            onChange={handleChange}
                            name="value"
                            value={userInput.value}
                          />
                          <datalist id="users">
                            {usersList.length > 0 ? (
                              usersList
                                .filter((u) => u.id !== userId)
                                .map((item) => (
                                  <option
                                    value={`${item.id} - ${item["first Name"]} ${item["last name"]}`}
                                    key={`${item.id}`}></option>
                                ))
                            ) : (
                              <option value="No Data"></option>
                            )}
                          </datalist>
                          <a
                            href="#scroll"
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => {
                              setMsg("");
                              let selectedItems = [];

                              if (selected.includes(userInput.value)) {
                                setMsg("Recipient already added");
                                selectedItems = selected;
                              } else {
                                selectedItems = [...selected, userInput.value];
                              }

                              setSelected(selectedItems);
                              setUserInput({ value: "" });
                            }}>
                            Add
                          </a>
                        </div>
                      ) : (
                        <>
                          <input
                            className="form-control my-0"
                            type="text"
                            placeholder="Search for a recipient..."
                            aria-label="Disabled input example"
                            disabled
                          />
                        </>
                      )}
                      <div className="input-group">
                        <div className="input-group-text col-12">
                          <TagsInput
                            value={selected}
                            name="Chat_group"
                            placeHolder="Chat Group    "
                            onChange={setSelected}
                          />
                          <a
                            href="#scroll"
                            className="btn btn-outline-secondary"
                            onClick={handleCreateCh}>
                            Start Chat
                          </a>
                        </div>
                        {msg && (
                          <div className="input-group">
                            <div className="col-12">{msg}</div>
                          </div>
                        )}
                      </div>

                      <ul className="list-unstyled chat-list mt-2 mb-0">
                        <hr />
                        <div className="col-12 mb-1">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search channels by user name..."
                            value={findval}
                            onChange={getFindval}
                          />
                        </div>
                        <div className="channelslist">
                          {usersa.length === 0 ? (
                            <p>Loading...</p>
                          ) : (
                            <>
                              {channels.length > 0 ? (
                                <>
                                  <>
                                    {channels
                                      .sort(function (a, b) {
                                        return a.createdAt > b.createdAt
                                          ? -1
                                          : b.createdAt > a.createdAt
                                          ? 1
                                          : 0;
                                      })
                                      .map((channel) => (
                                        <>
                                          {
                                            <Channels
                                              key={channel.ID}
                                              channel={channel}
                                              onChannelUpdate={
                                                handleChannleUpdate
                                              }
                                              setMobHide={setMobHide}
                                              onClose={handleClose}
                                            />
                                          }
                                        </>
                                      ))}
                                  </>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                        </div>
                      </ul>
                    </div>

                    {messageAreaFlage ? (
                      mobHide && (
                        <MessageArea
                          dataFromChannel={incommingFromchannels}
                          messages={messages}
                          recepints={selected}
                          onNewId={setNewChannel}
                          setMobHide={setMobHide}
                          mobHide={mobHide}
                        />
                      )
                    ) : (
                      <></>
                    )}
                  </div>
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

export default MessagesProviders;
