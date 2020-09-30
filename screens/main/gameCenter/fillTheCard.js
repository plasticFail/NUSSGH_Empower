import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import LeftArrowBtn from '../../../components/logs/leftArrowBtn';
import GameCenterStyles from '../../../styles/gameCenterStyles';
import {Colors} from '../../../styles/colors';
import ProgressBar from '../../../components/progressbar';
import DotBoard from '../../../components/gameCenter/dotBoard';


const FillTheCard = (props) => {
    return (
        <View style={{...globalStyles.pageContainer, ...props.style}}>
            <View style={globalStyles.menuBarContainer}>
                <LeftArrowBtn close={() => props.navigation.goBack()} />
            </View>
            <Text style={globalStyles.pageHeader}>Fill The Card</Text>

            <View style={[GameCenterStyles.card, GameCenterStyles.subContainer]}>
                <View style={[GameCenterStyles.cardPadding, GameCenterStyles.subContainer, {width:'70%'}]}>
                    <Image source={require('../../../resources/images/Patient-Icons/2x/icon-navy-muscle-2x.png')} style={GameCenterStyles.iconProps} />
                    <View style={[GameCenterStyles.verticalContainer]}>
                        <Text style={GameCenterStyles.wordText}>FIT</Text>
                        <ProgressBar containerStyle={{height: 7.5, width: '50%'}} progress={`50%`}
                                     reverse={true}
                                     progressBarColor={Colors.gameColorGreen} />
                        <Text style={GameCenterStyles.wordText}>50%</Text>
                    </View>
                </View>
                <View style={styles.divider}/>
                <View style={[GameCenterStyles.cardPadding, GameCenterStyles.verticalContainer]}>
                    <Text style={GameCenterStyles.subText}>Chances</Text>
                    <Text style={[GameCenterStyles.subText, GameCenterStyles.greenText]}>2 Left</Text>
                </View>
            </View>

            <View style={[GameCenterStyles.cardPadding, GameCenterStyles.subContainer]}>
                <TouchableOpacity>
                    <Image source={require('../../../resources/images/Patient-Icons/2x/icon-grey-chevron-left-2x.png')} style={GameCenterStyles.iconProps} />
                </TouchableOpacity>
                <DotBoard/>
                <TouchableOpacity>
                    <Image source={require('../../../resources/images/Patient-Icons/2x/icon-grey-chevron-right-2x.png')} style={GameCenterStyles.iconProps} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[GameCenterStyles.buttonStyleNarrow, GameCenterStyles.nextColor]}>
                <Text style={globalStyles.actionButtonText}>Spin a Number</Text>
            </TouchableOpacity>

        </View>
    )
};

export default FillTheCard;

const styles = StyleSheet.create({
    divider:{
        height:'100%',
        width:2,
        backgroundColor: Colors.gameColorGrey,
    },
});
