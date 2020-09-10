import React from 'react';
//third party lib
import Ionicons from 'react-native-vector-icons/Ionicons';
//styles
import globalStyles from '../../styles/globalStyles';

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
