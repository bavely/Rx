import React from "react";
import { useContext, useState, useEffect } from "react";
import { useModal } from "react-hooks-use-modal";
import providerHelper from "../../utils/Provider_Helper";

export default function ProviderPhone2(props) {
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [upDateVal, setUpdate] = useState({
    phone: "",
  });
  const [infMsg, setIfomsg] = useState({});
  const [dateFprops, setData] = useState({
    phone: props.data.phone2,
  });

  const [btnFlag, setBtn] = useState(false);

  useEffect(() => {
    setData({
      phone: props.data.phone2,
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
    setBtn(true);
    providerHelper
      .handleSPhoneUpdate(props.data.ID, upDateVal.phone)
      .then((res) => {
        setBtn(false);

        if (res.status === 200 ) {
          
          console.log(res);
          setData({
            phone: upDateVal.phone,
          });
          setIfomsg({ success: res.data.message });
        } else {
          setIfomsg({ err: res.data.message });
        }
      });
  };

  return (
    <div>
      {props.data.ID === undefined ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>
          <h5> {dateFprops.phone} </h5>{" "}
          <button className="btn btn-outline-primary float-end" onClick={open}>
            {" "}
            Update Secondary Phone Number{" "}
          </button>{" "}
          <Modal>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: "steelblue"}}>
                  <h5 className="modal-title text-light"> Update Phone Number </h5>{" "}
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
                    <input
                      id="welcome-div-username"
                      style={{ marginLeft: "1.5rem"}}
                      type="tel"
                      name="phone"
                      placeholder="Phone Number 2"
                      value={upDateVal.phone}
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
                        className="btn btn-primary index-login-button"
                        style={{ position: "inherit" }}
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
              </div>{" "}
            </div>{" "}
          </Modal>{" "}
        </div>
      )}
    </div>
  );
}
