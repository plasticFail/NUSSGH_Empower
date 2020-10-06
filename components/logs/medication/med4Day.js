import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import Tick from '../../tick';
import StepCounter from '../../stepCounter';
import {deleteMed} from '../../../netcalls/requestsDiary';

const Med4Day = (props) => {
  const {medication} = props;
  const {addMed} = props;
  const [dosage, setDosage] = useState(medication.dosage);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    let obj = {
      dosage: dosage,
      dosage_unit: medication.dosage_unit,
      medication: medication.medication,
    };
    if (selected) {
      //add medicine
      addMed(obj);
    }
  }, [selected, dosage]);

  const selectMedicine = () => {
    setSelected(!selected);
  };

  return (
    <TouchableOpacity
      style={globalStyles.medContainer}
      onPress={() => selectMedicine()}>
      <View style={{flex: 1}}>
        <Text style={globalStyles.pageSubDetails}>{medication.medication}</Text>
        {!selected ? (
          <Text style={[globalStyles.pageSubDetails, {color: '#8a8a8e'}]}>
            {medication.dosage} Unit(s)
          </Text>
        ) : (
          <StepCounter
            count={dosage}
            setCount={setDosage}
            parameter={'Unit(s)'}
            fieldName={''}
            enableInput={false}
            style={{width: '70%', marginStart: '3%'}}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.tickContainer}
        onPress={() => selectMedicine()}>
        <Tick selected={selected} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default Med4Day;

const styles = StyleSheet.create({
  medContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#e1e7ed',
    borderWidth: 1,
    padding: '3%',
    marginTop: '3%',
    flexDirection: 'row',
  },
  tickContainer: {
    alignSelf: 'center',
  },
});
