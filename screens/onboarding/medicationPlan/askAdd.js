import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
//third party library
import Ionicons from 'react-native-vector-icons/Ionicons';
//styles
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
//component
import LoadingModal from '../../../components/loadingModal';
import AddMedicationModal from '../../../components/medication/addMedicationModal';

Ionicons.loadFont();

class AskAdd extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      loading: false,
      showAddModal: false,
      selectedMedList: [],
    };
    this.handleAddMedication = this.handleAddMedication.bind(this);
    this.closeAddMedicationModal = this.closeAddMedicationModal.bind(this);
  }

  componentDidUpdate(prevProp) {}

  handleAddMedication() {
    this.setState({showAddModal: true});
  }
  closeAddMedicationModal() {
    this.setState({showAddModal: false});
  }

  render() {
    const {showAddModal, loading} = this.state;
    return (
      <View style={styles.onboardingContainer}>
        <Text style={[globalStyles.pageHeader, styles.stepText]}>Step 3</Text>
        <Text style={globalStyles.pageDetails}>Add your Medicine Plan</Text>
        <Text style={[globalStyles.pageSubDetails, styles.stepContent]}>
          Would you like to add your scheduled medications for this month? We
          will help to track them.
        </Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={this.handleAddMedication}>
          <Ionicons name="add-circle" size={80} color={Colors.nextBtnColor} />
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            style={globalStyles.skipButtonStyle}
            onPress={this.handleSkip}>
            <Text style={globalStyles.actionButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <AddMedicationModal
          visible={showAddModal}
          closeModal={() => this.closeAddMedicationModal()}
        />

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
    marginTop: '15%',
  },
});
