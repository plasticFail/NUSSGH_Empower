import AsyncStorage from '@react-native-community/async-storage';

const key_username = 'username';
const key_password = 'password';
const key_token = 'token';
const key_bloodGlucoseLog = 'lastBloodGlucoseLog';
const key_weightLog = 'lastWeightLog';
const key_medicationLog = 'lastMedicationLog';
const key_last_meal_log = 'lastMealLog';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('save ' + key + ' : ' + value);
  } catch (e) {
    // saving error
    console.log('error store : ' + key + ' : ' + e);
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('load ' + key + ' : ' + value);
      return value;
    }
  } catch (e) {
    // error reading value
    console.log('error getData : ' + e);
  }
  return null;
};

const storeDataObj = async (key, obj) => {
  try {
    let objString = JSON.stringify(obj);
    console.log('save obj ' + key + ' : ' + objString);
    await AsyncStorage.setItem(key, objString);
  } catch (e) {
    // saving error
    console.log('error store obj : ' + key + ' : ' + e);
  }
};

const getDataObj = async (key) => {
  try {
    let objString = await AsyncStorage.getItem(key);
    let obj = JSON.parse(objString);
    if (obj !== null) {
      console.log('load ' + key + ' : ' + objString);
      return obj;
    }
  } catch (e) {
    // error reading value
    console.log('error getData obj : ' + e);
  }
  return null;
};

const storeUsername = async (username) => {
  await storeData(key_username, username);
};

const getUsername = async () => {
  return await getData(key_username);
};

const storePassword = async (password) => {
  await storeData(key_password, password);
};

const getPassword = async () => {
  return await getData(key_password);
};

const storeToken = async (token) => {
  await storeData(key_token, token);
};

const getToken = async () => {
  return await getData(key_token);
};

const storeLastBgLog = async (bgLog) => {
  await storeDataObj(key_bloodGlucoseLog, bgLog);
};

const getLastBgLog = async () => {
  return await getDataObj(key_bloodGlucoseLog);
};

const storeLastWeightLog = async (weightLog) => {
  await storeDataObj(key_weightLog, weightLog);
};

const getLastWeightLog = async () => {
  return await getDataObj(key_weightLog);
};

const storeLastMedicationLog = async (medicationLog) => {
  await storeDataObj(key_medicationLog, medicationLog);
};

const getLastMedicationLog = async () => {
  return await getDataObj(key_medicationLog);
};
const storeLastMealLog = async (mealLog) => {
  return await storeDataObj(key_last_meal_log, mealLog);
};

const getLastMealLog = async () => {
  return await getDataObj(key_last_meal_log);
};

export {
  storeUsername,
  getUsername,
  storePassword,
  getPassword,
  storeToken,
  getToken,
  storeLastBgLog,
  getLastBgLog,
  storeLastWeightLog,
  getLastWeightLog,
  storeLastMedicationLog,
  getLastMedicationLog,
  storeLastMealLog,
  getLastMealLog,
};
