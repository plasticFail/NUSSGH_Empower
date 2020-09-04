import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from './colors';

const globalStyles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    padding: '4%',
  },
  button: {
    marginTop: '9%',
    backgroundColor: '#AAD326',
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 40,
    paddingVertical: 6,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
  alertText: {
    //tweak
    fontSize: 18,
    fontFamily: 'SFProDisplay-Regular',
    color: Colors.alertColor,
  },
  cardContainer: {
    marginTop: '9%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 40,
    paddingVertical: 6,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonEnabled: {
    alignSelf: 'center',
    backgroundColor: '#B3D14C',
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 40,
    paddingVertical: 6,
  },
  buttonDisabled: {
    alignSelf: 'center',
    backgroundColor: '#EAEAFF',
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 40,
    paddingVertical: 6,
  },
  //added from ui / ux change
  buttonContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -10},
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
    paddingBottom: '10%',
    height: 120,
    margin: 0,
    alignSelf: 'flex-end',
    width: Dimensions.get('window').width,
  },
  crossIcon: {
    color: Colors.crossColor,
    marginTop: '8%',
  },
  chevronDown: {
    color: Colors.backArrowColor,
    marginTop: '8%',
    marginStart: '4%',
  },
  leftArrowBack: {
    color: Colors.leftArrowColor,
    marginTop: '8%',
    marginStart: '4%',
  },
  nextButtonStyle: {
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
    fontSize: 33,
    marginStart: '4%',
    paddingTop: '2%',
    marginBottom: '1%',
    fontFamily: 'SFProDisplay-Bold',
  },
  pageDetails: {
    fontSize: 18,
    fontWeight: '800',
    marginStart: '4%',
    fontFamily: 'SFProDisplay-Bold',
  },
  pageSubDetails: {
    fontSize: 18,
    marginStart: '4%',
    fontFamily: 'SFProDisplay-Regular',
  },
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingTop: '20%',
  },
});

export default globalStyles;
