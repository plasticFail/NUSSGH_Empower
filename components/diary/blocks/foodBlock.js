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
  getDateObj,
  checkFoodLogQuantity,
  getTime12hr,
} from '../../../commonFunctions/diaryFunctions';
import {food_key} from '../../../commonFunctions/logFunctions';
import {
  morningObj,
  afternoonObj,
  eveningObj,
  carbs,
  fats,
  protein,
  isEmpty,
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
import EditFoodBlock from './editFoodBlock';

//style
import globalStyles from '../../../styles/globalStyles';
import {Colors} from '../../../styles/colors';
import diaryStyles from '../../../styles/diaryStyles';
import {horizontalMargins} from '../../../styles/variables';
import {getPatientProfile} from '../../../netcalls/requestsAccount';
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
    init,
  } = props;
  const {closeModal} = props;
  const [selectedLog, setSelectedLog] = useState({});
  const [selectedFood, setSelectedFood] = useState({});
  const [missedArr, setMissedArr] = useState([]);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    setMissedArr(
      getMissedArr(morningMealLogs, afternoonMealLogs, eveningMealLogs),
    );
  }, [morningMealLogs, afternoonMealLogs, eveningMealLogs]);

  const editLog = (foodItem, log) => {
    console.log('selecting item to edit');
    setSelectedLog(log);
    setSelectedFood(foodItem);
    setEditModal(true);
  };

  const showRange = () => {
    let total = carbs + protein + fats;
    if (missedArr.length < 3 && miss != true && total > 0) {
      return true;
    }
    return false;
  };

  return (
    <Modal
      isVisible={visible}
      coverScreen={true}
      backdropOpacity={1}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      onBackButtonPress={() => closeModal()}
      backdropColor={Colors.backgroundColor}
      style={{margin: 0}}>
      <View style={globalStyles.pageContainer}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={closeModal} />
        </View>
        <Text style={globalStyles.pageHeader}>Food Intake</Text>
        <Text style={globalStyles.pageDetails}>{day}</Text>
        {/*<MissedContent arr={missedArr} type={food_key} />*/}
        {renderProgressBars(carbs, fats, protein)}
        {showRange() && (
          <View
            style={{flexDirection: 'row', marginTop: '3%', marginBottom: '2%'}}>
            {pass ? (
              <>
                <Text style={globalStyles.pageDetails}>Healthy Range</Text>
                <Ionicon
                  name="checkmark"
                  style={diaryStyles.passIcon}
                  size={25}
                />
              </>
            ) : (
              <>
                <Text style={globalStyles.pageDetails}>Unhealthy Range</Text>

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
          <TimeSection name={afternoonObj.name} />
          {renderFoodItems(afternoonMealLogs, editLog)}
          <TimeSection name={(eveningObj.name, editLog)} />
          {renderFoodItems(eveningMealLogs, editLog)}
        </ScrollView>
      </View>
      {editModal ? (
        <EditFoodBlock
          visible={editModal}
          closeModal={() => setEditModal(false)}
          mealToEdit={selectedLog}
          selectedFood={selectedFood}
          initialDate={getDateObj(selectedLog.record_date)}
          init={init}
        />
      ) : null}
    </Modal>
  );
};
export default FoodBlock;

function renderFoodItems(logs, editLog) {
  if (checkFoodLogQuantity(logs)) {
    return (
      <View style={styles.noRecordContainer}>
        <Text style={diaryStyles.noRecordText}>No Record Found </Text>
        <Text style={diaryStyles.recordContent}>-</Text>
      </View>
    );
  }

  if (logs.length > 0) {
    return (
      <View style={{marginBottom: '3%'}}>
        {logs.map((item, index) => (
          <View key={index}>
            {item.foodItems.length > 0 &&
              item.foodItems.map(
                (inner, index) =>
                  inner.quantity != 0 && (
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
                            {inner['quantity']} Servings(s) at{' '}
                            {getTime12hr(item.record_date)}
                          </Text>
                        </View>
                        {showEdit(item.record_date) ? (
                          <>
                            <View style={{alignSelf: 'flex-end'}} />
                            <TouchableOpacity
                              onPress={() => editLog(inner, item)}>
                              <Entypo
                                name="edit"
                                style={diaryStyles.editIcon}
                                size={30}
                              />
                            </TouchableOpacity>
                          </>
                        ) : null}
                      </View>
                    </View>
                  ),
              )}
          </View>
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

function renderProgressBars(carbsAmt, fatsAmt, proteinAmt) {
  const [patient, setPatient] = useState({});
  console.log('rendering progres bar----');
  console.log(patient);

  useEffect(() => {
    async function getProfile() {
      let p = await getPatientProfile();
      setPatient(p?.patient);
    }
    getProfile();
  }, []);

  return !isEmpty(patient) ? (
    <View
      style={{
        flexDirection: 'row',
        marginStart: horizontalMargins,
        marginBottom: '3%',
        alignItems: 'space-around',
      }}>
      <ProgressContent
        header={'Carbs'}
        value={carbsAmt}
        type={carbs}
        targetUnit={'g'}
        patient={patient}
      />
      <ProgressContent
        header={'Fat'}
        value={fatsAmt}
        type={fats}
        targetUnit={'g'}
        patient={patient}
      />
      <ProgressContent
        header={'Protein'}
        value={proteinAmt}
        type={protein}
        targetUnit={'g'}
        patient={patient}
      />
    </View>
  ) : null;
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

//comment
