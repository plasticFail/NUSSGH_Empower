import React, {useLayoutEffect, useRef, useState} from 'react';
import {
  View,
  Animated,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
//third party libs
import Ionicon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
//styles
import globalStyles from '../../../styles/globalStyles';
import {Colors} from '../../../styles/colors';
import GameCenterStyles from '../../../styles/gameCenterStyles';
//functions
import {requestGetOverview} from '../../../netcalls/gameCenterEndPoints/requestGameCenter';
import {GetIconByWord} from '../../../commonFunctions/gameCenterFunctions';
//components
import LeftArrowBtn from '../../../components/logs/leftArrowBtn';
import TutorialPage from '../../../components/gameCenter/tutorialPage';
import WordItem from '../../../components/gameCenter/wordItem';



const GameCenter = (props) => {
  const [activeWord, setActiveWord] = useState('');
  const [chances, setChances] = useState(0);
  const [rewardPoints, setRewardPoints] = useState(0);
  let availableWords = [];
  let games = [];

  const slideRightAnimation = useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
      props.navigation.addListener('focus', () => {
        slideRightAnimation.setValue(0);
        Animated.timing(slideRightAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();

        refresh();
      });
  });

  const refresh = async() => {
    console.log('refresh game center');
    let responseObj = await requestGetOverview();
    setChances(responseObj.chances);
    setRewardPoints(responseObj.points);

    // availableWords = responseObj.available_words;
    availableWords = ['FIT', 'ACE'];
    games = responseObj.games;

    console.log('availableWords : ' + availableWords);
    console.log('chances : ' + chances);
  }

  const widthInterpolate = slideRightAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').width, 0],
    extrapolate: 'clamp',
  });

  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <View style={globalStyles.pageContainer}>
      <Animated.View
        style={{
          ...globalStyles.pageContainer,
          ...{transform: [{translateX: widthInterpolate}]},
        }}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={() => props.navigation.navigate('Home')} />
        </View>
        <View style={styles.titleWithHintContainer}>
          <Text style={globalStyles.pageHeader}>Game Center</Text>
          <Ionicon
            style={globalStyles.pageIcon}
            name="help-circle-outline"
            size={40}
            color={Colors.gameColorGreen}
            onPress={() => setShowTutorial(true)}
          />
        </View>
        <Text style={[globalStyles.pageDetails]}>Season 1: Word Bingo</Text>

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Image
            resizeMode="contain"
            style={GameCenterStyles.logo}
            source={require('../../../resources/images/gameCenter/img-header.png')}
          />

          <View style={[GameCenterStyles.card, styles.marginTop]}>
            <View
              style={[
                GameCenterStyles.cardPadding,
                GameCenterStyles.subContainer,
              ]}>
              <Text style={GameCenterStyles.subText}>My Word</Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('MyWord');
                }}>
                <Text
                  style={[
                    GameCenterStyles.subText,
                    GameCenterStyles.greenText,
                  ]}>
                  View All
                </Text>
              </TouchableOpacity>
              <Ionicon
                  name="add-circle-outline"
                  size={30}
                  color={Colors.gameColorGreen}
                  onPress={() => props.navigation.navigate('StartNewWord', {
                    availableWords: availableWords
                  })}/>
            </View>
            <View style={styles.divider} />
            {activeWord !== '' ? <WordItem imageSource={GetIconByWord(activeWord)}
                      wordText={activeWord}
                      percentage={'50%'}
                      showArrow={true}
                      clickFunc={() => {props.navigation.navigate('FillTheCard')}}/>
            :
                <View style={[GameCenterStyles.center, GameCenterStyles.cardPadding]}>
                  <Text style={[GameCenterStyles.subText]}>No Word Selected</Text>
                </View>}
          </View>

          <View
            style={[
              GameCenterStyles.card,
              GameCenterStyles.cardPadding,
              GameCenterStyles.subContainer,
            ]}>
            <Text style={GameCenterStyles.subText}>Chances</Text>
            <Text style={GameCenterStyles.subText}>{chances} Left</Text>
          </View>

          <View
            style={[
              GameCenterStyles.card,
              GameCenterStyles.cardPadding,
              GameCenterStyles.subContainer,
            ]}>
            <Text style={GameCenterStyles.subText}>Reward Points</Text>
            <Text style={GameCenterStyles.subText}>{rewardPoints} Available</Text>
          </View>

          <TouchableOpacity
            style={[
              GameCenterStyles.buttonStyle,
              GameCenterStyles.nextColor,
              GameCenterStyles.marginBottom,
            ]}>
            <Text style={globalStyles.actionButtonText}>Redeem</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>

      <Modal
        isVisible={showTutorial}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTutorial(false)}>
        <TutorialPage closeModal={() => setShowTutorial(false)} />
      </Modal>
    </View>
  );
};

export default GameCenter;

const styles = StyleSheet.create({
  titleWithHintContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingVertical: 100,
  },
  marginTop: {
    marginTop: 15,
  },
  divider: {
    height: 2,
    backgroundColor: Colors.gameColorGrey,
  },
});
