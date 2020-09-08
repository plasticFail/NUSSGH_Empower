import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, FlatList, Text, Animated} from 'react-native';
//styles
import logStyles from '../../../styles/logStyles';
import {Colors} from '../../../styles/colors';

const MedicationLogDisplay = (props) => {
  const {data, show} = props;
  const dropDownAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (show) {
      Animated.timing(dropDownAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(dropDownAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [show]);

  const heightInterpolation = dropDownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    show && (
      <Animated.View style={{maxHeight: heightInterpolation}}>
        <Text style={logStyles.lastLogDate}>{data.dateString}</Text>
        <View style={logStyles.lastLogBorder} />
        <FlatList
          keyExtractor={(item) => item.drugName}
          data={data.value}
          style={{flexGrow: 0}}
          renderItem={({item}) => (
            <View style={{marginBottom: '2%'}}>
              <Text style={logStyles.fieldText}>{item.drugName}</Text>
              <Text
                style={[
                  logStyles.fieldText,
                  {color: Colors.lastLogValueColor},
                ]}>
                {item.dosage} Unit (s)
              </Text>
            </View>
          )}
        />

        <View style={logStyles.lastLogBorder} />
      </Animated.View>
    )
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
