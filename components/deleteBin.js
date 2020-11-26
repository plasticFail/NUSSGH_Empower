import React from 'react';
import {TouchableOpacity} from 'react-native';
import BIN from '../resources/images/Patient-Icons/SVG/icon-red-remove.svg';
import {adjustSize} from '../commonFunctions/autoResizeFuncs';

const DeleteBin = (props) => {
  const {method} = props;
  return (
    <TouchableOpacity style={{...props.style}} onPress={() => method()}>
      <BIN height={adjustSize(30)} width={adjustSize(30)} />
    </TouchableOpacity>
  );
};

export default DeleteBin;
