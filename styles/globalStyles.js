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
  greyPageDetails: {
    fontSize: normalTextFontSize,
    fontWeight: '800',
    marginStart: horizontalMargins,
    marginEnd: horizontalMargins,
    fontFamily: 'SFProDisplay-Bold',
    marginBottom: '2%',
    color: Colors.lastLogValueColor,
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
    justifyContent: 'space-between',
  },
  //edit pages
  editPageContainer: {
    flex: 1,
    backgroundColor: Colors.editBackgroundColor,
  },
  editInputBox: {
    marginBottom: '2%',
    backgroundColor: 'white',
    padding: '3%',
    margin: '4%',
    borderRadius: 9.5,
    borderWidth: 0.5,
    borderColor: Colors.inputBorderColor,
  },
  //goal
  goalFieldName: {
    color: Colors.lastLogValueColor,
    marginStart: '4%',
    fontSize: normalTextFontSize,
    fontFamily: 'SFProDisplay-Bold',
    marginTop: '3%',
  },
  goalFieldBottomBorder: {
    borderBottomColor: '#e1e7ed',
    borderBottomWidth: 1,
    paddingBottom: '2%',
  },
  //delete modal
  deleteDetails: {
    fontSize: 16,
    margin: '4%',
  },
  deleteButton: {
    backgroundColor: '#ff0844',
    height: 45,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 15,
    margin: '4%',
  },
  deleteButtonText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: '3%',
    fontWeight: '500',
    color: 'white',
  },
  subOptionText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ff0844',
    marginBottom: '3%',
  },
});

export default globalStyles;
