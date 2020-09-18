import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from './colors';
import {
  statusBarHeight,
  headerHeight,
  horizontalMargins,
  verticalMarginsBetweenComponent,
  onboard_marginStart,
  onboard_marginEnd,
  normalTextFontSize,
  headerTextFontSize,
} from './variables';

const globalStyles = StyleSheet.create({
  //added from ui / ux change
  alertText: {
    //tweak
    fontSize: 18,
    fontFamily: 'SFProDisplay-Regular',
    color: Colors.alertColor,
  },
  buttonContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -10},
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 30,
    paddingBottom: '10%',
    height: 120,
    margin: 0,
    alignSelf: 'flex-end',
    width: Dimensions.get('window').width,
  },
  crossIcon: {
    color: Colors.crossColor,
  },
  chevronDown: {
    color: Colors.backArrowColor,
  },
  leftArrowBack: {
    color: Colors.leftArrowColor,
  },
  nextButtonStyle: {
    backgroundColor: Colors.nextBtnColor,
    height: 45,
    width: '90%',
    borderRadius: 9.5,
    margin: '5%',
    alignSelf: 'center',
    marginBottom: '15%',
    paddingTop: '3%',
  },
  submitButtonStyle: {
    backgroundColor: Colors.submitBtnColor,
    height: 45,
    width: '90%',
    borderRadius: 9.5,
    margin: '5%',
    alignSelf: 'center',
    marginBottom: '15%',
    paddingTop: '3%',
  },
  skipButtonStyle: {
    backgroundColor: '#e4e4e4',
    height: 45,
    width: '90%',
    borderRadius: 9.5,
    margin: '5%',
    alignSelf: 'center',
    marginBottom: '15%',
    paddingTop: '3%',
  },
  actionButtonText: {
    fontSize: 19,
    textAlign: 'center',
    fontWeight: '700',
  },
  pageHeader: {
    fontSize: headerTextFontSize,
    paddingTop: '2%',
    marginBottom: '1%',
    fontFamily: 'SFProDisplay-Bold',
    marginStart: horizontalMargins,
    marginEnd: horizontalMargins,
  },
  pageDetails: {
    fontSize: normalTextFontSize,
    fontWeight: '800',
    marginStart: horizontalMargins,
    marginEnd: horizontalMargins,
    fontFamily: 'SFProDisplay-Bold',
    marginBottom: '2%',
  },
  pageSubDetails: {
    fontSize: normalTextFontSize,
    marginStart: horizontalMargins,
    marginEnd: horizontalMargins,
    fontFamily: 'SFProDisplay-Regular',
  },
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  menuBarContainer: {
    height: statusBarHeight + headerHeight,
    marginLeft: horizontalMargins,
    marginRight: horizontalMargins,
    marginBottom: verticalMarginsBetweenComponent,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default globalStyles;
