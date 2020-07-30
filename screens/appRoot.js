import * as React from 'react';
import DashBoard from './dashboard';
import HeaderIcon from '../components/headerBtnIcon';
import Login from './login/login';
import ForgetPasswordScreen from './login/ForgetPasswordScreen';
import InputOTPScreen from './login/inputOTPScreen';
import AlertsScreen from './sub/alerts';
import {View} from 'react-native';
import ChatScreen from './sub/chat';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import ResetPasswordScreen from './login/resetPassword';
import BloodGlucoseLog from './main/log/bloodGlucoseLog';
import MealLogStack from './main/log/meal/MealLogStack';
import MedicationLog from './main/log/medication/medicationLog';

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

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
  };
};

const AppRoot = (props) => {
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
        {props.isLogin ? (
          <>
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
            <Stack.Screen
              name="MealLogRoot"
              component={MealLogStack}
              options={{headerShown: false}} // Need to hide this so that the stack
              // navigator inside can show a different header
              /*
                                  options={({ route , navigation}) => ({
                        headerTitle: getHeaderTitleForMealLog(route),
                        headerLeft: () => (<HeaderIcon iconName="chevron-left"
                                                       text="Back" clickFunc={() =>
                            handleBackButtonForMealLog(route, navigation)
                        }/>),
                        headerRight: () => (<View style={{width: 25, height: 25}}/>)
                    })}

                                   */
            />
            <Stack.Screen
              name="BloodGlucoseLog"
              component={BloodGlucoseLog}
              options={{
                title: 'Add Medication Log',
                headerRight: () => <View />,
              }}
            />
            <Stack.Screen
              name="MedicationLog"
              component={MedicationLog}
              options={{
                title: 'Add Medication Log',
                headerRight: () => <View />,
              }}
            />
          </>
        ) : (
          <>
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
                headerRight: () => <View />,
              }}
            />
            <Stack.Screen
              name="InputOTP"
              component={InputOTPScreen}
              options={{
                title: 'Input OTP',
                headerBackTitle: 'Back',
                headerRight: false, //for android
                headerRight: () => <View />,
              }}
            />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
              options={{
                title: 'Reset Password',
                headerBackTitle: 'Back',
                headerRight: false, //for android
                headerRight: () => <View />,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default connect(mapStateToProps)(AppRoot);
