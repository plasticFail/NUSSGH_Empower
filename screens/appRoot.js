import React, {Component} from 'react';
import {Alert, View, Linking} from 'react-native';
//third party libs
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
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
import ResetPasswordScreen from './login/resetPassword';
import DailyLog from './main/log/dailyLog';
import MealLogRoot from './main/log/meal/MealLogRoot';
import DiaryDetail from './main/diary/diaryDetail';
//components
import CreateMealLogScreen from './main/log/meal/CreateMealLog';
import FavouriteMealScreen from './main/log/meal/FavouriteMeals';
import RecentMealScreen from './main/log/meal/RecentMeal';
import FoodSearchEngineScreen from './main/log/meal/FoodSearchEngine';
import HeaderBackIcon from '../components/common/headerBackIcon';
import HeaderBackIconClick from '../components/common/headerBackIconClick';
import ContactUs from './contactUs';
import AskAdd from './onboarding/medicationPlan/askAdd';
import AddPlan from './onboarding/medicationPlan/addPlan';
import {redirect_uri} from '../config/FitbitConfig';
import {AuthoriseFitbit} from '../commonFunctions/AuthoriseFitbit';
import FitbitSetup from './onboarding/fitbit/FitbitSetup';
import DrawerNavigator from './drawer';
import MenuBtn from '../components/menuBtn';

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
    Linking.addEventListener('url', this.handleRedirectUrl);
  }

  handleRedirectUrl = (event) => {
    const url = event.url;
    if (url.startsWith(redirect_uri)) {
      // fitbit redirect url
      AuthoriseFitbit(url);
    }
  };

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
      <>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={({route}) => ({
              headerShown: getHeaderShown(route),
              headerTintColor: '#000',
              headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center',
                backgroundColor: 'transparent',
              },
              headerTransparent: true,
            })}>
            {this.props.isLogin ? (
              <>
                <Stack.Screen
                  name="DashBoard"
                  component={DrawerNavigator}
                  options={{
                    headerShown: false,
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
                    title: 'Meal Log',
                    headerBackImage: () => <HeaderBackIcon />,
                    headerRight: () => <View />,
                    headerBackTitleVisible: false,
                  })}
                />
                <Stack.Screen
                  name={'CreateMealLog'}
                  component={CreateMealLogScreen}
                  options={({route, navigation}) => ({
                    animationEnabled: true,
                    title: 'Create Meal Log',
                    headerBackImage: () => (
                      <HeaderBackIconClick
                        clickFunc={() => {
                          if (route.params.edited) {
                            // Confirmation message before going back.
                            // If the meal has been edited, this dialogue will be popped.
                            // otherwise the user will be sent back to the previous page.
                            Alert.alert(
                              'Going back?',
                              'You have not submitted your meal log. Are you sure you want to leave this page?',
                              [
                                {
                                  text: 'Ok',
                                  onPress: navigation.goBack,
                                },
                                {
                                  text: 'Cancel',
                                  onPress: () => {},
                                },
                              ],
                            );
                          } else {
                            navigation.goBack();
                          }
                        }}
                      />
                    ),
                    headerRight: () => <View />,
                    headerBackTitleVisible: false,
                  })}
                />
                <Stack.Screen
                  name={'FavouriteMeal'}
                  component={FavouriteMealScreen}
                  options={({route, navigation}) => ({
                    title: 'Favourites',
                    headerBackImage: () => <HeaderBackIcon />,
                    headerRight: () => <View />,
                    ...TransitionPresets.ModalTransition,
                    headerBackTitleVisible: false,
                  })}
                />
                <Stack.Screen
                  name={'RecentMeal'}
                  component={RecentMealScreen}
                  options={({route, navigation}) => ({
                    title: 'Recent',
                    headerBackImage: () => <HeaderBackIcon />,
                    headerRight: () => <View />,
                    ...TransitionPresets.ModalTransition,
                    headerBackTitleVisible: false,
                  })}
                />
                <Stack.Screen
                  name={'FoodSearchEngine'}
                  component={FoodSearchEngineScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="DiaryDetail"
                  component={DiaryDetail}
                  options={({route}) => ({
                    title: 'Diary Entry: ' + route.params.date,
                    headerRight: () => <View />,
                  })}
                />
                {/* Onboarding */}
                <Stack.Screen
                  name="MedicationPlan"
                  component={AskAdd}
                  options={{header: () => <View />}}
                />
                <Stack.Screen
                  name="AddPlan"
                  component={AddPlan}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="FitbitSetup"
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
        </NavigationContainer>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
//comment
