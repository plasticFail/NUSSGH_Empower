import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

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
        <View style={styles.buttonIconContainer}>
          <TouchableOpacity>
            <View style={[styles.buttonStyle]}>
              <Icon name="medicinebox" size={30} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.buttonStyle}>
              <Icon name="linechart" size={30} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.buttonStyle}>
              <Icon name="solution1" size={30} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.buttonStyle}>
              <Foundation name="target-two" size={30} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.wordContainer}>
          <Text style={styles.buttonText}>Medication</Text>
          <Text style={styles.buttonText}>Reports</Text>
          <Text style={styles.buttonText}>Education</Text>
          <Text style={styles.buttonText}>Goals</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.gameCenterContainer,
          styles.shadow,
          styles.contentContainer,
        ]}>
        <Ionicon name="alert-circle-outline" size={50} style={{flex: 0.2}} />
        <Text style={{flex: 1, marginTop: '2%'}}>
          1 Chance (s) left today to select a cell from your alphabetical card
        </Text>
        <TouchableOpacity style={styles.gameCenterButton}>
          <Ionicon
            name="chevron-forward-sharp"
            size={30}
            style={{alignItems: 'flex-end', marginTop: '35%'}}
          />
        </TouchableOpacity>
      </TouchableOpacity>

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
    flex: 1,
    padding: '5%',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
