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
  isPeriod,
  isToday,
  checkLogDone,
} from '../../../commonFunctions/logFunctions';
import {getGreetingFromHour} from '../../../commonFunctions/common';
//components
import LastLogButton from '../../../components/logs/lastLogBtn';
import DateSelectionBlock from '../../../components/logs/dateSelectionBlock';
import BloodGlucoseLogBlock from '../../../components/logs/bg/bloodGlucoseLogBlock';
import CrossBtn from '../../../components/crossBtn';
import MedicationLogBlock from '../../../components/logs/medication/medicationLogBlock';
import WeightLogBlock from '../../../components/logs/weight/weightLogBlock';
import MenuBtn from '../../../components/menuBtn';

// AddLog view
class AddLogScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      recordDate: new Date(),
      period: '',
      todayDate: '',

      showModal: false,
      selectedLogType: '',

      showBg: false,
      showFood: false,
      showMed: false,
      showWeight: false,
      showSuccess: false,

      completedTypes: [],
      notCompletedTypes: [],
    };

    this.props.navigation.addListener('focus', () => {
      //check the period, date and which logs done
      this.init();
    });
  }

  componentDidMount() {
    this.init();
  }

  init() {
    let period = getGreetingFromHour(this.state.recordDate.getHours());
    this.setState({
      period: period,
    });
    this.setState({
      todayDate: Moment(this.state.recordDate).format('Do MMMM YYYY'),
    });
    checkLogDone(period).then((response) => {
      this.setState({completedTypes: response.completed});
      this.setState({notCompletedTypes: response.notCompleted});
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
    });
  }

  openModalType = (logType) => {
    this.setState({selectedLogType: logType});
    this.setState({showModal: true});
  };

  closeModal = () => {
    this.setState({showModal: false});
    this.resetState();
    this.init(); //update log done check*
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
    const {
      showModal,
      selectedLogType,
      recordDate,
      todayDate,
      period,
      notCompletedTypes,
      completedTypes,
    } = this.state;
    const {showBg, showMed, showWeight} = this.state;
    return (
      <View style={globalStyles.pageContainer}>
        <MenuBtn />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Text style={globalStyles.pageHeader}>Add Log</Text>
          <Text style={globalStyles.pageDetails}>{todayDate}</Text>
          <Text style={[globalStyles.pageDetails, {marginTop: '4%'}]}>
            Progress For {period}
          </Text>
          {notCompletedTypes.length > 0 && (
            <Text style={logStyles.complete}>Not Complete</Text>
          )}
          {notCompletedTypes.map((item, index) => (
            <TouchableOpacity
              style={logStyles.logItem}
              key={item}
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
          {completedTypes.length > 0 && (
            <Text style={logStyles.complete}>Completed</Text>
          )}
          {completedTypes.map((item, index) => (
            <TouchableOpacity
              style={logStyles.logItem}
              onPress={() => this.openModalType(item)}
              key={item}>
              <Image source={renderLogIcon(item)} style={logStyles.loglogo} />
              <Text style={[globalStyles.pageDetails, {marginStart: '15%'}]}>
                {item}
              </Text>
              <Ionicon
                name="checkmark"
                size={40}
                style={logStyles.completeIcon}
                color={Colors.backArrowColor}
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
            <BloodGlucoseLogBlock
              visible={showBg}
              recordDate={recordDate}
              closeModal={this.closeBgForm}
              closeParent={this.closeModal}
              parent="addLog"
            />

            <MedicationLogBlock
              visible={showMed}
              recordDate={recordDate}
              closeModal={this.closeMedForm}
              closeParent={this.closeModal}
              parent="addLog"
            />

            <WeightLogBlock
              visible={showWeight}
              recordDate={recordDate}
              closeModal={this.closeWeightForm}
              closeParent={this.closeModal}
              parent="addLog"
            />
          </Modal>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addButton: {
    alignSelf: 'center',
  },
});

export default AddLogScreen;
