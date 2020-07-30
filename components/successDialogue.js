import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

function SuccessDialogue({visible, type}) {
  const navigation = useNavigation();
  console.log({visible});
  Icon.loadFont();
  return (
    <View>
      <Modal
        isVisible={visible}
        animationIn="slideInUp"
        style={{
          backgroundColor: 'white',
          borderRadius: 30,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 40, fontWeight: '500', marginTop: '3%'}}>
          {type} Log
        </Text>
        <Text>Completed successfully</Text>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#aad326'}]}
          onPress={() => navigation.navigate('AddLog')}>
          <Text style={styles.buttonText}>Got It</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default SuccessDialogue;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 200,
    height: 200,
    backgroundColor: '#f5f5f5',
    borderRadius: 50,
    overflow: 'hidden', //resize image so dont cut off
  },
  iconImg: {
    position: 'absolute',
    top: '0%',
    right: '7%',
    width: 40,
    height: 40,
    resizeMode: 'contain', //resize image so dont cut off
  },
  button: {
    marginTop: '9%',
    backgroundColor: '#EEF3BD',
    width: 300,
    height: 40,
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 6,
  },
  buttonText: {
    fontSize: 23,
    fontWeight: '500',
    textAlign: 'center',
  },
});
