import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import MoreRootScreen from '../more/moreRoot';
import AccountDetailScreen from '../more/accountDetails';
import MedicationScreen from '../more/medications';
import HeaderIcon from '../../components/common/headerBtnIcon';

const Stack = createStackNavigator();


function getMoreHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'More';

    switch (routeName) {
        case 'MoreRoot':
            console.log('more')
            return 'More';
        case 'AccountDetail':
            console.log('Account Detail')
            return 'Account Detail';
        case 'Medication':
            console.log('Medication')
            return 'Medication';
    }
}

const MoreScreen = props => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MoreRoot"
                component={MoreRootScreen}
                options={({navigation}) => ({
                    title: "More",
                    headerStyle: {
                        backgroundColor: '#aad326',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        alignSelf: 'center',
                    },
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
                name="Medication"
                component={MedicationScreen}
                options={{
                    title: 'Medication',
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
        </Stack.Navigator>
    )
};

export default MoreScreen;
