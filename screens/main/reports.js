import React from 'react';
import {View, StyleSheet, Text, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import globalStyles from '../../styles/globalStyles';
import BarChart from '../../components/dashboard/reports/BarChart';
import LineChart from '../../components/dashboard/reports/LineChart';
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import HIGHLIGHTED_BGL_ICON from '../../resources/images/icons/SVG/icon-lightgreen-bloodglucose.svg';
import BGL_ICON from '../../resources/images/icons/SVG/icon-darkgreen-bloodglucose.svg';
import HIGHLIGHTED_FOOD_ICON from '../../resources/images/icons/SVG/icon-lightgreen-food.svg';
import FOOD_ICON from '../../resources/images/icons/SVG/icon-darkgreen-food.svg';
import HIGHLIGHTED_MED_ICON from '../../resources/images/icons/SVG/icon-lightgreen-med.svg';
import MED_ICON from '../../resources/images/icons/SVG/icon-darkgreen-med.svg';
import HIGHLIGHTED_WEIGHT_ICON from '../../resources/images/icons/SVG/icon-lightgreen-weight.svg';
import WEIGHT_ICON from '../../resources/images/icons/SVG/icon-darkgreen-weight.svg';
import HIGHLIGHTED_ACTIVITY_ICON from '../../resources/images/icons/SVG/icon-lightgreen-running-home.svg';
import ACTIVITY_ICON from '../../resources/images/icons/SVG/icon-navy-running.svg';
import {Colors} from "../../styles/colors";
import {requestNutrientConsumption} from "../../netcalls/mealEndpoints/requestMealLog";
import {getLastMinuteFromTodayDate} from "../../commonFunctions/common";
import Moment from 'moment';
import {filterToDayData} from "../../commonFunctions/reportDataFormatter";
import {getBloodGlucoseLogs, getMedicationLogs, getWeightLogs} from "../../netcalls/requestsLog";
import {MedicationTable} from "../../components/dashboard/reports/MedicationTable";
import NutritionIntakeCard from "../../components/dashboard/todayOverview/cards/NutritionIntakeCard";
import {NutritionPie} from "../../components/dashboard/reports/NutritionPie";

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
  {name: BGL_TAB_KEY, norm: () => <BGL_ICON {...iconProps} />, highlighted: () => <HIGHLIGHTED_BGL_ICON {...iconProps} />},
  {name: FOOD_INTAKE_KEY, norm: () => <FOOD_ICON {...iconProps} />, highlighted: () => <HIGHLIGHTED_FOOD_ICON {...iconProps} />},
  {name: MEDICATION_KEY, norm: () => <MED_ICON {...iconProps} />, highlighted: () => <HIGHLIGHTED_MED_ICON {...iconProps} />},
  {name: WEIGHT_KEY, norm: () => <WEIGHT_ICON {...iconProps} />, highlighted: () => <HIGHLIGHTED_WEIGHT_ICON {...iconProps} />},
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
            <LineChart data={bglData}
                       filterKey={filterKey}
                       xExtractor={d=>d.record_date}
                       yExtractor={d=>d.bg_reading}
                       defaultMaxY={14}
                       width={width}
                       height={300} />
        ) : tabName === FOOD_INTAKE_KEY ? (
            <React.Fragment>
              <BarChart data={foodIntakeData} filterKey={filterKey}
                        xExtractor={d=>d.date}
                        yExtractor={d=>d.nutrients.energy.amount}
                        defaultMaxY={2500}
                        width={width}
                        height={300} />
              <NutritionPie data={foodIntakeData} filterKey={filterKey} pieKeys={['carbohydrate', 'total-fat', 'protein']} />
            </React.Fragment>
        ) : tabName === MEDICATION_KEY ? (
            <MedicationTable
                data={medConsumptionData}
                style={{marginLeft: '4%', marginRight: '4%'}}
                filterKey={filterKey}
                width={width} height={height} />
        ) : tabName === WEIGHT_KEY ? (
                <LineChart data={weightData} filterKey={filterKey} data={weightData}
                           width={width} height={300}
                           xExtractor={d=>d.record_date}
                           yExtractor={d=>d.weight}
                           defaultMaxY={14}/>
        )
          : tabName === ACTIVITY_KEY ? (
                null && <BarChart data={weightData} filterKey={filterKey} width={width} height={300} />
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
