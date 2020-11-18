import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
//third party libs
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//functions
import {
  getFocusedRouteNameFromRoute,
  TabActions,
} from '@react-navigation/native';
//other screens
import Home from './main/home';
import AddLog from './main/log/addlog';
import ChatScreen from './main/chat';
import {ReportsScreen} from './main/reports';
//third party lib
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import GameCenter from './main/gameCenter/gameCenter';

import HOME from '../resources/images/Patient-Icons/SVG/icon-navy-footer-home.svg';
import HOME_FOCUSED from '../resources/images/Patient-Icons/SVG/icon-green-footer-home.svg';
import REPORTS from '../resources/images/Patient-Icons/SVG/icon-navy-footer-report.svg';
import REPORTS_FOCUSED from '../resources/images/Patient-Icons/SVG/icon-green-footer-report.svg';
import ADD from '../resources/images/Patient-Icons/SVG/icon-navy-footer-add.svg';
import ADD_FOCUSED from '../resources/images/Patient-Icons/SVG/icon-green-footer-add.svg';
import GAME from '../resources/images/Patient-Icons/SVG/icon-navy-footer-game.svg';
import GAME_FOCUSED from '../resources/images/Patient-Icons/SVG/icon-green-footer-game.svg';
import CHAT from '../resources/images/Patient-Icons/SVG/icon-navy-footer-chat.svg';
import CHAT_FOCUSED from '../resources/images/Patient-Icons/SVG/icon-green-footer-chat.svg';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {
  scaleFont,
  bottomNavigationIconStyle,
  heightPercent2Dp,
} from '../commonFunctions/scaleFunction';

const Tab = createBottomTabNavigator();

const DashboardScreen = (props) => {
  Icon.loadFont();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#16A950',
        inactiveTintColor: 'gray',
        adaptive: false,
        labelStyle: {
          fontSize: scaleFont(10),
        },
        style: {
          height: heightPercent2Dp('10.5%'),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <HOME_FOCUSED {...bottomNavigationIconStyle} />;
            } else {
              return <HOME {...bottomNavigationIconStyle} />;
            }
          },
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
        options={{
          title: 'Reports',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <REPORTS_FOCUSED {...bottomNavigationIconStyle} />;
            } else {
              return <REPORTS {...bottomNavigationIconStyle} />;
            }
          },
        }}
      />
      <Tab.Screen
        name="AddLog"
        component={AddLog}
        options={{
          title: 'Add Log',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <ADD_FOCUSED {...bottomNavigationIconStyle} />;
            } else {
              return <ADD {...bottomNavigationIconStyle} />;
            }
          },
        }}
      />
      <Tab.Screen
        name="GameCenter"
        component={GameCenter}
        options={{
          title: 'Game Center',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <GAME_FOCUSED {...bottomNavigationIconStyle} />;
            } else {
              return <GAME {...bottomNavigationIconStyle} />;
            }
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Chat',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <CHAT_FOCUSED {...bottomNavigationIconStyle} />;
            } else {
              return <CHAT {...bottomNavigationIconStyle} />;
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardScreen;
