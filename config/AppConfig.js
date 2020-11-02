// url to open application from web
const appRootUrl = "edu.nus.com.empower://";

// incomplete
const availablePaths = new Set([
    "PatientDashBoard",
    "CaregiverDashBoard",
    "Login",
    "Appointment",
    "Goals",
    "Medication",
    "Diary",
    "MedicationPlan",
    "Reports",
    "AddLog",
    "Alerts",
    "Chat"
]);

// Add more paths when more redirect options are available. Handle the routing in appRoot.
const notificationPathMapping = {
    "LOG_NEW": "AddLog",
    "GAME": "GameCenter",
    "REWARDS_REDEEM": "GameCenter/rewards" // go to rewards redemption page in game center
}

export {appRootUrl, availablePaths, notificationPathMapping};
