import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
//third party lib
import Ionicons from 'react-native-vector-icons/Ionicons';
//styles
import globalStyles from '../../styles/globalStyles';

const {height, width} = Dimensions.get('window');

const LeftArrowBtn = (props) => {
  const {close} = props;

  return (
    <>
      <Ionicons
        name={'arrow-back'}
        size={40}
        color={'#aad326'}
        style={globalStyles.leftArrowBack}
        onPress={() => close()}
      />
    </>
  );
};

export default LeftArrowBtn;

/*
const styles = StyleSheet.create({
  buttonPosition: {
    marginTop: height * 0.05,
    marginBottom: height * 0.07,
    marginStart: width * 0.03,
  },
});
*/
