import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CalorieReport from '../../components/dashboard/reports/CalorieReport';
import {
  SimplePieChart,
  PieChart,
} from '../../components/dashboard/reports/SimplePieChart';
import globalStyles from '../../styles/globalStyles';
import MenuBtn from '../../components/menuBtn';

const ReportsScreen = (props) => {
  return (
    <View style={{...globalStyles.pageContainer, ...props.style}}>
      <MenuBtn />
      {/*
        <Text>Reports</Text>
         */}
      {<CalorieReport />}
      {/* piechart
            <SimplePieChart />
              <PieChart />
         */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
  },
});

export default ReportsScreen;
