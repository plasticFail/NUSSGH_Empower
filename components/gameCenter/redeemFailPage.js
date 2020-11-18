import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import GameCenterStyles from '../../styles/gameCenterStyles';
import {Colors} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';


const RedeemFailPage = (props) => {
    const {closeModal} = props;

    return (
        <View style={[GameCenterStyles.modalViewSmall, GameCenterStyles.card, GameCenterStyles.cardPadding]}>
            <Text style={[GameCenterStyles.subText, {marginVertical: '5%'}]}>Not Enough Points</Text>
            <Ionicon
                name="close-circle-outline"
                size={adjustSize(80)}
                color={Colors.alertColor}
            />
            <TouchableOpacity style={{marginTop: '2%'}} onPress={() => {closeModal()}}>
                <Text style={[globalStyles.actionButtonText]}>Ok</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RedeemFailPage;
