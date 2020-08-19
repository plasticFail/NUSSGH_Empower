import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CalorieReport from "../../components/dashboard/reports/CalorieReport";

const ReportsScreen = (props) => {
  return (
    <View style={{...styles.screen, ...props.style}}>
      {
        /*
        <Text>Reports</Text>
         */
      }
      <CalorieReport />
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
