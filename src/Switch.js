import { Routes, Route, Use, useNavigate } from "react-router-dom";
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  forwardRef,
} from "react";
import About from "./pages/About";
import Homepage from "./pages/Homepage";
import { UserContext } from "./hooks/UserContext";
import helper from "./utils/helper.js";
import Login from "./pages/Login";
import PassReset from "./pages/Passreset";
import Register from "./pages/Register";
import ProviderDashboard from "./pages/Provider/Dashboard";
import ProviderProfile from "./pages/Provider/ProviderProfile";
import PtManage from "./pages/Provider/PtManage";
import RxManage from "./pages/Provider/RxManage";
// import Referrals from "./pages/Provider/Referrals";
import Contact_Page from "./pages/Provider/ContactPage";
import Pharmacist_Dashboard from "./pages/Pharmacist/Dashboard";
import Pharmacist_Contact_Page from "./pages/Pharmacist/ContactPage";
import PharmacistProfile from "./pages/Pharmacist/PharmacistProfile";
import Admin from "./pages/Admin/Admin";
import ManageProvider from "./pages/Pharmacist/ManageProvider";
import ManagePatient from "./pages/Pharmacist/ManagePatient";
import ManageRx from "./pages/Pharmacist/ManageRx";
import Messages from "./pages/Pharmacist/Messages";
import RxProcessing from "./pages/Pharmacist/RxProcessing";
import Applesssms from "./pages/Applesssms";
import Run from "./pages/Pharmacist/Run";
import Edit from "./pages/Pharmacist/Edit";
import Results from "./pages/Pharmacist/Results";
import Home from "./pages/Pharmacist/Home";
import UploadCSV from "./pages/Pharmacist/UploadCSV";
import SurveyAnalyticsComponent from "./pages/Pharmacist/SurveyAnalyticsComponent";
import Optout from "./pages/Pharmacist/Optout";
import Recipients from "./pages/Pharmacist/Recipients";
import PharmaciesManagement from "./pages/Swadmin/PharmaciesManagement";
import PrivilegeManagement from "./pages/Swadmin/PrivilegeManagement";
import SadminProfile from "./pages/Swadmin/SadminProfile";
import AddUser from "./pages/Admin/AddUser";
import AdminDashbard from "./pages/Admin/AdminDashbard";
import RolesManagement from "./pages/Admin/RolesManagement";
import PhAdminProfile from "./pages/Admin/PhAdminProfile";
import AddPatient from "./pages/Pharmacist/AddPatient";
import AddProvider from "./pages/Pharmacist/AddProvider";
import SessionTimeOut from "./pages/SessionTimeOut";
import BulkCreatePatients from "./pages/Pharmacist/Bulk_Create_Patients";
import AddPatients from "./pages/Provider/AddPatients";
import MassTexting from "./pages/Pharmacist/MassTexting";
import MessagesProviders from "./pages/Provider/MessagesProviders";

function SwitchApp() {
  const navigate = useNavigate();
  return (
    <>
      <SessionTimeOut />

      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/resetpassword" element={<PassReset />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact_Page />} />
        <Route path="/applesssms" element={<Applesssms />} />
        <Route path="/survey_builder" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/run" element={<Run />}></Route>
        <Route path="/edit" element={<Edit />}></Route>
        <Route path="/results" element={<Results />}></Route>
        <Route path="/uploadcsv" element={<UploadCSV />}></Route>
        <Route
          path="/survey_analytics"
          element={<SurveyAnalyticsComponent />}
        ></Route>
        <Route path="/optout" element={<Optout />}></Route>
        <Route path="/recipients" element={<Recipients />}></Route>

        {/* Provider Only */}
        <Route
          path="/provider-dashboard"
          element={
            sessionStorage.getItem("type") === "provider" ? (
              <ProviderDashboard />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/provider-profile"
          element={
            sessionStorage.getItem("type") === "provider" ? (
              <ProviderProfile />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/patient_manage"
          element={
            sessionStorage.getItem("type") === "provider" ? (
              <PtManage />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/rx_manage"
          element={
            sessionStorage.getItem("type") === "provider" ? (
              <RxManage />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/add_patients"
          element={
            sessionStorage.getItem("type") === "provider" ? (
              <AddPatients />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/messages_provider"
          element={
            sessionStorage.getItem("type") === "provider" ? (
              <MessagesProviders />
            ) : (
              <Login />
            )
          }
        />

        {/* Pharmacy Only */}
        <Route
          path="/Pharmacist_Dashboard"
          element={
            sessionStorage.getItem("type") === "pharmacist" ||
            sessionStorage.getItem("type") === "user" ||
            sessionStorage.getItem("type") === "User" ? (
              <Pharmacist_Dashboard />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/Pharmacist_Contact_Page"
          element={
            sessionStorage.getItem("type") === "pharmacist" ||
            sessionStorage.getItem("type") === "user" ||
            sessionStorage.getItem("type") === "User" ? (
              <Pharmacist_Contact_Page />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/Pharmacist_Profile"
          element={
            sessionStorage.getItem("type") === "pharmacist" ||
            sessionStorage.getItem("type") === "user" ||
            sessionStorage.getItem("type") === "User" ? (
              <PharmacistProfile />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/messages"
          element={
            sessionStorage.getItem("type") === "pharmacist" ||
            sessionStorage.getItem("type") === "user" ||
            sessionStorage.getItem("type") === "User" ? (
              <PharmacistProfile />
            ) : (
              <Messages />
            )
          }
        />
        <Route
          path="/provider_manage"
          element={
            sessionStorage.getItem("type") === "pharmacist" ||
            sessionStorage.getItem("type") === "user" ||
            sessionStorage.getItem("type") === "User" ? (
              <ManageProvider />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/mass-texting"
          element={
            sessionStorage.getItem("type") === "pharmacist" ||
            sessionStorage.getItem("type") === "user" ||
            sessionStorage.getItem("type") === "User" ? (
              <MassTexting />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/patient_manage_ph"
          element={
            sessionStorage.getItem("type") === "pharmacist" ||
            sessionStorage.getItem("type") === "user" ||
            sessionStorage.getItem("type") === "User" ? (
              <ManagePatient />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/rx_manage_ph"
          element={
            sessionStorage.getItem("type") === "pharmacist" ||
            sessionStorage.getItem("type") === "user" ||
            sessionStorage.getItem("type") === "User" ? (
              <ManageRx />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/rx_processing"
          element={
            sessionStorage.getItem("type") === "pharmacist" ||
            sessionStorage.getItem("type") === "user" ||
            sessionStorage.getItem("type") === "User" ? (
              <RxProcessing />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/addpatient"
          element={
            sessionStorage.getItem("type") === "pharmacist" ||
            sessionStorage.getItem("type") === "user" ||
            sessionStorage.getItem("type") === "User" ? (
              <AddPatient />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/addprovider"
          element={
            sessionStorage.getItem("type") === "pharmacist" ||
            sessionStorage.getItem("type") === "user" ||
            sessionStorage.getItem("type") === "User" ? (
              <AddProvider />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/bulk_create_patients"
          element={
            sessionStorage.getItem("type") === "pharmacist" ||
            sessionStorage.getItem("type") === "user" ||
            sessionStorage.getItem("type") === "User" ? (
              <BulkCreatePatients />
            ) : (
              <Login />
            )
          }
        ></Route>

        {/* Ph Admin Only */}
        <Route
          path="/Admin"
          element={
            sessionStorage.getItem("type") === "pharmacyAdmin" ? (
              <Admin />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/AddUser"
          element={
            sessionStorage.getItem("type") === "pharmacyAdmin" ? (
              <AddUser />
            ) : (
              <Login />
            )
          }
        ></Route>
        <Route
          path="/AdminDashbard"
          element={
            sessionStorage.getItem("type") === "pharmacyAdmin" ? (
              <AdminDashbard />
            ) : (
              <Login />
            )
          }
        ></Route>
        <Route
          path="/RolesManagement"
          element={
            sessionStorage.getItem("type") === "pharmacyAdmin" ? (
              <RolesManagement />
            ) : (
              <Login />
            )
          }
        ></Route>
        <Route
          path="/PhAdminProfile"
          element={
            sessionStorage.getItem("type") === "pharmacyAdmin" ? (
              <PhAdminProfile />
            ) : (
              <Login />
            )
          }
        ></Route>

        {/* Sw Admin Only */}
        <Route
          path="/PrivilegeManagement"
          element={
            sessionStorage.getItem("type") === "Admin" ? (
              <PrivilegeManagement />
            ) : (
              <Login />
            )
          }
        ></Route>
        <Route
          path="/SadminProfile"
          element={
            sessionStorage.getItem("type") === "Admin" ? (
              <SadminProfile />
            ) : (
              <Login />
            )
          }
        ></Route>
        <Route
          path="/PharmaciesManagement"
          element={
            sessionStorage.getItem("type") === "Admin" ? (
              <PharmaciesManagement />
            ) : (
              <Login />
            )
          }
        ></Route>
      </Routes>
    </>
  );
}
export default SwitchApp;
