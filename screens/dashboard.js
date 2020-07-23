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

const DashboardScreen = (props) => {
  Icon.loadFont(); //added
  return (
    <Tab.Navigator
      backBehavior="none"
      tabBarOptions={{
        activeTintColor: '#ea626b',
        inactiveTintColor: 'gray',
        adaptive: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
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
        options={{
          title: 'Diary',
          tabBarIcon: ({color, size}) => (
            <Icon name="book" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddLog"
        component={AddLog}
        options={{
          title: 'Add Log',
          tabBarIcon: ({color, size}) => (
            <Icon name="plus-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          title: 'More',
          tabBarIcon: ({color, size}) => (
            <Icon name="bars" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardScreen;
