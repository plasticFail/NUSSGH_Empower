import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../styles/colors';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
//third party library
import Ant from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
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

import ACCOUNT from '../resources/images/Patient-Icons//SVG/icon-white-sidemenu-account.svg';
import DIARY from '../resources/images/Patient-Icons//SVG/icon-white-sidemenu-diary.svg';
import MED from '../resources/images/Patient-Icons//SVG/icon-white-sidemenu-med.svg';
import GOALS from '../resources/images/Patient-Icons//SVG/icon-white-sidemenu-goals.svg';
import APPT from '../resources/images/Patient-Icons//SVG/icon-white-sidemenu-appt.svg';
import RESOURCES from '../resources/images/Patient-Icons//SVG/icon-white-sidemenu-resources.svg';
import {ScrollView} from 'react-native-gesture-handler';

const iconStyle = {
  width: 30,
  height: 30,
};

const Drawer = createDrawerNavigator();

const DrawerContent = (props) => {
  return (
    <ScrollView contentContainerStyle={{flex: 1, marginTop: '30%'}}>
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
      <DrawerItem
        label="Medication"
        labelStyle={styles.subText}
        icon={() => <MED {...iconStyle} />}
        onPress={() => props.navigation.navigate('Medication')}
      />
      <DrawerItem
        label="Goals"
        labelStyle={styles.subText}
        icon={() => <GOALS {...iconStyle} />}
        onPress={() => props.navigation.navigate('Goals')}
      />
      <DrawerItem
        label="Appointment"
        labelStyle={styles.subText}
        icon={() => <APPT {...iconStyle} />}
        onPress={() => props.navigation.navigate('Appointment')}
      />
      <DrawerItem
        label="Resources"
        labelStyle={styles.subText}
        icon={() => <RESOURCES {...iconStyle} />}
        onPress={() => props.navigation.navigate('Resources')}
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

const DrawerNavigator = (props) => {
  return (
    <Drawer.Navigator
      drawerType={'slide'}
      drawerStyle={{backgroundColor: Colors.menuColor}}
      drawerContent={DrawerContent}>
      <Drawer.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          title: 'Home',
          drawerIcon: () => <Icon name="home" size={30} color={'white'} />,
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;

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
