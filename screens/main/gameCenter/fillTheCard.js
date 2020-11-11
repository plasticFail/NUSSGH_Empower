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
import DotBoard from '../../../components/gameCenter/dotBoard';
import SpinComponent from '../../../components/gameCenter/spinComponent';
import SpinFinish from '../../../components/gameCenter/spinFinish';
//functions
import WordItem from '../../../components/gameCenter/wordItem';
import {GetIconByWord} from '../../../commonFunctions/gameCenterFunctions';
import {requestPerformSpin} from '../../../netcalls/gameCenterEndPoints/requestGameCenter';


const LetterDotColor = (currentLetter, letter) => {
    if(currentLetter === letter){
        return Colors.gameColorGreen;
    }
    return Colors.gameColorGrey;
}

const FillTheCard = (props) => {

    const [showSpin, setShowSpin] = useState(false);
    const [readyFinish, setReadyFinish] = useState(false);
    const [showFinish, setShowFinish] = useState(false);

    const [activeGame, setActiveGame] = useState(props.route.params.activeGame);
    const [chances, setChances] = useState(props.route.params.chances);
    const [currentLetter, setCurrentLetter] = useState(0);
    const [spinResponse, setSpinResponse] = useState('');

    const getBoardNum = currentLetter => {
        let currentBoardNum = activeGame.layouts[currentLetter];
        let boardNum = [];
        for(let i=0; i<5; i++){
            boardNum[i] = currentBoardNum.slice(i*5, i*5+5);
        }
        return boardNum;
    }

    const getBingoPattern = currentLetter => {
        let currentBingoPattern = activeGame.states[currentLetter];
        let bingoPattern = []
        for(let i=0; i<5; i++){
            bingoPattern[i] = currentBingoPattern.slice(i*5, i*5+5);
        }
        return bingoPattern;
    }

    const prevPageHandler = () => {
        if(currentLetter > 0){
            setCurrentLetter(currentLetter - 1);
        }
    }

    const nextPageHandler = () => {
        if(currentLetter < activeGame.layouts.length - 1){
            setCurrentLetter(currentLetter + 1);
        }
    }

    const disableSpin = () => {
        if(chances === 0){
            return true;
        }
        let bingoPattern = activeGame.states[currentLetter];
        for(let i=0; i<bingoPattern.length; i++){
            if(bingoPattern[i] === 2){
                return false;
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

    const processSpin = async () => {
        let responseObj = await requestPerformSpin(activeGame.word, currentLetter);
        if(responseObj){
            setSpinResponse(responseObj);
            setActiveGame(responseObj.game_state);
            setChances(chances - responseObj.chance_used);
            setShowSpin(false);
            setReadyFinish(true);
        }
    }

    const startSpin = async () => {
        setShowSpin(true);
        setTimeout(processSpin,
            1000
        )
    }

    return (
        <View style={{...globalStyles.pageContainer, ...props.style}}>
            <View style={globalStyles.menuBarContainer}>
                <LeftArrowBtn close={() => props.navigation.goBack()} />
            </View>
            <Text style={globalStyles.pageHeader}>Fill The Card</Text>

            <View style={[GameCenterStyles.card, GameCenterStyles.subContainer]}>
                <View style={[GameCenterStyles.subContainer, {width:'70%'}]}>
                    <WordItem imageSource={GetIconByWord(activeGame.word)}
                              wordText={activeGame.word}
                              percentage={activeGame.word_progress + '%'}
                              showArrow={false}/>
                </View>
                <View style={styles.divider}/>
                <View style={[GameCenterStyles.cardPadding, GameCenterStyles.verticalContainer]}>
                    <Text style={GameCenterStyles.subText}>Chances</Text>
                    <Text style={[GameCenterStyles.subText, GameCenterStyles.greenText]}>{chances} Left</Text>
                </View>
            </View>

            <View style={[GameCenterStyles.cardPadding, GameCenterStyles.subContainer]}>
                <TouchableOpacity onPress={prevPageHandler}>
                    <Image source={require('../../../resources/images/Patient-Icons/2x/icon-grey-chevron-left-2x.png')} style={GameCenterStyles.iconProps} />
                </TouchableOpacity>
                <DotBoard bingoPattern={getBingoPattern(currentLetter)} boardNum={getBoardNum(currentLetter)} />
                <TouchableOpacity onPress={nextPageHandler}>
                    <Image source={require('../../../resources/images/Patient-Icons/2x/icon-grey-chevron-right-2x.png')} style={GameCenterStyles.iconProps} />
                </TouchableOpacity>
            </View>

            <View style={GameCenterStyles.subContainerNarrow}>
                {activeGame.layouts.map((item, index) => (
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
                onPress={() => {startSpin()}}>
                <Text style={globalStyles.actionButtonText}>Spin a Number</Text>
            </TouchableOpacity>

            <Modal
                isVisible={showSpin}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setShowSpin(false)}
                onModalHide={() => {
                    if(readyFinish) {
                        setShowFinish(true);
                        setReadyFinish(false);
                    }
                }}>

                <SpinComponent processSpin={() => processSpin()} closeModal={() => setShowSpin(false)} />

            </Modal>

            <Modal
                isVisible={showFinish}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setShowFinish(false)}>

                <SpinFinish spinResponse={spinResponse} closeModal={() => setShowFinish(false)} />

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
