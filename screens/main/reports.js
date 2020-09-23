import React from 'react';
import {View, StyleSheet, Text, Dimensions, ScrollView, TouchableOpacity, Image} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import BarChart from '../../components/dashboard/reports/BarChart';
import LineChart from '../../components/dashboard/reports/LineChart';
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import HIGHLIGHTED_BGL_ICON from '../../resources/images/icons/SVG/icon-lightgreen-bloodglucose.svg';
import HIGHLIGHTED_FOOD_ICON from '../../resources/images/icons/SVG/icon-lightgreen-food.svg';
import HIGHLIGHTED_MED_ICON from '../../resources/images/icons/SVG/icon-lightgreen-med.svg';
import HIGHLIGHTED_WEIGHT_ICON from '../../resources/images/icons/SVG/icon-lightgreen-weight.svg';
import HIGHLIGHTED_ACTIVITY_ICON from '../../resources/images/icons/SVG/icon-lightgreen-running-home.svg';
import ACTIVITY_ICON from '../../resources/images/icons/SVG/icon-navy-running.svg';
import {Colors} from "../../styles/colors";
import {requestNutrientConsumption} from "../../netcalls/mealEndpoints/requestMealLog";
import {getLastMinuteFromTodayDate} from "../../commonFunctions/common";
import Moment from 'moment';
import {getActivityLogs, getBloodGlucoseLogs, getMedicationLogs, getWeightLogs} from "../../netcalls/requestsLog";
import {MedicationTable} from "../../components/dashboard/reports/MedicationTable";
import {NutritionPie} from "../../components/dashboard/reports/NutritionPie";

const BGL_ICON = require('../../resources/images/icons/2x/icon-navy-bloodglucose-2x.png');
const FOOD_ICON = require('../../resources/images/icons/2x/icon-navy-food-2x.png');
const MED_ICON = require('../../resources/images/icons/2x/icon-navy-med-2x.png');
const WEIGHT_ICON = require('../../resources/images/icons/2x/icon-navy-weight-2x.png');

const iconProps = {
  width: 30,
  height: 30
}

const BGL_TAB_KEY = 'Blood Glucose';
const FOOD_INTAKE_KEY = 'Food Intake';
const MEDICATION_KEY = 'Medication';
const WEIGHT_KEY = 'Weight';
const ACTIVITY_KEY = "Activity"

const tabs = [
  {name: BGL_TAB_KEY, norm: () => <Image source={BGL_ICON} style={iconProps} />, highlighted: () => <HIGHLIGHTED_BGL_ICON {...iconProps} />},
  {name: FOOD_INTAKE_KEY, norm: () => <Image source={FOOD_ICON} style={iconProps} />, highlighted: () => <HIGHLIGHTED_FOOD_ICON {...iconProps} />},
  {name: MEDICATION_KEY, norm: () => <Image source={MED_ICON} style={iconProps} />, highlighted: () => <HIGHLIGHTED_MED_ICON {...iconProps} />},
  {name: WEIGHT_KEY, norm: () => <Image source={WEIGHT_ICON} style={iconProps} />, highlighted: () => <HIGHLIGHTED_WEIGHT_ICON {...iconProps} />},
  {name: ACTIVITY_KEY, norm: () => <ACTIVITY_ICON {...iconProps} />, highlighted: () => <HIGHLIGHTED_ACTIVITY_ICON {...iconProps} />},
];

const DAY_FILTER_KEY = 'Day';
const WEEK_FILTER_KEY = 'Week';
const MONTH_FILTER_KEY = 'Month';
const timeFilterTabs = [{name: DAY_FILTER_KEY}, {name: WEEK_FILTER_KEY}, {name: MONTH_FILTER_KEY}];

const padding = 20;
const tabSpace = 15;

const {width, height} = Dimensions.get('window');
const tabWidth = (width - 2 * padding) / tabs.length - tabSpace;

const ReportsScreen = (props) => {
  // Note all data here are the entire month dataset. We'll process it in the front-end before displaying.
  const [tabIndex, setTabIndex] = React.useState(0);
  const [timeTabIndexFilter, setTimeTabIndexFilter] = React.useState(1);
  const [bglData, setBglData] = React.useState([]);
  const [foodIntakeData, setFoodIntakeData] = React.useState([]);
  const [medConsumptionData, setMedConsumptionData] = React.useState([]);
  const [weightData, setWeightData] = React.useState([]);
  const [activityData, setActivityData] = React.useState([]);

  // Load data when focused
  React.useEffect(() => {
    props.navigation.addListener('focus', () => {
      const startDate = Moment(new Date()).subtract(28, "days");
      const endDate = Moment(new Date()).add(1, "day");
      requestNutrientConsumption(startDate.format('DD/MM/YYYY HH:mm:ss'), getLastMinuteFromTodayDate()).then(data => {
          setFoodIntakeData(data.data);
      }).catch(err => console.log(err));
      getWeightLogs(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD')).then(data => {
        setWeightData(data.logs);
      });
      getMedicationLogs(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD')).then(data=> {
        setMedConsumptionData(data.logs);
      });
      getBloodGlucoseLogs(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD')).then(data=> {
        setBglData(data.logs);
      });
      getActivityLogs(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD')).then(data => {
        setActivityData(data.logs);
      });
    });
  })

  const handleTabSelectChange = (tabIndex) => {
      setTabIndex(tabIndex);
      setTimeTabIndexFilter(1); // Revert back to week datum
  }

  const tabName = tabs[tabIndex].name;
  const filterKey = timeFilterTabs[timeTabIndexFilter].name;
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
          style={{marginLeft: '4%', marginRight: '4%'}}
          currentTab={tabIndex}
          setTabCallback={handleTabSelectChange}
        />
        <TimeFilterTab currentTab={timeTabIndexFilter} setTabCallback={setTimeTabIndexFilter}
                       style={{alignSelf: 'center', width: '50%', marginTop: '3.5%'}} />
        {
          tabName === BGL_TAB_KEY ? (
            <View style={{marginTop: 20}}>
              <Text style={globalStyles.pageDetails}>Blood Glucose</Text>
              <Text style={[globalStyles.pageDetails, {color: 'grey'}]}>Readings - mmol/L</Text>
              <LineChart data={bglData}
                         filterKey={filterKey}
                         xExtractor={d=>d.record_date}
                         yExtractor={d=>d.bg_reading}
                         defaultMaxY={14}
                         width={width}
                         height={300} />
            </View>
        ) : tabName === FOOD_INTAKE_KEY ? (
              <View style={{marginTop: 20}}>
                <Text style={globalStyles.pageDetails}>Food Intake</Text>
                <Text style={[globalStyles.pageDetails, {color: 'grey'}]}>Calories Consumed - kcal</Text>
                <BarChart data={foodIntakeData} filterKey={filterKey}
                          xExtractor={d=>d.date}
                          yExtractor={d=>d.nutrients.energy.amount}
                          defaultMaxY={2500}
                          width={width}
                          height={300} />
                <Text style={[globalStyles.pageDetails, {color: 'grey'}]}>Nutrition Distribution</Text>
                <NutritionPie data={foodIntakeData} filterKey={filterKey} pieKeys={['carbohydrate', 'total-fat', 'protein']} />
            </View>
        ) : tabName === MEDICATION_KEY ? (
            <View style={{marginTop: 20}}>
              <Text style={globalStyles.pageDetails}>Medication</Text>
              <Text style={[globalStyles.pageDetails, {color: 'grey'}]}>Average Adherence - %</Text>
              <MedicationTable
                  data={medConsumptionData}
                  style={{marginLeft: '4%', marginRight: '4%'}}
                  filterKey={filterKey}
                  width={width} height={height} />
            </View>
        ) : tabName === WEIGHT_KEY ? (
            <View style={{marginTop: 20}}>
                <Text style={globalStyles.pageDetails}>Weight</Text>
                <Text style={[globalStyles.pageDetails, {color: 'grey'}]}>Progress - kg</Text>
                <LineChart data={weightData} filterKey={filterKey} data={weightData}
                           width={width} height={300}
                           xExtractor={d=>d.record_date}
                           yExtractor={d=>d.weight}
                           defaultMinY={30}
                           defaultMaxY={110}/>
            </View>
        )
          : tabName === ACTIVITY_KEY ? (
              <View style={{marginTop: 20}}>
                <Text style={globalStyles.pageDetails}>Activity</Text>
                <Text style={[globalStyles.pageDetails, {color: 'grey'}]}>Steps Taken</Text>
                <BarChart data={activityData}
                          filterKey={filterKey}
                          width={width}
                          defaultMaxY={500}
                          xExtractor={d=>d.record_date}
                          yExtractor={d=>d.steps}
                          height={300} />
              </View>
          ) : null
        }
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
        <TouchableOpacity
          style={{
            alignItems: 'center',
            width: tabWidth,
            padding: 10,
            borderBottomWidth: currentTab === index ? 3 : 0,
            borderColor: '#aad326',
          }}
          onPress={()=>setTabCallback(index)}
          key={tab.name}>
          {
            currentTab === index ? tab.highlighted() : tab.norm()
          }
        </TouchableOpacity>
      ))}
    </View>
  );
}

function TimeFilterTab(props) {
  const {currentTab, setTabCallback} = props;

  return (
      <View style={[props.style, styles.timeFilterTabContainer]}>
        {
          timeFilterTabs.map((tab, index) => (
             <TouchableOpacity style={index === currentTab ?
                                        styles.selectedTimeFilterTabContainer: styles.normTimeFilterTabContainer}
                               onPress={()=>setTabCallback(index)} key={tab.name}>
               <Text style={index === currentTab ? styles.selectedTimeFilterText : styles.normTimeFilterText}>{tab.name}</Text>
             </TouchableOpacity>
          ))
        }
      </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  timeFilterTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.nextBtnColor
  },
  selectedTimeFilterTabContainer: {
    backgroundColor: Colors.nextBtnColor,
    borderRadius: 7,
    width: `${Math.round(100/timeFilterTabs.length)}%`,
    alignItems: 'center',
    padding: 7
  },
  selectedTimeFilterText: {
    fontWeight: 'bold'
  },
  normTimeFilterTabContainer: {
    borderRadius: 5,
    width: `${Math.round(100/timeFilterTabs.length)}%`,
    alignItems: 'center',
    padding: 7
  },
  normTimeFilterText: {
    color: '#000'
  }
});

export {ReportsScreen, WEEK_FILTER_KEY, DAY_FILTER_KEY, MONTH_FILTER_KEY, ACTIVITY_KEY, WEIGHT_KEY, MEDICATION_KEY, FOOD_INTAKE_KEY, BGL_TAB_KEY};
