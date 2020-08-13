import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import {storeMedications} from '../../netcalls/requestsLog';
import {checkDosage} from '../../commonFunctions/logFunctions';

Entypo.loadFont();

class SelectMedicationModalContent extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      triggerSearch: false,
      searchKey: '',
      searchKeyCache: '',
      selectedMedicine: null,
      searchMedicationResults: [],
      dosage: '',
    };
  }

  componentDidUpdate() {
    console.log(
      'update : ' +
        this.state.searchKey +
        ' cache : ' +
        this.state.searchKeyCache,
    );
    if (
      this.state.triggerSearch &&
      this.state.searchKey === this.state.searchKeyCache
    ) {
      this.setState({triggerSearch: false});
      this.returnSearchResult(this.state.searchKey);
    }
  }

  handleSearch = (searchKey) => {
    this.setState({searchKey: searchKey});
    this.setState({triggerSearch: true});
    setTimeout(() => {
      this.setState({searchKeyCache: searchKey});
    }, 1000);
  };

  handleDosage = (dosage) => {
    this.setState({dosage: dosage});
  };

  //search
  returnSearchResult = (searchKey) => {
    if (searchKey !== '') {
      let arr = [];
      storeMedications().then((response) => {
        for (let x of response.medications) {
          arr.push(x);
        }

        let result = arr.filter((medication) => {
          let medicine = medication.drug_name
            .replace(/\s{1,2}\[|\]/g, ' ')
            .toLowerCase();
          let searchArr = String(searchKey).split(' ');
          let count = 0;
          for (let x of searchArr) {
            if (medicine.includes(x.toLowerCase())) {
              count += 1;
            }
          }
          if (count === searchArr.length) {
            return medication;
          }
        });
        this.setState({searchMedicationResults: result});
      });
    } else {
      this.setState({searchMedicationResults: []});
    }
  };

  selectFromList = (item) => {
    console.log('Selected Item: ' + item.drug_name);
    this.setState({searchKey: item.drug_name});
    this.setState({searchMedicationResults: []});
    this.setState({selectedMedicine: item});
  };

  submit = () => {
    if (
      checkDosage(this.state.dosage) &&
      this.state.selectedMedicine !== null
    ) {
      //if repeated
      if (this.checkRepeat(this.state.selectedMedicine.drug_name)) {
        console.log('Duplicate detected');
        Alert.alert('Error', 'Medication added previously', [{text: 'Got It'}]);
      } else {
        console.log(
          'Adding Medicine: ' +
            this.state.selectedMedicine.drug_name +
            ' Dosage: ' +
            this.dosage,
        );
        //use to send the selected medicine back to 'parent'
        this.props.setMedicine({
          drugName: this.state.selectedMedicine.drug_name,
          unit: 'unit',
          dosage: Number(this.state.dosage),
          recordDate: '',
          image_url: this.state.selectedMedicine.image_url,
        });
        this.setState({searchKey: ''});
      }
    }

    if (this.state.selectedMedicine === null) {
      Alert.alert('Error', 'Please select a medication from the database', [
        {text: 'Got It'},
      ]);
    }
  };

  checkRepeat = (medicationName) => {
    let arr = this.props.selectedMedicationList;
    console.log('Checking');
    console.log(arr);
    for (let x of arr) {
      console.log(x.drug_name);
      if (x.drugName === medicationName) {
        return true;
      }
    }
    return false;
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchMedicine
          searchKey={this.state.searchKey}
          handleSearch={this.handleSearch}
        />
        {this.state.searchMedicationResults.length > 0 && (
          <SearchMedicineResults
            searchMedicineResults={this.state.searchMedicationResults}
            selectFromList={this.selectFromList}
          />
        )}
        <DosageInput dosage={this.state.dosage} setDosage={this.handleDosage} />

        <View style={{paddingBottom: '4%'}}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.shadow,
              {width: 200, height: 40, backgroundColor: '#aad326'},
            ]}
            onPress={this.submit}>
            <Text style={[styles.buttonText, {fontSize: 22}]}>
              Add Medicine
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function DosageInput(props) {
  return (
    <View style={styles.componentContainer}>
      <Text style={styles.inputHeader}>Dosage: </Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          style={[styles.inputBox, {flex: 1}]}
          placeholder=""
          placeholderTextColor="#a1a3a0"
          keyboardType="number-pad"
          value={props.dosage}
          onChangeText={(value) => props.setDosage(value)}
        />
        <View style={styles.unitStyle}>
          <Text style={{fontSize: 20}}>Unit (s)</Text>
        </View>
      </View>
    </View>
  );
}

function SearchMedicineResults({searchMedicineResults, selectFromList}) {
  return (
    <View
      style={[
        styles.resultItemContainer,
        {
          height: '38%',
          marginStart: '5%',
          marginEnd: '5%',
        },
      ]}>
      <Text style={{fontSize: 19, marginStart: '2%', marginBottom: '2%'}}>
        Results: {searchMedicineResults.length}
      </Text>
      <FlatList
        data={searchMedicineResults}
        renderItem={({item}) => (
          <View style={styles.resultItem}>
            <Image
              style={styles.medicineImg}
              source={{
                uri: item.image_url,
              }}
            />
            <Text style={{flex: 2, flexWrap: 'wrap'}}>{item.drug_name}</Text>
            <TouchableOpacity
              style={[styles.button, styles.shadow, {flex: 1}]}
              onPress={() => selectFromList(item)}>
              <Text style={styles.buttonText}>Select</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const SearchMedicine = (props) => {
  return (
    <View style={styles.componentContainer}>
      <Text style={styles.inputHeader}>Name:</Text>
      <TextInput
        style={styles.searchInputBox}
        placeholder="Type a medication..."
        placeholderTextColor="#a1a3a0"
        value={props.searchKey}
        onChangeText={(text) => {
          props.handleSearch(text);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  componentContainer: {
    marginTop: '7%',
    padding: '5%',
  },
  header: {
    backgroundColor: '#aad326',
    padding: '4%',
    flexDirection: 'row',
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 20,
    marginStart: '30%',
    marginTop: '2%',
  },
  inputHeader: {
    fontWeight: '500',
    fontSize: 20,
  },
  searchInputBox: {
    width: 340,
    height: 40,
    borderWidth: 1,
    paddingStart: 30, //position placeholder text
    marginVertical: 10,
    marginEnd: '3%',
    fontSize: 17,

    flexWrap: 'wrap',
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
  resultList: {
    width: 340,
    flexGrow: 0,
    marginStart: '3%',
    marginEnd: '4%',
  },
  resultItem: {
    borderBottomWidth: 1,
    borderColor: '#707070',
    padding: '3%',
    flexDirection: 'row',
    paddingStart: '2%',
  },
  resultItemContainer: {
    borderWidth: 1,
    borderColor: '#707070',
    padding: '3%',
    paddingStart: '2%',
  },
  medicineImg: {
    width: 98,
    height: 98,
    marginEnd: '3%',
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
  unitStyle: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#AAd326',
    padding: 15,
    alignItems: 'center',
  },
});

export default SelectMedicationModalContent;
