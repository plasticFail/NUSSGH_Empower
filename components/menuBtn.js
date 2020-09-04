import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {Colors} from '../styles/colors';

const MenuBtn = (props) => {
  const navigation = useNavigation();

  const onClick = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    props.isLogin && (
      <TouchableOpacity
        style={{
          alignSelf: 'flex-start',
          marginStart: '3%',
          marginTop: '5%',
          zIndex: -1,
        }}>
        <Entypo
          name="menu"
          size={50}
          onPress={onClick}
          color={Colors.backArrowColor}
        />
      </TouchableOpacity>
    )
  );
};

export default MenuBtn;
