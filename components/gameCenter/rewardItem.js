import React from 'react';
import {Image, Text, View, Dimensions} from 'react-native';
import GameCenterStyles from '../../styles/gameCenterStyles';


const widthCal = divider => {
    let percentage = 100/divider - 4;
    return percentage + '%';
}

const imgWidthCal = (width, divider) => {
    return width / divider - 30;
}

const RewardItem = (props) => {
    const {width} = Dimensions.get('window');

    return (
        <View
            style={[
                GameCenterStyles.card,
                GameCenterStyles.cardPadding,
                GameCenterStyles.subContainerVertical,
                {width: widthCal(props.numberInRow)}
            ]}>

            <Image
                resizeMode="contain"
                style={{width: imgWidthCal(width, props.numberInRow), height: imgWidthCal(width, props.numberInRow)}}
                source={require('../../resources/images/Voucher-Images/2x/img-voucher-wg-2x.png')}
            />

            <Text style={[GameCenterStyles.subText, GameCenterStyles.textBold]}>Mall Voucher</Text>
            <Text style={[GameCenterStyles.subText]}>100 points</Text>

        </View>
    );
}

export default RewardItem;
