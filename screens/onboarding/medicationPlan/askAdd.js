import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
//third party library
import Ionicons from 'react-native-vector-icons/Ionicons';
//styles
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
//component
import LoadingModal from '../../../components/loadingModal';
import AddMedicationModal from '../../../components/medication/addMedicationModal';
import PlannedMedList from '../../../components/medication/displayMedList/plannedMedList';
//function
import {
  onboardAdd,
  onboardEdit,
  editMed,
} from '../../../commonFunctions/medicationFunction';

class AskAdd extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      loading: false,
      showAddModal: false,
      parent: '',
      med2Edit: {},
      selectedMedList: [
        {
          days: [
            {name: 'Monday', selected: true, value: 0},
            {name: 'Tuesday', selected: true, value: 1},
            {name: 'Wednesday', selected: false, value: 2},
            {name: 'Thursday', selected: false, value: 3},
            {name: 'Friday', selected: false, value: 4},
            {name: 'Saturday', selected: false, value: 5},
            {name: 'Sunday', selected: false, value: 6},
          ],
          dosage: 1,
          dosage_unit: 'unit',
          medication: '*Actrapid HM Penfill',
          per_day: 2,
        },
      ],
    };
  }

  componentDidMount() {
    this.setState({parent: onboardAdd});
  }

  handleAddMedication = () => {
    this.setState({showAddModal: true});
    this.setState({parent: onboardAdd});
  };

  closeAddMedicationModal = () => {
    this.setState({showAddModal: false});
  };

  onAddMed = (item) => {
    let arr = this.state.selectedMedList;
    arr.push(item);
    this.setState({selectedMedList: arr});
    console.log(item);
  };

  editMed = (item) => {
    console.log('edting');
    this.setState({parent: onboardEdit});
    this.setState({med2Edit: item});
    this.setState({showAddModal: true});
  };

  handleEdit = (editedItem) => {
    let arr = editMed(
      this.state.med2Edit,
      editedItem,
      this.state.selectedMedList,
    );
    this.setState({selectedMedList: arr});
  };

  handleDelete = (toDelete) => {
    let arr = this.state.selectedMedList.filter(
      (item) => item.medication != toDelete.medication,
    );
    this.setState({selectedMedList: arr});
    this.setState({showAddModal: false});
  };

  handleSkip = () => {
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({loading: false});
      this.props.navigation.navigate('Home');
    }, 1500);
  };

  render() {
    const {
      showAddModal,
      loading,
      selectedMedList,
      parent,
      med2Edit,
    } = this.state;
    return (
      <View style={styles.onboardingContainer}>
        <Text style={[globalStyles.pageHeader, styles.stepText]}>Step 3</Text>
        <Text style={globalStyles.pageDetails}>Add your Medicine Plan</Text>
        <Text style={[globalStyles.pageSubDetails, styles.stepContent]}>
          Would you like to add your scheduled medications for this month? We
          will help to track them.
        </Text>

        {selectedMedList.length === 0 ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={this.handleAddMedication}>
            <Ionicons name="add-circle" size={80} color={Colors.nextBtnColor} />
          </TouchableOpacity>
        ) : (
          <PlannedMedList
            medList={selectedMedList}
            openAddModal={this.handleAddMedication}
            editMed={this.editMed}
          />
        )}
        <View style={{flex: 1}} />
        <View style={globalStyles.buttonContainer}>
          {selectedMedList.length > 0 ? (
            <TouchableOpacity
              style={globalStyles.nextButtonStyle}
              onPress={this.handleSkip}>
              <Text style={globalStyles.actionButtonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={globalStyles.skipButtonStyle}
              onPress={this.handleSkip}>
              <Text style={globalStyles.actionButtonText}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>

        {showAddModal ? (
          <AddMedicationModal
            visible={showAddModal}
            closeModal={() => this.closeAddMedicationModal()}
            onAddMed={this.onAddMed}
            parent={parent}
            currentMedList={selectedMedList}
            med2Edit={med2Edit}
            onEditMed={this.handleEdit}
            onDeleteMed={this.handleDelete}
          />
        ) : null}

        <LoadingModal visible={loading} message={'Setting up your account'} />
      </View>
    );
  }
}

export default AskAdd;

const styles = StyleSheet.create({
  onboardingContainer: {
    paddingTop: '8%',
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  stepText: {
    marginTop: '10%',
  },
  stepContent: {
    marginTop: '3%',
    width: '90%',
  },
  addButton: {
    alignSelf: 'center',
  },
});
