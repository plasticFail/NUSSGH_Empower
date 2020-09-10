import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
//component
import MenuBtn from '../../components/menuBtn';
//styles
import globalStyles from '../../styles/globalStyles';

const MedicationScreen = (props) => {
  return (
    <View style={{...globalStyles.pageContainer, ...props.style}}>
      <Text style={{textAlign: 'center'}}>Medication </Text>
      <MenuBtn />
    </View>
  );
};

export default MedicationScreen;
