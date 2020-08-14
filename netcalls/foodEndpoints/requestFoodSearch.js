import {foodSearchEndpoint} from "../urls";
import {getToken} from "../../storage/asyncStorageFunctions";

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

export default requestFoodSearch;