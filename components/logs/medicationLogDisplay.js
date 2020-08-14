import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {getLastMedicationLog} from '../../storage/asyncStorageFunctions';
import MedicationItem from '../medicationItem';
import {ScrollView} from 'react-native-gesture-handler';

const MedicationLogDisplay = (props) => {
  const [medicationList, setMedicationList] = useState([]);
  const [time, setTime] = useState('');
  const medicationScrollView = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    getLastMedicationLog().then((response) => {
      let data = JSON.parse(response);
      setTime(data.time);
      setMedicationList(data.value);
    });
  }, []);

  return (
    <View style={[styles.container, styles.shadow]}>
      <Text style={styles.textStyle}>
        You have recently added these medication at{' '}
        <Text style={styles.bold}>{time}</Text> today
      </Text>
      <ScrollView
        ref={medicationScrollView}
        horizontal={true}
        pagingEnabled
        scrollEnabled={true}
        showsHorizontalScrollIndicator
        contentContainerStyle={[
          styles.scrollView,
          {width: `${100 * (width / 2)}%`},
        ]}
        onContentSizeChange={() => {
          medicationScrollView.current.scrollToEnd();
        }}>
        {medicationList.map((item, index) => {
          return <MedicationItem medication={item} key={index.toString()} />;
        })}
      </ScrollView>
    </View>
  );
};

export default MedicationLogDisplay;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    padding: '1%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '3%',
    margin: '3%',
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
  textStyle: {
    fontSize: 17,
  },
  bold: {
    fontWeight: '700',
    color: '#d22b55',
  },
});
