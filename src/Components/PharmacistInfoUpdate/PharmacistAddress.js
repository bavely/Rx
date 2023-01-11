import React from "react";
import { useState, useEffect } from "react";
import { useModal } from "react-hooks-use-modal";
import pharmacistHelper from "../../utils/Pharmacist_Helper";

export default function PharmacistAddress(props) {
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [upDateVal, setUpdate] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [dateFprops, setData] = useState({
    address: props.data.address,
    city: props.data.city,
    state: props.data.state,
    zip: props.data.zip,
  });
  const [btnFlag, setBtn] = useState(false);

  useEffect(() => {
    setData({
      address: props.data.address,
      city: props.data.city,
      state: props.data.state,
      zip: props.data.zip,
    });
  }, [props]);
  console.log(dateFprops);

  const [infMsg, setIfomsg] = useState({});

  const handleChange = (event) => {
    setUpdate({
      ...upDateVal,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    setBtn(true);
    event.preventDefault();
    console.log(upDateVal.zip_code);
    pharmacistHelper
      .handleAddressUpdate(
        upDateVal.address,
        upDateVal.city,
        upDateVal.state,
        upDateVal.zip_code,
        props.data.ID
      )
      .then((res) => {
        setBtn(false);
        console.log(res);

        if (res.status === 200 ) {
          setData({
            address: upDateVal.address,
            city: upDateVal.city,
            state: upDateVal.state,
            zip: upDateVal.zip_code,
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
          <h5>
            {" "}
            {dateFprops.address}, {dateFprops.city}, {dateFprops.state}{" "}
            {dateFprops.zip}{" "}
          </h5>{" "}
          <button className="btn btn-outline-primary float-end" onClick={open}>
            {" "}
            Update Address{" "}
          </button>{" "}
          <Modal>
            <div className="modal-dialog p-5">
              <div className="modal-content">
                <div className="modal-header" style={{  backgroundColor: "steelblue"}}>
                  <h5 className="modal-title" style={{ color: "white"}}> Update Address </h5>{" "}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={close}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="col-md-12">
                    <div className="modal-body">
                      <input
                          id="welcome-div-username"
                          type="text"
                          className="form-control"
                          name="address"
                          placeholder="Street Address"
                          value={upDateVal.address}
                          onChange={handleChange}
                          required
                      />{" "}
                      <input
                          id="welcome-div-username"
                          type="text"
                          name="city"
                          placeholder="City"
                          value={upDateVal.city}
                          onChange={handleChange}
                          required
                      />{" "}
                      <input
                          id="welcome-div-username"
                          type="text"
                          name="state"
                          placeholder="State"
                          value={upDateVal.state}
                          onChange={handleChange}
                          required
                      />{" "}
                      <input
                          id="welcome-div-username"
                          type="text"
                          name="zip_code"
                          placeholder="Zip Code"
                          value={upDateVal.zip_code}
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
                  </div>


                </form>{" "}
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
                  <div> </div>
                )}{" "}
              </div>
            </div>{" "}
          </Modal>{" "}
        </div>
      )}
    </div>
  );
}
