import {favouriteMealListEndpoint, mealListEndpoint} from "../urls";
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

export {requestFavouriteMealList, requestMealLogList};