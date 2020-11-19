import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import GameCenterStyles from '../../styles/gameCenterStyles';
import globalStyles from '../../styles/globalStyles';
import QRCode from 'react-native-qrcode-svg';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';


const UseVoucherPage = (props) => {
    const {item, closeModal} = props;

    return (
        <View style={[GameCenterStyles.modalViewSmall, GameCenterStyles.card, GameCenterStyles.cardPadding]}>
            <Text style={[GameCenterStyles.subText, GameCenterStyles.textBold, {marginVertical: '3%'}]}>Use Voucher</Text>
            <QRCode
                size={adjustSize(200)}
                value={item.qr_code}
            />
            <Text style={[GameCenterStyles.subText, GameCenterStyles.textBold, {marginVertical: '3%'}]}>{item.content.name}</Text>
            <TouchableOpacity style={{marginTop: '2%'}} onPress={() => {closeModal()}}>
                <Text style={[globalStyles.actionButtonText, GameCenterStyles.redText]}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UseVoucherPage;

