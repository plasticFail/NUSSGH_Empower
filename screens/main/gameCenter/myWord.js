import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import LeftArrowBtn from '../../../components/logs/leftArrowBtn';
import SpinSlider from '../../../components/gameCenter/spinSlider';
import GameCenterStyles from '../../../styles/gameCenterStyles';
import SpinFinish from '../../../components/gameCenter/spinFinish';
import InProgress from '../../../components/inProgress';

const MyWord = (props) => {
  return (
    <View style={{...globalStyles.pageContainer, ...props.style}}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={() => props.navigation.goBack()} />
      </View>
      <Text style={globalStyles.pageHeader}>My Word</Text>
      <SpinSlider />
      {/*<SpinFinish/>*/}
    </View>
  );
};

export default MyWord;
