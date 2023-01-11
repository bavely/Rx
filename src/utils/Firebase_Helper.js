import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { randomPassword } from "secure-random-password";
import { getFirestore } from "firebase/firestore";



const firebase={

    firebaseConfig:{
     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket:  process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    },



    app :()=>{return initializeApp(firebase.firebaseConfig)} ,




    set:(name ,message,sender, receiver, body, unread, url)=>{
        let date = new Date();
        // const rand = randomPassword({ length: 10 });
        const rand = Math.floor(Math.random() * 1000000);
  // Initialize Firebase
  
  const analytics = getAnalytics(firebase.app());
//   console.log(analytics);
  
  // Initialize Realtime Database and get a reference to the service
  const database = getDatabase(firebase.app());
//   console.log(database)
  if (receiver instanceof  Array){
        receiver.forEach((receiver)=>{
  set(ref(database, 'notifications/' + rand), {
    sender_name: name,
    message: message,
    sender: sender,
    receiver: receiver,
    body : body,
    unread:unread,
    url: url ? url : "#",
    timestamp:Date.now()
  });
        })
}else{
    set(ref(database, `notifications/`  +rand), {
        sender_name: name,
        message: message,
        sender: sender,
        receiver: receiver,
        body : body,
        unread:unread,
        url: url ? url : "#",
        timestamp:Date.now()
 
      });
}
    },



    get:()=>{
         // Initialize Firebase
//   const app = initializeApp(firebase.firebaseConfig);
//   const analytics = getAnalytics(app);
//   console.log(analytics);
  
//   // Initialize Realtime Database and get a reference to the service
//   const database = getDatabase(app);
//   console.log(database)
//         const dbRef = ref(getDatabase());
// get(child(dbRef, 'notifications/')).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });
    }
}

export default firebase