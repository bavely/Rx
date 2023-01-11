import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router'
import { useReduxDispatch, useReduxSelector } from '../../Components/SurveyComp/redux'
import SurveyHelper from '../../utils/SurveyHelper';
import { post } from '../../Components/SurveyComp/redux/results'
import { Model, StylesManager } from 'survey-core'
import { Survey } from 'survey-react-ui'
import { getDatabase, ref, set ,child, get, onValue, onChildAdded,update, remove } from "firebase/database";
import Logedout from "../../Components/Logout/Logedout";
import Nav from "./Nav";
import Header from "./Header";
import 'survey-core/defaultV2.css'
import helper from '../../utils/helper';


StylesManager.applyTheme("defaultV2")


const Run = () => {
  const logedin = sessionStorage.getItem("logedin");
    const [survey, setSurvey] = useState([])
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get('id')
    let patientId = urlParams.get('pid')
    let ddate = urlParams.get('pdate')
    let token = urlParams.get('token')
    // get patient id from url
    const database = getDatabase(SurveyHelper.app());
    const [expflag, setExpflag] = useState(false)
    const [tokObj, setTokObj] = useState({})
console.log(token)
  

    const gettBy = (tok) => {
      console.log(tok)
      return  onValue(ref(database, `${helper.fireBaseURL.tokens}/`+tok), (to) => {
        if(to.val() !== null){
          console.log(to.val())
     
          setExpflag(to.val().resflag)
          setTokObj(to.val())
         
        }
  
       // ...
     }, {
       onlyOnce: true
     });
    }



useEffect(() => {
  console.log(id === "" || patientId  === "" || ddate === "" || token === "" ||id === null || patientId  === null  || ddate  === null  || token  === null)
   id = urlParams.get('id')
   patientId = urlParams.get('pid')
   ddate = urlParams.get('pdate')
   token = urlParams.get('token')
  if (id === "" || patientId  === "" || ddate === "" || token === "" ||id === null || patientId  === null  || ddate  === null  || token  === null ) {
    setExpflag(true)
}

  
}, [id, patientId  , ddate ,token ]);

// useEffect(() => {
// SurveyHelper.getResBypid(patientId).then((res)=>{
//     console.log(res)
//     if (res.status === 200) {
//       if (res.data.Patient_Responses.length > 0) {
//     let sorted = res.data.Patient_Responses.sort( (b, a) => {return a.created_at > b.created_at ? -1 : b.created_at > a.created_at ? 1  : 0})
//     console.log(sorted)
//     let now= new Date();
//     let last = new Date(sorted[0].created_at);
//     let diff = Math.abs(now - last);
//     let sixweeksms = 6 * 7 * 24 * 60 * 60 * 1000;
//     console.log(diff)
//     console.log(sixweeksms)
//     if (diff <= sixweeksms) {
//       setExpflag(true)
//     }
//     }
//   }
// })

// }, []);

    const getsBy = (id) => {
        return  onValue(ref(database, `${helper.fireBaseURL.surveys}/`+id), (survey) => {
          if(survey.val() !== null){
            console.log(survey.val().json)
       
            setSurvey(survey.val().json)
            console.log(survey.val().json)
          }
    
         // ...
       }, {
         onlyOnce: true
       });
      }

      const [Recipients ,setRecipients] = useState([])
      const getRecipients = () => {
        return  onValue(ref(database, `${helper.fireBaseURL.users}/`), (snapshot) => {
          if(snapshot.val() !== null){
            setRecipients( Object.entries( snapshot.val()));
           
          }else{
            setRecipients([])
          }
    
         // ...
       }, {
         onlyOnce: true
       });
      }

useEffect(() => {
    getsBy(id)
    gettBy(token)
    getRecipients()
    
}, [id]);

if (survey.length === 0) {
    return <div>Loading...</div>
}else if (expflag || id === "" || patientId  === "" || ddate === "" || token === "" ||id === null || patientId  === null  || ddate  === null  || token  === null ){
    return <div>Survey expired and/or Invalid survey URL.</div>
}else {
    const model = new Model(survey);
    model
    .onComplete
    .add((sender) => {
        // post({postId: id, surveyResult: sender.data, surveyResultText: JSON.stringify(sender.data)})
      SurveyHelper.tokenUpdate(token, true, tokObj)
SurveyHelper.handleAddsurrespond(patientId, {response: sender.data, surveyId: id})
        console.log(sender.data)
        console.log(survey)
        console.log(model.getAllQuestions)

        for (let index = 0; index < survey.pages.length; index++) {
          survey.pages[index].elements.map(element => {
            console.log(element)
          if (element.title.includes("contacted") || element.title.includes("Contacted") || element.title.includes("contact") || element.title.includes("Contact")) {
          if (sender.data[element.name] === true){
            console.log("true")
            SurveyHelper.handleGetptbyid(patientId).then(res =>{
              let msg = `${res.data.patient.firstName} ${res.data.patient.lastName} DOB: ${res.data.patient.DOB} has completed the survey ${survey.title} and has indicated that they need to be contacted. Please contact them at ${res.data.patient.phone} to discuss the results of the survey.`
              if (Recipients.length > 0) {
                Recipients.filter(rc => rc[1].surveyId === id).map(recipient => {
            SurveyHelper.surveyEmail(recipient[1].email, msg)
            // SurveyHelper.surveyEmail("mike.katkout@repharmacy.com", msg)
            // SurveyHelper.surveyEmail("Phoebe.Wasef@repharmacy.com", msg)
                })
              }
          })
          }
          }
        })
      }
    });  

    return (    <div>
      
        <div id="wrapper">
          {/* <Nav /> */}
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              {/* <Header /> */}

              <div className="container-fluid">
                <div className="pagetitle">
        <h1>{survey.name} for your visit of {ddate}</h1>
        </div>
        <Survey model={model}/>
        
              </div>
            </div>
          </div>
        </div>
      
    </div>);
}



    


}

export default Run;