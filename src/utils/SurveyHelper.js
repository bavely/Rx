import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
// import { getDatabase, ref, set, child, get } from "firebase/database";
import { randomPassword } from "secure-random-password";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, set ,child, get, onValue, onChildAdded,update, remove } from "firebase/database";
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import helper from './helper';

const SurveyHelper={
    firebaseConfig: {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket:  process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    },



    app :()=>{return initializeApp(SurveyHelper.firebaseConfig)} ,




    set:(json, text)=>{
        // const rand = randomPassword({ length: 10 });
        const rand = Math.floor(Math.random() * 1000000);
  // Initialize Firebase
  
  const analytics = getAnalytics(SurveyHelper.app());
  //console.log(analytics);
  
  // Initialize Realtime Database and get a reference to the service
  const database = getDatabase(SurveyHelper.app());
  //console.log(database)
  

  set(ref(database, `${helper.fireBaseURL.surveys}/` + rand), {
    json, text
  });


    },



    getsBy:(Id)=>{
     
// const db = getDatabase(SurveyHelper.app());
// const starCountRef = ref(db, '${helper.fireBaseURL.surveys}/' + Id );
// return onValue(starCountRef, (snapshot) => {
//     //console.log(Object.entries( snapshot.val()))
//  return Object.entries( snapshot.val());
 
// });
const database = getDatabase(SurveyHelper.app());

return  onValue(ref(database, `${helper.fireBaseURL.surveys}/`+ Id), (snapshot) => {
    if(snapshot.val() !== null){
        //console.log(snapshot.val())
        return Object.entries( snapshot.val())
      
    }else{
        return []
    }

   // ...
 }, {
   onlyOnce: true
 });
    },
    update:(id, json, text)=>{
        const database = getDatabase(SurveyHelper.app());
        const updates = {};
        updates[`/${helper.fireBaseURL.surveys}/` + id] = {json, text};
        update(ref(database), updates);
    },
    setrToken:(servid, dispenseDate, ptid, resflag, token, location, locationNPI)=>{

                // const rand = randomPassword({ length: 10 });
                // const rand = Math.floor(Math.random() * 1000000);
                // Initialize Firebase
                // const token = uuidv4();
                const analytics = getAnalytics(SurveyHelper.app());
                //console.log(analytics);
                
                // Initialize Realtime Database and get a reference to the service
                const database = getDatabase(SurveyHelper.app());
                //console.log(database)
                let date = new Date();
                date = date.toString();
              //console.log(date)
              //console.log(token)
                set(ref(database, `${helper.fireBaseURL.tokens}/` + token), {
                    servid, token,  date, dispenseDate, ptid, resflag, location, locationNPI
                });

    },tokenUpdate:(token, resflag, tokObj)=>{
      const database = getDatabase(SurveyHelper.app());
      const updates = {};
      updates[`${helper.fireBaseURL.tokens}/` + token] = {...tokObj, resflag};
      update(ref(database), updates);
  },hendleStorPts:(pts, servid)=>{
        
return axios.post(`${helper.backEndBaseUrl}/servey/addPatientSurvey`, {

   
   firstName:pts.fname,
    lastName:pts.lname,
    DOB:pts.dob,
    MRN:pts.mrn,
    phone:pts.patientPhone === "Invalid or blank phone number" ? "" : pts.patientPhone,
    providing_pharmacy:pts.patientCompany,
    pharmacy_NPI:pts.pharmacyNPI,
    dispense_date:pts.dispenseDate,
    dispense_type:pts.dispensePayorType,

}).then((res) => {
  
    console.log(res)
    
    
    return res;
  })
  .catch((err) => {
    //console.log(err);
    return err;
  });
  
    },
    handleGetptbyid:(id)=>{
      return axios.post(`${helper.backEndBaseUrl}/servey/patintId`, {
        id:id
      }).then((res) => {
        //console.log(res)
        return res;
      }).catch((err) => {
        //console.log(err);
        return err;
      });
    },
    surveyEmail:(email, message)=>{
        return axios.post(`${helper.frontEndBaseUrl}/api/surveyemail`, {
            email:email,
            message:message
          }).then((res) => {
            //console.log(res)
            return res;
          }).catch((err) => {
            //console.log(err);
            return err;
          });
    },
    surveySMS:(number, message)=>{
        return axios.post(`${helper.frontEndBaseUrl}/api/surveysms`, {
            number:number,
            message:message
          }).then((res) => {
            //console.log(res)
            return res;
          }).catch((err) => {
            //console.log(err);
            return err;
          });
    },
    handleAddsurrespond:(pid, res)=>{
      return axios.post(`${helper.backEndBaseUrl}/servey/add_response`, {
        pt_id:pid,
        survey_response:res
      }).then((res) => {
        //console.log(res)
        return res;
      }).catch((err) => {
        //console.log(err);
        return err;
      });
    },
    getResBypid:(pid)=>{

      return axios.post(`${helper.backEndBaseUrl}/servey/getResponseById`, {
        id:pid
      }).then((res) => {
        //console.log(res)
        return res;
      }).catch((err) => {
        //console.log(err);
        return err;
      });

    }, getAllRes:()=>{
      return axios.get(`${helper.backEndBaseUrl}/servey/get_all_responses`).then((res) => {
        //console.log(res)
        return res;
      }).catch((err) => {
        //console.log(err);
        return err;
      });
    },
    handleAddSurvey:(survey)=>{
      return axios.post(`${helper.backEndBaseUrl}/servey/addServey`, {survey}).then((res) => {
        //console.log(res)
        return res;
      }).catch((err) => {
        //console.log(err);
        return err;
      });
    },
    handleOptout:(id)=>{
      return axios.put(`${helper.backEndBaseUrl}/servey/updateOptOut/${id}`, {
        optOut: true
    }).then((res) => {
        ////console.log(res)
        return res;
      }).catch((err) => {
        ////console.log(err);
        return err;
      });
    },
    addRecipient:(email, surveyId)=>{
      // const rand = randomPassword({ length: 10 });
      const rand = Math.floor(Math.random() * 1000000);
// Initialize Firebase

const analytics = getAnalytics(SurveyHelper.app());
//console.log(analytics);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(SurveyHelper.app());
//console.log(database)


set(ref(database, `${helper.fireBaseURL.users}/` + rand), {
  email, surveyId
});


  }
}

export default SurveyHelper