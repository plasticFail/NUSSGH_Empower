import React, {Component} from 'react';
import DashBoard from './dashboard';
import HeaderIcon from '../components/headerBtnIcon';
import Login from './login/login';
import ForgetPasswordScreen from './login/ForgetPasswordScreen';
import InputOTPScreen from './login/inputOTPScreen';
import AlertsScreen from './sub/alerts';
import {View} from 'react-native';
import ChatScreen from './sub/chat';
import {getFocusedRouteNameFromRoute, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import MealLogStack from "./main/log/meal/MealLogStack";
import {getToken} from '../storage/asyncStorageFunctions';
import {mapStateToProps, mapDispatchToProps} from '../redux/reduxMapping';
import {isTokenValidRequest} from '../netcalls/requestsAuth';


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
        if(token !== null && token !== ''){
            console.log('token : ' + token);
            let tokenIsValid = await isTokenValidRequest(token);
            if(tokenIsValid) {
                this.props.login();
            }
        }
    }

    render()
    {
        return (<NavigationContainer>
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
                                headerRight: () => <View/>,
                            }}
                        />
                        <Stack.Screen
                            name="Chat"
                            component={ChatScreen}
                            options={{
                                title: 'Chat',
                                headerRight: () => <View/>,
                            }}
                        />
                        <Stack.Screen name="MealLogRoot"
                                      component={MealLogStack}
                                      options={{headerShown: false}} // Need to hide this so that the stack
                            // navigator inside can show a different header
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{headerShown: false}}/>
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
                                headerRight: () => (<View/>),
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
                                headerRight: () => (<View/>),
                            }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
