import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//third party library
import Modal from 'react-native-modal';
//component
import Header from './header';
import ReadOnlyMealDisplay from '../../logs/meal/ReadOnlyMealDisplay';
//function
import {getTime, getDateObj} from '../../../commonFunctions/diaryFunctions';
const MealBlock = (props) => {
  const {mealObj} = props;
  //format date
  let dateString = String(mealObj.updated_at);
  let time = getTime(dateString);
  const img = require('../../../resources/images/foodintake.jpg');
  const logo = require('../../../resources/images/foodintake_logo.png');
  const initialDate = getDateObj(dateString);
  const [dateValue, setDateValue] = useState(initialDate);
  const [meal, setMeal] = useState(mealObj);
  const [mealType, setMealType] = useState(mealObj.mealType);
  const [modalVisible, setModalVisible] = useState(false);
  const [disable, setDisabled] = useState(true);

  console.log(meal);

  const handleEdit = () => {
    console.log('edit meal log');
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{flexBasis: '33.3%'}}>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => setModalVisible(true)}>
        <Image source={logo} style={styles.iconImg} />
        <Text style={styles.buttonText1}>Food Intake</Text>
        <ImageBackground source={img} style={styles.backgroundImg} />
      </TouchableOpacity>
      <Text style={{textAlign: 'center'}}>{time}</Text>
      <Modal
        isVisible={modalVisible}
        animationIn="slideInUp"
        onBackdropPress={() => closeModal()}
        onBackButtonPress={() => closeModal()}
        style={{justifyContent: 'flex-end'}}>
        <Header title={'Food Intake Log:' + time} closeModal={closeModal} />
        <View style={styles.modalContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <ReadOnlyMealDisplay
              style={{marginTop: '3%', marginBottom: '3%', paddingTop: '3%'}}
              meal={mealObj}
            />
            {disable == true ? (
              <TouchableOpacity
                disabled={disable}
                style={[styles.actionButton, {backgroundColor: '#cdd4e4'}]}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.actionButton, {backgroundColor: '#aad326'}]}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.actionButton, {backgroundColor: '#ffb7e7'}]}>
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default MealBlock;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%', // This should be the same size as backgroundImg height
    padding: 10,
  },
  iconImg: {
    position: 'absolute',
    top: '40%',
    left: '20%',
    width: 30,
    height: 30,
    resizeMode: 'contain', //resize image so dont cut off
  },
  backgroundImg: {
    width: '100%',
    height: 120,
    opacity: 0.3,
    borderWidth: 0.4,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#aad326',
  },
  buttonText1: {
    position: 'absolute',
    top: '70%',
    left: '12%',
    fontSize: 18,
    fontWeight: '700',
    color: '#072d08',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: '3%',
    width: '100%',
    paddingBottom: '6%',
  },
  actionButton: {
    borderRadius: 20,
    margin: '2%',
    flexDirection: 'row',
    padding: '10%',
    alignSelf: 'center',
    marginVertical: 10,
    paddingHorizontal: 40,
    paddingVertical: 6,
  },
  actionText: {
    fontWeight: '700',
    fontSize: 17,
    textAlign: 'center',
  },
});
