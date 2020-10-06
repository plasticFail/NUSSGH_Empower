import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';

const Med4Day = (props) => {
  const {medication} = props;
  const [dosage, setDosage] = useState(0);
  const [selected, setSelected] = useState(false);
};

export default Med4Day;
