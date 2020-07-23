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
import {ScrollView} from 'react-native-gesture-handler';

const buttonList = [
  {
    id: '1',
    name: 'Blood Glucose',
    logo: require('../../img/bloodglucose_logo.png'),
    image: require('../../img/bloodglucose.jpg'),
  },
  {
    id: '2',
    name: 'Food Intake',
    logo: require('../../img/foodintake_logo.png'),
    image: require('../../img/foodintake.jpg'),
  },
  {
    id: '3',
    name: 'Medication',
    logo: require('../../img/medication_logo.png'),
    image: require('../../img/medication.jpeg'),
  },
  {
    id: '4',
    name: 'Weight',
    logo: require('../../img/weight_logo.png'),
    image: require('../../img/weight.jpg'),
  },
];

const AddLogScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Choose from the following: </Text>
      <Text style={styles.headerText2}>1. Schedule 3 times a day</Text>

      <TouchableOpacity style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Daily Log</Text>
        <ImageBackground
          source={require('../../img/dailylog.jpg')}
          style={styles.backgroundImg}
        />
      </TouchableOpacity>

      <Text style={styles.headerText2}>2. Own Time Own Pace (Anytime): </Text>
      <FlatList
        data={buttonList}
        width="100%"
        renderItem={({item}) => (
          <TouchableOpacity style={styles.buttonStyle}>
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
    width: '80%',
    height: '20%',
    alignSelf: 'center',
    marginTop: '2%',
    marginBottom: '6%',
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
    top: '280%',
    right: '6%',
    fontSize: 20,
    fontWeight: '700',
    color: '#072d08',
  },
  iconImg: {
    position: 'absolute',
    top: '150%',
    right: '7%',
    width: 40,
    height: 40,
    resizeMode: 'contain', //resize image so dont cut off
  },
});

export default AddLogScreen;
