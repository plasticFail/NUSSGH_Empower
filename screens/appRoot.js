import React, {Component} from 'react';
import {Alert, View, Linking, Platform} from 'react-native';
//third party libs
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {connect} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
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
import DailyLog from './main/log/dailyLog';
import BloodGlucoseLog from './main/log/bloodGlucoseLog';
import MedicationLog from './main/log/medicationLog';
import MealLogRoot from './main/log/meal/MealLogRoot';
import WeightLog from './main/log/weightLog';
import DiaryDetail from './main/diary/diaryDetail';
//components
import HeaderIcon from '../components/common/headerBtnIcon';
import CreateMealLogScreen from './main/log/meal/CreateMealLog';
import FavouriteMealComponent from './main/log/meal/FavouriteMeals';
import RecentMealScreen from './main/log/meal/RecentMeal';
import FoodSearchEngineScreen from './main/log/meal/FoodSearchEngine';
import HeaderBackIcon from '../components/common/headerBackIcon';
import HeaderBackIconClick from '../components/common/headerBackIconClick';
import ContactUs from './contactUs';
import AskAdd from './onboarding/medicationPlan/askAdd';
import AddPlan from './onboarding/medicationPlan/addPlan';
import {redirect_uri} from "../config/FitbitConfig";
import {AuthoriseFitbit} from "../commonFunctions/AuthoriseFitbit";
import FitbitSetup from "./onboarding/fitbit/FitbitSetup";
import {CustomDrawerComponent} from "../components/common/CustomDrawerComponent";
import GameCenterScreen from "./more/gameCenter";
import GoalsScreen from "./more/goals";
import EducationMaterialsScreen from "./more/educationMaterials";
import AppointmentScreen from "./more/appointments";
import AccountDetailScreen from "./more/accountDetails";
import MedicationScreen from "./more/medications";

Entypo.loadFont();

const Stack = createStackNavigator();

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route); // ?? 'Home';
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
  return route.name;
}

function getHeaderShown(route) {
  if (getHeaderTitle(route) === 'More') {
    return false;
  }
  return true;
}

const Drawer = createDrawerNavigator();

class AppRoot extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    this.init();
    Linking.addEventListener('url', this.handleRedirectUrl);
  }

  handleRedirectUrl = (event) => {
    const url = event.url;
    if (url.startsWith(redirect_uri)) {
      // fitbit redirect url
      AuthoriseFitbit(url);
    }
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

  componentWillUnmount() {
    Linking.removeAllListeners('url');
  }

  render() {
    return (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName='Empower'
                            drawerContent={CustomDrawerComponent}
                            backBehavior='none'>
            <Drawer.Screen
                name='Empower' component={() => (
                  <Stack.Navigator
                      initialRouteName='DashBoard'
                      screenOptions={({route}) => {
                        return ({
                          //headerShown: getHeaderShown(route),
                          headerStyle: {
                            backgroundColor: (getHeaderTitle(route) === 'Home' || getHeaderTitle(route) === 'DashBoard' ? '#4EA75A' : '#fff'),
                            height: Platform.OS === 'android' ? 80 : 110,
                            elevation: 0,
                            shadowRadius: 0,
                            shadowOffset: {
                              height: 0,
                              width: 0
                            }
                          },
                          headerTintColor: '#4EA75A',
                          headerTitleStyle: {
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            color: (getHeaderTitle(route) === 'Home' || getHeaderTitle(route) === 'DashBoard' ? '#fff' : '#4EA75A' )
                          },
                        })
                      }
                      }>
                    {this.props.isLogin ? (
                        <>
                          <Stack.Screen
                              name="DashBoard"
                              component={DashBoard}
                              options={({route, navigation}) => ({
                                title: '', //getHeaderTitle(route),
                                headerLeft: () => (
                                    <HeaderIcon
                                        color={getHeaderTitle(route) === 'Home' || getHeaderTitle(route) === 'DashBoard' ? '#fff' : '#4EA75A'}
                                        iconName={'bars'}
                                        style={{padding: 10}}
                                        clickFunc={navigation.openDrawer}
                                    />
                                ),
                              })}
                          />
                          <Stack.Screen
                              name="Alerts"
                              component={AlertsScreen}
                              options={{
                                title: 'Alerts',
                                headerBackImage: () => <HeaderBackIcon />,
                                headerRight: () => <View />,
                                headerBackTitleVisible: false,
                              }}
                          />
                          <Stack.Screen
                              name="Chat"
                              component={ChatScreen}
                              options={{
                                title: 'Chat',
                                headerBackImage: () => <HeaderBackIcon />,
                                headerRight: () => <View />,
                                headerBackTitleVisible: false,
                              }}
                          />
                          <Stack.Screen
                              name="DailyLog"
                              component={DailyLog}
                              options={{
                                title: 'Daily Log',
                                headerBackImage: () => <HeaderBackIcon />,
                                headerRight: () => <View />,
                                headerBackTitleVisible: false,
                              }}
                          />
                          <Stack.Screen
                              name="MealLogRoot"
                              component={MealLogRoot}
                              options={({route, navigation}) => ({
                                headerShown: false
                              })}
                          />
                          <Stack.Screen
                              name={'CreateMealLog'}
                              component={CreateMealLogScreen}
                              options={({route, navigation}) => ({
                                headerShown: false
                              })}
                          />
                          <Stack.Screen
                              name={'FoodSearchEngine'}
                              component={FoodSearchEngineScreen}
                              options={{headerShown: false}}
                          />
                          <Stack.Screen
                              name="BloodGlucoseLog"
                              component={BloodGlucoseLog}
                              options={{
                                title: 'Blood Glucose Log',
                                headerRight: () => <View />,
                                headerBackImage: () => <HeaderBackIcon />,
                                headerBackTitleVisible: false,
                              }}
                          />
                          <Stack.Screen
                              name="MedicationLog"
                              component={MedicationLog}
                              options={{
                                title: 'Medication Log',
                                headerRight: () => <View />,
                                headerBackImage: () => <HeaderBackIcon />,
                                headerBackTitleVisible: false,
                              }}
                          />
                          <Stack.Screen
                              name="WeightLog"
                              component={WeightLog}
                              options={{
                                title: 'Weight Log',
                                headerRight: () => <View />,
                                headerBackImage: () => <HeaderBackIcon />,
                                headerBackTitleVisible: false,
                              }}
                          />
                          <Stack.Screen
                              name="DiaryDetail"
                              component={DiaryDetail}
                              options={({route}) => ({
                                title: 'Diary Entry: ' + route.params.date,
                                headerRight: () => <View />,
                              })}
                          />
                          {/* Drawer items */}
                          <Stack.Screen name="AccountDetail"
                                        component={AccountDetailScreen} />
                          <Stack.Screen name="GameCenter"
                                         component={GameCenterScreen} />
                          <Stack.Screen name="Goals"
                                         component={GoalsScreen} />
                          <Stack.Screen name="EducationMaterials"
                                         component={EducationMaterialsScreen} />
                          <Stack.Screen name="Appointments"
                                         component={AppointmentScreen} />
                          <Stack.Screen name="Medication"
                                         component={MedicationScreen} />
                          {/* Onboarding */}
                          <Stack.Screen
                              name="MedicationPlan"
                              component={AskAdd}
                              options={{headerShown: false}}
                          />
                          <Stack.Screen
                              name="AddPlan"
                              component={AddPlan}
                              options={{headerShown: false}}
                          />
                          <Stack.Screen name="FitbitSetup"
                                        component={FitbitSetup}
                                        options={{headerShown: false}}
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
                              name="ContactUsScreen"
                              component={ContactUs}
                              options={{
                                title: 'Contact Us',
                                headerRight: () => <View />,
                                headerBackTitle: 'Back',
                              }}
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
                                headerRight: () => <View />,
                                headerBackTitle: 'Back',
                              }}
                          />
                          <Stack.Screen
                              name="ResetPasswordScreen"
                              component={ResetPasswordScreen}
                              options={{
                                title: 'Reset Password',
                                headerLeft: false,
                              }}
                          />
                        </>
                    )}
                  </Stack.Navigator>
            )} />
          </Drawer.Navigator>
        </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
