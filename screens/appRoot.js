import React, {Component} from 'react';
import {View, Text} from 'react-native';
//third party libs
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
//functions
import {getToken} from '../storage/asyncStorageFunctions';
import {mapStateToProps, mapDispatchToProps} from '../redux/reduxMapping';
import {isTokenValidRequest} from '../netcalls/requestsAuth';
//other screens
import DashBoard from './dashboard';
import Login from './login/login';
import ForgetPasswordScreen from './login/ForgetPasswordScreen';
import InputOTPScreen from './login/inputOTPScreen';
import AlertsScreen from './sub/alerts';
import ChatScreen from './sub/chat';
import ResetPasswordScreen from './login/resetPassword';
import DailyLog1 from './main/log/dailyLog/dailyLog1';
import BloodGlucoseLog from './main/log/bloodGlucoseLog';
import MedicationLog from './main/log/medication/medicationLog';
import MealLogStack from './main/log/meal/MealLogStack';
import WeightLog from './main/log/weightLog';
//components
import HeaderIcon from '../components/headerBtnIcon';
import HypoglycemiaReason from './hypoglycemiaReason';


Entypo.loadFont();

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

class AppRoot extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const token = await getToken();
    if (token !== null && token !== '') {
      console.log('token : ' + token);
      let tokenIsValid = await isTokenValidRequest(token);
      if (tokenIsValid) {
        this.props.login();
      }
    }
  };

  render() {
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
          {this.props.isLogin ? (
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
                  name="DailyLog"
                  component={DailyLog1}
                  options={{
                    title: 'Daily Log',
                    headerRight: () => <View />,
                  }}
              />
              <Stack.Screen
                name="MealLogRoot"
                component={MealLogStack}
                options={{headerShown: false}} // Need to hide this so that the stack
                // navigator inside can show a different header
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
              <Stack.Screen
                name="WeightLog"
                component={WeightLog}
                options={{
                  title: 'Add Weight Log',
                  headerRight: () => <View />,
                }}
              />
              <Stack.Screen
                name="HypoglycemiaReason"
                component={HypoglycemiaReason}
                options={({navigation}) => ({
                  title: 'WARNING',
                  headerStyle: {
                    backgroundColor: '#eb90d6',
                  },
                  headerRight: () => <View />,
                })}
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
                  headerStyle: {
                    backgroundColor: '#aad326',
                  },
                  headerTintColor: '#000',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  },
                  headerRight: () => <View />,
                }}
              />
              <Stack.Screen
                name="InputOTP"
                component={InputOTPScreen}
                options={{
                  title: 'Input OTP',
                  headerStyle: {
                    backgroundColor: '#aad326',
                  },
                  headerTintColor: '#000',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  },
                  headerRight: () => <View />,
                  headerBackTitle: 'Back',
                }}
              />
              <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
                options={{
                  title: 'Reset Password',
                  headerStyle: {
                    backgroundColor: '#aad326',
                  },
                  headerTintColor: '#000',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  },
                  headerRight: () => <View />,
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
