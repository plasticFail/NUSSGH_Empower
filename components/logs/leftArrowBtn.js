import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
//third party lib
import Ionicons from 'react-native-vector-icons/Ionicons';
//styles
import globalStyles from '../../styles/globalStyles';

const {height} = Dimensions.get('window');

const LeftArrowBtn = (props) => {
  const {close} = props;

  return (
    <View style={styles.buttonPosition}>
      <Ionicons
        name={'arrow-back'}
        size={40}
        color={'#aad326'}
        style={globalStyles.leftArrowBack}
        onPress={() => close()}
      />
    </View>
  );
};

export default LeftArrowBtn;

const styles = StyleSheet.create({
  buttonPosition: {
    marginTop: height * 0.05,
    marginBottom: height * 0.07,
  },
});
