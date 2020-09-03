import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
//third party lib
import Moment from 'moment';
import Modal from 'react-native-modal';
import Ionicon from 'react-native-vector-icons/Ionicons';
//styles
import logStyles from '../../../styles/logStyles';
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
//function
import {
  bg_key,
  food_key,
  med_key,
  weight_key,
  renderLogIcon,
  handleSubmitBloodGlucose,
} from '../../../commonFunctions/logFunctions';
import {getGreetingFromHour} from '../../../commonFunctions/common';
//components
import LastLogButton from '../../../components/logs/lastLogBtn';
import DateSelectionBlock from '../../../components/logs/dateSelectionBlock';
import BloodGlucoseLogBlock from '../../../components/logs/bloodGlucoseLogBlock';
import CrossBtn from '../../../components/crossBtn';
import SuccessDialogue from '../../../components/successDialogue';

const buttonList = [bg_key, food_key, med_key, weight_key];

// AddLog view
class AddLogScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      recordDate: new Date(),
      bloodGlucose: '',
      eatSelection: false,
      exerciseSelection: false,
      alcholicSelection: false,

      selectedMedicationList: [],
      weight: '',

      showModal: false,
      selectedLogType: '',

      showBg: false,
      showFood: false,
      showMed: false,
      showWeight: false,
      showSuccess: false,
    };

    this.period = getGreetingFromHour(this.state.recordDate.getHours());
    this.todayDate = Moment(this.state.recordDate).format('Do MMMM YYYY');

    this.props.navigation.addListener('focus', () => {
      //check the period, date
      this.period = getGreetingFromHour(this.state.recordDate.getHours());
      this.todayDate = Moment(this.state.recordDate).format('Do MMMM YYYY');
      //check which logs have been done
      //render new button list to display under complete, not complete
      //in componentDidUpdate also**
    });
  }

  resetState() {
    this.setState({
      recordDate: new Date(),
      bloodGlucose: '',
      eatSelection: false,
      exerciseSelection: false,
      alcholicSelection: false,

      selectedMedicationList: [],
      weight: '',

      showModal: false,
      selectedLogType: '',

      showBg: false,
      showFood: false,
      showMed: false,
      showWeight: false,
      showSuccess: false,
    });
  }

  openModalType = (logType) => {
    this.setState({selectedLogType: logType});
    this.setState({showModal: true});
  };

  closeModal = () => {
    this.setState({showModal: false});
    this.resetState();
  };

  setDate = (date) => {
    this.setState({recordDate: date});
  };

  showLogForm = (logType) => {
    switch (logType) {
      case bg_key:
        this.setState({showBg: true});
        break;
      case food_key:
        this.setState({showFood: true});
        break;

      case med_key:
        this.setState({showMed: true});
        break;

      case weight_key:
        this.setState({showWeight: true});
        break;
    }
  };
  //close forms
  closeBgForm = () => {
    this.setState({showBg: false});
  };

  //set values
  setBloodGlucose = (value) => {
    this.setState({bloodGlucose: value});
  };

  setEatSelection = (boolVal) => {
    console.log('setting eat selection ' + boolVal);
    this.setState({eatSelection: boolVal});
  };

  setExerciseSelection = (boolVal) => {
    console.log('setting exercise selection ' + boolVal);
    this.setState({exerciseSelection: boolVal});
  };

  setAlcoholSelection = (boolVal) => {
    console.log('setting alchohol selection ' + boolVal);
    this.setState({alcholicSelection: boolVal});
  };

  //submit value
  submitBg = async () => {
    this.closeBgForm();
    if (
      await handleSubmitBloodGlucose(
        this.state.recordDate,
        this.state.bloodGlucose,
      )
    ) {
      this.setState({showSuccess: true});
      this.closeModal();
    }
  };

  render() {
    const {showModal, selectedLogType, recordDate} = this.state;
    const {showBg, showMed, showWeight, showSuccess} = this.state;
    const {
      bloodGlucose,
      eatSelection,
      exerciseSelection,
      alcholicSelection,
    } = this.state;
    return (
      <View style={styles.container}>
        <Text style={globalStyles.pageHeader}>Add Log</Text>
        <Text style={globalStyles.pageDetails}>{this.todayDate}</Text>
        <Text style={[globalStyles.pageDetails, {marginTop: '4%'}]}>
          Progress For {this.period}
        </Text>
        <Text style={logStyles.complete}>Not Complete</Text>
        {buttonList.map((item, index) => (
          <TouchableOpacity
            style={logStyles.logItem}
            onPress={() => this.openModalType(item)}>
            <Image source={renderLogIcon(item)} style={logStyles.loglogo} />
            <Text style={[globalStyles.pageDetails, {marginStart: '15%'}]}>
              {item}
            </Text>
            <Ionicon
              name="alert-circle-outline"
              size={40}
              style={logStyles.completeIcon}
              color="red"
            />
          </TouchableOpacity>
        ))}
        {/* Modal for Add Log*/}
        <Modal
          isVisible={showModal}
          coverScreen={true}
          backdropOpacity={1}
          onBackButtonPress={this.closeModal}
          backdropColor={Colors.backgroundColor}>
          <View style={logStyles.modalContainer}>
            <CrossBtn close={this.closeModal} />
            <Text style={globalStyles.pageHeader}>Add Log</Text>
            <Text style={globalStyles.pageDetails}>{selectedLogType}</Text>
            <LastLogButton logType={selectedLogType} />
            <Text style={logStyles.fieldText}>
              Fill in if you wish to add a new record
            </Text>
            <DateSelectionBlock date={recordDate} setDate={this.setDate} />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => this.showLogForm(selectedLogType)}>
              <Ionicon
                name="add-circle"
                size={60}
                color={Colors.submitBtnColor}
              />
            </TouchableOpacity>
          </View>
          {/*Modal for the different form types */}
          <BloodGlucoseLogBlock
            visible={showBg}
            closeModal={this.closeBgForm}
            bloodGlucose={bloodGlucose}
            setBloodGlucose={this.setBloodGlucose}
            eatSelection={eatSelection}
            exerciseSelection={exerciseSelection}
            alcholicSelection={alcholicSelection}
            setEatSelection={this.setEatSelection}
            setExerciseSelection={this.setExerciseSelection}
            setAlcoholSelection={this.setAlcoholSelection}
            parent="addLog"
            submitBg={this.submitBg}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  addButton: {
    alignSelf: 'center',
  },
});

export default AddLogScreen;
