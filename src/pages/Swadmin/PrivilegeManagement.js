import React, { useState, useEffect } from "react";
import adminHelper from "../../utils/Admin_Helper";
import Accordion from "react-bootstrap/Accordion";
import Nav from "./Nav";
import Header from "./Header";
const PrivilegeManagement = () => {
  const [input, setInput] = useState({});

  const handleChanges = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adminHelper
      .handleAddPrivilege({ name: input.name, description: input.description })
      .then((res) => {
        console.log(res);
        getPrivileges();
        setInput({ name: "", description: "" });
      });
  };

  const [privilegeList, setPrivilegeList] = useState([]);
  const getPrivileges = () => {
    adminHelper.handleGetPrivileges().then((res) => {
      console.log(res);
      res?.data?.data && setPrivilegeList(res.data.data);
    });
  };
  useEffect(() => {
    getPrivileges();
  }, []);

  return (
    <div id="wrapper">
      <Nav />
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <Header />

          <div className="container-fluid">
            <div className="pagetitle">
              <h1>Privileges Management </h1>
            </div>
            <div className="card text-center mt-3 mt-md-5 mb-3 mb-md-4">
              <div className="card-header">Add New Privilege</div>
              <div className="card-body">
                <form className="row gx-3 gy-2 align-items-center">
                  <div className="col-12  col-sm-4 col-xl-3">
                    <label
                      className="visually-hidden"
                      htmlFor="specificSizeInputName">
                      Privilege Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="specificSizeInputName"
                      placeholder="Privilege Name"
                      onChange={handleChanges}
                      value={input.name}
                      name="name"
                    />
                  </div>
                  <div className="col-12  col-sm-4 col-xl-3">
                    <label
                      className="visually-hidden"
                      htmlFor="specificSizeInputDescription">
                      Privilege Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="specificSizeInputDescription"
                      placeholder="Privilege Description"
                      onChange={handleChanges}
                      value={input.description}
                      name="description"
                    />
                  </div>
                  <div className="col-12 col-sm-auto">
                    <button
                      type="submit"
                      className="btn btn-success col-12 col-sm-auto px-4"
                      onClick={handleSubmit}>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-muted"></div>
            </div>
            <Accordion>
              {privilegeList !== "No privilege has yet been added!" ? (
                privilegeList.map((p, i) => {
                  return (
                    <Accordion.Item eventKey={i} key={p.id}>
                      <Accordion.Header>
                        <div className="row w-100">
                          <p className="col-12 col-sm-6  col-xl-4 ">
                            <strong>Privilege Name: </strong>
                            {p.name}
                          </p>
                          <p className="col-12 col-sm-6  col-xl-4 mb-0">
                            <strong>Privilege Status:</strong>
                            {p.active ? " Active" : " Inactive"}
                          </p>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <strong>Privilege Description:</strong> {p.description}
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })
              ) : (
                <p>No privilege has yet been added!</p>
              )}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivilegeManagement;
