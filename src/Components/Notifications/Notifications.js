import React, {useEffect, useState} from 'react'
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set ,child, get, onValue } from "firebase/database";
import firebase from '../../utils/Firebase_Helper';
import { randomPassword } from "secure-random-password";


function Notifications() {
 

  // TODO: Replace the following with your app's Firebase project configuration
//   const firebaseConfig = {

//     apiKey: firebase.firebaseConfig.apiKey,
//     authDomain: firebase.firebaseConfig.authDomain,
//     databaseURL: firebase.firebaseConfig.databaseURL,
//     projectId: firebase.firebaseConfig.projectId,
//     storageBucket: firebase.firebaseConfig.storageBucket,
//     messagingSenderId: firebase.firebaseConfig.messagingSenderId,
//     appId: firebase.firebaseConfig.appId,
//     measurementId:  firebase.firebaseConfig.measurementId
 
//   };

//   const app = initializeApp(firebase.firebaseConfig);
//   const analytics = getAnalytics(app);
//   console.log(analytics);
  
//   // Initialize Realtime Database and get a reference to the service
//   const database = getDatabase(app);
//   console.log(database)
//  const db = getDatabase();

//   const [notifications, setNotifications] = useState([]);

// //  useEffect(() => {
// //   return onValue(ref(db, 'notifications/'), (snapshot) => {
// //     setNotifications(Object.values( snapshot.val()));
// //     console.log(snapshot.val())
// //      // ...
// //    }, {
// //      onlyOnce: true
// //    });
// //  }, []);

//  onValue(ref(db, 'notifications/'), (snapshot) => {
//   setNotifications(Object.values( snapshot.val()));
//   console.log(snapshot.val())
//    // ...
//  }, {
//    onlyOnce: true
//  });

// console.log(notifications)
const userId = sessionStorage.getItem("user")

  return (
<button onClick={()=>{firebase.set( sessionStorage.getItem("user"), "8",  randomPassword({ length: 20 }), true)}}>Send Notification</button>
  )
}

export default Notifications