import React, {Component} from 'react';
import {View, Linking} from 'react-native';
//third party libs
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import Entypo from 'react-native-vector-icons/Entypo';
import Animated, {Easing} from 'react-native-reanimated';
//functions
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from '../redux/reduxMapping';
//other screens
import Login from './login/login';
import ForgetPasswordScreen from './login/ForgetPasswordScreen';
import ResetPasswordScreen from './login/resetPassword';
import AccountDetailScreen from './more/accountDetails';
import DiaryScreen from './main/diary/diary';
import MedicationScreen from './more/medications';
import GoalsScreen from './more/goals';
import AppointmentScreen from './more/appointments';
import EducationMaterialsScreen from './more/educationMaterials';
import StartNewWord from './main/gameCenter/startNewWord';
import MyWord from './main/gameCenter/myWord';
import FillTheCard from './main/gameCenter/fillTheCard';
import Logout from './more/logout';
//components
import ContactUs from './contactUs';
import AskAdd from './onboarding/medicationPlan/askAdd';
import FitbitSetup from './onboarding/fitbit/FitbitSetup';
import DrawerNavigator from './drawer';

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
    Linking.addEventListener('url', this.handleRedirectUrl);
  }

  handleRedirectUrl = (event) => {
    // const url = event.url;
    /*
    if (url.startsWith(redirect_uri)) {
      // fitbit redirect url
      AuthoriseFitbit(url);
    }
    */
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
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            })}>
            {this.props.isLogin ? (
              <>
                <Stack.Screen
                  name="DashBoard"
                  component={DrawerNavigator}
                  options={{
                    headerShown: false,
                    animationEnabled: true,
                  }}
                />
                {/* Onboarding */}
                <Stack.Screen
                  name="MedicationPlan"
                  component={AskAdd}
                  options={{header: () => <View />}}
                />
                <Stack.Screen
                  name="FitbitSetup"
                  component={FitbitSetup}
                  options={{headerShown: false}}
                />
                {/* Drawer Screen */}
                <Stack.Screen
                  name="Edit Account"
                  component={AccountDetailScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Diary"
                  component={DiaryScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Medication"
                  component={MedicationScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Goals"
                  component={GoalsScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Appointment"
                  component={AppointmentScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Resources"
                  component={EducationMaterialsScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Log Out"
                  component={Logout}
                  options={{
                    headerShown: false,
                  }}
                />
                  <Stack.Screen
                      name="StartNewWord"
                      component={StartNewWord}
                      options={{
                          headerShown: false,
                      }}
                  />
                <Stack.Screen
                  name="MyWord"
                  component={MyWord}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="FillTheCard"
                  component={FillTheCard}
                  options={{
                    headerShown: false,
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
                  name="ContactUsScreen"
                  component={ContactUs}
                  options={{
                    title: '',
                    headerRight: () => <View />,
                    headerBackTitle: 'Back',
                  }}
                />
                <Stack.Screen
                  name="ForgetPassword"
                  component={ForgetPasswordScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="ResetPasswordScreen"
                  component={ResetPasswordScreen}
                  options={{
                    headerShown: false,
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

const forSlide = ({current, next, inverted, layouts: {screen}}) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0,
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -0.3, // Fully unfocused
              ],
              extrapolate: 'clamp',
            }),
            inverted,
          ),
        },
      ],
    },
  };
};
