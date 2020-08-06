import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

function SuccessDialogue({visible, type}) {
  const navigation = useNavigation();
  console.log({visible});
  Icon.loadFont();
  return (
    <Modal
      isVisible={visible}
      animationIn="slideInUp"
      style={{
        backgroundColor: 'white',
        borderRadius: 30,
        alignItems: 'center',
      }}>
      <Icon name="checkcircle" color="#aad326" size={100} />
      <Text style={{fontSize: 30, fontWeight: '500', marginTop: '3%'}}>
        {type} Log
      </Text>
      <Text style={{fontSize: 18}}>Completed successfully</Text>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#aad326'}]}
        onPress={() => navigation.navigate('AddLog')}>
        <Text style={styles.buttonText}>Got It</Text>
      </TouchableOpacity>
    </Modal>
  );
}

export default SuccessDialogue;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: '9%',
    backgroundColor: '#EEF3BD',
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 6,
    paddingHorizontal: 40,
  },
  buttonText: {
    fontSize: 23,
    fontWeight: '500',
    textAlign: 'center',
  },
});
