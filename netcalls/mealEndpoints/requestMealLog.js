import {
    favouriteMealListEndpoint,
    mealListEndpoint,
    nutrientConsumptionEndpoint,
    unfavouriteMealEndpoint
} from "../urls";
import {getToken} from "../../storage/asyncStorageFunctions";

const requestFavouriteMealList = async () => {
    let response = await fetch(favouriteMealListEndpoint, {
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

const requestMealLogList = async () => {
    let response = await fetch(mealListEndpoint, {
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

const requestUnfavouriteMeal = async (mealName) => {
    let response = await fetch(unfavouriteMealEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await getToken())
        },
        body: JSON.stringify({
            mealName
        })
    });
    let responseJson = await response.json();
    return responseJson;
}

const requestNutrientConsumption = async (startDate, endDate) => {
    let response = await fetch(nutrientConsumptionEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await getToken())
        },
        body: JSON.stringify({
            startDate,
            endDate
        })
    });
    let responseJson = await response.json();
    return responseJson;
}

export {requestFavouriteMealList, requestMealLogList, requestUnfavouriteMeal, requestNutrientConsumption};
//edit flag
