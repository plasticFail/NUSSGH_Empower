import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import GameCenterStyles from '../../styles/gameCenterStyles';
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';
import SpinFinishItem from './spinFinishItem';
import {GetIconByWord} from '../../commonFunctions/gameCenterFunctions';


const SpinFinish = (props) => {
    const {spinResponse} = props;

    return  <View style={[styles.container, GameCenterStyles.card, GameCenterStyles.cardPadding]}>
        <Text style={[globalStyles.pageDetails]}>You Got a Number {props.number}</Text>
        <View style={styles.overlayContainer}>
            <Image source={require('../../resources/images/gameCenter/img-green-rolled.png')} style={GameCenterStyles.ballImage} />
            <View style={styles.textInBallContainer}>
                <Text style={[GameCenterStyles.subText, GameCenterStyles.darkGreen]}>{spinResponse.hit_number}</Text>
            </View>
        </View>
        <TouchableOpacity
            style={[GameCenterStyles.buttonStyle, GameCenterStyles.nextColor]}
            onPress={() => {props.closeModal()}}>
            <Text style={globalStyles.actionButtonText}>Continue</Text>
        </TouchableOpacity>
        <View style={styles.divider}/>
        <SpinFinishItem imgSource={require('../../resources/images/Patient-Icons/2x/icon-navy-reward-2x.png')} title={'Reword Points'} content={'+' + spinResponse.gained_points + ' Points'}/>
        <View style={styles.divider}/>
        <SpinFinishItem imgSource={require('../../resources/images/Patient-Icons/2x/icon-navy-game-2x.png')} title={'Game Center'} content={spinResponse.chance_used + ' Chance Used'}/>
        <View style={styles.divider}/>
        <SpinFinishItem imgSource={GetIconByWord(spinResponse.game_state.word)} title={'Work Progress'} content={'+' + spinResponse.gained_progress + '%'}/>
    </View>;
}

export default SpinFinish;

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    overlayContainer:{
        marginTop:"2%",
        justifyContent:'center',
        alignItems:'center',
        overflow: 'hidden',
    },
    textInBallContainer:{
        justifyContent: 'center',
        alignItems:'center',
        position: 'absolute',
    },
    divider:{
        marginTop: '2%',
        width:'100%',
        height:2,
        backgroundColor: Colors.gameColorGrey,
    },
})
