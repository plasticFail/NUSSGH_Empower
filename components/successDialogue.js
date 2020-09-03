import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';

function SuccessDialogue(props) {
  const {visible, type} = props;
  const [showSuccess, setShowSuccess] = useState(visible);
  return (
    <Modal
      isVisible={showSuccess}
      animationIn="slideInUp"
      style={{
        backgroundColor: 'white',
        borderRadius: 30,
        alignItems: 'center',
      }}>
      <Icon name="checkcircle" color="#aad326" size={100} />
      <Text style={{fontSize: 30, fontWeight: '500', marginTop: '3%'}}>
        {type}
      </Text>
      <Text style={{fontSize: 18}}>Completed successfully</Text>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: '#aad326'}]}
        onPress={() => setShowSuccess(false)}>
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
