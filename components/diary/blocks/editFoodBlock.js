import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
//third party libr
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
//styles
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import logStyles from '../../../styles/logStyles';
import diaryStyles from '../../../styles/diaryStyles';
//component
import LeftArrowBtn from '../../logs/leftArrowBtn';
import DateSelectionBlock from '../../logs/dateSelectionBlock';
import MealTypeSelectionBlock from '../../logs/meal/MealTypeSelectionBlock';
import Counter from '../../onboarding/medication/Counter';
import RemoveModal from '../removeModal';
import {food_key} from '../../../commonFunctions/logFunctions';
import {deleteMealLog, editMealLog} from '../../../netcalls/requestsDiary';
import {cos} from 'react-native-reanimated';
import {getDefaultMealType} from '../../../commonFunctions/mealLogFunctions';
import {getHour} from '../../../commonFunctions/diaryFunctions';

const EditFoodBlock = (props) => {
  const {visible, mealToEdit, initialDate} = props;
  const {closeModal, init} = props;
  const initalMeal = mealToEdit;
  const [datetime, setDatetime] = useState(initialDate);
  const [mealType, setMealType] = useState(initalMeal.mealType);
  const [foodItems, setFoodItems] = useState(mealToEdit.foodItems);
  const [selectedFood, setSelectedFood] = useState('');
  const [deleteItemModal, setDeleteItemModal] = useState(false);
  const [deleteLogModal, setDeleteLogModal] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    checkChange();
    checkMealTypeTimeSync();
  }, [mealType, datetime, foodItems]);

  const checkMealTypeTimeSync = () => {
    let time = moment(datetime).format('DD/MM/YYYY HH:mm:ss');
    if (mealType != getDefaultMealType(getHour(time))) {
      return false;
    }
    return true;
  };

  const checkChange = () => {
    //check meal type changed
    if (!checkMealTypeTimeSync()) {
      setChanged(false);
      return;
    }
    if (
      String(initalMeal.mealType) != String(mealType) ||
      String(initialDate) != String(datetime) ||
      checkFoodItemsChange()
    ) {
      setChanged(true);
      return;
    }
    setChanged(false);
    return;
  };

  const submit = () => {
    //change the mealtype and record date*
    let newMeal = initalMeal;
    newMeal = {
      ...newMeal,
      mealType: mealType,
      foodItems: foodItems,
      recordDate: moment(datetime).format('DD/MM/YYYY HH:mm:ss'),
    };
    console.log('submitting new meal');
    console.log(newMeal);
    editMealLog(newMeal).then((response) => {
      if (response != null) {
        Alert.alert('Meal Log edited successfully!', '', [
          {
            text: 'Got It',
            onPress: () => {
              init();
              closeModal();
            },
          },
        ]);
      }
    });
  };

  const deleteLog = () => {
    console.log('deleting entire log');
    deleteMealLog(initalMeal['_id']).then((response) => {
      if (response != null) {
        init();
        closeModal();
      }
    });
  };

  const editQuantity = (value, selectedItem) => {
    const elementIndex = foodItems.findIndex(
      (element) => element['food-name'] == selectedItem['food-name'],
    );
    let newArr = [...foodItems];
    newArr[elementIndex] = {
      ...newArr[elementIndex],
      quantity: value,
    };
    setFoodItems(newArr);
  };

  const confirmDeleteItem = (item) => {
    setDeleteItemModal(true);
    setSelectedFood(item);
  };

  const deleteItem = () => {
    setDeleteItemModal(false);
    let list = foodItems.filter((food) => food != selectedFood);
    setFoodItems(list);
  };

  const checkFoodItemsChange = () => {
    if (
      foodItems.length != initalMeal.foodItems.length &&
      foodItems.length != 0
    ) {
      return true;
    }
    for (var x of foodItems) {
      for (var y of initalMeal.foodItems) {
        if (x['food-name'] === y['food-name']) {
          if (x['quantity'] != y['quantity']) {
            return true;
          }
        }
      }
    }
    return false;
  };

  return (
    <Modal
      isVisible={visible}
      coverScreen={true}
      backdropOpacity={1}
      onBackButtonPress={() => closeModal()}
      backdropColor={Colors.backgroundColor}
      style={{margin: 0}}>
      <View style={globalStyles.pageContainer}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={closeModal} />
        </View>
        <View style={[logStyles.bodyPadding, {flex: 1}]}>
          <Text style={logStyles.headerText}>Edit</Text>
          <DateSelectionBlock date={datetime} setDate={setDatetime} />
          <MealTypeSelectionBlock
            onSelectChange={(option) => setMealType(option)}
            defaultValue={mealType}
          />
          {!checkMealTypeTimeSync() && (
            <Text style={{color: 'red', fontSize: 17, marginTop: '2%'}}>
              * Please ensure meal type and record time is in sync
            </Text>
          )}
          {foodItems.length > 0 ? (
            <Text style={logStyles.fieldName}>Number of Servings (s)</Text>
          ) : (
            <>
              <Text style={logStyles.fieldName}>No Food Items Left</Text>
              <Text style={{fontSize: 18, marginTop: '2%'}}>
                Please proceed to delete the log if you want to continue
              </Text>
            </>
          )}

          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            {foodItems.map((item) =>
              foodItem(item, editQuantity, confirmDeleteItem),
            )}
          </ScrollView>
        </View>
      </View>
      <View style={[globalStyles.buttonContainer]}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={diaryStyles.binIcon}
            onPress={() => setDeleteLogModal(true)}>
            <FontAwesome name="trash-o" size={40} color="#ff0844" />
          </TouchableOpacity>
          {changed ? (
            <TouchableOpacity
              style={logStyles.enableEditButton}
              onPress={() => submit()}>
              <Text style={globalStyles.actionButtonText}>Done</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={logStyles.disableEditButton}>
              <Text style={globalStyles.actionButtonText}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* Delete a single food item */}
      {deleteItemModal ? (
        <RemoveModal
          visible={deleteItemModal}
          closeModal={() => setDeleteItemModal(false)}
          logType={food_key}
          itemToDeleteName={selectedFood['food-name']}
          deleteMethod={() => deleteItem()}
        />
      ) : null}
      {/* Delete entire food log */}
      {deleteLogModal ? (
        <RemoveModal
          visible={deleteLogModal}
          closeModal={() => setDeleteLogModal(false)}
          logType={''}
          itemToDeleteName={''}
          deleteMethod={() => deleteLog()}
        />
      ) : null}
    </Modal>
  );
};

function foodItem(item, editQuantity, confirmDeleteItem) {
  let itemName = String(item['food-name']);
  if (String(item.description).length > 20) {
    itemName = itemName.slice(0, 20) + '...';
  }
  return (
    <View style={styles.foodContainer}>
      <Image source={{uri: item.imgUrl.url}} style={styles.foodStyle} />
      <View style={{flex: 1}}>
        <Text style={[diaryStyles.recordedText, styles.foodName]}>
          {itemName}
        </Text>
        <Counter
          count={item.quantity}
          setCount={(value) => editQuantity(value, item)}
          parameter={''}
          fieldName={''}
          countStyle={styles.counterStyle}
        />
      </View>
      <TouchableOpacity
        onPress={() => confirmDeleteItem(item)}
        style={[diaryStyles.binIcon, {marginTop: '12%'}]}>
        <FontAwesome name="trash-o" size={40} color="#ff0844" />
      </TouchableOpacity>
    </View>
  );
}

export default EditFoodBlock;

const styles = StyleSheet.create({
  foodContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '3%',
  },
  foodStyle: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },
  foodName: {
    flex: 1,
  },
  counterStyle: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
    marginStart: '1%',
  },
});
