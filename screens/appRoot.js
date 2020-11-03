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
import Logout from './more/logout';
//components
import ContactUs from './contactUs';
import PatientRoot from './patientRoot';
import {getRole} from '../storage/asyncStorageFunctions';
import {role_patient, role_caregiver} from '../commonFunctions/common';
import CaregiverRoot from './caregiverRoot';
import LoadingScreen from '../components/account/initLoadingScreen';
import Loading from '../components/loading';

const Stack = createStackNavigator();

class AppRoot extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      role: '',
    };
  }

  componentDidMount() {
    console.log('in mount----');
    Linking.addEventListener('url', this.handleRedirectUrl);
    this.setState({role: this.props.role});
  }

  componentDidUpdate() {
    console.log('pending role: ' + this.props.role);
    if (this.props.role === undefined || this.props.role === '') {
      this.initrole().then((data) => {
        this.setState({role: data});
        this.props.setUserRole(data);
      });
    }
  }

  componentWillUnmount() {
    console.log('unmounting -------');
    Linking.removeAllListeners('url');
    this.setState({role: ''});
  }

  async initrole() {
    return await getRole();
  }

  render() {
    const {role} = this.state;
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={({route}) => ({
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
                {/* View depending on user role */}
                {role === role_patient ? (
                  <Stack.Screen
                    name="PatientDashBoard"
                    component={PatientRoot}
                    options={{
                      headerShown: false,
                    }}
                  />
                ) : role === role_caregiver ? (
                  <Stack.Screen
                    name="CaregiverDashBoard"
                    component={CaregiverRoot}
                    options={{
                      headerShown: false,
                    }}
                  />
                ) : (
                  <Stack.Screen
                    name="Loading"
                    component={LoadingScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                )}
                <Stack.Screen
                  name="Log Out"
                  component={Logout}
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
                    headerShown: false,
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
