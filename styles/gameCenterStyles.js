import {StyleSheet} from 'react-native';
import {Colors} from './colors';


const GameCenterStyles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        margin: '2%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.gameColorGrey,
    },
    cardPadding: {
        paddingHorizontal: '3%',
        paddingVertical: 10,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonStyle: {
        borderRadius: 9.5,
        margin: '2%',
        alignSelf: 'stretch',
        marginBottom: '15%',
        padding: '3%',
    },
    nextColor:{
        backgroundColor: Colors.gameColorGreen,
    },
    backColor: {
        backgroundColor: Colors.gameColorGrey,
    },
});

export default GameCenterStyles;
