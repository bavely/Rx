import React from 'react';
import { useParams } from 'react-router'
import Editor from '../../Components/SurveyComp/Editor';
import Logedout from "../../Components/Logout/Logedout";
import Nav from "./Nav";
import Header from "./Header";

const Edit = () => {
    const logedin = sessionStorage.getItem("logedin");
    const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
    // const { id } = useParams();
    return (    <div>
        {logedin === "true" ? (
          <div id="wrapper">
            <Nav />
            <div className="d-flex flex-column" id="content-wrapper">
              <div id="content">
                <Header />
  
                <div className="container-fluid">
        <div className='sjs-editor-container'>
            <Editor id={id}/>
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

export default Edit;