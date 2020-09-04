import React from 'react';
//third party libs
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//functions
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
//other screens
import Home from './main/home';
import Diary from './main/diary/diary';
import AddLog from './main/log/addlog';
import AlertsScreen from './sub/alerts';
import ChatScreen from './sub/chat';
//third party lib
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';

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
};

const DashboardScreen = (props) => {
  Icon.loadFont();
  return (
    <Tab.Navigator
      backBehavior="none"
      tabBarOptions={{
        activeTintColor: '#16A950',
        inactiveTintColor: 'gray',
        adaptive: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        listeners={{
          tabPress: () => handleTabPress(props, 'Home'),
        }}
        options={{
          title: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Diary"
        component={Diary}
        listeners={{
          tabPress: () => handleTabPress(props, 'Diary'),
        }}
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
        listeners={{
          tabPress: () => handleTabPress(props, 'AddLog'),
        }}
        options={{
          title: 'Add Log',
          tabBarIcon: () => (
            <Ant
              name="pluscircle"
              size={70}
              color={'#aad326'}
              style={{
                position: 'absolute',
                bottom: 0,
                zIndex: 1,
                width: '100%',
                height: 70,
                paddingHorizontal: '7%',
                shadowColor: 'white',
                shadowOpacity: 0.5,
                elevation: 2,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Alert"
        component={AlertsScreen}
        listeners={{
          tabPress: () => handleTabPress(props, 'Alert'),
        }}
        options={{
          title: 'Alerts',
          tabBarIcon: ({color, size}) => (
            <Icon name="bell" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        listeners={{
          tabPress: () => handleTabPress(props, 'Chat'),
        }}
        options={{
          title: 'Chat',
          tabBarIcon: ({color, size}) => (
            <Icon name="wechat" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardScreen;
