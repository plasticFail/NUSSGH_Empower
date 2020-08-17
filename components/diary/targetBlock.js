import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TargetContent from './targetContent';
import {useNavigation} from '@react-navigation/native';

const TargetBlock = (props) => {
  let width = Dimensions.get('window').width;
  const navigation = useNavigation();
  const {item} = props;

  const handleOnPress = () => {
    navigation.navigate('DiaryDetail', {date: item.date});
  };

  return (
    <View>
      <Text style={[styles.diaryDate, {width: width}]}>{item.date}</Text>
      <TouchableOpacity onPress={handleOnPress}>
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
      </TouchableOpacity>
    </View>
  );
};

export default TargetBlock;

const styles = StyleSheet.create({
  diaryDate: {
    flex: 1,
    fontSize: 18,
    marginTop: '2%',
    backgroundColor: '#f5f5f5',
    fontWeight: '700',
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
