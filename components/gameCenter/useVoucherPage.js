import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import GameCenterStyles from '../../styles/gameCenterStyles';
import globalStyles from '../../styles/globalStyles';



const UseVoucherPage = (props) => {
    return (
        <View style={[GameCenterStyles.modalViewSmall, GameCenterStyles.card, GameCenterStyles.cardPadding]}>
            <Text style={[GameCenterStyles.subText, GameCenterStyles.textBold]}>Use Voucher</Text>
            <Text style={[GameCenterStyles.subText, GameCenterStyles.textBold]}>$5 Health Promotion Board Voucher</Text>
            <TouchableOpacity style={{marginTop: '2%'}} onPress={() => {}}>
                <Text style={[globalStyles.actionButtonText, GameCenterStyles.redText]}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UseVoucherPage;

