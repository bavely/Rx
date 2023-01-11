import React, { useState, useEffect, useMemo, useRef } from "react";
import Logedout from "../../Components/Logout/Logedout";
import Nav from "./Nav";
import Header from "./Header";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";
import adminHelper from "../../utils/Admin_Helper";
import "../../css/bootstrap.min1.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function AddUser() {
  const logedin = sessionStorage.getItem("logedin");
  const pharmacy_id = sessionStorage.getItem("pharmacy");
  const [UserInfo, setUserInfo] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
  });

  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState([]);

  const handleUserChanges = (e) => {
    setUserInfo({ ...UserInfo, [e.target.name]: e.target.value });
  };
  const handleUserSubmit = (e) => {
    e.preventDefault();
    adminHelper
      .handleAddUser({ ...UserInfo, pharmacyID: pharmacy_id })
      .then((res) => {
        if (res.status === 200) {
          setMsg(res.data.message);
          getUsers();
        } else {
          setMsg(res.response.data.message);
        }
      });
  };

  const getUsers = () => {
    adminHelper.handleGetUsers(pharmacy_id).then((res) => {
      if (res.status === 200) {
        let usersDta = res.data.data.map((user) => {
          return adminHelper.getUserRole(user.id).then((res) => {
            if (res.status === 200) {
              user.Role = res.data.data[0].name;
              user.Status = user.active ? "Active" : "Inactive";
              return user;
            } else {
              user.Role = res.response.data.message;
              user.Status = user.active ? "Active" : "Inactive";
              return user;
            }
          });
        });
        Promise.all(usersDta).then((res) => {
          setUsers(res);
        });
      } else {
        setMsg(res.response.data.message);
      }
    });
  };
  const [pharmacyRoles, setPharmacyRoles] = useState([]);
  const [rolesArr, setRolesArr] = useState([]);

  useEffect(() => {
    getUsers();

    adminHelper.handleGetRoles(pharmacy_id).then((res) => {
      if (res.status === 200) {
        setRolesArr(res.data.data);
        let roles = res.data.data.map((role) => {
          return role.name;
        });
        setPharmacyRoles(roles);
      } else {
        res?.response?.data?.message && setMsg(res.response.data.message);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gridRef = useRef();

  const cellRander = (params) => {
    return (
      <span
        style={{
          paddingLeft: "5px",
        }}>
        {params.value}
      </span>
    );
  };
  const handleRoleUpdate = (currentRow) => {
    if (currentRow) {
      // eslint-disable-next-line array-callback-return
      rolesArr.some((role) => {
        if (role.name === currentRow.newValue) {
          if (currentRow.oldValue === "No role added!") {
            adminHelper
              .handleAddUserRole({
                userID: currentRow.data.id,
                roleID: role.ID,
              })
              .then((res) => {
                if (res.status === 200) {
                  setMsg(res.data.messege);
                  getUsers();
                } else {
                  setMsg(res.response.data.messege);
                }
              });
            return true;
          }
          adminHelper
            .handleUpdateUserRole({
              userID: currentRow.data.id,
              roleID: role.ID,
            })
            .then((res) => {
              if (res.status === 200) {
                setMsg(res.data.message);
                getUsers();
              } else {
                setMsg(res.response.data.message);
              }
            });
          return true;
        }
      });
    }
  };

  // useEffect(() => {

  // }, [currentRow, rolesArr]);

  const [columnDefs, setColumnDefs] = useState([
    { field: "id", filter: "agSetColumnFilter", sortable: true },
    { field: "first", filter: "agSetColumnFilter" },
    { field: "last", filter: "agSetColumnFilter" },
    { field: "email", filter: "agSetColumnFilter" },
    { field: "phone", filter: "agSetColumnFilter" },
    { field: "Status", filter: "agSetColumnFilter" },
    {
      field: "Role",
      filter: "agSetColumnFilter",
      cellRenderer: cellRander,
      cellEditor: "agRichSelectCellEditor",
      cellEditorPopup: true,
      cellEditorParams: {
        values: pharmacyRoles,
        cellRenderer: cellRander,
      },
      editable: true,
      onCellValueChanged: (params) => {
        handleRoleUpdate(params);
      },
    },
  ]);

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
      { field: "Status", filter: "agSetColumnFilter", minWidth: 100 },
      {
        field: "Role",
        filter: "agSetColumnFilter",
        cellRenderer: cellRander,
        cellEditor: "agRichSelectCellEditor",
        cellEditorPopup: true,
        cellEditorParams: {
          values: pharmacyRoles,
          cellRenderer: cellRander,
        },
        searchDebounceDelay: 500,
        editable: true,
        onCellValueChanged: (params) => {
          handleRoleUpdate(params);
        },
        minWidth: 200,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pharmacyRoles]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultColDef = useMemo(() => ({
    sortable: true,
    flex: 1,
    resizable: true,
  }));

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);

    gridRef.current.api.setQuickFilter(e.target.value);
  };

  return (
    <div>
      {logedin === "true" ? (
        <div id="wrapper">
          <Nav />
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <Header />

              <div className="container-fluid">
                <div className="pagetitle">
                  <h1>Add New User </h1>
                </div>
                {msg === "" ? (
                  <></>
                ) : (
                  <div className="alert alert-primary p-3" role="alert">
                    {msg}
                  </div>
                )}
                <form className="row gx-3 gy-2 align-items-center">
                  <div className="col-sm-3">
                    <label
                      className="visually-hidden"
                      htmlFor="specificSizeInputName">
                      First Name
                    </label>
                    <input
                      type="text"
                      onChange={handleUserChanges}
                      className="form-control"
                      id="specificSizeInputName"
                      placeholder="First Name"
                      name="first"
                      value={UserInfo.first}
                    />
                  </div>
                  <div className="col-sm-3">
                    <label
                      className="visually-hidden"
                      htmlFor="specificSizeInputName2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      onChange={handleUserChanges}
                      className="form-control"
                      id="specificSizeInputName2"
                      placeholder="Last Name"
                      name="last"
                      value={UserInfo.last}
                    />
                  </div>
                  <div className="col-sm-3">
                    <label
                      className="visually-hidden"
                      htmlFor="specificSizeInputName3">
                      Email
                    </label>
                    <input
                      type="text"
                      onChange={handleUserChanges}
                      className="form-control"
                      id="specificSizeInputName3"
                      placeholder="Email"
                      name="email"
                      value={UserInfo.email}
                    />
                  </div>
                  <div className="col-sm-3">
                    <label
                      className="visually-hidden"
                      htmlFor="specificSizeInputName4">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      onChange={handleUserChanges}
                      className="form-control"
                      id="specificSizeInputName4"
                      placeholder="Phone Number"
                      name="phone"
                      value={UserInfo.phone}
                    />
                  </div>
                  <div className="col">
                    <button
                      type="submit"
                      onClick={handleUserSubmit}
                      className="btn btn-success col-12 col-sm-auto mt-3">
                      Add New User
                    </button>
                  </div>
                </form>
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
                    // onCellClicked={cellClickedListener}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    ref={gridRef}></AgGridReact>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Logedout />
      )}
    </div>
  );
}
