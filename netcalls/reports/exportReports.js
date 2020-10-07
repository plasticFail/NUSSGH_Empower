import {requestNutrientConsumption} from "../mealEndpoints/requestMealLog";
import {
    getActivityLogs,
    getActivitySummaries,
    getBloodGlucoseLogs,
    getMedicationLogs,
    getWeightLogs
} from "../requestsLog";
import Moment from 'moment';

async function getReportsData(reportTypes, startDate, endDate) {
    const datestringFormatForLogs = 'YYYY-MM-DD';
    const datestringFormatForNutritionLog = 'DD/MM/YYYY HH:mm:ss';
    let reportsList = {};

    for (const reportType of reportTypes) {
        let data = [];
        if (reportType === 'Blood Glucose') {
            data = (await getBloodGlucoseLogs(Moment(startDate).format(datestringFormatForLogs),
                Moment(endDate).format(datestringFormatForLogs))).logs;
        } else if (reportType === 'Food Intake') {
            data = (await requestNutrientConsumption(Moment(startDate).format(datestringFormatForNutritionLog),
                Moment(endDate).format(datestringFormatForNutritionLog))).data;
        } else if (reportType === 'Medication') {
            data = (await getMedicationLogs(Moment(startDate).format(datestringFormatForLogs),
                Moment(endDate).format(datestringFormatForLogs))).logs;
        } else if (reportType === 'Weight') {
            data = (await getWeightLogs(Moment(startDate).format(datestringFormatForLogs),
                Moment(endDate).format(datestringFormatForLogs))).logs;
        } else if (reportType === 'Activity') {
            data = (await getActivitySummaries(Moment(startDate).format(datestringFormatForLogs),
                Moment(endDate).format(datestringFormatForLogs))).summaries;
        }
        reportsList[reportType] = data;
    }
    return reportsList;
}

export {getReportsData};
