import React from 'react';
//third party
import Entypo from 'react-native-vector-icons/Entypo';
//styles
import globalStyles from '../styles/globalStyles';
import {adjustSize} from '../commonFunctions/autoResizeFuncs';

const ChevronDownBtn = (props) => {
  const {close} = props;
  return (
    <>
      <Entypo
        name="chevron-thin-down"
        onPress={() => close()}
        size={adjustSize(30)}
        style={globalStyles.chevronDown}
      />
    </>
  );
};

export default ChevronDownBtn;
