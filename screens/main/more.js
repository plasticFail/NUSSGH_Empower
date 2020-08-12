import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import MoreRootScreen from '../more/moreRoot';
import AccountDetailScreen from '../more/accountDetails';
import MedicationScreen from '../more/medications';
import HypocorrectionFood from '../more/hypocorrectionFood';
import AppointmentScreen from '../more/appointments';
import ViewMore from '../../components/hypofood/viewMore';
import HeaderIcon from '../../components/common/headerBtnIcon';

const Stack = createStackNavigator();

function getMoreHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'More';

  switch (routeName) {
    case 'MoreRoot':
      console.log('more');
      return 'More';
    case 'AccountDetail':
      console.log('Account Detail');
      return 'Account Detail';
    case 'Medication':
      console.log('Medication');
      return 'Medication';
    case 'Appointments':
      console.log('Appointments');
      return 'Appointments';
    case 'HypocorrectionFood':
      console.log('HypocorrectionFood');
      return 'Hypocorrection Food';
  }
}

const MoreScreen = (props) => {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        headerShown: getMoreHeaderTitle(route),
        headerStyle: {
          backgroundColor: '#aad326',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center',
        },
      })}>
      <Stack.Screen
        name="MoreRoot"
        component={MoreRootScreen}
        options={({navigation}) => ({
          title: 'More',
          headerLeft: () => (
            <HeaderIcon
              iconName={'bell'}
              text={'Alerts'}
              clickFunc={() => navigation.navigate('Alerts')}
            />
          ),
          headerRight: () => (
            <HeaderIcon
              iconName={'comments'}
              text={'Chat'}
              clickFunc={() => navigation.navigate('Chat')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AccountDetail"
        component={AccountDetailScreen}
        options={{
          title: 'Account Detail',
          headerRight: () => <View />,
        }}
      />
      <Stack.Screen
        name="Medication"
        component={MedicationScreen}
        options={{
          title: 'Medication',
          headerRight: () => <View />,
        }}
      />
      <Stack.Screen
        name="Appointments"
        component={AppointmentScreen}
        options={{
          title: 'Appointments',
          headerRight: () => <View />,
        }}
      />
      <Stack.Screen
        name="HypocorrectionFood"
        component={HypocorrectionFood}
        options={{
          title: 'Hypo-correction Food',
          headerRight: () => <View />,
        }}
      />
      <Stack.Screen
        name="ViewMore"
        component={ViewMore}
        options={({route, navigation}) => ({
          title: route.params.category,
          headerRight: () => <View />,
        })}
      />
    </Stack.Navigator>
  );
};

export default MoreScreen;
