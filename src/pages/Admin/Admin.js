import React from "react";
import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { event } from "jquery";
import { randomPassword } from "secure-random-password";
import { AgGridReact } from "ag-grid-react";
import Nav from "./Nav";
import Header from "./Header";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import helper from "../../utils/helper";

function Admin() {
  const gridRef = useRef();
  const pharmacy_id = sessionStorage.getItem("pharmacy");
  const [btnFlag, setBtn] = useState(false);
  const [inp, setInp] = useState({});
  const [storingflag, setStoringflag] = useState(false);
  const [usermsg, setUsermsg] = useState("");
  const [rcolumnDefs] = useState([
    { field: "code", minWidth: 100, maxWidth: 120 },
    { field: "userType", minWidth: 200 },
  ]);
  const [rowData, setRowData] = useState([]);

  const handleChange = (event) => {
    event.preventDefault();

    setInp({
      ...inp,
      [event.target.name]: parseInt(event.target.value.trim()),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    helper
      .handleStoringCodes({
        userType: inp.role === 1 ? "provider" : "pharmacist",
        number: inp.Number,
        pharmacyID: pharmacy_id,
      })
      .then((res) => {
        if (res.data.messages === "Code generated!") {
          setUsermsg(res.data.messages);

          setStoringflag(true);
          handleGetCodes();
        }
      });
  };

  const handleGetCodes = () => {
    helper
      .handleGetCodes(pharmacy_id)
      .then((res) => {
        setRowData(res.data.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setStoringflag(storingflag);
    return () => {
      setStoringflag(storingflag);
    };
  }, [storingflag]);

  useEffect(() => {
    handleGetCodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBtnExportOld = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  return (
    <div id="wrapper">
      <Nav />
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <Header />
          <div className="container-fluid" style={{ minHeight: "85vh" }}>
            <div className="pagetitle">
              <h1>Generate Codes</h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className="row gy-2 gx-3 mb-1 p-1 align-items-center">
              <div className="col-12 col-sm-4">
                <label className="visually-hidden" for="autoSizingInput">
                  Count
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="Number"
                  placeholder="How Many Codes?"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 col-sm-auto">
                <label className="visually-hidden" for="autoSizingInput">
                  Length
                </label>
              </div>
              <div className="col-auto mb-2 mb-sm-0">
                <label className="visually-hidden" htmlFor="autoSizingSelect">
                  Preference
                </label>
                <select
                  aria-label="Default select example"
                  className="form-select"
                  onChange={handleChange}
                  name="role"
                  required>
                  <option>Select a role</option>
                  <option value="1">Provider</option>
                  <option value="2">Pharmacist</option>
                  {/* <option value="3">Patient</option> */}
                </select>
              </div>
              <div className="col-auto  mt-1">
                {btnFlag ? (
                  <button className="btn btn-success" type="button" disabled>
                    <span
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"></span>
                    Loading...
                  </button>
                ) : (
                  <button className="btn btn-success" type="submit">
                    Generate
                  </button>
                )}
              </div>
            </form>
            {usermsg}
            <div className="row" style={{ marginTop: "50px" }}>
              <div
                className="ag-theme-alpine"
                style={{
                  height: 300,
                  maxWidth: "100%",
                }}>
                <AgGridReact
                  suppressExcelExport={true}
                  ref={gridRef}
                  rowData={rowData}
                  columnDefs={rcolumnDefs}
                />
                <button
                  type="button"
                  className="btn btn-success my-3"
                  onClick={onBtnExportOld}>
                  Export The Generated Codes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
