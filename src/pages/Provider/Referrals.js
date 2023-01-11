// import React from "react";
// import { useState, useEffect } from "react";
// import providerHelper from "../../utils/Provider_Helper";
// import Logedout from "../../Components/Logout/Logedout";
// import Nav from "./Nav";
// import Header from "./Header";
// import { AgGridColumn, AgGridReact } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
// import "ag-grid-enterprise";
// import Chart from "react-apexcharts";
// import Cards from "./Cards";

// function Referrals() {
//   const TotalValueRenderer = (x) => {
//     const cellValue = x.valueFormatted ? x.valueFormatted : x.value;
//     const buttonClicked = () => {
//       const scoreArr = Object.entries(x.data);
//       const filteredArr = scoreArr.filter(function ([key, value]) {
//         return value !== "";
//       });
//       handleDetails(Object.fromEntries(filteredArr));
//     };

//     return (
//       <span>
//         <button
//           type="button"
//           className="btn btn-link"
//           onClick={() => buttonClicked()}
//         >
//           Details
//         </button>
//       </span>
//     );
//   };
//   const logedin = sessionStorage.getItem("logedin");

//   const [referrals, setReferrals] = useState([]);
//   const [refDetails, setRefDetails] = useState({ flag: false, Data: "" });
//   const [meds, setMeds] = useState([]);
//   const [files, setFiles] = useState({});
//   useEffect(async () => {
//     await providerHelper
//       .getAllReferrals(sessionStorage.getItem("user"))
//       .then((res) => {
//         setReferrals(
//           res.data.Result.map((each) => {
//             each.Updated_at = handleCraetedat(each.Updated_at);
//             return each;
//           })
//         );
//       });
//   }, []);

//   useEffect(async () => {
//     await providerHelper.getMeds().then((res) => {
//       const filtered = res.filter((x) => x.Referral_ID === refDetails.Data.ID);
//       setMeds(filtered);
//     });
//     await providerHelper.getRefFiles(refDetails.Data.ID).then((res) => {
//       if (res.length > 0) {
//         setFiles({
//           flag: true,
//           files: res,
//         });
//       } else {
//         setFiles({
//           flag: false,
//           files: [],
//         });
//       }
//     });
//   }, [refDetails.flag]);

//   console.log(meds);

//   const handleDetails = (ref) => {
//     setRefDetails({ flag: true, Data: ref });
//   };

//   const [gridApi, setGridApi] = useState(null);

//   const onGridReady = (params) => {
//     setGridApi(params.api);
//     fetch("https://www.ag-grid.com/example-assets/olympic-winners.json").then(
//       (resp) => resp.json()
//     );
//   };

//   useEffect(() => {
//     fetch("https://www.ag-grid.com/example-assets/row-data.json").then(
//       (result) => result.json()
//     );
//   }, []);

//   const onBtnExport = () => {
//     gridApi.exportDataAsCsv();
//   };
//   const handleDate = (date) => {
//     const [yyyy, mm, dd] = date.split("-");
//     const rev = `${mm}/${dd}/${yyyy}`;
//     return rev;
//   };

//   const handleCraetedat = (data) => {
//     const [date, time] = data.split("T");
//     const correctdate = handleDate(date);
//     const final = `${correctdate}  -  ${time}`;
//     return final;
//   };
//   return (
//     <div>
//       {logedin === "true" ? (
//         <div>
//           {refDetails.flag ? (
//             <div id="wrapper">
//               {" "}
//               <Nav />
//               <div className="d-flex flex-column" id="content-wrapper">
//                 <div id="content">
//                   <Header />

//                   <div className="container-fluid">
//                     <div className="pagetitle">
//                       <h1>Rx Information</h1>
//                       <nav>
//                         <ol className="breadcrumb">
//                           <li className="breadcrumb-item">
//                             <a href="/Referrals">Search RX</a>
//                           </li>

//                           <li className="breadcrumb-item active">Rx details</li>
//                         </ol>
//                       </nav>
//                       <Cards />
//                     </div>

//                     <div className="card shadow">
//                       <div className="card-header py-3">
//                         <div className="d-flex justify-content-between">
//                           <div>
//                             Prescription ID
//                             <p className="text-primary m-0 fw-bold">
//                               {refDetails.Data.ID}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                       <br />
//                       <div className="container1">
//                         <p className="text-primary m-0 fw-bold">
//                           Patient Information
//                         </p>
//                         <br />
//                         <div className="row">
//                           {refDetails.Data.Patient_ID ? (
//                             <div className="col">
//                               <p className="fw-bold">
//                                 Patient ID
//                                 <p className="fw-normal">
//                                   {refDetails.Data.Patient_ID}
//                                 </p>
//                               </p>
//                             </div>
//                           ) : null}
//                           {refDetails.Data.Patient_Name ? (
//                             <div className="col">
//                               <p className="fw-bold">
//                                 Patient Name
//                                 <p className="fw-normal">
//                                   {refDetails.Data.Patient_Name}
//                                 </p>
//                               </p>
//                             </div>
//                           ) : null}
//                         </div>
//                         <p className="text-primary m-0 fw-bold">
//                           Clinical Information
//                         </p>
//                         <br />
//                         <div className="row">
//                           {refDetails.Data.Diagnosis ? (
//                             <div className="col">
//                               <p className="fw-bold">
//                                 Diagnosis
//                                 <p className="fw-normal">
//                                   {refDetails.Data.Diagnosis}
//                                 </p>
//                               </p>
//                             </div>
//                           ) : null}
//                           {refDetails.Data.ICD10 ? (
//                             <div className="col">
//                               <p className="fw-bold">
//                                 ICD10
//                                 <p className="fw-normal">{refDetails.Data.ICD10}</p>
//                               </p>
//                             </div>
//                           ) : null}
//                         </div>
//                         <div className="row">
//                           {refDetails.Data.Has_Been_On_This_Condition ? (
//                             <div className="col">
//                               <p className="fw-bold">
//                                 Has patient before treated on this condition ?
//                                 <p className="fw-normal">
//                                   {refDetails.Data.Has_Been_On_This_Condition}
//                                 </p>
//                               </p>
//                             </div>
//                           ) : null}
//                           {refDetails.Data.Is_on_Therapy ? (
//                             <div className="col">
//                               <p className="fw-bold">
//                                 Is patient currently on therapy ?
//                                 <p className="fw-normal">
//                                   {refDetails.Data.Is_on_Therapy}
//                                 </p>
//                               </p>
//                             </div>
//                           ) : null}
//                         </div>
//                         <div className="row">
//                           {refDetails.Data.Current_Medications ? (
//                             <div className="col">
//                               <p className="fw-bold">
//                                 Current Medications
//                                 <p className="fw-normal">
//                                   {refDetails.Data.Current_Medications}
//                                 </p>
//                               </p>
//                             </div>
//                           ) : null}
//                           {refDetails.Data.Wil_Patient_Stop_Taking_Med ? (
//                             <div className="col">
//                               <p className="fw-bold">
//                                 Will patient stop taking these medications ?
//                                 <p className="fw-normal">
//                                   {refDetails.Data.Wil_Patient_Stop_Taking_Med}
//                                 </p>
//                               </p>
//                             </div>
//                           ) : null}
//                         </div>
//                         <div className="row">
//                           {refDetails.Data.Notes ? (
//                             <div className="col">
//                               <p className="fw-bold">
//                                 Notes
//                                 <p className="fw-normal">{refDetails.Data.Notes}</p>
//                               </p>
//                             </div>
//                           ) : null}
//                         </div>
//                         {meds.length == 1 ? (
//                           <div>
//                             {" "}
//                             <p className="text-primary m-0 fw-bold">
//                               Medications
//                             </p>
//                             <br />
//                             <div className="row">
//                               <div className="col">
//                                 <p className="fw-bold">
//                                   Medication Name
//                                   <p className="fw-normal">
//                                     {meds[0].Medication_Name}
//                                   </p>
//                                 </p>
//                               </div>

//                               <div className="col">
//                                 <p className="fw-bold">
//                                   Sig
//                                   <p className="fw-normal">{meds[0].Sig}</p>
//                                 </p>
//                               </div>
//                               <div className="col">
//                                 <p className="fw-bold">
//                                   Quantity
//                                   <p className="fw-normal">{meds[0].Quantity}</p>
//                                 </p>
//                               </div>
//                               <div className="col">
//                                 <p className="fw-bold">
//                                   Refills
//                                   <p className="fw-normal">{meds[0].Refills}</p>
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         ) : meds.length > 1 ? (
//                           meds.map((x) => (
//                             <div>
//                               {" "}
//                               <p className="text-primary m-0 fw-bold">
//                                 Medications
//                               </p>
//                               <br />
//                               <div className="row">
//                                 <div className="col">
//                                   <p className="fw-bold">
//                                     Medication Name
//                                     <p className="fw-normal">{x.Medication_Name}</p>
//                                   </p>
//                                 </div>

//                                 <div className="col">
//                                   <p className="fw-bold">
//                                     Sig
//                                     <p className="fw-normal">{x.Sig}</p>
//                                   </p>
//                                 </div>
//                                 <div className="col">
//                                   <p className="fw-bold">
//                                     Quantity
//                                     <p className="fw-normal">{x.Quantity}</p>
//                                   </p>
//                                 </div>
//                                 <div className="col">
//                                   <p className="fw-bold">
//                                     Refills
//                                     <p className="fw-normal">{x.Refills}</p>
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                           ))
//                         ) : meds.length < 1 || !meds.length ? null : null}
//                         <p className="text-primary m-0 fw-bold">Rx Status</p>
//                         <br />
//                         <div className="row">
//                           {refDetails.Data.Status ? (
//                             <div className="col">
//                               <p className="fw-bold">
//                                 Status
//                                 <p className="fw-normal">
//                                   {refDetails.Data.Status}
//                                 </p>
//                               </p>
//                             </div>
//                           ) : null}
//                         </div>
//                         <div className="row">
//                           {refDetails.Data.Provider_Status_Update ? (
//                             <div className="col">
//                               <p className="fw-bold">
//                                 Rx Progress
//                                 <p className="fw-normal">
//                                   {refDetails.Data.Provider_Status_Update}
//                                 </p>
//                               </p>
//                             </div>
//                           ) : null}
//                           {refDetails.Reason_Pending_Prescription ? (
//                             <div className="col">
//                               <p className="fw-bold">
//                                 Pending Reason
//                                 <p className="fw-normal">
//                                   {refDetails.Reason_Pending_Prescription}
//                                 </p>
//                               </p>
//                             </div>
//                           ) : null}
//                         </div>
//                         <p className="text-primary m-0 fw-bold">Attachments</p>
//                         {files.flag ? (
//                           <div>
//                             {files.files.map((Obj) => {
//                               return (
//                                 <li>
//                                   <a
//                                     href={Obj.Files}
//                                     key={Obj.PK_ID}
//                                     target="_blank"
//                                     download
//                                   >
//                                     Open Attachment
//                                   </a>
//                                 </li>
//                               );
//                             })}
//                           </div>
//                         ) : (
//                           <p>No Files Attached</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <footer className="bg-white sticky-footer">
//                   <div className="container my-auto">
//                     <div className="text-center my-auto copyright">
//                       <span>Copyright © NEXTEHEALTH</span>
//                     </div>
//                   </div>
//                 </footer>
//               </div>
//             </div>
//           ) : (
//             <div id="wrapper">
//               <Nav />
//               <div className="d-flex flex-column" id="content-wrapper">
//                 <div id="content">
//                   <Header />
//                   <div>
//                     <div className="d-flex flex-column" id="content-wrapper">
//                       <div id="content">
//                         <div className="container-fluid">
//                           <div className="pagetitle">
//                             <h1>Search Prescription</h1>
//                           </div>
//                           <div>
//                             <Cards />
//                           </div>
//                           <div className="row">
//                             <div style={{ width: "100%", height: 550 }}>
//                               <div
//                                 className="ag-theme-alpine"
//                                 style={{ width: "100%", height: "96%" }}
//                               >
//                                 {" "}
//                                 <button onClick={() => onBtnExport()}>
//                                   Download CSV export file
//                                 </button>
//                                 <AgGridReact
//                                   rowData={referrals}
//                                   frameworkComponents={{
//                                     totalValueRenderer: TotalValueRenderer,
//                                   }}
//                                   defaultColDef={{
//                                     flex: 1,
//                                     minWidth: 100,
//                                     filter: true,
//                                     resizable: true,
//                                   }}
//                                   enableRangeSelection={true}
//                                   rowSelection={"multiple"}
//                                   statusBar={{
//                                     statusPanels: [
//                                       {
//                                         statusPanel:
//                                           "agTotalAndFilteredRowCountComponent",
//                                         align: "left",
//                                       },
//                                       {
//                                         statusPanel: "agTotalRowCountComponent",
//                                         align: "center",
//                                       },
//                                       {
//                                         statusPanel:
//                                           "agFilteredRowCountComponent",
//                                       },
//                                       {
//                                         statusPanel:
//                                           "agSelectedRowCountComponent",
//                                       },
//                                       { statusPanel: "agAggregationComponent" },
//                                     ],
//                                   }}
//                                   sideBar={{
//                                     toolPanels: [
//                                       {
//                                         id: "columns",
//                                         labelDefault: "Columns",
//                                         labelKey: "columns",
//                                         iconKey: "columns",
//                                         toolPanel: "agColumnsToolPanel",
//                                       },
//                                       {
//                                         id: "filters",
//                                         labelDefault: "Filters",
//                                         labelKey: "filters",
//                                         iconKey: "filter",
//                                         toolPanel: "agFiltersToolPanel",
//                                       },
//                                     ],
//                                   }}
//                                   columnHoverHighlight={true}
//                                   onGridReady={onGridReady}
//                                 >
//                                   <AgGridColumn
//                                     field="ID"
//                                     sortable={true}
//                                     filter={true}
//                                     checkboxSelection={true}
//                                   ></AgGridColumn>
//                                   <AgGridColumn
//                                     field="Diagnosis"
//                                     sortable={true}
//                                     filter={true}
//                                   ></AgGridColumn>
//                                   <AgGridColumn
//                                     field="Status"
//                                     filter="agDateColumnFilter"
//                                   ></AgGridColumn>
//                                   <AgGridColumn
//                                     field="Order_type"
//                                     sortable={true}
//                                     filter={true}
//                                   ></AgGridColumn>
//                                   <AgGridColumn
//                                     field="Patient_ID"
//                                     sortable={true}
//                                     filter={true}
//                                   ></AgGridColumn>
//                                   <AgGridColumn
//                                     field="Created_On"
//                                     filter="agDateColumnFilter"
//                                     sortable={true}
//                                     // filter={true}
//                                   ></AgGridColumn>
//                                   <AgGridColumn
//                                     field="Updated_at"
//                                     sortable={true}
//                                     filter={true}
//                                   ></AgGridColumn>

//                                   <AgGridColumn
//                                     minWidth={175}
//                                     cellRenderer="totalValueRenderer"
//                                   ></AgGridColumn>
//                                 </AgGridReact>
//                               </div>
//                             </div>

//                             {/* Chart */}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>{" "}
//                 <footer className="bg-white sticky-footer">
//                   <div className="container my-auto">
//                     <div className="text-center my-auto copyright">
//                       <span>Copyright © NEXTEHEALTH</span>
//                     </div>
//                   </div>
//                 </footer>
//               </div>{" "}
//             </div>
//           )}
//         </div>
//       ) : (
//         <Logedout />
//       )}
//     </div>
//   );
// }

// export default Referrals;
