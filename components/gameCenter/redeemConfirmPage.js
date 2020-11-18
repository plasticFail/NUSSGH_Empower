import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import GameCenterStyles from '../../styles/gameCenterStyles';
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {GetRewardIconByKey} from '../../commonFunctions/gameCenterFunctions';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';


const colorIcon = enable => {
    if(enable){
        return Colors.gameColorGreen;
    }
    return Colors.gameColorGrey;
}

const enableMinus = quantity => {
    return quantity > 1;
}

const enablePlus = (quantity, item_point, total_points) => {
    return (quantity + 1) * item_point <= total_points;
}


const RedeemConfirmPage = (props) => {
    const {item, points, redeemHandler, closeModal} = props;

    const [quantity, setQuantity] = useState(1);

    return (
        <View style={[GameCenterStyles.modalViewSmall, GameCenterStyles.card, GameCenterStyles.cardPadding]}>
            <Text style={[GameCenterStyles.subText, GameCenterStyles.textBold]}>Voucher Info</Text>
            <Image
                resizeMode="contain"
                style={GameCenterStyles.voucherLogo}
                source={GetRewardIconByKey(item.content.icon)}
            />
            <Text style={[GameCenterStyles.subText, GameCenterStyles.textBold]}>{item.content.name}</Text>
            <Text style={[GameCenterStyles.subText]}>{item.content.points} points</Text>

            <View style={[GameCenterStyles.subContainerNarrow, {marginTop: '3%'}]}>
                <TouchableOpacity disabled={!enableMinus(quantity)} onPress={() => {setQuantity(quantity - 1)}}>
                    <Ionicon
                        name="remove-circle"
                        size={adjustSize(40)}
                        color={colorIcon(enableMinus(quantity))}
                    />
                </TouchableOpacity>
                <Text style={[GameCenterStyles.subText, {marginStart: adjustSize(20), marginEnd: adjustSize(20)}]}>{quantity}</Text>
                <TouchableOpacity disabled={!enablePlus(quantity, item.content.points, points)} onPress={() => {setQuantity(quantity + 1)}}>
                    <Ionicon
                        name="add-circle"
                        size={adjustSize(40)}
                        color={colorIcon(enablePlus(quantity, item.content.points, points))}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[GameCenterStyles.buttonStyleNarrow, GameCenterStyles.nextColor, {marginTop: '3%'}]}
                onPress={() => {redeemHandler(item._id, quantity)}}>
                <Text style={globalStyles.actionButtonText}>Redeem</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[GameCenterStyles.buttonStyleNarrow, GameCenterStyles.backColor, {marginTop: '3%'}]}
                onPress={() => {closeModal()}}>
                <Text style={globalStyles.actionButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RedeemConfirmPage;
