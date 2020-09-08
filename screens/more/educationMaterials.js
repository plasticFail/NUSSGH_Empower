import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import MenuBtn from '../../components/menuBtn';

const EducationMaterialsScreen = (props) => {
  return (
    <View style={{...globalStyles.pageContainer, ...props.style}}>
      <Text style={{textAlign: 'center'}}>Education</Text>
      <MenuBtn />
    </View>
  );
};

export default EducationMaterialsScreen;
