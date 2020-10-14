import React from 'react';
import GameCenterStyles from '../../styles/gameCenterStyles';
import {Image, Text, TouchableOpacity, View} from 'react-native';


const SelectWordItem = props => {
    const {imageSource, wordText, clickFunc} = props;
    return (
        <View
            style={[
                GameCenterStyles.card,
                GameCenterStyles.cardPadding,
                GameCenterStyles.subContainer,
            ]}>
            <Image
                source={imageSource}
                style={GameCenterStyles.iconProps}
            />
            <Text style={GameCenterStyles.wordText}>{wordText}</Text>
            <TouchableOpacity
                onPress={() => {
                    clickFunc();
                }}>
                <Image
                    source={require('../../resources/images/Patient-Icons/2x/icon-grey-chevron-right-2x.png')}
                    style={GameCenterStyles.iconProps}
                />
            </TouchableOpacity>
        </View>
    );
};

export default SelectWordItem;
