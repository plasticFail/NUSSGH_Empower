import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, Text, Dimensions, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import InProgress from '../../components/inProgress';
import Dot from '../../components/gameCenter/dot';
import DotRow from '../../components/gameCenter/dotRow';
import DotBoard from '../../components/gameCenter/dotBoard';
import TutorialPage from '../../components/gameCenter/tutorialPage';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import GameCenterStyles from '../../styles/gameCenterStyles';


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

      // <View >
      //   <ScrollView contentContainerStyle={{flexGrow: 1,}}>
      //     <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding, styles.subContainer]}>
      //       <Text style={styles.subText}>Reward Points</Text>
      //       <Text style={styles.subText}>160 Available</Text>
      //     </View>
      //
      //     <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding, styles.subContainer]}>
      //       <Text style={styles.subText}>Reward Points</Text>
      //       <Text style={styles.subText}>160 Available</Text>
      //     </View>
      //
      //     <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding, styles.subContainer]}>
      //       <Text style={styles.subText}>Reward Points</Text>
      //       <Text style={styles.subText}>160 Available</Text>
      //     </View>
      //
      //     <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding, styles.subContainer]}>
      //       <Text style={styles.subText}>Reward Points</Text>
      //       <Text style={styles.subText}>160 Available</Text>
      //     </View>
      //
      //     <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding, styles.subContainer]}>
      //       <Text style={styles.subText}>Reward Points</Text>
      //       <Text style={styles.subText}>160 Available</Text>
      //     </View>
      //
      //     <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding, styles.subContainer]}>
      //       <Text style={styles.subText}>Reward Points</Text>
      //       <Text style={styles.subText}>160 Available</Text>
      //     </View>
      //
      //     <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding, styles.subContainer]}>
      //       <Text style={styles.subText}>Reward Points</Text>
      //       <Text style={styles.subText}>160 Available</Text>
      //     </View>
      //
      //     <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding, styles.subContainer]}>
      //       <Text style={styles.subText}>Reward Points</Text>
      //       <Text style={styles.subText}>160 Available</Text>
      //     </View>
      //
      //     <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding, styles.subContainer]}>
      //       <Text style={styles.subText}>Reward Points</Text>
      //       <Text style={styles.subText}>160 Available</Text>
      //     </View>
      //
      //     <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding, styles.subContainer]}>
      //       <Text style={styles.subText}>Reward Points</Text>
      //       <Text style={styles.subText}>160 Available</Text>
      //     </View>
      //
      //     <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding, styles.subContainer]}>
      //       <Text style={styles.subText}>Reward Points</Text>
      //       <Text style={styles.subText}>160 Available</Text>
      //     </View>
      //
      //     <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding, styles.subContainer]}>
      //       <Text style={styles.subText}>Reward Points</Text>
      //       <Text style={styles.subText}>160 Available</Text>
      //     </View>
      //
      //     <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding, styles.subContainer]}>
      //       <Text style={styles.subText}>Reward Points</Text>
      //       <Text style={styles.subText}>160 Available</Text>
      //     </View>
      //
      //     <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding, styles.subContainer]}>
      //       <Text style={styles.subText}>Reward Points</Text>
      //       <Text style={styles.subText}>160 Available</Text>
      //     </View>
      //
      //     <View style={[GameCenterStyles.card, GameCenterStyles.cardPadding, styles.subContainer]}>
      //       <Text style={styles.subText}>Reward Points</Text>
      //       <Text style={styles.subText}>160 Available</Text>
      //     </View>
      //   </ScrollView>
      // </View>

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
          <Image resizeMode="contain" style={styles.logo} source={require('../../resources/images/gameCenter/img-header.png')}/>

          <View style={[GameCenterStyles.card, styles.marginTop]}>
            <View style={[GameCenterStyles.cardPadding, styles.subContainer]}>
              <Text style={styles.subText}>My Word</Text>
              <Text style={[styles.subText, styles.greenText]}>View All</Text>
            </View>
            <View style={styles.divider}/>
            <View style={[GameCenterStyles.cardPadding, styles.subContainer]}>
              <Text style={styles.subText}>Chances</Text>
              <Text style={styles.subText}>2 Left</Text>
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

          {/*<DotBoard/>*/}

        </ScrollView>

      {/*  /!*<InProgress />*!/*/}

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
    flexDirection: 'row'
  },
  divider:{
    height:2,
    backgroundColor: Colors.gameColorGrey,
  },
  subText:{
    fontSize:20,
  },
  greenText:{
    color: Colors.gameColorGreen,
  }
});
