import React from "react";
import { useState, useEffect } from "react";
// import providerHelper from "../../utils/Provider_Helper";
import Logedout from "../../Components/Logout/Logedout";
import Nav from "./Nav";
import Header from "./Header";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";

export default function AdminDashbard() {
  const logedin = sessionStorage.getItem("logedin");

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
                  <h1>Admin Dashboard </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Logedout />
      )}
    </div>)
}
