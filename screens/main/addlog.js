import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import StackNavigator from '@react-navigation/stack/src/navigators/createStackNavigator';
import BloodGlucoseLog from './log/bloodGlucoseLog';
import MedicationLog from './log/medication/medicationLog';

const Stack = createStackNavigator();

const buttonList = [
  {
    id: '1',
    name: 'Blood Glucose',
    logo: require('../../resources/images/bloodglucose_logo.png'),
    image: require('../../resources/images/bloodglucose.jpg'),
    route: 'BloodGlucoseLog', //Fill in the route yourself. If null, it does not redirect
  },
  {
    id: '2',
    name: 'Food Intake',
    logo: require('../../resources/images/foodintake_logo.png'),
    image: require('../../resources/images/foodintake.jpg'),
    route: 'MealLogRoot', //Fill in the route yourself. If null, it does not redirect
  },
  {
    id: '3',
    name: 'Medication',
    logo: require('../../resources/images/medication_logo.png'),
    image: require('../../resources/images/medication.jpeg'),
    route: 'MedicationLog', //Fill in the route yourself. If null, it does not redirect
  },
  {
    id: '4',
    name: 'Weight',
    logo: require('../../resources/images/weight_logo.png'),
    image: require('../../resources/images/weight.jpg'),
    route: null, //Fill in the route yourself. If null, it does not redirect
  },
];

// AddLog view
const AddLogScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Choose from the following: </Text>
      <Text style={styles.headerText2}>1. Schedule 3 times a day</Text>

      <TouchableOpacity style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Daily Log</Text>
        <ImageBackground
          source={require('../../resources/images/dailylog.jpg')}
          style={styles.backgroundImg}
        />
      </TouchableOpacity>

      <Text style={styles.headerText2}>2. Own Time Own Pace (Anytime): </Text>
      <FlatList
        data={buttonList}
        width="100%"
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              item.route ? navigation.push(item.route) : null;
            }}>
            <Image source={item.logo} style={styles.iconImg} />
            <Text style={styles.buttonText1}>{item.name}</Text>
            <ImageBackground source={item.image} style={styles.backgroundImg} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: '5%',
    marginStart: '4%',
    marginBottom: '4%',
    color: '#133D2c',
  },
  headerText2: {
    fontSize: 20,
    fontWeight: '400',
    marginStart: '4%',
    marginTop: '3%',
    marginBottom: '2%',
    color: '#133D2c',
  },
  buttonStyle: {
    width: '80%', // This should be the same size as backgroundImg height
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  backgroundImg: {
    width: '100%',
    height: 120,
    opacity: 0.3,
    borderRadius: 20,
    borderWidth: 0.4,
    overflow: 'hidden',
  },
  buttonText: {
    position: 'absolute',
    top: '65%',
    right: '6%',
    fontSize: 20,
    fontWeight: '700',
    color: '#072d08',
  },
  buttonText1: {
    position: 'absolute',
    top: '70%',
    right: '6%',
    fontSize: 20,
    fontWeight: '700',
    color: '#072d08',
  },
  iconImg: {
    position: 'absolute',
    top: '30%',
    right: '7%',
    width: 40,
    height: 40,
    resizeMode: 'contain', //resize image so dont cut off
  },
});

export default AddLogScreen;
