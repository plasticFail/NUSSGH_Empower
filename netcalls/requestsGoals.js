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
import {act} from 'react-test-renderer';

//post and edit
const addBgGoalReq = async (bgGoal, id) => {
  let link = goal + '/' + bgpost;
  if (id != null) {
    bgGoal._id = id;
  }
  try {
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(bgGoal),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    console.log('addBgGoalReq ' + responseJson);
    return true;
  } catch (error) {
    return false;
  }
};

const addFoodGoalReq = async (foodGoal, id) => {
  let link = goal + '/' + food;
  if (id != null) {
    foodGoal._id = id;
  }
  try {
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(foodGoal),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    console.log('addFoodGoal ' + responseJson);
    return true;
  } catch (error) {
    return false;
  }
};

const addMedGoalReq = async (medGoal, id) => {
  let link = goal + '/' + med;
  if (id != null) {
    medGoal._id = id;
  }
  try {
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(medGoal),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    console.log('addMedGoal ' + responseJson);
    return true;
  } catch (error) {
    return false;
  }
};

const addWeightGoalReq = async (weightGoal, id) => {
  let link = goal + '/' + weight;
  if (id != null) {
    weightGoal._id = id;
  }
  try {
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(weightGoal),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    console.log('addWeightGoal ' + responseJson);
    return true;
  } catch (error) {
    return false;
  }
};

const addActivityGoalReq = async (activityGoal, id) => {
  let link = goal + '/' + activity;
  if (id != null) {
    activityGoal._id = id;
  }
  try {
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(activityGoal),
    });
    let responseJson = await response.json();
    console.log(responseJson);
    console.log('addActivityGoal ' + responseJson);
    return true;
  } catch (error) {
    return false;
  }
};

const addStepsGoalReq = async (stepGoal, id) => {
  let link = goal + '/' + steps;
  if (id != null) {
    stepGoal._id = id;
  }
  try {
    let response = await fetch(link, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(stepGoal),
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
