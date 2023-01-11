import React from "react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
// import providerHelper from "../../utils/Provider_Helper";
import Logedout from "../../Components/Logout/Logedout";
import Nav from "./Nav";
import Header from "./Header";
import { AgGridReact } from "ag-grid-react";
import adminHelper from "../../utils/Admin_Helper";
import { useModal } from "react-hooks-use-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function RolesManagement() {
  const logedin = sessionStorage.getItem("logedin");
  const pharmacy_id = sessionStorage.getItem("pharmacy");
  const [roles, setRoles] = useState([]);
  const [msg, setMsg] = useState("");

  const getRoles = () => {
    adminHelper.handleGetRoles(pharmacy_id).then((res) => {
      if (res.status === 200) {
        let roles = res.data.data.map((role) => {
          role.Privileges = "Add / Edit / Delete";
          return role;
        });
        setRoles(roles);
      } else {
        setMsg(res.response.data.message);
      }
    });
  };

  useEffect(() => {
    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line no-unused-vars
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "name",
      headerName: "Role Name",
      filter: "agSetColumnFilter",
      sortable: true,
      resizable: true,
      cellEditor: "agTextCellEditor",
    },
    {
      field: "Privileges",
      filter: "agSetColumnFilter",
      sortable: true,
      resizable: true,
      cellEditor: "agTextCellEditor",
      cellStyle: {
        color: "white",
        border: "2px solid rgb(70,130,180)",
        borderRadius: "5px",
        backgroundColor: "rgb(70,130,180)",
        width: "160px",
      },
    },
  ]);
  const gridRef = useRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);

    gridRef.current.api.setQuickFilter(e.target.value);
  };

  const [privileges, setPrivileges] = useState([]);
  const [modmsg, setModMsg] = useState("");
  const [currentrole, setcurrentRole] = useState({});
  const cellClickedListener = useCallback((event) => {
    setcurrentRole(event.data);
    getRolePrivileges(event.data);
    open();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getRolePrivileges = (role) => {
    adminHelper.handleGetPrivOfRole(role.ID).then((res) => {
      if (res.status === 200) {
        setPrivileges(res.data.data);
      } else {
        setModMsg(res.response.data.message);
      }
    });
  };
  const [Modal, open, close] = useModal("root", {
    preventScroll: true,
    focusTrapOptions: {
      clickOutsideDeactivates: false,
    },
  });

  const [allprivileges, setAllPrivileges] = useState([]);
  useEffect(() => {
    adminHelper.handleGetAllPrivileges(pharmacy_id).then((res) => {
      if (res.status === 200) {
        setAllPrivileges(res.data.data);
      } else {
        setModMsg(res.response.data.message);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedprivileges, setSelectedPrivileges] = useState("");

  const handlePriv = (e) => {
    setSelectedPrivileges(e.target.value);
  };

  const handlePrivSubmit = (e) => {
    e.preventDefault();
    adminHelper
      .handleUpdateRolePrivileges({
        roleID: currentrole.ID,
        privID: selectedprivileges,
      })
      .then((res) => {
        if (res.status === 200) {
          setModMsg(res.data.messege);
          getRolePrivileges(currentrole);
        } else {
          setModMsg(res.response.data.messege);
        }
      });
  };

  const [roleInp, setRoleInput] = useState("");

  const handleRoleChange = (e) => {
    setRoleInput(e.target.value);
  };

  const handleRoleAdd = (e) => {
    e.preventDefault();
    adminHelper
      .handleAddRole({
        name: roleInp,
        pharmacyID: pharmacy_id,
      })
      .then((res) => {
        if (res.status === 200) {
          res?.data?.data?.messege && setMsg(res.data.data.messege);
          setRoleInput("");
          getRoles();
        } else {
          res?.response?.data?.data?.messege &&
            setMsg(res.response.data.data.messege);
        }
      });
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
                  <h1>Roles Management</h1>
                </div>
                {msg === "" ? (
                  <></>
                ) : (
                  <div className="alert alert-primary p-3" role="alert">
                    {msg}
                  </div>
                )}

                <div class="card mt-5 mb-5">
                  <h5 class="card-header">Add New Role</h5>
                  <div class="card-body">
                    <form class="row gy-2 gx-3 align-items-center">
                      <div class="col-auto">
                        <label class="visually-hidden" for="autoSizingInput">
                          Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="autoSizingInput"
                          placeholder="Role Name"
                          value={roleInp}
                          onChange={handleRoleChange}
                        />
                      </div>
                      <div class="col-auto">
                        <button
                          type="submit"
                          class="btn btn-success"
                          onClick={handleRoleAdd}>
                          Add New Role
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {/* <ul class="list-group">
  <li class="list-group-item active" aria-current="true">Roles List</li>
    {roles.map((role) => {return <li class="list-group-item">{role.name}</li>
    })}
  

</ul> */}
                <div className="col-12 col-md-6 col-lg-4 mt-5">
                  <div class="input-group flex-nowrap">
                    <input
                      type="text"
                      class="form-control "
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="addon-wrapping"
                      onChange={handleSearch}
                      value={search}
                    />
                    <span class="input-group-text" id="addon-wrapping">
                      <FontAwesomeIcon icon={faMagnifyingGlass} size={"1x"} />
                    </span>
                  </div>
                </div>
                <div
                  className="ag-theme-alpine mt-3"
                  style={{ height: 400, width: "auto" }}>
                  <AgGridReact
                    rowData={roles}
                    columnDefs={columnDefs}
                    onCellClicked={cellClickedListener}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    ref={gridRef}></AgGridReact>
                  <Modal>
                    <div class="card m-5" id="roles-modal">
                      <div class="card-header">{currentrole.name}</div>
                      <div class="card-body">
                        {modmsg === "" ? (
                          <></>
                        ) : (
                          <div class="alert alert-primary p-3" role="alert">
                            {modmsg}
                          </div>
                        )}
                        <ul className="list-group mb-5">
                          {privileges.map((priv) => {
                            return (
                              <li className="list-group-item">{priv.name}</li>
                            );
                          })}
                        </ul>
                        <form class="row gx-3 gy-2 align-items-center">
                          <div class="col-sm-3">
                            <label
                              class="visually-hidden"
                              for="specificSizeSelect">
                              Preference
                            </label>
                            <select
                              class="form-select mb-5"
                              id="specificSizeSelect"
                              onChange={handlePriv}
                              name={selectedprivileges}>
                              <option selected>Select Privilage...</option>
                              {allprivileges.map((priv) => {
                                return (
                                  <option value={priv.ID}>{priv.name}</option>
                                );
                              })}
                            </select>
                          </div>

                          <div class="col-auto">
                            <button
                              type="submit"
                              class="btn btn-success mt-5"
                              onClick={handlePrivSubmit}>
                              Add Privilage
                            </button>
                          </div>
                        </form>
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            close();
                            setcurrentRole({});
                            setPrivileges([]);
                          }}>
                          CLOSE
                        </button>
                      </div>
                    </div>
                  </Modal>
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
