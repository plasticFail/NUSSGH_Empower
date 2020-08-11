import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import MedicationLogBlock from '../../../../components/logs/medicationLogBlock';
import {ScrollView} from 'react-native-gesture-handler';
import FormBlock from '../../../../components/logs/formBlock';

const DailyLog3 = (props) => {
  const [date, setDate] = useState(new Date());
  const [selectedMedicationList, setSelectedMedicationList] = useState([]);
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  //get form selection
  const getFormSelection = (boolValue) => {
    console.log(boolValue);
    if (boolValue == true) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const onListChange = (list) => {
    console.log('Calling');
    setSelectedMedicationList(list);
    console.log(selectedMedicationList);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, {alignSelf: 'center'}]}>
          Step 3: Medication Log
        </Text>
      </View>
      <Image
        style={styles.progress}
        resizeMode="contain"
        source={require('../../../../resources/images/progress3.png')}
      />
      <View style={[styles.container, styles.shadow]}>
        <FormBlock
          question={'Did you take any medication today?'}
          getFormSelection={getFormSelection}
          selectNo={false}
        />
      </View>
      {show == true && (
        <ScrollView
          style={{
            width: Dimensions.get('window').width - 20,
          }}>
          <MedicationLogBlock
            date={date}
            setDate={setDate}
            selectedMedicationList={selectedMedicationList}
            onListChange={onListChange}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default DailyLog3;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  textContainer: {
    width: '100%',
  },
  text: {
    fontSize: 18,
  },
  progress: {
    width: '100%',
    height: 100,
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    paddingBottom: '5%',
    borderRadius: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
