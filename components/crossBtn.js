import React from 'react';
//third party lib
import Entypo from 'react-native-vector-icons/Entypo';
//styles
import globalStyles from '../styles/globalStyles';

const CrossBtn = (props) => {
  const {close} = props;

  return (
    <>
      <Entypo
        name="cross"
        style={globalStyles.crossIcon}
        size={50}
        onPress={() => close()}
      />
    </>
  );
};

export default CrossBtn;
