import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
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
} from '../../../commonFunctions/logFunctions';
import {getGreetingFromHour} from '../../../commonFunctions/common';
//components
import LastLogButton from '../../../components/logs/lastLogBtn';
import DateSelectionBlock from '../../../components/logs/dateSelectionBlock';
import BloodGlucoseLogBlock from '../../../components/logs/bg/bloodGlucoseLogBlock';
import CrossBtn from '../../../components/crossBtn';
import SuccessDialogue from '../../../components/successDialogue';
import MedicationLogBlock from '../../../components/logs/medication/medicationLogBlock';
import WeightLogBlock from '../../../components/logs/weight/weightLogBlock';

const buttonList = [bg_key, food_key, med_key, weight_key];

// AddLog view
class AddLogScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      recordDate: new Date(),

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

  closeMedForm = () => {
    this.setState({showMed: false});
  };

  closeWeightForm = () => {
    this.setState({showWeight: false});
  };

  render() {
    const {showModal, selectedLogType, recordDate} = this.state;
    const {showBg, showMed, showWeight, showSuccess} = this.state;
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={globalStyles.pageContainer}>
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
                  color={Colors.nextBtnColor}
                />
              </TouchableOpacity>
            </View>
            {/*Modal for the different form types */}
            {showBg ? (
              <BloodGlucoseLogBlock
                visible={showBg}
                recordDate={recordDate}
                closeModal={this.closeBgForm}
                closeParent={this.closeModal}
                parent="addLog"
              />
            ) : null}

            {showMed ? (
              <MedicationLogBlock
                visible={showMed}
                recordDate={recordDate}
                closeModal={this.closeMedForm}
                closeParent={this.closeModal}
                parent="addLog"
              />
            ) : null}

            {showWeight ? (
              <WeightLogBlock
                visible={showWeight}
                recordDate={recordDate}
                closeModal={this.closeWeightForm}
                closeParent={this.closeModal}
                parent="addLog"
              />
            ) : null}
          </Modal>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  addButton: {
    alignSelf: 'center',
  },
});

export default AddLogScreen;
