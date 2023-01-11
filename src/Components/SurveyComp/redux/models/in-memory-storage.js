import { defaultJSON, survey1Json, survey1Results, survey2Json, survey2Results } from "./survey";

const surveys= [ survey1Json, survey2Json ];

const results = {
    '1': survey1Results,
    '2': survey2Results
};

let nextId = 3;

export function getSurveys() {
    return ([] ).concat(surveys);
}

export function createSurvey() {
    let newSurvey = JSON.parse(JSON.stringify(defaultJSON));
    newSurvey.id = '' + nextId++
    newSurvey.name += ' ' + newSurvey.id;
    surveys.push(newSurvey);
    return newSurvey;
}

export function getSurvey(id) {
    return surveys.filter(s => s.id === id)[0];
}

export function removeSurvey(id) {
    const survey = surveys.filter(s => s.id === id)[0];
    const index = surveys.indexOf(survey);
    if(index >= 0) {
        surveys.splice(index, 1);
    }
}

export function updateSurvey(id, json) {
    const survey = surveys.filter(s => s.id === id)[0];
    survey.json = json;
}

export function postResult(id, json) {
    if(!Array.isArray(results[id])) {
        results[id] = [];
    }
    results[id].push(json);
}

export function getResults(id) {
    return results[id] || [];
}
