import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
//third party libr
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
  }, [mealType, datetime, foodItems]);

  const checkChange = () => {
    //check meal type changed
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
  };

  const deleteLog = () => {
    console.log('deleting entire log');
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
        <Text style={globalStyles.pageHeader}>Edit</Text>
        <View style={[logStyles.bodyPadding, {marginStart: 0}]}>
          <DateSelectionBlock date={datetime} setDate={setDatetime} />
          <MealTypeSelectionBlock
            onSelectChange={(option) => setMealType(option)}
            defaultValue={mealType}
          />
          {foodItems.length > 0 ? (
            <Text style={logStyles.fieldName}>Number of Servings (s)</Text>
          ) : (
            <Text style={logStyles.fieldName}>No Food Items Left</Text>
          )}

          <ScrollView>
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
