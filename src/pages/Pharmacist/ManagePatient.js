import React, { useState, useEffect, useMemo, useRef } from "react";
import pharmacistHelper from "../../utils/Pharmacist_Helper";
import Logedout from "../../Components/Logout/Logedout";
import PatientDetails from "./PatientDetails";
import Nav from "./Nav";
import Header from "./Header";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function ManagePatients() {
  const logedin = sessionStorage.getItem("logedin");
  const pharmacy_id = sessionStorage.getItem("pharmacy");

  // eslint-disable-next-line no-unused-vars
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState([]);
  const [details, setDetails] = useState(false);
  const [curUserInfo, setCurUserInfo] = useState({});
  const [columnDefs, setColumnDefs] = useState([]);
  const [search, setSearch] = useState("");

  function timeConvert(time) {
    let dateFormat = new Date(time);
    let date =
      dateFormat.getMonth() +
      1 +
      "/" +
      dateFormat.getDate() +
      "/" +
      dateFormat.getFullYear();

    let hours = `${
      dateFormat.getHours() > 12
        ? dateFormat.getHours() - 12
        : dateFormat.getHours() === 0
        ? 12
        : dateFormat.getHours()
    }:${
      dateFormat.getMinutes() < 10
        ? "0" + dateFormat.getMinutes()
        : dateFormat.getMinutes()
    } ${dateFormat.getHours() > 12 ? " pm" : " am"}`;

    return `${date} ${hours}`;
  }

  useEffect(() => {
    pharmacistHelper.getPatients(pharmacy_id).then((res) => {
      let usersSorted = res.data.data.map((el) => {
        return {
          ...el.user,
          createdAt: timeConvert(el.user.createdAt),
          address: el.address,
          ContactInfo: el.contacts.length
            ? el.contacts
            : [{ id: "", emName: "", emRelation: "", altPhone: "" }],
        };
      });
      setUsers(usersSorted);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  const gridRef = useRef();

  useEffect(() => {
    setColumnDefs([
      {
        field: "id",
        filter: "agSetColumnFilter",
        sortable: true,
        minWidth: 70,
      },
      { field: "first", filter: "agSetColumnFilter", minWidth: 100 },
      { field: "last", filter: "agSetColumnFilter", minWidth: 100 },
      { field: "email", filter: "agSetColumnFilter", minWidth: 250 },
      { field: "phone", filter: "agSetColumnFilter", minWidth: 150 },
      { field: "createdAt", filter: "agSetColumnFilter", minWidth: 200 },
      { field: "active", filter: "agSetColumnFilter", minWidth: 100 },
    ]);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultColDef = useMemo(() => ({
    sortable: true,
    flex: 1,
    resizable: true,
  }));
  const handleSearch = (e) => {
    setSearch(e.target.value);
    gridRef.current.api.setQuickFilter(e.target.value);
  };

  const cellClickedListener = (event) => {
    setDetails(true);
    console.log(event.data);
    setCurUserInfo(event.data);
  };

  return (
    <div>
      {logedin === "true" ? (
        <div id="wrapper">
          <Nav />
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <Header />
              {!details ? (
                <div className="container-fluid">
                  <div className="pagetitle">
                    <h1>Manage Patients</h1>
                  </div>
                  {msg === "" ? (
                    <></>
                  ) : (
                    <div className="alert alert-primary p-3" role="alert">
                      {msg}
                    </div>
                  )}
                  <div className="col-12 col-md-6 col-lg-4 mt-5 mb-1">
                    <div className="input-group flex-nowrap  ">
                      <input
                        type="text"
                        className="form-control "
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="addon-wrapping"
                        onChange={handleSearch}
                        value={search}
                      />
                      <span className="input-group-text" id="addon-wrapping">
                        <FontAwesomeIcon icon={faMagnifyingGlass} size={"1x"} />
                      </span>
                    </div>
                  </div>
                  <div
                    className="ag-theme-alpine mt-2"
                    style={{ height: 400, width: "auto" }}>
                    <AgGridReact
                      rowData={users}
                      columnDefs={columnDefs}
                      onCellClicked={cellClickedListener}
                      defaultColDef={defaultColDef}
                      animateRows={true}
                      ref={gridRef}></AgGridReact>
                  </div>
                </div>
              ) : (
                <PatientDetails
                  curUserInfo={curUserInfo}
                  setDetails={setDetails}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <Logedout />
      )}
    </div>
  );
}
