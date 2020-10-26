import React, {Component} from 'react';
import {View, Linking} from 'react-native';
//third party libs
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Entypo from 'react-native-vector-icons/Entypo';
//functions
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from '../redux/reduxMapping';
//other screens

//components
import LoginCaregiver from './login/loginCaregiver';
import ChatScreen from './main/chat';

Entypo.loadFont();

const Stack = createStackNavigator();

class CaregiverRoot extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleRedirectUrl);
  }

  componentWillUnmount() {
    Linking.removeAllListeners('url');
  }

  render() {
    return (
      <>
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
              <Stack.Screen
                name="Char"
                component={ChatScreen}
                options={{
                  headerShown: false,
                  animationEnabled: true,
                }}
              />
            </>
          ) : (
            <></>
          )}
        </Stack.Navigator>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaregiverRoot);
