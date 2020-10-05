import {goal} from './urls';
import {getToken} from '../storage/asyncStorageFunctions';
import {Alert} from 'react-native';
import {
  bgpost,
  food,
  med,
  weight,
  activity,
  steps,
} from '../commonFunctions/goalFunctions';

const addBgGoalReq = async (bgGoal) => {
  let link = goal + '/' + bgpost;
  try {
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: bgGoal.name,
        start_date: bgGoal.start_date,
        end_date: bgGoal.end_date,
        frequency: bgGoal.frequency,
        min_bg: bgGoal.min_bg,
        max_bg: bgGoal.max_bg,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    console.log('addBgGoalReq ' + responseJson);
    return true;
  } catch (error) {
    return false;
  }
};

const addFoodGoalReq = async (foodGoal) => {
  let link = goal + '/' + food;
  try {
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: foodGoal.name,
        start_date: foodGoal.start_date,
        end_date: foodGoal.end_date,
        frequency: foodGoal.frequency,
        calories: foodGoal.calories,
        carbs: foodGoal.carbs,
        fats: foodGoal.fats,
        protein: foodGoal.protein,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    console.log('addFoodGoal ' + responseJson);
    return true;
  } catch (error) {
    return false;
  }
};

const addMedGoalReq = async (medGoal) => {
  let link = goal + '/' + med;
  try {
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: medGoal.name,
        start_date: medGoal.start_date,
        end_date: medGoal.end_date,
        frequency: medGoal.frequency,
        medication: medGoal.medication,
        dosage: medGoal.dosage,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    console.log('addMedGoal ' + responseJson);
    return true;
  } catch (error) {
    return false;
  }
};

const addWeightGoalReq = async (weightGoal) => {
  let link = goal + '/' + weight;
  try {
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: weightGoal.name,
        start_date: weightGoal.start_date,
        end_date: weightGoal.end_date,
        weekly_offset: weightGoal.weekly_offset,
        goal_weight: weightGoal.goal_weight,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    console.log('addWeightGoal ' + responseJson);
    return true;
  } catch (error) {
    return false;
  }
};

const addActivityGoalReq = async (activityGoal) => {
  let link = goal + '/' + activity;
  try {
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: activityGoal.name,
        start_date: activityGoal.start_date,
        end_date: activityGoal.end_date,
        frequency: activityGoal.frequency,
        cal_burnt: activityGoal.cal_burnt,
        duration: activityGoal.duration,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    console.log('addActivityGoal ' + responseJson);
    return true;
  } catch (error) {
    return false;
  }
};

const addStepsGoalReq = async (stepGoal) => {
  let link = goal + '/' + steps;
  try {
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: stepGoal.name,
        start_date: stepGoal.start_date,
        end_date: stepGoal.end_date,
        frequency: stepGoal.frequency,
        steps: stepGoal.steps,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    console.log('addStepsGoal ' + responseJson);
    return true;
  } catch (error) {
    return false;
  }
};

//get all types of goals
const getGoals = async () => {
  try {
    let response = await fetch(goal, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    Alert.alert('Unexpected Error Retrieving Goals', 'Please Try Again Later', [
      {text: 'Got It'},
    ]);
  }
};

const deleteGoal = async (goalType, id) => {
  let link = goal + '/' + goalType + '/' + id;
  try {
    let response = await fetch(link, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    });
    let responseJson = await response.json();
    console.log(responseJson);
    return true;
  } catch (error) {
    return false;
  }
};

export {
  addBgGoalReq,
  addFoodGoalReq,
  addMedGoalReq,
  addWeightGoalReq,
  addActivityGoalReq,
  addStepsGoalReq,
  getGoals,
  deleteGoal,
};
