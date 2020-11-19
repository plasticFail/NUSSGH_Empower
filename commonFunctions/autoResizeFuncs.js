import {Platform, Dimensions} from 'react-native';

const defaultAndroidScreenWidth = 411;
const platformCode = Platform.OS
const screenWidth = Math.round(Dimensions.get('window').width);


const adjustSize = size => {
    switch (platformCode){
        case 'android':
            return Math.round(size * screenWidth / defaultAndroidScreenWidth);
        case 'ios':
            return Math.round(size * screenWidth / defaultAndroidScreenWidth);
    }
}


export {adjustSize}
