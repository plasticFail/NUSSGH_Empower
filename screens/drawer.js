import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../styles/colors';
import {createDrawerNavigator} from '@react-navigation/drawer';
//third party library
import Ant from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
//component
import DashboardScreen from './dashboard';
import AccountDetailScreen from './more/accountDetails';
import AppointmentScreen from './more/appointments';
import EducationalMaterial from './more/educationMaterials';
import DiaryScreen from './main/diary/diary';
import Goals from './more/goals';
import Medication from './more/medications';
import Logout from './more/logout';
import GameCenter from './main/gameCenter';

const Drawer = createDrawerNavigator();

const DrawerNavigator = (props) => {
  return (
    <Drawer.Navigator
      drawerType={'slide'}
      drawerStyle={{backgroundColor: Colors.menuColor}}
      drawerContentOptions={{
        marginTop: '23%',
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        fontSize: 20,
        labelStyle: {
          fontSize: 18,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          title: 'Home',
          drawerIcon: () => <Icon name="home" size={30} color={'white'} />,
        }}
      />
      <Drawer.Screen
        name="Edit Account"
        component={AccountDetailScreen}
        options={{
          drawerIcon: () => <Ant name="user" size={30} color={'white'} />,
        }}
      />
      <Drawer.Screen
        name="Diary"
        component={DiaryScreen}
        options={{
          drawerIcon: () => (
            <Icons name="book-open" size={27} color={'white'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Medication"
        component={Medication}
        options={{
          drawerIcon: () => <Entypo name="water" size={30} color={'white'} />,
        }}
      />
      <Drawer.Screen
        name="Goals"
        component={Goals}
        options={{
          drawerIcon: () => <Feather name="target" size={30} color={'white'} />,
        }}
      />
      <Drawer.Screen
        name="Appointment"
        component={AppointmentScreen}
        options={{
          drawerIcon: () => <Ant name="calendar" size={30} color={'white'} />,
        }}
      />
      <Drawer.Screen
        name="Resources"
        component={EducationalMaterial}
        options={{
          drawerIcon: () => (
            <Icons name="book-open" size={27} color={'white'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Log Out"
        component={Logout}
        options={{
          drawerIcon: () => (
            <Ionicon name="exit-outline" size={27} color={'white'} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
  },
});
