const server = 'https://sghempower.com/';

const patientLogin = server + 'auth/patient-login';
const isTokenValid = server + 'auth/is-token-valid';
const glucoseAddLog = server + 'log/glucose';
const medicationAddLog = server + 'log/medication';
const medicationList = server + 'log/medication/list';
const weightAddLog = server + 'log/weight';
const getActivityLog = server + '/log/activity';
const getActivitySummary = server + '/log/activity/summary';
const mealAddLogEndpoint = server + 'log/meal';
const unfavouriteMealEndpoint = server + 'log/meal/unfavourite-meal';
const mealListEndpoint = server + 'log/meal';
const favouriteMealListEndpoint = server + 'log/meal/favourite-list';
const nutrientConsumptionEndpoint = server + 'log/meal/nutrient-consumption';
const foodSearchEndpoint = server + 'food/search';
const requestOTP = server + 'auth/patient/password-reset/request-otp';
const verifyOTP = server + 'auth/patient/password-reset/verify-otp';
const postNewPassword = server + 'auth/patient/password-reset/reset';
const medPlan = server + 'log/medication/plan/by-date';
const fitbitTokenPostEndpoint = server + 'datasync/auth-fitbit';
const getDiaryEntries = server + 'log/diary';

export {
  patientLogin,
  isTokenValid,
  glucoseAddLog,
  medicationAddLog,
  medicationList,
  weightAddLog,
  mealAddLogEndpoint,
  mealListEndpoint,
  favouriteMealListEndpoint,
  unfavouriteMealEndpoint,
  foodSearchEndpoint,
  requestOTP,
  verifyOTP,
  postNewPassword,
  medPlan,
  fitbitTokenPostEndpoint,
  nutrientConsumptionEndpoint,
  getDiaryEntries,
  getActivityLog,
  getActivitySummary
};
