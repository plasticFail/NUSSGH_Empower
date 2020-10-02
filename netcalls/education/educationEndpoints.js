import {Dimensions} from 'react-native';
import {mediaHeight, mediaWidth} from "../../components/education/EducationMediaRow";

const {width, height} = Dimensions.get('window');

const defaultAspectRatio =  9 / 16;

const widthFrac = mediaWidth / width;

async function getArticles() {
    return [
        {
            title: "Management of hypoglycemia",
            organization: "Healthhub",
            mediaDisplayUri: "https://q6j7k6h3.rocketcdn.me/wp-content/uploads/2019/10/Better-Technology-Means-Better-Care-for-Diabetes-Management.jpg",
            uriType: "image"
        },
        {
            title: "Diabetes best food to eat",
            organization: "SingHealth",
            mediaDisplayUri: `<iframe src=\"https://www.youtube.com/embed/AM5MgWN5C8c\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>`,
            uriType: "html"
        },
        {
            title: "Another diabetes video kekw",
            organization: "Kek",
            mediaDisplayUri: `<iframe src="https://www.youtube.com/embed/QmyXdUqdCNE" frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>`,
            uriType: "html"
        }
    ]
}

async function getHypoCorrectionFoodArticles() {
    return [
        {
            'food-name': "Instant Coffee Zero Sugar",
            serving: 1,
            imgUrl: {
                url: "https://greenmartsg.com/wp-content/uploads/2019/01/Nescafe-Instant-Coffee-2-in-1-Zero-Sugar-Added-35sticks.jpg"
            }
        }
    ]
}

export {getArticles, getHypoCorrectionFoodArticles};
