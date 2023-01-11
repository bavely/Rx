import React from "react";
import Surveys from "../../Components/SurveyComp/Surveys";
import Logedout from "../../Components/Logout/Logedout";
import Nav from "./Nav";
import Header from "./Header";

const Home = () => {
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
                <div className="sjs-client-app__content--surveys-list">
                  <div className="pagetitle">
                    <h1>Surveys List</h1>
                  </div>
                  <Surveys />
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
};

export default Home;
