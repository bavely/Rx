import React, { useEffect } from 'react'
import { useParams } from 'react-router'
// import { useReduxDispatch } from './redux'
// import { get, update } from './redux/surveys'
import { SurveyCreator, SurveyCreatorComponent } from 'survey-creator-react'
import 'survey-creator-core/survey-creator-core.css'
import SurveyHelper from '../../utils/SurveyHelper'
import { getDatabase, ref, set ,child, get, onValue, onChildAdded,update, remove } from "firebase/database";
import helper from '../../utils/helper'

const Editor = (props)=> {
    
    // const dispatch = useReduxDispatch()
    const options = {
        showLogicTab: true,
        showTranslationTab: true,
        haveCommercialLicense: true
    };
    const creator = new SurveyCreator(options);
    creator.isAutoSave = true;
    creator.saveSurveyFunc = (saveNo, callback) => {
        //console.log("Creator saveSurveyFunc");
        SurveyHelper.update(props.id, creator.JSON, creator.text)
        // dispatch(update({ id: id, json: creator.JSON, text: creator.text }))

        localStorage.setItem("survey-json", { id: props.id, json: creator.JSON, text: creator.text });
        //console.log(  creator.JSON)
        callback(saveNo, true);
    }

    const database = getDatabase(SurveyHelper.app());
    const getsBy = (id) => {
        return  onValue(ref(database, `${helper.fireBaseURL.surveys}/`+id), (survey) => {
          if(survey.val() !== null){
            //console.log(survey.val().json)
            if(typeof survey.val().json === 'object') {
                //console.log(survey.val().json)
                creator.JSON = survey.val().json 
            } else {
                creator.text = survey.val().text
            }
          }
    
         // ...
       }, {
         onlyOnce: true
       });
      }
useEffect(() => {
    getsBy(props.id);
}, [props.id]);

//console.log(creator.JSON)
    return (<>
            <SurveyCreatorComponent creator={creator}/>
        </>)
}

export default Editor