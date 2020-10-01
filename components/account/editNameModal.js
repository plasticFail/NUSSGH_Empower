import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, TextInput, Text, Alert} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
import globalStyles from '../../styles/globalStyles';
import LeftArrowBtn from '../logs/leftArrowBtn';

const EditNameModal = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const checkInput = () => {
    if (firstName && lastName) {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    Alert.alert(
      'Name Changed Successfully',
      '',
      [
        {
          text: 'Got It',
          onPress: () => {
            props.close();
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <Modal
      isVisible={props.visible}
      animationIn="slideInRight"
      onBackdropPress={props.close}
      onBackButtonPress={props.close}
      style={{margin: 0}}>
      <View style={globalStyles.editPageContainer}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={props.close} />
        </View>
        <Text style={globalStyles.pageHeader}>Edit Name</Text>
        <Text style={[globalStyles.pageSubDetails, {fontSize: 18}]}>
          Please enter the name that you wish to change to:
        </Text>
        <TextInput
          style={globalStyles.editInputBox}
          placeholder="First Name"
          placeholderTextColor="#a1a3a0"
          onChangeText={setFirstName}
        />
        <TextInput
          style={globalStyles.editInputBox}
          placeholder="Last Name"
          placeholderTextColor="#a1a3a0"
          onChangeText={setLastName}
        />
      </View>
      <View style={globalStyles.buttonContainer}>
        {checkInput() ? (
          <TouchableOpacity
            style={globalStyles.submitButtonStyle}
            onPress={() => handleSubmit()}>
            <Text style={globalStyles.actionButtonText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={globalStyles.skipButtonStyle}>
            <Text style={globalStyles.actionButtonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

export default EditNameModal;
