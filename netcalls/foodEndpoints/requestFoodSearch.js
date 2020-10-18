import {foodSearchByNameEndpoint, foodSearchEndpoint} from "../urls";
import {getToken} from "../../storage/asyncStorageFunctions";

const qs = require('qs');

const requestFoodSearch = async (query, type) => {
    let response = await fetch(foodSearchEndpoint, {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + (await getToken()),
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            query,
            type
        }),
    });
    let responseJson = await response.json();
    return responseJson;
}

const requestFoodSearchByName = async (names) => {
    let queries = [];
    for (const name of names) {
        queries.push(qs.stringify({name}));
    }
    let queryParams = '?' + queries.join("&");
    let response = await fetch(foodSearchByNameEndpoint + queryParams, {
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

export {requestFoodSearch, requestFoodSearchByName};
