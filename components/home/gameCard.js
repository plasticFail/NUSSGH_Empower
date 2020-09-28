import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
//style
import {Colors} from '../../styles/colors';
//svg
import NAVY_GAME from '../../resources/images/Patient-Icons/SVG/icon-navy-game.svg';
import {useNavigation} from '@react-navigation/native';

export default function GameCard(props) {
  const {points, chances, rewardCount} = props;
  const navigation = useNavigation();

  const goGameCenter = () => {
    navigation.navigate('GameCenter');
  };

  return (
    <View style={[styles.card, styles.shadow]}>
      <NAVY_GAME height={35} width={35} marginStart={'2%'} marginEnd={'2%'} />
      <TouchableOpacity
        style={[{alignSelf: 'flex-start'}, styles.rightBorder]}
        onPress={() => goGameCenter()}>
        <Text style={styles.headerText}>Points</Text>
        <Text
          style={[
            styles.headerText,
            {color: Colors.backArrowColor, fontSize: 20},
          ]}>
          {points}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.rightBorder}
        onPress={() => goGameCenter()}>
        <Text style={styles.headerText}>Chances</Text>
        <Text
          style={[
            styles.headerText,
            {color: Colors.backArrowColor, fontSize: 20},
          ]}>
          {chances}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{alignSelf: 'flex-end'}}>
        <Text style={styles.headerText}>Redeemable</Text>
        <Text
          style={[
            styles.headerText,
            {color: Colors.backArrowColor, fontSize: 20},
          ]}>
          {rewardCount} <Text style={{fontSize: 15}}>Rewards</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginStart: '5%',
    marginEnd: '5%',
    marginTop: '2%',
    marginBottom: '4%',
    padding: '4%',
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#7d7d7d',
    flex: 1,
    marginLeft: '3%',
    marginEnd: '2%',
    fontSize: 16,
  },
  rightBorder: {
    marginStart: '2%',
    borderRightWidth: 0.5,
    borderRightColor: Colors.lastLogValueColor,
  },
});
