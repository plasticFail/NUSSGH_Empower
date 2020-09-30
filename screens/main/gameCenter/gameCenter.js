import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, Text, Dimensions, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import {Colors} from '../../../styles/colors';
import LeftArrowBtn from '../../../components/logs/leftArrowBtn';
import TutorialPage from '../../../components/gameCenter/tutorialPage';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import GameCenterStyles from '../../../styles/gameCenterStyles';
import ProgressBar from '../../../components/progressbar';


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
              onPress={() => setShowTutorial(true)}/>
        </View>
        <Text style={[globalStyles.pageDetails]}>Season 1: Word Bingo</Text>

        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Image resizeMode="contain" style={styles.logo} source={require('../../../resources/images/gameCenter/img-header.png')}/>

          <View style={[GameCenterStyles.card, styles.marginTop]}>
            <View style={[GameCenterStyles.cardPadding, styles.subContainer]}>
              <Text style={styles.subText}>My Word</Text>
              <TouchableOpacity onPress={() => {props.navigation.navigate('MyWord')}}>
                <Text style={[styles.subText, styles.greenText]}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider}/>
            <View style={[GameCenterStyles.cardPadding, styles.subContainer]}>
              <Image source={require('../../../resources/images/Patient-Icons/2x/icon-navy-muscle-2x.png')} style={GameCenterStyles.iconProps} />
              <View style={styles.verticalContainer}>
                <Text style={styles.wordText}>FIT</Text>
                <ProgressBar containerStyle={{height: 7.5, width: '50%'}} progress={`50%`}
                             reverse={true}
                             progressBarColor={Colors.gameColorGreen} />
                <Text style={styles.wordText}>50%</Text>
              </View>
              <TouchableOpacity onPress={() => {props.navigation.navigate('FillTheCard')}}>
                <Image source={require('../../../resources/images/Patient-Icons/2x/icon-grey-chevron-right-2x.png')} style={GameCenterStyles.iconProps} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding, styles.subContainer]}>
            <Text style={styles.subText}>Chances</Text>
            <Text style={styles.subText}>2 Left</Text>
          </View>

          <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding, styles.subContainer]}>
            <Text style={styles.subText}>Reward Points</Text>
            <Text style={styles.subText}>160 Available</Text>
          </View>

          <TouchableOpacity
              style={[GameCenterStyles.buttonStyle, GameCenterStyles.nextColor]}>
            <Text style={globalStyles.actionButtonText}>Redeem</Text>
          </TouchableOpacity>

        </ScrollView>

      </Animated.View>

      <Modal
          isVisible={showTutorial}
          transparent={true}
          animationType='fade'
          onRequestClose={() => setShowTutorial(false)}>

        <TutorialPage closeModal={() => setShowTutorial(false)}/>

      </Modal>

    </View>
  );
};

export default GameCenter;

const styles = StyleSheet.create({
  titleWithHintContainer: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo:{
    width:'100%',
    height: undefined,
    aspectRatio:2.5,
  },
  scrollContainer:{
    paddingVertical:100
  },
  marginTop:{
    marginTop: 15
  },
  subContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  verticalContainer: {
    flex:1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column'
  },
  divider:{
    height:2,
    backgroundColor: Colors.gameColorGrey,
  },
  subText:{
    fontSize:20,
  },
  wordText:{
    fontSize: 18,
  },
  greenText:{
    color: Colors.gameColorGreen,
  }
});
