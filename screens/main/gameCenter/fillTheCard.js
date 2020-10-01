import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
//third party libs
import Ionicon from 'react-native-vector-icons/Ionicons';
//styles
import globalStyles from '../../../styles/globalStyles';
import GameCenterStyles from '../../../styles/gameCenterStyles';
import {Colors} from '../../../styles/colors';
//components
import LeftArrowBtn from '../../../components/logs/leftArrowBtn';
import ProgressBar from '../../../components/progressbar';
import DotBoard from '../../../components/gameCenter/dotBoard';
//functions
import {getPattern} from '../../../constants/gameCenter/letterPattern';
import {getRandomBoard} from '../../../constants/gameCenter/randomBingo';



const LetterDotColor = (currentLetter, letter) => {
    if(currentLetter === letter){
        return Colors.gameColorGreen;
    }
    return Colors.gameColorGrey;
}

const FillTheCard = (props) => {

    const [currentLetter, setCurrentLetter] = useState(0);
    const letters = ['F','I','T'];
    const [spinNum, setSpinNum] = useState([]);

    const disableSpin = () => {
        let pattern = getPattern(letters[currentLetter]);
        let boardNum = getRandomBoard(currentLetter);

        console.log('here');

        for(let i=0; i<boardNum.length; i++){
            for(let j=0; j<boardNum[i].length; j++){
                console.log('i : ' + i + ' j : ' + j + ' pattern : ' + pattern[i][j]);
                if(pattern[i][j] === 1){
                    if(!spinNum.includes(boardNum[i][j])){
                        return false;
                    }
                }
            }
        }

        return true;
    }

    const colorOfSpin = disabled =>{
        if(disabled){
            return GameCenterStyles.backColor;
        }
        return GameCenterStyles.nextColor;
    }

    const addSpinNum = () => {
        let number = generateSpinNum(10);
        if(number !== null) {
            setSpinNum([...spinNum, number]);
        }
    }

    const generateSpinNum = (count) => {
        let number = Math.ceil(Math.random() * 25) + currentLetter * 25;
        if(count > 0) {
            if (spinNum.includes(number)) {
                return generateSpinNum(count - 1);
            }
            return number;
        }
        return nextSpinNumber(25, number);
    }

    const nextSpinNumber = (count, number) => {
        if(count > 0) {
            if (number % 25 > 0) {
                number ++;
            } else {
                number -= 24;
            }
            if (spinNum.includes(number)) {
                return nextSpinNumber(count-1, number);
            }
            return number;
        }
        return null;
    }

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
                <TouchableOpacity onPress={() => {currentLetter > 0 && setCurrentLetter(currentLetter - 1)}}>
                    <Image source={require('../../../resources/images/Patient-Icons/2x/icon-grey-chevron-left-2x.png')} style={GameCenterStyles.iconProps} />
                </TouchableOpacity>
                <DotBoard bingoPattern={getPattern(letters[currentLetter])} boardNum={getRandomBoard(currentLetter)} spinNum={spinNum}/>
                <TouchableOpacity onPress={() => {currentLetter < letters.length - 1 && setCurrentLetter(currentLetter + 1)}}>
                    <Image source={require('../../../resources/images/Patient-Icons/2x/icon-grey-chevron-right-2x.png')} style={GameCenterStyles.iconProps} />
                </TouchableOpacity>
            </View>

            <View style={GameCenterStyles.subContainerNarrow}>
                {letters.map((item, index) => (
                    <Ionicon
                        name="ellipse"
                        size={20}
                        style={styles.stepDot}
                        color={LetterDotColor(currentLetter, index)}
                    />
                ))}
            </View>

            <TouchableOpacity
                style={[GameCenterStyles.buttonStyleNarrow, colorOfSpin(disableSpin())]}
                disabled={disableSpin()}
                onPress={addSpinNum}>
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
