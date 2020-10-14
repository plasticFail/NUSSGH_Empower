const server = 'https://sghempower.com/';

const patientLogin = server + 'auth/patient-login';
const isTokenValid = server + 'auth/is-token-valid';
const glucoseAddLog = server + 'log/glucose';
const medicationAddLog = server + 'log/medication';
const medicationList = server + 'log/medication/list';
const weightAddLog = server + 'log/weight';
const getActivityLog = server + 'log/activity';
const getActivitySummary = server + 'log/activity/summary';
const mealAddLogEndpoint = server + 'log/meal';
const unfavouriteMealEndpoint = server + 'log/meal/unfavourite-meal';
const mealListEndpoint = server + 'log/meal';
const favouriteMealListEndpoint = server + 'log/meal/favourite-list';
const nutrientConsumptionEndpoint = server + 'log/meal/nutrient-consumption';
const foodSearchEndpoint = server + 'food/search';
const foodSearchByNameEndpoint = server + 'food/search-by-exact-name';
const hypocorrectionFoodEndpoint = server + 'food/hypocorrection'; // This endpoint will be deployed soon.
const requestOTP = server + 'auth/patient/password-reset/request-otp';
const verifyOTP = server + 'auth/patient/password-reset/verify-otp';
const postNewPassword = server + 'auth/patient/password-reset/reset';
const medPlan = server + 'log/medication/plan';
const fitbitTokenPostEndpoint = server + 'datasync/auth-fitbit';
const getDiaryEntries = server + 'log/diary';
const goal = server + '/goal';
const educationArticlesEndpoint = server + 'education/articles'; // This endpoint will be deployed soon.

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
  foodSearchByNameEndpoint,
  hypocorrectionFoodEndpoint,
  requestOTP,
  verifyOTP,
  postNewPassword,
  medPlan,
  fitbitTokenPostEndpoint,
  nutrientConsumptionEndpoint,
  getDiaryEntries,
  getActivityLog,
  goal,
  getActivitySummary,
  educationArticlesEndpoint,
};
