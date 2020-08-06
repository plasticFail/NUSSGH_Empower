import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';

export default class EditMedicationModalContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMedicineName: this.props.medicineToEdit.drugName,
      oldMedicineDosage: this.props.medicineToEdit.dosage,
      newMedicineDosage: this.props.medicineToEdit.dosage,
      image: this.props.medicineToEdit.image_url,
    };
    this.setNewDosage = this.setNewDosage.bind(this);
    this.sendChanges = this.sendChanges.bind(this);
  }

  setNewDosage(newDosage) {
    console.log('Setting new dosage ' + newDosage);
    this.setState({newMedicineDosage: newDosage});
  }

  sendChanges() {
    this.props.editMedicine(
      this.state.editMedicineName,
      this.state.newMedicineDosage,
    );
  }

  render() {
    const {editMedicineName, oldMedicineDosage, image} = this.state;
    return (
      <View style={styles.container}>
        <Image
          style={styles.medicineImg}
          source={{
            uri: image,
          }}
        />
        <Text style={styles.header}>{editMedicineName}</Text>
        <DosageInput
          setDosage={this.setNewDosage}
          oldDosage={oldMedicineDosage}
        />
        <View style={{paddingBottom: '4%'}}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.shadow,
              {width: 200, height: 40, backgroundColor: '#aad326'},
            ]}
            onPress={this.sendChanges}>
            <Text style={[styles.buttonText, {fontSize: 22}]}>
              Edit Medicine
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function DosageInput({setDosage, oldDosage}) {
  const [dosageInput, setDosageInput] = useState(oldDosage.toString());
  return (
    <View style={styles.componentContainer}>
      <Text style={styles.inputHeader}>Dosage: </Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={[styles.inputBox, {flex: 1}]}
          placeholderTextColor="#a1a3a0"
          keyboardType="number-pad"
          value={dosageInput}
          onChangeText={(value) => {
            setDosageInput(value);
            setDosage(value);
          }}
        />
        <View style={styles.unitStyle}>
          <Text style={{fontSize: 20}}>Unit (s)</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  medicineImg: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: '5%',
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'stretch',
    margin: '6%',
  },
  inputHeader: {
    fontWeight: '500',
    fontSize: 20,
  },
  componentContainer: {
    padding: '5%',
  },
  inputBox: {
    width: 300,
    height: 40,
    backgroundColor: '#EEF3BD',
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
    marginEnd: '3%',
    fontSize: 17,
  },
  unitStyle: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#AAd326',
    padding: 15,
    alignItems: 'center',
  },
  button: {
    marginTop: '4%',
    backgroundColor: '#EEF3BD',
    width: 60,
    height: 30,
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 6,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});