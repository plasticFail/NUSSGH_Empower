import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './main/home';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Diary from './main/diary';
import AddLog from './main/addlog';
import More from './main/more';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function getMoreHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'More';

  switch (routeName) {
    case 'More':
      console.log('more');
      return 'More';
    case 'AccountDetail':
      console.log('Account Detail');
      return 'Account Detail';
    case 'Medication':
      console.log('Medication');
      return 'Medication';
  }
}

// Method to reset the tab navigation when navigating through pages
// Quite unclean during the development phase because of the warning shown.
const handleTabPress = ({navigation}, pathName) => {
    navigation.popToTop() && navigation.navigate(pathName);
}

const DashboardScreen = props => {
    Icon.loadFont();
    return (
        <Tab.Navigator
            backBehavior='none'
            tabBarOptions={{
                activeTintColor: '#ea626b',
                inactiveTintColor: 'gray',
                adaptive: false,
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                listeners={{
                    tabPress: () => handleTabPress(props, "Home")
                }}
                options={{
                    title:"Home",
                    tabBarIcon: ({color, size}) => (
                        <Icon name='home' size={size} color={color}/>
                    ),
                }}
                // listeners={{
                //     tabPress: e => {
                //         props.navigation.setOptions({ title: 'Home' });
                //     },
                // }}
            />
            <Tab.Screen
                name="Diary"
                component={Diary}
                listeners={{
                    tabPress: () => handleTabPress(props, "Diary")
                }}
                options={{
                    title:"Diary",
                    tabBarIcon: ({color, size}) => (
                        <Icon name='book' size={size} color={color}/>
                    ),
                }}
            />
            <Tab.Screen
                name="AddLog"
                component={AddLog}
                listeners={{
                    tabPress: () => handleTabPress(props, "AddLog")
                }}
                options={{
                    title:"Add Log",
                    tabBarIcon: ({color, size}) => (
                        <Icon name='plus-circle' size={size} color={color}/>
                    ),
                }}
            />
            <Tab.Screen
                name="More"
                component={More}
                listeners={{
                    tabPress: () => handleTabPress(props, "More")
                }}
                options={{
                    title:'More',
                    tabBarIcon: ({color, size}) => (
                        <Icon name='bars' size={size} color={color}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default DashboardScreen;
