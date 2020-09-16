import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
//third party lib
import Entypo from 'react-native-vector-icons/Entypo';
//styles
import globalStyles from '../styles/globalStyles';

const {height} = Dimensions.get('window');

const CrossBtn = (props) => {
  const {close} = props;

  return (
    <View style={globalStyles.topLeftButtonPosition}>
      <Entypo
        name="cross"
        style={globalStyles.crossIcon}
        size={50}
        onPress={() => close()}
      />
    </View>
  );
};

export default CrossBtn;

const styles = StyleSheet.create({
  buttonPosition: {
    marginTop: height * 0.05,
    marginBottom: height * 0.07,
  },
});
