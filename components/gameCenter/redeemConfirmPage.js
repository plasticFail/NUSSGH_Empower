import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import GameCenterStyles from '../../styles/gameCenterStyles';
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';
import Ionicon from 'react-native-vector-icons/Ionicons';


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

            <View style={[GameCenterStyles.subContainerNarrow, {marginTop: '3%'}]}>
                <Ionicon
                    name="remove-circle"
                    size={40}
                    color={Colors.gameColorGreen}
                    onPress={() => this.setState({showTutorial: true})}
                />
                <Text style={[GameCenterStyles.subText, {marginStart: 20, marginEnd: 20}]}>1</Text>
                <Ionicon
                    name="add-circle"
                    size={40}
                    color={Colors.gameColorGreen}
                    onPress={() => this.setState({showTutorial: true})}
                />
            </View>
            <TouchableOpacity
                style={[GameCenterStyles.buttonStyleNarrow, GameCenterStyles.nextColor, {marginTop: '3%'}]}
                onPress={() => {}}>
                <Text style={globalStyles.actionButtonText}>Redeem</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RedeemConfirmPage;
