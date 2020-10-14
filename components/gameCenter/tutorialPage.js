import React, {useState} from 'react';
import GameCenterStyles from '../../styles/gameCenterStyles';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
//third party libs
import Ionicon from 'react-native-vector-icons/Ionicons';
//styles
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';


const NextBtnText = currentStep => {
    if(currentStep === 3){
        return 'Close';
    }
    return 'Next';
}

const StepDotColor = (currentStep, step) => {
    if(currentStep === step){
        return Colors.gameColorGreen;
    }
    return Colors.gameColorGrey;
}

const tutorialImage = currentStep => {
    switch (currentStep){
        case 0:
            return require('../../resources/images/gameCenter/tutorial/img-gamecenter-modal-1.jpg');
        case 1:
            return require('../../resources/images/gameCenter/tutorial/img-gamecenter-modal-2.jpg');
        case 2:
            return require('../../resources/images/gameCenter/tutorial/img-gamecenter-modal-3.jpg');
        default:
            return require('../../resources/images/gameCenter/tutorial/img-gamecenter-modal-4.jpg');
    }
}

const subTutorialImage = currentStep => {
    switch (currentStep){
        case 0:
            return require('../../resources/images/gameCenter/tutorial/sub1.png');
        case 1:
            return require('../../resources/images/gameCenter/tutorial/sub2.png');
        case 2:
            return require('../../resources/images/gameCenter/tutorial/sub3.png');
        default:
            return require('../../resources/images/gameCenter/tutorial/sub4.png');
    }
}

const TutorialPage = (props) => {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = [0,0,0,0];

    const prevHandler = () => {
        if(currentStep > 0){
            setCurrentStep(currentStep - 1);
        }
    }

    const nextHandler = () => {
        if(currentStep < 3){
            setCurrentStep(currentStep + 1);
        }else{
            props.closeModal();
        }
    }

    return <View style={[GameCenterStyles.modalView, GameCenterStyles.card, GameCenterStyles.cardPadding]}>
        <Image resizeMode="contain" style={styles.image} source={tutorialImage(currentStep)}/>
        <Image resizeMode="contain" style={styles.imageSub} source={subTutorialImage(currentStep)}/>
        <View style={GameCenterStyles.subContainerNarrow}>
            {steps.map((item, index) => (
                <Ionicon
                    key={index}
                    name="ellipse"
                    size={20}
                    style={styles.stepDot}
                    color={StepDotColor(currentStep, index)}
                />
            ))}
        </View>
        <View style={GameCenterStyles.subContainer}>
            {currentStep > 0 &&
                (<TouchableOpacity
                    style={[GameCenterStyles.buttonStyle, GameCenterStyles.backColor, {width: '50%'}]}
                    onPress={prevHandler}>
                    <Text style={globalStyles.actionButtonText}>Back</Text>
                </TouchableOpacity>)
            }
            <TouchableOpacity
                style={[GameCenterStyles.buttonStyle, GameCenterStyles.nextColor, {width: '50%'}]}
                onPress={nextHandler}>
                <Text style={globalStyles.actionButtonText}>{NextBtnText(currentStep)}</Text>
            </TouchableOpacity>
        </View>
    </View>
}

export default TutorialPage;

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:undefined,
        aspectRatio:0.85,
    },
    imageSub:{
        width:'100%',
        height:undefined,
        aspectRatio:1.8,
    },
    stepDot:{
        marginHorizontal: 3
    },
});
