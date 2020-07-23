import * as React from 'react';
import {View, Text} from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DashBoard from './screens/dashboard';
import HeaderIcon from './components/headerBtnIcon';
import AlertsScreen from './screens/sub/alerts';
import ChatScreen from './screens/sub/chat';
import Login from './screens/sub/login';
import ForgetPasswordScreen from './screens/sub/ForgetPasswordScreen';
import InputOTPScreen from './screens/sub/inputOTPScreen';

const Stack = createStackNavigator();

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Diary':
      return 'Diary';
    case 'AddLog':
      return 'Add Log';
    case 'More':
      return 'More';
  }
}

function getHeaderShown(route) {
  if (getHeaderTitle(route) === 'More') {
    return false;
  }
  return true;
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({route}) => ({
          headerShown: getHeaderShown(route),
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
          name="DashBoard"
          component={DashBoard}
          options={({route, navigation}) => ({
            title: getHeaderTitle(route),
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
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPasswordScreen}
          options={{
            title: 'Forget Password',
          }}
        />
        <Stack.Screen
          name="InputOTP"
          component={InputOTPScreen}
          options={{
            title: 'Input OTP',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="Alerts"
          component={AlertsScreen}
          options={{
            title: 'Alerts',
            headerRight: () => <View />,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            title: 'Chat',
            headerRight: () => <View />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
