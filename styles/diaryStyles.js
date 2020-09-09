import {StyleSheet} from 'react-native';
import {Colors} from './colors';

const diaryStyles = StyleSheet.create({
  diaryLogItem: {
    backgroundColor: 'white',
    borderRadius: 9.31,
    margin: '2%',
    padding: '3%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e2e8ee',
  },
  diarylogIcon: {
    position: 'absolute',
    top: '20%',
    left: '5%',
    bottom: '10%',
    width: 40,
    height: 40,
    resizeMode: 'contain', //resize image so dont cut off
    flex: 1,
  },
  passIcon: {
    color: Colors.backArrowColor,
    marginStart: '2%',
  },
  failIcon: {
    color: Colors.alertColor,
    marginStart: '2%',
  },
});

export default diaryStyles;
