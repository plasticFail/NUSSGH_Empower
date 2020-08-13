import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import {
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native-gesture-handler';

const buttonList = [
  {
    id: '1',
    name: 'Medications',
    iconName: 'medicinebox',
    route: 'Medication',
  },
  {
    id: '2',
    name: 'Reports',
    iconName: 'linechart',
    route: 'Reports',
  },
  {
    id: '3',
    name: 'Education',
    iconName: 'solution1',
    route: 'EducationMaterials',
  },
  {
    id: '4',
    name: 'Game Center',
    iconName: 'solution1',
    route: 'GameCenter',
  },
  {
    id: '5',
    name: 'Goals',
    iconName: 'target-two',
    route: 'Goals',
  },
];

const HomeScreen = (props) => {
  Ionicon.loadFont();
  Icon.loadFont();
  Foundation.loadFont();

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}>
      <View style={[styles.buttonContainer, styles.shadow]}>
        <FlatList
          data={buttonList}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: '2%',
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate(item.route);
              }}>
              <View style={[styles.buttonStyle]}>
                {item.iconName != 'target-two' ? (
                  <Icon name={item.iconName} size={30} />
                ) : (
                  <Foundation name="target-two" size={30} />
                )}
              </View>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <Text style={styles.text}>Today's Overview</Text>
      <View
        style={[
          styles.chartContainter,
          styles.shadow,
          styles.contentContainer,
        ]}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0.2,
    backgroundColor: '#f4fcda',
    borderRadius: 20,
    margin: '4%',
  },
  buttonIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: '2%',
  },
  wordContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    marginTop: '1%',
    marginEnd: '5%',
  },
  buttonStyle: {
    padding: '2%',
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 0.2,
  },
  gameCenterContainer: {
    flex: 0.1,
    backgroundColor: '#ffeffd',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingStart: '1%',
    paddingEnd: '1%',
  },
  chartContainter: {
    flex: 4,
    backgroundColor: 'white',
  },
  text: {
    marginStart: '5%',
    marginTop: '1%',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: '3%',
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
  contentContainer: {
    // borderRadius: 300,
    // marginStart: '2%',
    borderRadius: 20,
    marginStart: '4%',
    marginBottom: '4%',
    marginEnd: '4%',
    paddingTop: '2%',
  },
});

export default HomeScreen;
