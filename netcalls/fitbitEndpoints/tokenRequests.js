import {getToken, storeFitbitToken} from "../../storage/asyncStorageFunctions";
import {fitbitTokenPostEndpoint} from "../urls";

const postFitbitToken = async ({access_token, refresh_token, user_id}) => {
    const bodyPayload = {
        access_token,
        refresh_token,
        fitbit_id: user_id
    };
    let response = await fetch(fitbitTokenPostEndpoint, {
        method: "POST",
        headers: {
            Authorization: 'Bearer ' + (await getToken()),
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(bodyPayload)
    });
    let localStoreResp = await storeFitbitToken(bodyPayload);
    return await response.json();
}

export {postFitbitToken};