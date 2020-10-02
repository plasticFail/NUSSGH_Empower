import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import BIN from '../resources/images/Patient-Icons/SVG/icon-red-remove.svg';

const DeleteBin = (props) => {
  const {method} = props;
  return (
    <TouchableOpacity style={{...props.style}} onPress={() => method()}>
      <BIN height={30} width={30} />
    </TouchableOpacity>
  );
};

export default DeleteBin;
