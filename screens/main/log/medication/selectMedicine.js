import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';

const SelectMedicine = () => {
  Entypo.loadFont();
  const [modal, setModal] = useState(true);

  console.log('Dialogue ' + modal);

  return (
    <View style={{flex: 1}}>
      <Modal
        isVisible={modal}
        animationIn="slideInUp"
        onBackdropPress={() => setModal(false)}
        style={{backgroundColor: 'white', borderRadius: 25}}>
        <View style={styles.header}>
          <Entypo
            name="cross"
            size={30}
            style={{marginEnd: 30}}
            onPress={() => {
              setModal(false);
            }}
          />
          <Text style={{fontWeight: '500', fontSize: 20}}>Select Medicine</Text>
        </View>
      </Modal>
    </View>
  );
};

export default SelectMedicine;

const styles = StyleSheet.create({
  header: {
    flex: 0.2,
    flexDirection: 'row',
    backgroundColor: '#aad326',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
});
