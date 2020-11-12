import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
//third party libs
import Slider from '@react-native-community/slider';
//styles
import GameCenterStyles from '../../styles/gameCenterStyles';
import {Colors} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';


const SpinSlider = (props) => {
    const [spinProgress, setSpinProgress] = useState(0);

    const disableSlider = () => {
        if(spinProgress === 1){
            return true;
        }
        return false;
    }

    const thumbImageDisplay = () => {
        if(spinProgress === 1){
            return require('../../resources/images/gameCenter/load_circle.png')
        }
        return require('../../resources/images/gameCenter/spin_arrow.png')
    }

    const spinImageDisplay = () => {
        if(spinProgress === 1){
            return require('../../resources/images/gameCenter/img/img-spinner-animate@2x.gif')
        }
        return require('../../resources/images/gameCenter/img-spinner-static.png');
    }

    const textDisplay = () => {
        if(spinProgress === 1){
            return 'Number Rolling'
        }
        return 'Slide to Spin'
    }

    const nextTextDisplay = () => {
        if(spinProgress === 1){
            return 'Continue'
        }
        return 'Cancel'
    }

    const nextFunc = () => {
        if(spinProgress === 1){
            props.processSpin();
        }else{
            props.closeModal();
        }
    }

    const backgroundStyle = () => {
        if(spinProgress === 1){
            return styles.sliderBackgroundRevert
        }
        return styles.sliderBackground
    }

    const textStyle = () => {
        if(spinProgress === 1){
            return [GameCenterStyles.subText, GameCenterStyles.whiteText]
        }
        return [GameCenterStyles.subText, GameCenterStyles.darkGreen]
    }

    return (
        <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding]}>
            <Image resizeMode="contain" style={GameCenterStyles.spinLogo} source={spinImageDisplay()}/>

            <View style={styles.sliderContainer}>
                <View style={backgroundStyle()}>
                    <Text style={textStyle()}>{textDisplay()}</Text>
                </View>
                <Slider style={styles.slider}
                        disabled={disableSlider()}
                        value={spinProgress}
                        onValueChange={(value)=> setSpinProgress(value) }
                        maximumTrackTintColor='transparent'
                        minimumTrackTintColor='transparent'
                        thumbImage={thumbImageDisplay()}/>
            </View>

            <TouchableOpacity style={styles.press} onPress={() => {nextFunc()}}>
                <Text style={globalStyles.actionButtonText}>{nextTextDisplay()}</Text>
            </TouchableOpacity>

        </View>
    );
};

export default SpinSlider;

const styles = StyleSheet.create({
    sliderContainer:{
        marginTop:"2%",
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 50,
        height:80,
        overflow: 'hidden',
    },
    sliderBackground: {
        backgroundColor: Colors.gameColorWhite,
        width: '87%',
        height: 80,
        borderRadius: 50,
        borderColor:Colors.gameColorDarkGreen,
        borderWidth:2,
        position: 'absolute',
        justifyContent: 'center',
        alignItems:'center',
    },
    sliderBackgroundRevert: {
        backgroundColor: Colors.gameColorDarkGreen,
        width: '87%',
        height: 80,
        borderRadius: 50,
        position: 'absolute',
        justifyContent: 'center',
        alignItems:'center',
    },
    slider:{
        width:'75%',
        position: 'absolute',
    },
    press:{
        marginTop: '2%',
    }
});
