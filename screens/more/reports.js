import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SimpleBarChart} from "../../components/dashboard/reports/SimpleBarChart";

const ReportsScreen = (props) => {
  return (
    <View style={{...styles.screen, ...props.style}}>
      {
        /*
        <Text>Reports</Text>
         */
      }
      <SimpleBarChart />
      <Text style={{backgroundColor: '#fff', width: '100%', textAlign: 'center', color: '#4d4d4d', paddingTop: 10, paddingBottom: 10}}>
        Your calorie (kcal) consumption this week
      </Text>
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
