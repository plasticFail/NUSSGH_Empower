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

const notificationPathMapping = {
    "LOG_NEW": "AddLog"
}

export {appRootUrl, availablePaths, notificationPathMapping};
