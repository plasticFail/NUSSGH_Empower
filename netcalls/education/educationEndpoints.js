import {Dimensions} from 'react-native';
import {mediaHeight, mediaWidth} from "../../components/education/EducationMediaRow";
import {requestFoodSearchByName} from "../foodEndpoints/requestFoodSearch";
import {educationArticlesEndpoint} from "../urls";
import {getToken} from "../../storage/asyncStorageFunctions";

const {width, height} = Dimensions.get('window');

const defaultAspectRatio =  9 / 16;

const widthFrac = mediaWidth / width;

async function getArticles() {
    let response = await fetch(educationArticlesEndpoint, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + (await getToken()),
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
    });
    let responseJson = await response.json();

    return responseJson;
    /*
    return [
        {
            title: "Management of hypoglycemia",
            organization: "Healthhub",
            picture_url: "https://q6j7k6h3.rocketcdn.me/wp-content/uploads/2019/10/Better-Technology-Means-Better-Care-for-Diabetes-Management.jpg",
            video_url: null,
            url: "https://care.diabetesjournals.org/articles/most-read"
        },
        {
            title: "Diabetes best food to eat",
            organization: "SingHealth",
            video_url: "https://www.youtube.com/embed/AM5MgWN5C8c",
            picture_url: "https://img.youtube.com/vi/AM5MgWN5C8c/0.jpg",
            url: "https://www.youtube.com/watch?v=AM5MgWN5C8c"
        },
        {
            title: "Another diabetes video",
            organization: "Youtube",
            video_url: "https://www.youtube.com/embed/QmyXdUqdCNE",
            picture_url: "https://img.youtube.com/vi/QmyXdUqdCNE/0.jpg",
            url: "https://www.youtube.com/watch?v=QmyXdUqdCNE"
        }
    ]
    */
}

async function getHypoCorrectionFoodArticles() {
    const results = await requestFoodSearchByName(['sliced fish bee hoon with milk', 'raw bee hoon']);
    return results.data;
}

export {getArticles, getHypoCorrectionFoodArticles};
