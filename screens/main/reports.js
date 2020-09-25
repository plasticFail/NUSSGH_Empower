import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Dimensions, ScrollView} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import MenuBtn from '../../components/menuBtn';
import BarChart from '../../components/dashboard/reports/BarChart';
import LineChart from '../../components/dashboard/reports/LineChart';
import Icon from 'react-native-vector-icons/FontAwesome5';
import logStyles from '../../styles/logStyles';
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import {useSafeArea} from 'react-native-safe-area-context';

const tabs = [
  {name: 'Blood Glucose', icon: 'tint'},
  {name: 'Food Intake', icon: 'cookie-bite'},
  {name: 'Medication', icon: 'capsules'},
  {name: 'Weight', icon: 'weight'},
  {name: 'Activity', icon: 'running'},
];

const timeFilterTabs = [{name: 'Day'}, {name: 'Week'}, {name: 'Month'}];

const padding = 20;
const tabSpace = 15;

const {width, height} = Dimensions.get('window');
const tabWidth = (width - 2 * padding) / tabs.length - tabSpace;

const ReportsScreen = (props) => {
  const initialTab =
    props.route.params?.initialTab === undefined
      ? 0
      : props.route.params.initialTab;
  const [tabIndex, setTabIndex] = useState(initialTab);
  const [timeFilter, setTimeFilter] = React.useState('Week');

  useEffect(() => {
    setTabIndex(initialTab);
    props.navigation.addListener('focus', () => {
      if (props.route.params?.initialTab != null) {
        console.log('inside ' + props.route.params?.initialTab);
        setTabIndex(props.route.params?.initialTab);
      }
    });
  }, [props.route.params]);

  console.log('outside focus' + props.route.params?.initialTab);
  console.log(initialTab);

  return (
    <ScrollView
      style={{...styles.screen, ...props.style}}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={{...globalStyles.pageContainer}}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={() => props.navigation.navigate('Home')} />
        </View>
        <Text style={globalStyles.pageHeader}>Report</Text>
        <ReportsTabs
          currentTab={tabIndex}
          setTabCallback={(index) => setTabIndex(index)}
        />
        {tabIndex === 0 ? (
          <BarChart width={width} height={300} />
        ) : tabIndex === 1 ? (
          <LineChart width={width} height={300} />
        ) : null}
      </View>
    </ScrollView>
  );
};

function ReportsTabs(props) {
  const {currentTab, setTabCallback} = props;
  return (
    <View
      style={[
        {flexDirection: 'row', justifyContent: 'space-between'},
        props.style,
      ]}>
      {tabs.map((tab, index) => (
        <View
          style={{
            alignItems: 'center',
            width: tabWidth,
            borderBottomWidth: currentTab === index ? 3 : 0,
            borderColor: '#aad326',
          }}
          key={tab.name}>
          <Icon
            name={tab.icon}
            size={30}
            color="#000"
            onPress={() => setTabCallback(index)}
            style={{paddingBottom: 7.5}}
          />
        </View>
      ))}
    </View>
  );
}

function TimeFilterTab(props) {
  // To do
  return null;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default ReportsScreen;
