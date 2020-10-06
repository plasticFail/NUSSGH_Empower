import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {getSelectedCount} from '../../../commonFunctions/medicationFunction';
import globalStyles from '../../../styles/globalStyles';

import CHEVRON_RIGHT from '../../../resources/images/Patient-Icons/SVG/icon-grey-chevron-right.svg';

const MedicationPlanItem = (props) => {
  const {item} = props;
  const {editItem} = props;
  return (
    <TouchableOpacity
      style={[globalStyles.medContainer, {margin: '3%'}]}
      onPress={() => editItem(item)}>
      <View style={{flex: 1}}>
        <Text style={globalStyles.pageSubDetails}>{item.medication}</Text>
        {getSelectedCount(item.days) === 7 ? (
          <>
            <Text style={[globalStyles.pageSubDetails, {color: '#8a8a8e'}]}>
              {item.dosage} Unit(s), Daily
            </Text>
            <Text style={[globalStyles.pageSubDetails, {color: '#8a8a8e'}]}>
              {item.per_day} Time(s) per day
            </Text>
          </>
        ) : (
          <>
            <Text style={[globalStyles.pageSubDetails, {color: '#8a8a8e'}]}>
              {item.dosage} Unit(s), Weekly
            </Text>
            <Text style={[globalStyles.pageSubDetails, {color: '#8a8a8e'}]}>
              {item.per_day} Time(s) per day
            </Text>
          </>
        )}
      </View>
      <CHEVRON_RIGHT height={20} width={20} marginTop={'3%'} marginEnd={'3%'} />
    </TouchableOpacity>
  );
};

export default MedicationPlanItem;

const styles = StyleSheet.create({
  perDay: {
    marginStart: '5%',
  },
});
