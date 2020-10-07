import {
  glucoseAddLog,
  mealAddLogEndpoint,
  medicationAddLog,
  medicationList,
  weightAddLog,
  glucoseQuestionaire,
  medplanAdd,
  getActivityLog,
  medPlan, getActivitySummary,
} from './urls';
import {getToken} from '../storage/asyncStorageFunctions';

const glucoseAddLogRequest = async (
  bgReading,
  date,
  eatSelection,
  exerciseSelection,
  alcoholSelection,
) => {
  try {
    let response = await fetch(glucoseAddLog, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        bgReading: bgReading,
        questionnaire: {
          eat_lesser: eatSelection,
          exercised: exerciseSelection,
          alcohol: alcoholSelection,
        },
        recordDate: date,
      }),
    });
    let responseJson = await response.json();
    console.log('glucoseAddLogRequest : ' + responseJson);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const storeMedications = async () => {
  try {
    let response = await fetch(medicationList, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    });
    let responseJson = await response.json();
    console.log('storeMedications : ' + responseJson);
    return responseJson;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getMedication4Day = async (dateString) => {
  const string = medPlan + '?start=' + dateString + '&end=' + dateString;
  try {
    let response = await fetch(string, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    });
    let responseJson = await response.json();
    console.log('get medication for 2day : ' + responseJson);
    return responseJson;
  } catch (error) {
    Alert.alert('Network Error', 'Try Again Later', [{text: 'Got It'}]);
  }
};

const medicationAddLogRequest = async (data) => {
  try {
    let response = await fetch(medicationAddLog, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        logs: data,
      }),
    });
    let responseJson = await response.json();
    console.log('medicationAddLogRequest : ' + responseJson);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const weightAddLogRequest = async (weight, date) => {
  try {
    let response = await fetch(weightAddLog, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await getToken()),
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        weight: weight,
        recordDate: date,
        unit: 'kg',
      }),
    });
    console.log(
      'body : ' +
        JSON.stringify({
          weight: weight,
          recordDate: date,
          unit: 'kg',
        }),
    );
    let responseJson = await response.json();
    console.log('weightAddLogRequest : ' + responseJson);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const mealAddLogRequest = async (mealData) => {
  let response = await fetch(mealAddLogEndpoint, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + (await getToken()),
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(mealData),
  });
  let responseJson = await response.json();
  return responseJson;
};

const getBloodGlucoseLogs = async (startDateString, endDateString) => {
  let response = await fetch(glucoseAddLog + `?start=${startDateString}&end=${endDateString}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + (await getToken()),
      Accept: 'application/json',
      'Content-type': 'application/json',
    }
  });
  let responseJson = await response.json();
  return responseJson;
}

const getWeightLogs = async (startDateString, endDateString) => {
  let response = await fetch(weightAddLog + `?start=${startDateString}&end=${endDateString}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + (await getToken()),
      Accept: 'application/json',
      'Content-type': 'application/json',
    }
  });
  let responseJson = await response.json();
  return responseJson;
}

const getMedicationLogs = async (startDateString, endDateString) => {
  let response = await fetch(medicationAddLog + `?start=${startDateString}&end=${endDateString}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + (await getToken()),
      Accept: 'application/json',
      'Content-type': 'application/json',
    }
  });
  let responseJson = await response.json();
  return responseJson;
}

const getActivityLogs = async (startDateString, endDateString) => {
  let response = await fetch(getActivityLog + `?start=${startDateString}&end=${endDateString}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + (await getToken()),
      Accept: 'application/json',
      'Content-type': 'application/json',
    }
  });
  let responseJson = await response.json();
  return responseJson;
}

const getActivitySummaries = async (startDateString, endDateString) => {
  let response = await fetch(getActivitySummary + `?start=${startDateString}&end=${endDateString}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + (await getToken()),
      Accept: 'application/json',
      'Content-type': 'application/json',
    }
  });
  let responseJson = await response.json();
  return responseJson;
}

export {
  glucoseAddLogRequest,
  storeMedications,
  medicationAddLogRequest,
  getMedication4Day,
  weightAddLogRequest,
  mealAddLogRequest,
  getBloodGlucoseLogs,
  getMedicationLogs,
  getWeightLogs,
  getActivityLogs,
  getActivitySummaries
};
