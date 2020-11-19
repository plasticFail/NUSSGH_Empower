import React from 'react';
//third party lib
import Ionicons from 'react-native-vector-icons/Ionicons';
//styles
import globalStyles from '../../styles/globalStyles';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';


const LeftArrowBtn = (props) => {
  const {close} = props;

  return (
    <>
      <Ionicons
        name={'arrow-back'}
        size={adjustSize(40)}
        color={'#aad326'}
        style={globalStyles.leftArrowBack}
        onPress={() => close()}
      />
    </>
  );
};

export default LeftArrowBtn;


