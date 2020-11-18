import {StyleSheet} from 'react-native';
import {Colors} from './colors';
import {adjustSize} from '../commonFunctions/autoResizeFuncs';


const GameCenterStyles = StyleSheet.create({
    modalView: {
        flex:1,
        backgroundColor: 'white',
        marginHorizontal: '5%',
        marginVertical: '8%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalViewSmall: {
        backgroundColor: 'white',
        marginVertical: '8%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        margin: '2%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.gameColorGrey,
    },
    cardGreen: {
        backgroundColor: '#fff',
        margin: '2%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.gameColorGreen,
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
        padding: '3%',
    },
    buttonStyleNarrow: {
        borderRadius: 9.5,
        marginVertical: '2%',
        marginHorizontal: '10%',
        alignSelf: 'stretch',
        padding: '3%',
    },
    darkGreenColor:{
        backgroundColor: Colors.gameColorDarkGreen,
    },
    nextColor:{
        backgroundColor: Colors.gameColorGreen,
    },
    marginBottom:{
        marginBottom: '10%',
    },
    backColor: {
        backgroundColor: Colors.gameColorGrey,
    },
    iconProps: {
        width: adjustSize(30),
        height: adjustSize(30),
    },
    rewardIconProps: {
        width: adjustSize(80),
        height: adjustSize(80),
    },
    subText:{
        fontSize: adjustSize(20),
    },
    textBold:{
        fontFamily: 'SFProDisplay-Bold',
    },
    center:{
        justifyContent:'center',
        alignItems:'center',
        width: '100%'
    },
    wordText:{
        fontSize: adjustSize(18),
    },
    greenText:{
        color: Colors.gameColorGreen,
    },
    whiteText:{
        color: Colors.gameColorWhite,
    },
    greyText:{
        color: Colors.textGrey,
    },
    redText:{
        color: Colors.alertColor,
    },
    darkGreen:{
        color: Colors.gameColorDarkGreen,
    },
    subContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    subContainerVertical: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column'
    },
    subContainerNarrow: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    verticalContainer: {
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column'
    },
    verticalContainerLeft: {
        flex:1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        paddingHorizontal: adjustSize(10),
    },
    logo:{
        width:'100%',
        height: undefined,
        aspectRatio:2.5,
    },
    subLogo:{
        width:'80%',
        height: undefined,
        aspectRatio:2.5,
    },
    spinLogo:{
        width:'100%',
        height: undefined,
        aspectRatio:1.5,
    },
    voucherLogo: {
        width:'50%',
        height: undefined,
        aspectRatio:1,
    },
    ballImage: {
        width: adjustSize(80),
        height: adjustSize(80),
    },
});

export default GameCenterStyles;
