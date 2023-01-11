import React from "react";
import { useContext, useState, useEffect } from "react";
import { useModal } from "react-hooks-use-modal";
import pharmacistHelper from "../../utils/Pharmacist_Helper";

export default function PharmacistTeam(props) {
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
        Team: "",
      });
      const [infMsg, setIfomsg] = useState({});
    
      const [dateFprops, setData] = useState({
        Team: props.data.Team,
      });
      const [btnFlag, setBtn] = useState(false);
      useEffect(() => {
        setData({
            Team: props.data.Team,
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
        pharmacistHelper.handleTeamUpdate(props.data.ID, upDateVal.Team).then((res) => {
          setBtn(false);
          if (res.status === 200 ) {
            console.log(res);
            
            setData({
                Team: upDateVal.Team,
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
              <h5> {dateFprops.Team} </h5>{" "}
              <button className="btn btn-outline-primary float-end" onClick={open}>
                {" "}
                Update Team{" "}
              </button>{" "}
              <Modal>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header" style={{ backgroundColor: "steelblue" }}>
                      <h5 className="modal-title text-light"> Update Team </h5>
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
                      <select className="form-select" size="3" aria-label="size 3 select example" onChange={handleChange} name = "Team">
  <option selected>Select A Team</option>
  <option value="IVIG">IVIG</option>
  <option value="Chronic">Chronic</option>
  <option value="Acute">Acute</option>
</select>
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
                            Update{" "}
                          </button>
                        )}
                        <button className="btn btn-secondary" onClick={close}>
                          Cancel{" "}
                        </button>{" "}
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
