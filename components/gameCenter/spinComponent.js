import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
//styles
import GameCenterStyles from '../../styles/gameCenterStyles';
import {Colors} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';


const SpinComponent = (props) => {
    const [spinProgress, setSpinProgress] = useState(false);

    const spinImageDisplay = () => {
        if(spinProgress){
            return require('../../resources/images/gameCenter/2x/img-spinner-animate-2x.gif')
        }
        return require('../../resources/images/gameCenter/img-spinner-static.png');
    }

    const textDisplay = () => {
        if(spinProgress){
            return 'Number Rolling'
        }
        return 'Tab to Spin'
    }

    const nextTextDisplay = () => {
        if(spinProgress){
            return 'Continue'
        }
        return 'Cancel'
    }

    const nextFunc = () => {
        if(spinProgress){
            props.processSpin();
        }else{
            props.closeModal();
        }
    }

    const backgroundStyle = () => {
        if(spinProgress){
            return styles.sliderBackgroundRevert
        }
        return styles.sliderBackground
    }

    const textStyle = () => {
        if(spinProgress){
            return [GameCenterStyles.subText, GameCenterStyles.whiteText]
        }
        return [GameCenterStyles.subText, GameCenterStyles.darkGreen]
    }

    return (
        <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding]}>
            <Image resizeMode="contain" style={GameCenterStyles.spinLogo} source={spinImageDisplay()}/>

            <View style={styles.sliderContainer}>
                <TouchableOpacity style={backgroundStyle()} disabled={spinProgress} onPress={() => {setSpinProgress(true)}}>
                    <Text style={textStyle()}>{textDisplay()}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.press} onPress={() => {nextFunc()}}>
                <Text style={globalStyles.actionButtonText}>{nextTextDisplay()}</Text>
            </TouchableOpacity>

        </View>
    );
};

export default SpinComponent;

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
