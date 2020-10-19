import {pusherTokenEndpoint} from "../urls";

async function getPusherToken(authToken) {
    let resp = await fetch(pusherTokenEndpoint, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    });
    let respJson = resp.json();
    return respJson;
}

export {getPusherToken};
