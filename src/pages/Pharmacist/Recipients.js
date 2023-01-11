import React, {useEffect, useState} from 'react'
import { getDatabase, ref, set ,child, get, onValue, onChildAdded,update, remove } from "firebase/database";
import SurveyHelper from "../../utils/SurveyHelper";
import Logedout from "../../Components/Logout/Logedout";
import Nav from "./Nav";
import Header from "./Header";
import helper from '../../utils/helper';

function Recipients() {
    const logedin = sessionStorage.getItem("logedin");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = urlParams.get('id')

    const [Recipient, setRecipient] = useState([])
    const [input, setInput] = useState("")

    const handleChanges = (e) => {
        setInput(e.target.value)
    }

    const handleAdd = (e) => {
        e.preventDefault()
        SurveyHelper.addRecipient(input, id)
        setInput("")
    }

    
    const database = getDatabase(SurveyHelper.app());

    const commentsRef = ref(database, `${helper.fireBaseURL.users}/`);
 


    useEffect(() => {
      getNots();
      onChildAdded(commentsRef, (data) => {
      
     
      
       getNots();
      });
       }, []);
  
    const getNots = () => {
      return  onValue(ref(database, `${helper.fireBaseURL.users}/`), (snapshot) => {
        if(snapshot.val() !== null){
            setRecipient( Object.entries( snapshot.val()).filter((item) => item[1].surveyId === id));
         
        }else{
            setRecipient([])
        }
  
       // ...
     }, {
       onlyOnce: true
     });
    }


    const handleDelete = (note) => {
        const updates = {};
        updates[`/${helper.fireBaseURL.users}/` + note[0]] = null;
         update(ref(database), updates);
         getNots();
      }
      console.log(Recipient)
  return (
    <div>
    {logedin === "true" ? (
    <div id="wrapper">
    <Nav />
    <div className="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <Header />

        <div className="container-fluid">
          <div className="pagetitle">
            <h1>Recipient's List </h1>
          </div>
    <div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Recipient's email" aria-label="Recipient's email" aria-describedby="button-addon2" onChange={handleChanges} value={input}/>
  <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleAdd}>Add</button>
</div>
<ul class="list-group">{Recipient.length > 0 ?  Recipient.map((item, index) => {return (
  <li class="list-group-item d-flex justify-content-between align-items-center" key={item[0]}>
  {item[1].email}
    <button  onClick={()=>{handleDelete(item)}} class="btn btn-sm btn-danger">x</button>
  </li>
)} ): <></>}</ul>
         </div>
            </div>
          </div>
        </div>
           ) : (
            <Logedout />
          )}
        </div>
  )
}

export default Recipients