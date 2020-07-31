import {glucoseAddLog, medicationAddLog, medicationList, weightAddLog} from './urls';


const glucoseAddLogRequest = async(bgReading, recordDate) => {
    try {
        let response = await fetch(glucoseAddLog, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                bgReading: bgReading,
                recordDate: recordDate,
            }),
        });
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson.message;
    } catch (error) {
        console.error(error);
    }
    return null;
}

const medicationAddLogRequest = async(unit, dosage, drugName, recordDate) => {
    try {
        let response = await fetch(medicationAddLog, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                unit: unit,
                dosage: dosage,
                drugName: drugName,
                recordDate: recordDate,
            }),
        });
        let responseJson = await response.json();
        console.log(responseJson);
        return responseJson.message;
    } catch (error) {
        console.error(error);
    }
    return null;
}
