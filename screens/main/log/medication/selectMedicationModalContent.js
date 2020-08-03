import React from 'react';
import {View, Text, StyleSheet, TextInput, Image, Alert} from 'react-native';
import Modal from 'react-native-modal';

export default class SelectMedicationModalContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMedicine: '',
      searchMedicineQuery: '',
      searchMedicineResults: [],
    };

    console.log(this.state.modalOpen);
    this.props.setMedicine('hi2'); //use to send the selected medicine back
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hihi</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 3,
  },
});
