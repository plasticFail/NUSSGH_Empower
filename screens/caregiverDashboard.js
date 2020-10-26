import React from 'react';
//third party libs
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//other screens
import Home from './main/home';
import AddLog from './main/log/addlog';
import ChatScreen from './main/chat';
import {ReportsScreen} from './main/reports';
import AlertsScreen from './main/alerts';

import HOME from '../resources/images/Patient-Icons/SVG/icon-navy-footer-home.svg';
import HOME_FOCUSED from '../resources/images/Patient-Icons/SVG/icon-green-footer-home.svg';
import REPORTS from '../resources/images/Patient-Icons/SVG/icon-navy-footer-report.svg';
import REPORTS_FOCUSED from '../resources/images/Patient-Icons/SVG/icon-green-footer-report.svg';
import ADD from '../resources/images/Patient-Icons/SVG/icon-navy-footer-add.svg';
import ADD_FOCUSED from '../resources/images/Patient-Icons/SVG/icon-green-footer-add.svg';
import ALERT from '../resources/images/Caregiver-Additional-Icons/SVG/cg-icon-navy-footer-alert.svg';
import ALERT_FOCUSED from '../resources/images/Caregiver-Additional-Icons/SVG/cg-icon-green-footer-alert.svg';
import CHAT from '../resources/images/Patient-Icons/SVG/icon-navy-footer-chat.svg';
import CHAT_FOCUSED from '../resources/images/Patient-Icons/SVG/icon-green-footer-chat.svg';

const Tab = createBottomTabNavigator();

const iconStyle = {
  width: 30,
  height: 30,
};
const CaregiverBottomTab = (props) => {
  console.log('caregiver bottom tab');
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#16A950',
        inactiveTintColor: 'gray',
        adaptive: false,
        labelStyle: {
          fontSize: 12,
        },
        style: {
          height: '10%',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <HOME_FOCUSED {...iconStyle} />;
            } else {
              return <HOME {...iconStyle} />;
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
              return <REPORTS_FOCUSED {...iconStyle} />;
            } else {
              return <REPORTS {...iconStyle} />;
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
              return <ADD_FOCUSED {...iconStyle} />;
            } else {
              return <ADD {...iconStyle} />;
            }
          },
        }}
      />
      <Tab.Screen
        name="Alerts"
        component={AlertsScreen}
        options={{
          title: 'Alert',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <ALERT_FOCUSED {...iconStyle} />;
            } else {
              return <ALERT {...iconStyle} />;
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
              return <CHAT_FOCUSED {...iconStyle} />;
            } else {
              return <CHAT {...iconStyle} />;
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default CaregiverBottomTab;
