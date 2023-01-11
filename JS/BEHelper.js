const { initializeApp } = require("firebase-admin/app");
const admin = require("firebase-admin");
const serviceAccount = require("../curorxnotifications-firebase-adminsdk-m0kfy-2c3f2eb24b.json");

const FireBaseURL =
  process.env.ENVIRONMENT === "prod"
    ? { surveys: "surveys", tokens: "tokens", users: "users" }
    : process.env.ENVIRONMENT === "beta"
    ? { surveys: "surveysbeta", tokens: "tokensbeta", users: "usersbeta" }
    : { surveys: "surveysbeta", tokens: "tokensbeta", users: "usersbeta" };

    


    const BaseURL = 
process.env.ENVIRONMENT === "prod" 
? "https://curorx.life" : process.env.ENVIRONMENT === "beta"
? "https://curo-frontend-beta.azurewebsites.net" : "http://localhost:8080";

const Helper = {
  ReminderSurvey: (client, axios) => {

    const date = new Date();
    new Date( date.setDate(date.getDate() - 4)) // 4 days ago
    const hour = new Date().getHours();
    const day = date.getDate();
    
    console.log(hour, day)
console.log(new Date())
console.log(date)
console.log(hour)
console.log( new Date (date).getFullYear())
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://curorxnotifications-default-rtdb.firebaseio.com",
    });

    var db = admin.database();
    var ref = db.ref(`${FireBaseURL.tokens}`);


     
        ref.once("value", function (snapshot) {

              Object.values(snapshot.val()).filter((i) => i.resflag === false && new Date (i.date).getDate() === new Date (date).getDate() && new Date (i.date).getMonth() === new Date (date).getMonth() && new Date (i.date).getFullYear() === new Date (date).getFullYear() ).forEach((i) => {
                console.log(i)
let msg = ` We in REPharmacy have noticed that you haven't completed the survey. 
Please click the link below to complete your survey. 
${BaseURL}/run/?id=${i.servid}&pid=${i.ptid}&pdate=${i.dispenseDate}&token=${i.token}  .
To opt out, click on the follwing link ${BaseURL}/optout/?id=${i.ptid} .`;
return axios.post(`/servey/patintId`, {
    id:i.ptid
  }).then((res) => {
    console.log(res)
         client.messages
                .create({
                    body: msg,
                    from: '+18647345830',
                    to: res.data.patient.phone
                })
                .then(message => {console.log(message.sid, "message.sid"); }).catch(err => console.log(err));
  }).catch((err) => {
    console.log(err);
   
  });

           

              })

          });

    
  },
  urlShortner: (url, axios) => {
   return axios.post('https://api.rebrandly.com/v1/links',{ destination: url, domain:{ fullName: "rebrand.ly" } } ,{
      headers: {
          'apikey': process.env.REBRANDLY_API_KEY,
          'Content-Type': "application/json"
          
      },
      
  }).then((res) => {
    console.log(res)
return res.data.shortUrl
  }).catch((err) => {
    console.log(err)
    return err
    
  })
  }
};

module.exports = Helper;
