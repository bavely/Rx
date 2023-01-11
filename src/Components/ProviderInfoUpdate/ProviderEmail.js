import React from "react";
import { useContext, useState, useEffect } from "react";
import { useModal } from "react-hooks-use-modal";
import helper from "../../utils/helper";
import providerHelper from "../../utils/Provider_Helper";

export default function ProviderEmail(props) {
  const divStyle = {
    color: "black",
    backgroundColor: "DarkTurquoise",
    padding: "1rem",
    display: "inline-block",
    borderRadius: "1rem",
  };
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [upDateVal, setUpdate] = useState({
    email: "",
    password: "",
  });
  const [btnFlag, setBtn] = useState(false);
  const [infMsg, setIfomsg] = useState({});

  const [dateFprops, setData] = useState({
    email: props.data.email,
  });

  useEffect(() => {
    setData({
      email: props.data.email,
    });
  }, [props]);

  const handleChange = (event) => {
    setUpdate({
      ...upDateVal,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    setBtn(true)
helper.emailVerifier(upDateVal.email).then(r =>{   if (r.data.data.status === 'invalid'){
  setIfomsg({err: "We Were Not Able To Verify The Provided Email Address. Please Use A Valid Email Addrss."})
}else{



    // helper.handleEmailCheck(upDateVal.email).then((res) => {
      // if (res.data.Result.length === 0) {
      //   console.log(res);
        providerHelper
          .handleEmailUpdate(upDateVal.email, upDateVal.password, props.data.ID)
          .then((response) => {
            console.log(response);
            setBtn(false);
            if (response.status === 200) {
              console.log("cool");
              setData({
                email: upDateVal.email,
              });
              setIfomsg({ success: response.data.message });
            } else {
              setIfomsg({ err: response.data.message });
            }
          });
      // } else {
      //   console.log("in use");
      //   setIfomsg({ err: "This Email Is Already In Use" });
      // }
    // });



  }
})


  };

  return (
    <div>
      {props.data.ID === undefined ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>
          <h5> {dateFprops.email} </h5>{" "}
          <button className="btn btn-outline-primary float-end" onClick={open}>
            {" "}
            Update Email Address{" "}
          </button>{" "}
          <Modal>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: "steelblue"}}>
                  <h5 className="modal-title" style={{ color: "white"}}> Update Email </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={close}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <p>
                      Please Enter Your Password Below To Confirm Your Identity
                      To Change Email Address: {dateFprops.email}.{" "}
                    </p>
                    <input
                      id="welcome-div-username"
                      type="email"
                      name="email"
                      style={{ marginLeft: "6.5rem"}}
                      placeholder="New Email"
                      value={upDateVal.email}
                      onChange={handleChange}
                      required
                    />{" "}
                    <input
                      id="welcome-div-password"
                      type="password"
                      name="password"
                      style={{ marginLeft: "6.5rem"}}
                      placeholder="Password"
                      value={upDateVal.password}
                      onChange={handleChange}
                      required
                    />{" "}
                  </div>
                  <div className="modal-footer">
                    {btnFlag ? (
                      <button
                        className="btn btn-primary"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Loading...
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        type="submit"
                      >
                        Update
                      </button>
                    )}
                    <button className="btn btn-secondary" onClick={close}>
                      Cancel{" "}
                    </button>{" "}
                  </div>
                </form>{" "}
                {infMsg.success ? (
                  <div className="alert alert-success" role="alert">
                    {infMsg.success}
                  </div>
                ) : infMsg.err ? (
                  <div className="alert alert-danger" role="alert">
                    {infMsg.err}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>{" "}
          </Modal>{" "}
        </div>
      )}
    </div>
  );
}
