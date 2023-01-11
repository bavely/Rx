import React, {useState, useEffect} from 'react'
import "./optoutcss.css";
import SurveyHelper from '../../utils/SurveyHelper';

function Optout() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let ptid = urlParams.get('id')
    console.log("optout")
    
const [load, setLoad] = useState("");
// load-complete
const [display, setDisplay] = useState("none");

useEffect(() => {
  SurveyHelper.handleOptout(ptid).then((res)=>{
    console.log(res)
    if (res.status === 200) {
      setLoad("load-complete");
      setDisplay("block");
    }
  })
}, [ptid]);

  return (
    <div class="container">
    <div className=" row ">
    <div class="col-4"></div>
      <div className="col-4 float-end mt-5">
      <h3 className=''> <small>Opting-out...</small></h3>

    <div className={`circle-loader ${load} `}>
      <div className="checkmark draw" style={{display:`${display}`}}></div>
    </div>
    </div>
    <div class="col-4"></div>
    </div>
    </div>
  )
}

export default Optout