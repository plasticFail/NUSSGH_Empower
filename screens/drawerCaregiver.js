import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../styles/colors';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
//third party library
import Ionicon from 'react-native-vector-icons/Ionicons';
//component
import CaregiverBottomTab from './caregiverDashboard';

import ACCOUNT from '../resources/images/Patient-Icons//SVG/icon-white-sidemenu-account.svg';
import DIARY from '../resources/images/Patient-Icons//SVG/icon-white-sidemenu-diary.svg';
import {ScrollView} from 'react-native-gesture-handler';

const iconStyle = {
  width: 30,
  height: 30,
};

const Drawer = createDrawerNavigator();

const DrawerContent = (props) => {
  return (
    <ScrollView contentContainerStyle={{flex: 1, marginTop: '20%'}}>
      <Text style={styles.headerTextStyle}>Menu</Text>
      <DrawerItem
        label="Edit Account"
        labelStyle={styles.subText}
        icon={() => <ACCOUNT {...iconStyle} />}
        onPress={() => props.navigation.navigate('Edit Account')}
      />
      <DrawerItem
        label="Diary"
        labelStyle={styles.subText}
        icon={() => <DIARY {...iconStyle} />}
        onPress={() => props.navigation.navigate('Diary')}
      />
      <View style={{position: 'absolute', bottom: '10%'}}>
        <DrawerItem
          label="Log Out"
          labelStyle={[styles.subText]}
          icon={() => <Ionicon name="exit-outline" size={27} color={'white'} />}
          onPress={() => props.navigation.navigate('Log Out')}
        />
      </View>
    </ScrollView>
  );
};

const CaregiverDrawerNavigator = (props) => {
  return (
    <Drawer.Navigator
      drawerType={'slide'}
      drawerStyle={{backgroundColor: Colors.menuColor}}
      drawerContent={DrawerContent}>
      <Drawer.Screen name="Home" component={CaregiverBottomTab} />
    </Drawer.Navigator>
  );
};
export default CaregiverDrawerNavigator;

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 24,
    fontFamily: 'SFProDisplay-Bold',
    color: 'white',
    margin: '5%',
    marginBottom: '10%',
    marginTop: '2%',
  },
  subText: {
    fontSize: 18,
    fontFamily: 'SFProDisplay-Bold',
    color: 'white',
  },
});