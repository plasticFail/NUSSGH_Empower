import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
//functions
import {
  getMissedArr,
  maxCarbs,
  maxFats,
  maxProtein,
  showEdit,
} from '../../../commonFunctions/diaryFunctions';
import {food_key} from '../../../commonFunctions/logFunctions';
import {
  morningObj,
  afternoonObj,
  eveningObj,
} from '../../../commonFunctions/common';
//third party library
import Modal from 'react-native-modal';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
//component
import LeftArrowBtn from '../../logs/leftArrowBtn';
import MissedContent from './missedContent';
import ProgressContent from './progressContent';
import TimeSection from '../timeSection';
//style
import globalStyles from '../../../styles/globalStyles';
import {Colors} from '../../../styles/colors';
import diaryStyles from '../../../styles/diaryStyles';

//function

const FoodBlock = (props) => {
  const {
    visible,
    morningMealLogs,
    afternoonMealLogs,
    eveningMealLogs,
    carbs,
    fats,
    protein,
    pass,
    miss,
    day,
  } = props;
  const {closeModal} = props;
  const [selectedLog, setSelectedLog] = useState({});
  const [missedArr, setMissedArr] = useState([]);

  useEffect(() => {
    setMissedArr(
      getMissedArr(morningMealLogs, afternoonMealLogs, eveningMealLogs),
    );
  }, []);

  const editLog = (item) => {
    console.log('selecting item to edit');
    setSelectedLog(item);
  };

  return (
    <Modal
      isVisible={visible}
      coverScreen={true}
      backdropOpacity={1}
      onBackButtonPress={() => closeModal()}
      backdropColor={Colors.backgroundColor}
      style={{margin: 0}}>
      <LeftArrowBtn close={closeModal} />
      <Text style={globalStyles.pageHeader}>Food Intake</Text>
      <Text style={globalStyles.pageDetails}>{day}</Text>
      <MissedContent arr={missedArr} type={food_key} />
      {renderProgressBars(carbs, fats, protein)}
      {missedArr.length < 3 && (
        <View
          style={{flexDirection: 'row', marginTop: '3%', marginBottom: '2%'}}>
          {pass ? (
            <>
              <Text style={globalStyles.pageDetails}>Within Healthy Range</Text>

              <Ionicon
                name="checkmark"
                style={diaryStyles.passIcon}
                size={25}
              />
            </>
          ) : (
            <>
              <Text style={globalStyles.pageDetails}>
                Not Within Healthy Range
              </Text>

              <Ionicon
                name="alert-circle-outline"
                style={diaryStyles.failIcon}
                size={25}
              />
            </>
          )}
        </View>
      )}
      <ScrollView style={{flex: 1}}>
        <TimeSection name={morningObj.name} />
        {renderFoodItems(morningMealLogs, editLog)}
        <TimeSection name={(afternoonObj.name, editLog)} />
        {renderFoodItems(afternoonMealLogs, editLog)}
        <TimeSection name={(eveningObj.name, editLog)} />
        {renderFoodItems(eveningMealLogs, editLog)}
      </ScrollView>
    </Modal>
  );
};
export default FoodBlock;

function renderFoodItems(logs, editLog) {
  if (logs.length > 0) {
    return (
      <View style={{marginBottom: '3%'}}>
        {logs.map((item, index) => (
          <>
            {item.foodItems.map((inner, index) => (
              <View key={inner['_id']}>
                <View style={styles.foodItem}>
                  <Image
                    source={{uri: inner.imgUrl.url}}
                    style={styles.foodImg}
                  />
                  <View style={{marginStart: '3%', flex: 1}}>
                    <Text style={diaryStyles.recordedText}>
                      {inner['food-name']}
                    </Text>
                    <Text style={diaryStyles.recordContent}>
                      {inner['quantity']} qty
                    </Text>
                  </View>
                  {showEdit(item.record_date) ? (
                    <>
                      <View style={{alignSelf: 'flex-end'}} />
                      <TouchableOpacity onPress={() => editLog(item)}>
                        <Entypo
                          name="edit"
                          style={diaryStyles.editIcon}
                          size={20}
                        />
                      </TouchableOpacity>
                    </>
                  ) : null}
                </View>
              </View>
            ))}
            {logs.length > 1 && <View style={styles.border} />}
          </>
        ))}
      </View>
    );
  } else {
    return (
      <View style={styles.noRecordContainer}>
        <Text style={diaryStyles.noRecordText}>No Record Found </Text>
        <Text style={diaryStyles.recordContent}>-</Text>
      </View>
    );
  }
}

function renderProgressBars(carbs, fats, protein) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginStart: '5%',
      }}>
      <ProgressContent
        header={'Carbs'}
        value={carbs}
        target={maxCarbs}
        targetUnit={'grams'}
      />
      <ProgressContent
        header={'Fat'}
        value={fats}
        target={maxFats}
        targetUnit={'grams'}
      />
      <ProgressContent
        header={'Protein'}
        value={protein}
        target={maxProtein}
        targetUnit={'grams'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  foodItem: {
    padding: '2%',
    width: '100%',
    flexDirection: 'row',
    marginStart: '3%',
  },
  foodImg: {
    height: 80,
    width: 80,
    borderRadius: 20,
  },
  border: {
    borderWidth: 0.5,
    borderColor: Colors.lastLogValueColor,
    margin: '3%',
  },
});
