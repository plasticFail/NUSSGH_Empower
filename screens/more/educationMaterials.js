import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import MenuBtn from '../../components/menuBtn';
import LeftArrowBtn from '../../components/logs/leftArrowBtn';

const EducationMaterialsScreen = (props) => {
  return (
    <View style={{...globalStyles.pageContainer, ...props.style}}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={() => props.navigation.navigate('Home')} />
      </View>
      <Text style={globalStyles.pageHeader}>Resources</Text>
    </View>
  );
};

export default EducationMaterialsScreen;
