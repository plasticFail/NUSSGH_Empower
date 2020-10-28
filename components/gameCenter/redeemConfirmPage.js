import React from 'react';
import {Image, Text, View} from 'react-native';
import GameCenterStyles from '../../styles/gameCenterStyles';


const RedeemConfirmPage = (props) => {
    return (
        <View style={[GameCenterStyles.modalViewSmall, GameCenterStyles.card, GameCenterStyles.cardPadding]}>
            <Text style={[GameCenterStyles.subText, GameCenterStyles.textBold]}>Voucher Info</Text>
            <Image
                resizeMode="contain"
                style={GameCenterStyles.voucherLogo}
                source={require('../../resources/images/Voucher-Images/2x/img-voucher-wg-2x.png')}
            />
            <Text style={[GameCenterStyles.subText, GameCenterStyles.textBold]}>Mall Voucher</Text>
            <Text style={[GameCenterStyles.subText]}>100 points</Text>

            <View>

            </View>
        </View>
    );
};

export default RedeemConfirmPage;
