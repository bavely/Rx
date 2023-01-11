import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import Nav from "./Nav";
import Header from "./Header";
import { randomPassword } from "secure-random-password";
import adminHelper from "../../utils/Admin_Helper";
import { useModal } from "react-hooks-use-modal";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const PharmaciesManagement = () => {
  const [Modal, open, close] = useModal("root", {
    preventScroll: false,
    focusTrapOptions: {
      clickOutsideDeactivates: false,
    },
    styles: {
      modal: {
        Hight: "50%",
      },
    },
  });

  const [pharmaList, setPharmaList] = useState([]);
  const [pharmaName, setPharmaName] = useState("");
  const [adminsList, setAdminsList] = useState([]);
  const [privilegesList, setPrivilegesList] = useState([]);
  const [thispharma, setThisPharma] = useState({});
  const [adminInfo, setAdminInfo] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
  });
  const [msg, setMsg] = useState("");
  const handleChanges = (e) => {
    setPharmaName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const BIN = randomPassword({ length: 4 });
    adminHelper
      .handleAddPharmacy({ name: pharmaName, BIN: BIN })
      .then((res) => {
        handlePharmacyInfo();
        setPharmaName("");
      });
  };
  useEffect(() => {
    handlePharmacyInfo();
  }, []);
  const handlePharmacyInfo = () => {
    adminHelper.handleGetPharmacies().then((res) => {
      let newData = res.data.data.map((pharma) => {
        pharma.active = pharma.active === 1 ? "Active" : "Inactive";
        pharma.pharmacy_Info = "Edit";
        return pharma;
      });
      setPharmaList(newData);
    });
  };

  const currentPharma = (pharma) => {
    setThisPharma(pharma);
    adminHelper.handleGetAdmins(pharma.id).then((res) => {
      setAdminsList(res.data.data);
    });
    adminHelper.getPharmaPrivileges(pharma.id).then((res) => {
      res?.data?.data && setPrivilegesList(res.data.data);
    });
  };

  const handleAdminChanges = (e) => {
    setAdminInfo({ ...adminInfo, [e.target.name]: e.target.value });
  };
  const handleAdminSubmit = (e) => {
    e.preventDefault();
    adminHelper
      .handleAddAdmin({ ...adminInfo, pharmacyID: thispharma.id })
      .then((res) => {
        if (res.status === 200) {
          setMsg(res.data.message);
        } else {
          setMsg(res.response.data.message);
        }
        currentPharma(thispharma);
      });
  };
  const [selectedprivileges, setSelectedPrivileges] = useState("");

  const handlePriv = (e) => {
    setSelectedPrivileges(e.target.value);
  };

  const handlePrivSubmit = (e) => {
    e.preventDefault();
    adminHelper
      .handleUpdatePharmaPrivileges({
        PharmacyID: thispharma.id,
        PrivilegeID: selectedprivileges,
      })
      .then((res) => {
        if (res.status === 200) {
          setMsg(res.data.message);
          currentPharma(thispharma);
        } else {
          setMsg(res.response.data.message);
        }
      });
  };

  const [allprivileges, setAllPrivileges] = useState([]);

  useEffect(() => {
    adminHelper.handleGetPrivileges().then((res) => {
      setAllPrivileges(res.data.data);
    });
  }, []);
  const gridRef = useRef();
  const [input, setInput] = useState();
  const handleSearch = (e) => {
    setInput(e.target.value);
    gridRef.current.api.setQuickFilter(e.target.value);
  };

  // eslint-disable-next-line no-unused-vars
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "id",
      filter: "agSetColumnFilter",
      sortable: true,
      minWidth: 70,
      maxWidth: 70,
    },
    { field: "name", filter: "agSetColumnFilter", minWidth: 250 },
    { field: "BIN", filter: "agSetColumnFilter", minWidth: 150 },
    {
      field: "active",
      filter: "agSetColumnFilter",
      minWidth: 150,
    },
    {
      field: "pharmacy_Info",
      filter: "agSetColumnFilter",
      cellStyle: {
        color: "white",
        border: "2px solid rgb(70,130,180)",
        borderRadius: "0.4em",
        backgroundColor: "rgb(70,130,180)",
      },
      cellClass: "edit-btn-Sadmin btn-success",
      minWidth: 150,
      maxWidth: 160,
    },
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultColDef = useMemo(() => ({
    sortable: true,
    flex: 1,
    resizable: true,
  }));

  const cellClickedListener = useCallback((event) => {
    currentPharma(event.data);
    open();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="wrapper">
      <Nav />
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <Header />

          <div className="container-fluid">
            <div className="pagetitle">
              <h1>Pharmacies Management </h1>
            </div>

            <div className="card text-center mb-5 mt-5">
              <div className="card-header">Add New Pharmacy</div>
              <div className="card-body">
                <form className="row gx-3 gy-2 align-items-center">
                  <div className="col-12 col-sm-5 col-xl-3">
                    <label
                      className="visually-hidden"
                      htmlFor="specificSizeInputName">
                      Pharmacy Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="specificSizeInputName"
                      placeholder="Pharmacy Name"
                      onChange={handleChanges}
                      value={pharmaName}
                    />
                  </div>
                  <div className="col-12 col-sm-auto">
                    <button
                      type="submit"
                      className="btn btn-success mt-2 mt-sm-0 px-5 col-12"
                      onClick={handleSubmit}>
                      Add
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-footer text-muted"></div>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faMagnifyingGlass} size={"1x"} />
              </span>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInputGroup1"
                  placeholder="Search"
                  value={input}
                  onChange={handleSearch}
                />
                <label htmlFor="floatingInputGroup1">Search</label>
              </div>
            </div>
            <div
              className="ag-theme-alpine mt-5"
              style={{ height: 400, width: "auto" }}>
              <AgGridReact
                rowData={pharmaList}
                columnDefs={columnDefs}
                onCellClicked={cellClickedListener}
                defaultColDef={defaultColDef}
                animateRows={true}
                ref={gridRef}></AgGridReact>
            </div>

            <div className="m-5">
              <Modal>
                {pharmaList.length > 0 ? (
                  <div className="container" id="superAdminModal">
                    <div className="row">
                      <div className="card ">
                        <h5 className="card-header">
                          {thispharma.name} Pharmacy Details
                        </h5>
                        <div className="card-body container">
                          {msg === "" ? (
                            <></>
                          ) : (
                            <div
                              className="alert alert-primary p-3"
                              role="alert">
                              {msg}
                            </div>
                          )}
                          <div className="card-text row">
                            <div className="col-12 col-md-6">
                              <div className="card  mb-5">
                                <div className="card-header">
                                  Pharmacy Admins Assigned
                                </div>
                                <div className="card-body">
                                  <blockquote className="blockquote mb-0">
                                    <ul className="list-group list-group-flush">
                                      {adminsList.length > 0
                                        ? adminsList.map((admin) => {
                                            return (
                                              <li className="list-group-item mb-3">
                                                {admin.email}
                                              </li>
                                            );
                                          })
                                        : ""}
                                      <form className="row gx-3 gy-2 align-items-center">
                                        <div className="col-12 col-sm-6 col-xl-3">
                                          <label
                                            className="visually-hidden"
                                            htmlFor="specificSizeInputName">
                                            First Name
                                          </label>
                                          <input
                                            type="text"
                                            onChange={handleAdminChanges}
                                            className="form-control"
                                            id="specificSizeInputName"
                                            placeholder="First Name"
                                            name="first"
                                            value={adminInfo.first}
                                          />
                                        </div>
                                        <div className="col-12 col-sm-6 col-xl-3">
                                          <label
                                            className="visually-hidden"
                                            htmlFor="specificSizeInputName2">
                                            Last Name
                                          </label>
                                          <input
                                            type="text"
                                            onChange={handleAdminChanges}
                                            className="form-control"
                                            id="specificSizeInputName2"
                                            placeholder="Last Name"
                                            name="last"
                                            value={adminInfo.last}
                                          />
                                        </div>
                                        <div className="col-12 col-sm-6 col-xl-3">
                                          <label
                                            className="visually-hidden"
                                            htmlFor="specificSizeInputName3">
                                            Email
                                          </label>
                                          <input
                                            type="text"
                                            onChange={handleAdminChanges}
                                            className="form-control"
                                            id="specificSizeInputName3"
                                            placeholder="Email"
                                            name="email"
                                            value={adminInfo.email}
                                          />
                                        </div>
                                        <div className="col-12 col-sm-6 col-xl-3">
                                          <label
                                            className="visually-hidden"
                                            htmlFor="specificSizeInputName4">
                                            Phone Number
                                          </label>
                                          <input
                                            type="text"
                                            onChange={handleAdminChanges}
                                            className="form-control"
                                            id="specificSizeInputName4"
                                            placeholder="Phone Number"
                                            name="phone"
                                            value={adminInfo.phone}
                                          />
                                        </div>
                                        <div className="col-auto">
                                          <button
                                            type="submit"
                                            onClick={handleAdminSubmit}
                                            className="btn btn-success">
                                            Add New Admin
                                          </button>
                                        </div>
                                      </form>
                                    </ul>
                                  </blockquote>
                                </div>
                              </div>
                            </div>
                            {/*  */}
                            <div className="col-12 col-md-6">
                              <div className="card">
                                <div className="card-header">
                                  Privileges Assigned
                                </div>
                                <div className="card-body">
                                  <blockquote className="blockquote mb-0">
                                    <ul className="list-group list-group-flush">
                                      {privilegesList.length > 0
                                        ? privilegesList.map((priv) => {
                                            return (
                                              <li className="list-group-item">
                                                {priv.name}
                                              </li>
                                            );
                                          })
                                        : ""}
                                    </ul>
                                  </blockquote>
                                  <form className="row gx-3 gy-2 align-items-center">
                                    <div className="col-auto">
                                      <label
                                        className="visually-hidden"
                                        htmlFor="specificSizeSelect">
                                        Preference
                                      </label>
                                      <select
                                        className="form-select"
                                        id="specificSizeSelect"
                                        onChange={handlePriv}>
                                        <option selected>
                                          Select Privilage...
                                        </option>
                                        {allprivileges !==
                                        "No privilege has yet been added!" ? (
                                          allprivileges.map((priv, idx) => {
                                            return (
                                              <option value={priv.ID} key={idx}>
                                                {priv.name}
                                              </option>
                                            );
                                          })
                                        ) : (
                                          <option value="No privilege has yet been added!">
                                            No privilege has yet been added!
                                          </option>
                                        )}
                                      </select>
                                    </div>

                                    <div className="col-auto">
                                      <button
                                        type="submit"
                                        className="btn btn-success "
                                        onClick={handlePrivSubmit}>
                                        Add Privilage
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary m-2"
                              data-bs-dismiss="modal"
                              onClick={() => {
                                close();
                                setMsg("");
                                setAdminInfo({
                                  first: "",
                                  last: "",
                                  email: "",
                                  phone: "",
                                });
                                setThisPharma({});
                                setPrivilegesList([]);
                                setAdminsList([]);
                              }}>
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmaciesManagement;
