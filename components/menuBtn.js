import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
//third party lib
import Entypo from 'react-native-vector-icons/Entypo';
//function
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {adjustSize} from '../commonFunctions/autoResizeFuncs';
//style
import {Colors} from '../styles/colors';

const MenuBtn = (props) => {
  const navigation = useNavigation();

  const onClick = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return !props.green ? (
    <TouchableOpacity style={{...styles.buttonstyle}}>
      <Entypo
        name="menu"
        size={adjustSize(50)}
        onPress={onClick}
        color={Colors.backArrowColor}
      />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={{...styles.buttonstyle}}>
      <Entypo name="menu" size={50} onPress={onClick} color={'white'} />
    </TouchableOpacity>
  );
};

export default MenuBtn;

const styles = StyleSheet.create({
  buttonstyle: {},
});
