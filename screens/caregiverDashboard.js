import React, {useEffect, useState} from 'react';
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
import HomeScreenPatient from './main/home-caregiver';
import HomeScreenCaregiver from './main/home-caregiver';
import AlertNotifIcon from '../components/alertNotifIcon';

import {
  morningObj,
  afternoonObj,
  getGreetingFromHour,
} from '../commonFunctions/common';
import {
  checkLogDone,
  food_key,
  bg_key,
  med_key,
  weight_key,
} from '../commonFunctions/logFunctions';
import {getParticularLogTypeIncompleteText} from '../commonFunctions/notifFunction';
import {
  getReadNotifDate,
  storeReadNotifDate,
} from '../storage/asyncStorageFunctions';
import moment from 'moment';

const Tab = createBottomTabNavigator();

const iconStyle = {
  width: 30,
  height: 30,
};
const CaregiverBottomTab = (props) => {
  //states for the notifications*
  const [currHour, setCurrHour] = useState(new Date().getHours());
  //log notif
  const [logsNotDone, setLogsNotDone] = useState([]);
  const [count, setCount] = useState(0);
  //badge
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    initUncompleteLog().then(() => {});
    async function getRead() {
      await setBadge();
    }
    getRead();
  }, []);

  //notif - log not done
  const initUncompleteLog = async () => {
    if (getGreetingFromHour(currHour) != morningObj.name) {
      let rsp1 = await checkLogDone(morningObj.name);
      let rsp2 = await checkLogDone(afternoonObj.name);
      console.log('re init');
      let bg = getParticularLogTypeIncompleteText(
        rsp1.notCompleted,
        rsp2.notCompleted,
        bg_key,
      );
      let food = getParticularLogTypeIncompleteText(
        rsp1.notCompleted,
        rsp2.notCompleted,
        food_key,
      );
      let med = getParticularLogTypeIncompleteText(
        rsp1.notCompleted,
        rsp2.notCompleted,
        med_key,
      );
      let weight = getParticularLogTypeIncompleteText(
        rsp1.notCompleted,
        rsp2.notCompleted,
        weight_key,
      );

      let obj = [
        {
          type: bg_key,
          msg: bg,
        },
        {
          type: food_key,
          msg: food,
        },
        {
          type: med_key,
          msg: med,
        },
        {
          type: weight_key,
          msg: weight,
        },
      ];

      setLogsNotDone(obj);
      await setBadge();
    }
  };

  //notif - set show badge
  const setBadge = async () => {
    let r = await getReadNotifDate();
    let period = r?.period;
    let date = r?.date;
    let currDate = moment(new Date()).format('YYYY-MM-DD');
    let currentperiod = getGreetingFromHour(currHour);
    if (currentperiod === morningObj.name) {
      console.log('morning, no new notif*');
      setShowBadge(false);
      return;
    }
    //check if date is same as today,
    if (period === null && date === null) {
      await storeReadNotifDate({period: currentperiod, date: currDate});
    } else if (moment(date).isSame(currDate)) {
      //if same date, but period !=currperiod , read false
      console.log('read notification on same date ' + date);
      if (period != currentperiod) {
        setShowBadge(true);
      } else {
        setShowBadge(false);
      }
    } else {
      setShowBadge(true);
    }
  };

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
        component={HomeScreenCaregiver}
        options={{
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
        children={() => (
          <AlertsScreen
            logsNotDone={logsNotDone}
            reInit={initUncompleteLog}
            setBadge={setBadge}
          />
        )}
        options={{
          title: 'Alert',
          tabBarIcon: ({focused}) => {
            if (focused) {
              return <AlertNotifIcon focused={true} showBadge={showBadge} />;
            } else {
              return <AlertNotifIcon focused={false} showBadge={showBadge} />;
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
