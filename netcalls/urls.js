const server = 'https://sghempower.com/';

const patientLogin = server + 'auth/patient-login';
const isTokenValid = server + 'auth/is-token-valid';
const glucoseAddLog = server + 'log/glucose/add-log';
const medicationAddLog = server + 'log/medication/add-log';
const medicationList = server + 'log/medication/list';
const weightAddLog = server + 'log/weight/add-log';

export {
  patientLogin,
  isTokenValid,
  glucoseAddLog,
  medicationAddLog,
  medicationList,
  weightAddLog,
};
