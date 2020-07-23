import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import Legend from '../../components/legend';

const itemList = [
  {
    date: '22nd Feburary 2020',
    glucoseC: '2',
    foodIntakeC: '3',
    activityC: '2',
    medicationC: '2',
    weightC: '2',
  },
  {
    date: '21st Feburary 2020',
    glucoseC: '4',
    foodIntakeC: '3',
    activityC: '2',
    medicationC: '2',
    weightC: '2',
  },
];

const DiaryScreen = (props) => {
  var width = Dimensions.get('window').width;
  var height = Dimensions.get('window').height;
  return (
    <View style={styles.diaryScreen}>
      <Text style={{fontSize: 18, fontWeight: '600', margin: '2%'}}>
        Legend
      </Text>
      <Legend />
      <View style={{flex: 2, padding: '2%'}}>
        <FlatList
          data={itemList}
          renderItem={({item}) => (
            <View style={[styles.diaryContentContainer, styles.shadow]}>
              <Text
                style={{
                  flex: 1,
                  width: width,
                  fontSize: 18,
                }}>
                {item.date}
              </Text>
              <View style={styles.diaryContent}>
                <View style={styles.diaryContent1}>
                  <Text style={[styles.diaryContentHeader, {color: '#7d9a22'}]}>
                    Within Targets{' '}
                  </Text>
                </View>
                <View style={styles.diaryContent2}>
                  <Text style={[styles.diaryContentHeader, {color: 'black'}]}>
                    Missed
                  </Text>
                </View>
                <View style={styles.diaryContent3}>
                  <Text style={[styles.diaryContentHeader, {color: '#9a228a'}]}>
                    Improve
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  diaryScreen: {
    flex: 1,
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  diaryContentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  diaryContent: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 25,
    margin: '2%',
  },
  diaryContent1: {
    flex: 1,
    height: '100%',
    backgroundColor: '#e8fee4',
  },
  diaryContent2: {
    flex: 1,
    height: '100%',
    backgroundColor: '#cecece',
  },
  diaryContent3: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fae6e6',
  },
  diaryContentHeader: {
    marginTop: '4%',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default DiaryScreen;
