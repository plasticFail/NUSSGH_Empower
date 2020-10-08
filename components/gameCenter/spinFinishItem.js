import React from 'react';
import {Image, Text, View} from 'react-native';
import GameCenterStyles from '../../styles/gameCenterStyles';
import ProgressBar from '../progressbar';
import {Colors} from '../../styles/colors';


const SpinFinishItem = (props) => {
    return  <View style={[GameCenterStyles.cardPadding, GameCenterStyles.subContainer]}>
        <Image source={props.imgSource} style={GameCenterStyles.iconProps} />
        <View style={[GameCenterStyles.verticalContainerLeft]}>
            <Text style={[GameCenterStyles.wordText, GameCenterStyles.greyText]}>{props.title}</Text>
            <Text style={GameCenterStyles.wordText}>{props.content}</Text>
        </View>
    </View>;
}

export default SpinFinishItem;
