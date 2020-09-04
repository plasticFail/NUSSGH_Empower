import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../styles/colors';
import {createDrawerNavigator} from '@react-navigation/drawer';
//third party library
import Ant from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
//component
import DashboardScreen from './dashboard';
import AccountDetailScreen from './more/accountDetails';
import AppointmentScreen from './more/appointments';
import HypocorrectionFood from './more/hypocorrectionFood';
import EducationalMaterial from './more/educationMaterials';
import Reminders from './more/reminders';
import GlucoseMonitorsScreen from './more/glucoseMonitor';

const Drawer = createDrawerNavigator();

const DrawerNavigator = (props) => {
  return (
    <Drawer.Navigator
      drawerType={'slide'}
      overlayColor={1}
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
          title: 'Menu',
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
        name="Appointment"
        component={AppointmentScreen}
        options={{
          drawerIcon: () => <Ant name="calendar" size={30} color={'white'} />,
        }}
      />
      <Drawer.Screen
        name="Hydro-Correction"
        component={HypocorrectionFood}
        options={{
          drawerIcon: () => <Entypo name="water" size={30} color={'white'} />,
        }}
      />
      <Drawer.Screen
        name="Educational Material"
        component={EducationalMaterial}
        options={{
          drawerIcon: () => (
            <Icons name="book-open" size={27} color={'white'} />
          ),
        }}
      />
      <Drawer.Screen
        name="Reminders"
        component={Reminders}
        options={{
          drawerIcon: () => <Ant name="bells" size={30} color={'white'} />,
        }}
      />
      <Drawer.Screen
        name="Bluetooth Monitor"
        component={GlucoseMonitorsScreen}
        options={{
          title: 'Menu',
          drawerIcon: () => (
            <Icon
              name="bluetooth-b"
              size={30}
              color={'white'}
              style={{paddingStart: '3%', paddingEnd: '2%'}}
            />
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
