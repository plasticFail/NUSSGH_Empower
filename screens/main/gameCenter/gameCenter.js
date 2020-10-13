import React, {useEffect, useRef, useState} from 'react';
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
import globalStyles from '../../../styles/globalStyles';
import {Colors} from '../../../styles/colors';
import LeftArrowBtn from '../../../components/logs/leftArrowBtn';
import TutorialPage from '../../../components/gameCenter/tutorialPage';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import GameCenterStyles from '../../../styles/gameCenterStyles';
import WordItem from '../../../components/gameCenter/wordItem';


const GameCenter = (props) => {
  const slideRightAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    //slide right when enter screen
    props.navigation.addListener('focus', () => {
      slideRightAnimation.setValue(0);
      Animated.timing(slideRightAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [props.navigation]);

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
                  onPress={() => props.navigation.navigate('StartNewWord')}/>
            </View>
            <View style={styles.divider} />
            <WordItem imageSource={require('../../../resources/images/Patient-Icons/2x/icon-navy-muscle-2x.png')}
                      wordText={'FIT'}
                      percentage={'50%'}
                      showArrow={true}
                      clickFunc={() => {props.navigation.navigate('FillTheCard')}}/>
          </View>

          <View
            style={[
              GameCenterStyles.card,
              GameCenterStyles.cardPadding,
              GameCenterStyles.subContainer,
            ]}>
            <Text style={GameCenterStyles.subText}>Chances</Text>
            <Text style={GameCenterStyles.subText}>2 Left</Text>
          </View>

          <View
            style={[
              GameCenterStyles.card,
              GameCenterStyles.cardPadding,
              GameCenterStyles.subContainer,
            ]}>
            <Text style={GameCenterStyles.subText}>Reward Points</Text>
            <Text style={GameCenterStyles.subText}>160 Available</Text>
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
