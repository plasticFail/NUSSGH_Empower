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
    fontWeight: '500',
    textAlign: 'center',
  },
  alertText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
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
  },
  backArrowStyle: {
    color: Colors.backArrowColor,
    marginTop: '5%',
  },
  nextButtonStyle: {
    backgroundColor: Colors.submitBtnColor,
    height: 45,
    width: '90%',
    borderRadius: 20,
    margin: '5%',
    alignSelf: 'center',
    marginBottom: '15%',
    paddingTop: '3%',
  },
  skipButtonStyle: {
    backgroundColor: '#e4e4e4',
    height: 45,
    width: '90%',
    borderRadius: 20,
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
});

export default globalStyles;
