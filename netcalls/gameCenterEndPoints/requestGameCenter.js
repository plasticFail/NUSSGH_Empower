import {gameCenterGetOverview, gameCenterSelectGame, gameCenterPerformSpin} from '../urls';
import {getToken} from "../../storage/asyncStorageFunctions";


const requestGetOverview = async () => {
    try {
        let response = await fetch(gameCenterGetOverview, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + (await getToken()),
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        });
        let responseJson = await response.json();
        console.log('requestGetOverview : ' + JSON.stringify(responseJson));
        return responseJson;
    }catch (error) {
        console.error(error);
        return null;
    }
}

const requestSelectGame = async (word) => {
    try {
        let response = await fetch(gameCenterSelectGame, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + (await getToken()),
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                word: word
            }),
        });
        let responseJson = await response.json();
        console.log('requestSelectGame : ' + JSON.stringify(responseJson));
        return responseJson;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const requestPerformSpin = async (word, index) => {
    try {
        let response = await fetch(gameCenterPerformSpin, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + (await getToken()),
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                word: word,
                index: index,
            }),
        });
        let responseJson = await response.json();
        console.log('requestPerformSpin : ' + JSON.stringify(responseJson));
        return responseJson;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export {requestGetOverview, requestSelectGame, requestPerformSpin};
