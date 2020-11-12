import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
//styles
import GameCenterStyles from '../../styles/gameCenterStyles';
import {Colors} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';


const SpinComponent = (props) => {
    return (
        <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding]}>
            <Image resizeMode="contain" style={GameCenterStyles.spinLogo} source={require('../../resources/images/gameCenter/img/img-spinner-animate.gif')}/>
        </View>
    );
};

export default SpinComponent;
