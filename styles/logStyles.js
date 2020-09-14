import {StyleSheet, Dimensions} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {Colors} from './colors';

const {width, height} = Dimensions.get('window');
// typical variables
const statusBarHeight =  getStatusBarHeight();
const headerTextFontSize = width * 0.09;
const normalTextFontSize = width * 0.05;
const verticalMarginsBetweenComponent = 0.005 * height;
const horizontalMargins = 0.03 * width;
const headerHeight = 0.09 * height;
const boldFontFamily = 'SFProDisplay-Bold';
const regularFontFamily = 'SFProDisplay-Regular';
const backArrowMarginLeft = '2%';

const logStyles = StyleSheet.create({
  //added
  menuBarContainer: {
      height: statusBarHeight + headerHeight,
      marginLeft: horizontalMargins,
      marginRight: horizontalMargins,
      marginBottom: verticalMarginsBetweenComponent,
      alignItems: 'flex-end',
      flexDirection: 'row',
  },
  bodyPadding: {
      marginLeft: horizontalMargins,
      marginRight: horizontalMargins,
      marginTop: verticalMarginsBetweenComponent,
      paddingLeft: '3%',
      paddingRight: '3%'
  },
  componentMargin: {
      marginTop: verticalMarginsBetweenComponent,
      marginBottom: verticalMarginsBetweenComponent,
  },
  headerText: {
      fontSize: headerTextFontSize,
      fontFamily: boldFontFamily
  },
  headersubText: {
      fontSize: normalTextFontSize,
      fontFamily: boldFontFamily,
  },
  normalText: {
      fontSize: normalTextFontSize,
      fontFamily: regularFontFamily,
  },
  greyText: {
      fontSize: normalTextFontSize,
      fontFamily: regularFontFamily,
      color: Colors.logFieldColor
  },
  // previous
  logItem: {
    backgroundColor: 'white',
    borderRadius: 9.31,
    margin: '3%',
    padding: '6%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e2e8ee',
  },
  complete: {
    fontFamily: 'SFProDisplay-Bold',
    color: '#acacb1',
    fontSize: 18,
    marginStart: '4%',
    marginTop: '3%',
  },
  loglogo: {
    position: 'absolute',
    top: '80%',
    left: '7%',
    width: 40,
    height: 40,
    resizeMode: 'contain', //resize image so dont cut off
    flex: 1,
  },
  completeIcon: {
    position: 'absolute',
    top: '60%',
    right: '7%',
    width: 40,
    height: 40,
  },
  //modal content
  modalContainer: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  fieldText: {
    fontSize: 18,
    marginStart: '4%',
    fontFamily: 'SFProDisplay-Regular',
    color: Colors.logFieldColor,
  },
  fieldName: {
    fontSize: 18,
    marginStart: '4%',
    fontFamily: 'SFProDisplay-Bold',
    color: Colors.logFieldColor,
    marginTop: '3%',
  },
  inputField: {
    padding: '3%',
    backgroundColor: 'white',
    margin: '4%',
    borderRadius: 9.5,
    borderWidth: 1,
    borderColor: '#e2e8ee',
    fontSize: 18,
  },
  //last log
  lastLogContainer: {
    backgroundColor: Colors.lastLogButtonColor,
    padding: '3%',
    margin: '3%',
    borderRadius: 9.31,
    flexDirection: 'row',
  },
  lastLogDetail: {
    fontSize: 18,
    marginStart: '4%',
    fontFamily: 'SFProDisplay-Regular',
    color: 'white',
  },
  mini_loglogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain', //resize image so dont cut off
    padding: '3%',
  },
  lastLogDate: {
    fontSize: 18,
    marginStart: '4%',
    fontFamily: 'SFProDisplay-Bold',
    color: Colors.logFieldColor,
  },
  lastLogBorder: {
    borderWidth: 0.3,
    borderColor: Colors.lastLogValueColor,
    margin: '3%',
  },
});

export default logStyles;
