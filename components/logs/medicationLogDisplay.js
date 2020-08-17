import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {getLastMedicationLog} from '../../storage/asyncStorageFunctions';
import MedicationItem from '../medicationItem';
import {ScrollView} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';

Entypo.loadFont();

const MedicationLogDisplay = (props) => {
  const [medicationList, setMedicationList] = useState([]);
  const [oriList, setOriList] = useState([]);
  const [time, setTime] = useState('');
  const medicationScrollView = useRef(null);
  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    getLastMedicationLog().then((response) => {
      let data = response;
      setTime(data.time);
      let arr = data.value;
      setOriList(arr);
      console.log(oriList);
      setMedicationList(arr.slice(0, 3));
    });
  }, []);

  return (
    <View style={[styles.container, styles.shadow]}>
      <Text style={styles.textStyle}>
        You have recently added these medications at{' '}
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
          {width: `${100 * Math.ceil(medicationList.length / 2.5)}%`},
        ]}>
        {medicationList.map((item, index) => {
          return <MedicationItem medication={item} key={index.toString()} />;
        })}
      </ScrollView>
      {oriList.length > 3 && (
        <Text
          style={styles.hyperLinkStyle}
          onPress={() => {
            setIsVisible(true);
          }}>
          View More
        </Text>
      )}
      <Modal
        isVisible={isVisible}
        animationIn="slideInUp"
        onBackdropPress={() => setIsVisible(false)}
        onBackButtonPress={() => setIsVisible(false)}
        style={{
          alignItems: 'center',
        }}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Medications</Text>
            <Entypo
              name="cross"
              size={30}
              style={{marginTop: '1%', marginStart: '20%'}}
              onPress={() => setIsVisible(false)}
            />
          </View>
          <FlatList
            keyExtractor={(item, index) => item.image_url}
            data={oriList}
            numColumns={2}
            renderItem={({item}) => <MedicationItem medication={item} />}
          />
        </View>
      </Modal>
    </View>
  );
};

export default MedicationLogDisplay;

const styles = StyleSheet.create({
  scrollView: {
    display: 'flex',
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
    flex: 1,
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
  hyperLinkStyle: {
    alignSelf: 'flex-end',
    color: '#3D5E50',
    margin: '3%',
    fontSize: 17,
  },
  modal: {
    backgroundColor: 'white',
    marginBottom: '3%',
  },
  modalText: {
    color: '#3D5E50',
    margin: '3%',
    fontSize: 19,
    fontWeight: '700',
  },
  header: {
    backgroundColor: '#aad326',
    padding: '4%',
    flexDirection: 'row',
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 20,
    marginStart: '30%',
    marginTop: '2%',
  },
});
