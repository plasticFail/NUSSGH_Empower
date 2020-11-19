import React from 'react';
import GameCenterStyles from '../../styles/gameCenterStyles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import ProgressBar from '../progressbar';
import {Colors} from '../../styles/colors';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';


const WordItem = props => {
    const {imageSource, wordText, percentage, showArrow, clickFunc} = props;
    return (
        <View
            style={[
                GameCenterStyles.cardPadding,
                GameCenterStyles.subContainer,
            ]}>
            <Image
                source={imageSource}
                style={GameCenterStyles.iconProps}
            />
            <View style={[GameCenterStyles.verticalContainer]}>
                <Text style={GameCenterStyles.wordText}>{wordText}</Text>
                <ProgressBar
                    containerStyle={{height: adjustSize(7.5), width: '50%'}}
                    progress={percentage}
                    reverse={true}
                    progressBarColor={Colors.gameColorGreen}
                />
                <Text style={GameCenterStyles.wordText}>{percentage}</Text>
            </View>
            {showArrow &&
                <TouchableOpacity
                    onPress={() => {
                        clickFunc();
                    }}>
                    <Image
                        source={require('../../resources/images/Patient-Icons/2x/icon-grey-chevron-right-2x.png')}
                        style={GameCenterStyles.iconProps}
                    />
                </TouchableOpacity>
            }
        </View>
    );
};

export default WordItem;
