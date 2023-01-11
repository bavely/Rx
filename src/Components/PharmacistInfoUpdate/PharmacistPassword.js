import React from "react";
import { useContext, useState, useEffect } from "react";
import { useModal } from "react-hooks-use-modal";
import pharmacistHelper from "../../utils/Pharmacist_Helper";
import "../../css/bootstrap.min.css";

export default function PharmacistPassword(props) {
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [upDateVal, setUpdate] = useState({
    current_password: "",
    new_password: "",
    new_password_conf: "",
  });
  const [infMsg, setIfomsg] = useState({});

  const [btnFlag, setBtn] = useState(false);

  const handleChange = (event) => {
    setUpdate({
      ...upDateVal,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setBtn(true);
    if (upDateVal.new_password === upDateVal.new_password_conf) {
      pharmacistHelper
        .handlePasswordUpdate(
          upDateVal.current_password,
          upDateVal.new_password,
          props.data.ID
        )
        .then((res) => {
          setBtn(false);

          if (res.status === 200 ) {
            
            console.log(res);
            setIfomsg({ success:  res.data.message  });
          } else {
            setIfomsg({ err: res.data.message });
          }
        });
    } else {
      alert("Password Doesn't match!");
    }
  };

  return (
    <div>
      {props.data.ID === undefined ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>
          <h5> {"********"} </h5>{" "}
          <button className="btn btn-outline-primary float-end" onClick={open}>
            {" "}
            Update Password{" "}
          </button>{" "}
          <Modal>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: "steelblue"}}>
                  <h5 className="modal-title" style={{ color: "white"}}> Update Password </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={close}></button>
                </div>
                <div className="col-md-12">
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                      <input
                          id="welcome-div-username"
                          type="password"
                          style={{ marginLeft: "3.5rem"}}
                          name="current_password"
                          placeholder="Current Password"
                          value={upDateVal.current_password}
                          onChange={handleChange}
                          required
                      />{" "}
                      <input
                          id="welcome-div-username"
                          type="password"
                          name="new_password"
                          placeholder="New Password"
                          value={upDateVal.new_password}
                          onChange={handleChange}
                          required
                      />{" "}
                      <input
                          id="welcome-div-username"
                          type="password"
                          name="new_password_conf"
                          placeholder="Confirm New Password"
                          value={upDateVal.new_password_conf}
                          onChange={handleChange}
                          required
                      />
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
                  </div>

                {infMsg.success ? (
                  <div className="alert alert-success" role="alert">
                    {" "}
                    {infMsg.success}{" "}
                  </div>
                ) : infMsg.err ? (
                  <div className="alert alert-danger" role="alert">
                    {" "}
                    {infMsg.err}{" "}
                  </div>
                ) : (
                  <div></div>
                )}{" "}
              </div>
            </div>{" "}
          </Modal>{" "}
        </div>
      )}
    </div>
  );
}
