import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
//third party lib
import Ionicons from 'react-native-vector-icons/Ionicons';

//Props:
//paramter: eg. 1 unit - parameter is unit
//count, setCount from parent
//textStyle: style the text of the count
Ionicons.loadFont();

const StepCounter = (props) => {
  const {parameter, textStyle} = props;
  const {count} = props === undefined ? 0 : props;

  const handleAdd = () => {
    let newCount = count + 1;
    props.setCount(newCount);
  };

  const handleMinus = () => {
    if (count > 0) {
      let newCount = count - 1;
      props.setCount(newCount);
    } else {
      props.setCount(0);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{flex: 1}} onPress={handleAdd}>
        <Ionicons name="add-circle" size={40} color={'#aad326'} />
      </TouchableOpacity>
      <Text style={[styles.countContent, textStyle]}>
        {count} {parameter}
      </Text>
      <TouchableOpacity style={{flex: 1}} onPress={handleMinus}>
        <Ionicons
          name="remove-circle"
          size={40}
          color={'#aad326'}
          style={{flex: 1}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default StepCounter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  countContent: {
    flex: 2,
    marginVertical: '3%',
    fontSize: 20,
  },
});
