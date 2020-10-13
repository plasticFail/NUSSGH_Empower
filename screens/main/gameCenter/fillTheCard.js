import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
//third party libs
import Ionicon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
//styles
import globalStyles from '../../../styles/globalStyles';
import GameCenterStyles from '../../../styles/gameCenterStyles';
import {Colors} from '../../../styles/colors';
//components
import LeftArrowBtn from '../../../components/logs/leftArrowBtn';
import ProgressBar from '../../../components/progressbar';
import DotBoard from '../../../components/gameCenter/dotBoard';
import SpinSlider from '../../../components/gameCenter/spinSlider';
import SpinFinish from '../../../components/gameCenter/spinFinish';
//functions
import {getPattern} from '../../../constants/gameCenter/letterPattern';
import {getRandomBoard} from '../../../constants/gameCenter/randomBingo';
import WordItem from '../../../components/gameCenter/wordItem';


const LetterDotColor = (currentLetter, letter) => {
    if(currentLetter === letter){
        return Colors.gameColorGreen;
    }
    return Colors.gameColorGrey;
}

const FillTheCard = (props) => {

    const [showSpin, setShowSpin] = useState(false);
    const [showFinish, setShowFinish] = useState(false);
    const [currentNumber, setCurrentNumber] = useState(0);

    const [currentLetter, setCurrentLetter] = useState(0);
    const letters = ['F','I','T'];
    const [spinNum, setSpinNum] = useState([]);
    const [pendingSpinNum, setPendingSpinNum] = useState([]);
    const [bingoNum, setBingoNum] = useState([]);
    const [pendingBingoNum, setPendingBingoNum] = useState([]);


    useEffect(() => {
        for(let i=0; i<letters.length ;i++){
            let list = [];
            for(let j=1+25*i; j<=25+25*i; j++){
                list = [...list, j];
            }
            pendingSpinNum[i] = list;
            setPendingSpinNum([...pendingSpinNum]);

            spinNum[i] = [];
            setSpinNum([...spinNum]);

            bingoNum[i] = [];
            setBingoNum([...bingoNum]);

            pendingBingoNum[i] = [];
            setPendingBingoNum([...pendingBingoNum]);
        }

        initBingo();

    }, []);

    const initBingo = () => {
        for(let currentLetter=0; currentLetter<letters.length; currentLetter++) {
            let pattern = getPattern(letters[currentLetter]);
            let boardNum = getRandomBoard(currentLetter);

            for (let i = 0; i < boardNum.length; i++) {
                for (let j = 0; j < boardNum[i].length; j++) {
                    console.log('i : ' + i + ' j : ' + j + ' pattern : ' + pattern[i][j]);
                    if (pattern[i][j] === 1) {
                        pendingBingoNum[currentLetter] = [...pendingBingoNum[currentLetter], boardNum[i][j]];
                        setPendingBingoNum([...pendingBingoNum]);
                    }
                }
            }
        }
    }

    const completePercentage = () => {
        let total = 0;
        let completed = 0;
        console.log('completePercentage');
        for(let i=0; i<letters.length; i++){
            if(pendingBingoNum && pendingBingoNum[i]){
                total += pendingBingoNum[i].length;
            }
            if(bingoNum && bingoNum[i]){
                total += bingoNum[i].length;
                completed += bingoNum[i].length;
            }
        }
        if(total > 0){
            return Math.floor(completed * 100/ total) + '%';
        }
        return '0%';
    }

    const disableSpin = () => {
        if(pendingBingoNum && pendingBingoNum[currentLetter] && pendingBingoNum[currentLetter].length === 0) {
            return true;
        }
        return false;
    }

    const colorOfSpin = disabled =>{
        if(disabled){
            return GameCenterStyles.backColor;
        }
        return GameCenterStyles.nextColor;
    }

    const processSpin = () => {
        let number = generateSpinNum();
        if(number !== null) {
            setCurrentNumber(number);
            setShowSpin(false);
            setShowFinish(true);

            processSpinLogic(number);
        }
    }

    const processSpinLogic = number => {
        spinNum[currentLetter] = [...spinNum[currentLetter], number];
        setSpinNum([...spinNum]);

        if(pendingBingoNum[currentLetter].includes(number)){
            let index = pendingBingoNum[currentLetter].indexOf(number);
            pendingBingoNum[currentLetter] = pendingBingoNum[currentLetter].slice(0, index).concat(pendingBingoNum[currentLetter].slice(index + 1, pendingBingoNum[currentLetter].length))
            setPendingBingoNum([...pendingBingoNum]);

            console.log('pendingBingoNum : ' + pendingBingoNum[0]);

            bingoNum[currentLetter] = [...bingoNum[currentLetter], number];
            setBingoNum([...bingoNum]);
        }

        console.log('spinNum : ' + spinNum[0]);
    }

    const generateSpinNum = () => {
        if(pendingSpinNum[currentLetter].length > 0) {
            let randomIndex = Math.floor(Math.random() * pendingSpinNum[currentLetter].length);
            let numberPick = pendingSpinNum[currentLetter][randomIndex];

            console.log('number pick : ' + numberPick);
            pendingSpinNum[currentLetter] = pendingSpinNum[currentLetter].slice(0, randomIndex).concat(pendingSpinNum[currentLetter].slice(randomIndex + 1, pendingSpinNum[currentLetter].length))
            setPendingSpinNum([...pendingSpinNum]);
            console.log('pendingSpinNum : ' + pendingSpinNum[0]);

            return numberPick;
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
                <View style={[GameCenterStyles.subContainer, {width:'70%'}]}>
                    <WordItem imageSource={require('../../../resources/images/Patient-Icons/2x/icon-navy-muscle-2x.png')}
                              wordText={'FIT'}
                              percentage={'50%'}
                              showArrow={false}/>
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
                <DotBoard bingoPattern={getPattern(letters[currentLetter])} boardNum={getRandomBoard(currentLetter)} spinNum={spinNum[currentLetter]}/>
                <TouchableOpacity onPress={() => {currentLetter < letters.length - 1 && setCurrentLetter(currentLetter + 1)}}>
                    <Image source={require('../../../resources/images/Patient-Icons/2x/icon-grey-chevron-right-2x.png')} style={GameCenterStyles.iconProps} />
                </TouchableOpacity>
            </View>

            <View style={GameCenterStyles.subContainerNarrow}>
                {letters.map((item, index) => (
                    <Ionicon
                        key={index}
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
                // onPress={() => {processSpin()}}>
                onPress={() => {setShowSpin(true)}}>
                <Text style={globalStyles.actionButtonText}>Spin a Number</Text>
            </TouchableOpacity>

            <Modal
                isVisible={showSpin}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setShowSpin(false)}>

                <SpinSlider processSpin={() => processSpin()} closeModal={() => setShowSpin(false)} />

            </Modal>

            <Modal
                isVisible={showFinish}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setShowFinish(false)}>

                <SpinFinish number={currentNumber} closeModal={() => setShowFinish(false)} />

            </Modal>

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
