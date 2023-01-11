import React, { useState, useEffect } from "react";
import MessageArea from "../Components/Messages/MessageArea";
import pharmacistHelper from "../utils/Pharmacist_Helper";
import helper from "../utils/helper";

import SurveyHelper from "../utils/SurveyHelper";

function Applesssms() {
  const [incommingFromchannels, setIncommingFromchannels] = useState({});
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const channelId = urlParams.get("id");
  const myid = urlParams.get("r");
  const pharmacy_id = urlParams.get("s");

  const [usersa, setUsersa] = useState([]);
  const [usersb, setUsersb] = useState([]);

  //console.log(channelId);

  useEffect(() => {
    //console.log("Hello");
    helper.getAllusers(pharmacy_id).then((r) => {
      //console.log(r);
      if (r.data.data.length > 0) {
        helper.handleGetChannels(myid).then((res) => {
          //console.log(res.data.data);
          // if (res.data.data.length > 0) {
          //console.log(res.data.data);
          // //console.log(
          //   res.data.data
          //     .map((channel) => channel[0])
          //     .filter((channel) => channel.ID === parseInt(channelId, 10))
          // );
          setIncommingFromchannels(
            res.data.data
              .map((channel) => channel[0])
              .filter((channel) => channel.ID === parseInt(channelId, 10))
              .map((channel) => {
                //console.log(channel);
                channel.scroll = "";
                channel.className = "";
                channel.show = true;
                channel.phId = pharmacy_id;
                let users = channel.users.split(",");
                //console.log(users);
                channel.forignIds = users.filter((user) => user !== myid);
                //console.log(channel.forignIds);
                channel.user = channel.forignIds.map((fid) => {
                  return r.data.data
                    .filter((user) => user.id !== parseInt(myid, 10))
                    .find((user) => user.id === parseInt(fid, 10));
                });
                channel.myInfo = r.data.data.filter(
                  (user) => user.id === parseInt(myid, 10)
                )[0];
                //console.log(channel.user);
                return channel;
              })[0]
          );
        });
      }
    });
  }, []);
  // channelId,myid, pharmacy_id
  //console.log(incommingFromchannels);

  const [msg, setMsg] = useState("");
  const [authflag, setAuthflag] = useState(
    sessionStorage.getItem("auth") === "true" ? true : false
  );
  const [otpflag, setOtpflag] = useState("phone");

  const [phone, setPhone] = useState("");

  const handleChange = (e) => {
    setPhone(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(phone);
    if (phone === incommingFromchannels.myInfo.phone) {
      const val = Math.floor(1000 + Math.random() * 9000);
      //console.log(val);
      sessionStorage.setItem("otp", helper.handleEncryption(val.toString()));

      SurveyHelper.surveySMS(phone, val).then((res) => {
        setMsg("");
        //console.log(res);
        if (res.status === 200) {
          setOtpflag("otp");
        } else {
          setMsg("Invalid Phone Number");
        }
      });
    } else {
      setMsg("Invalid Phone Number");
    }
  };
  const [otp, setOtp] = useState("");

  const handleOtpchange = (e) => {
    setOtp(e.target.value.trim());
  };

  const handleAuth = (e) => {
    e.preventDefault();
    //console.log(otp);
    //console.log(helper.handleEncryption(otp));
    if (helper.handleEncryption(otp) === sessionStorage.getItem("otp")) {
      sessionStorage.setItem("auth", true);
      setAuthflag(true);
      setOtpflag("");
      setMsg("");
    } else {
      setMsg("Invalid OTP");
    }
  };

  // || Object.values(incommingFromchannels).length > 0
  return (
    <>
      <>
        {authflag ? (
          <>
            {incommingFromchannels.ID !== undefined ? (
              <>
              <p style={{color:"red", padding:"20px", marginTop:"20px"}}>- You can leave this window open in the browser so you don't have to verify your number again.</p>
              <p style={{color:"red", padding:"20px", marginBottom:"20px"}}>- In case of receiving a new message notification, you can simply refresh this page to view the new messages.</p>
              <MessageArea dataFromChannel={incommingFromchannels} />
              </>
            ) : (
              <p>Loading...</p>
            )}
          </>
        ) : (
          <>      <div class="container">
          <div class="row mt-5">
            <div class="col-12 mt-5">
              <div class="card mt-5">
                
                  <>
                    <>{msg}</>
                    {otpflag === "phone" ? (
                                            <><div class="card-header">Please Verify Your Phone Number</div>
                                            <div class="card-body">
                      <form class="row gx-3 gy-2 align-items-center">
                        <div class="col-sm-3">
                          <label
                            class="visually-hidden"
                            for="specificSizeInputName"
                          >
                            Phone Number
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="specificSizeInputName"
                            placeholder="1234567890"
                            value={phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div class="col-auto">
                          <button
                            type="submit"
                            class="btn btn-primary"
                            onClick={handleSubmit}
                          >
                            Confirm
                          </button>
                        </div>
                      </form>
                      </div></>
                    ) : otpflag === "otp" ? (
                      <><div class="card-header">Please Enter Your Verification Code</div>
                <div class="card-body">
                      <form class="row gx-3 gy-2 align-items-center">
                        {/* <OtpInput
                            value={otp}
                            onChange={handleOtpchange}
                            numInputs={4}
                            separator={<span>-</span>}
                          /> */}
  
                        <div class="col-sm-3">
                          <label class="visually-hidden" for="otp">
                            Verification Code
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="otp"
                            placeholder="0000"
                            value={otp}
                            onChange={handleOtpchange}
                          />
                        </div>
  
                        <div class="col-auto">
                          <button
                            type="submit"
                            class="btn btn-primary"
                            onClick={handleAuth}
                          >
                            Confirm
                          </button>
                        </div>
                      </form>
                      </div></>
                    ) : (
                      <></>
                    )}
                  </>
                
              </div>
            </div>
          </div>
        </div></>
        )}
      </>

    </>
  );
}

export default Applesssms;
