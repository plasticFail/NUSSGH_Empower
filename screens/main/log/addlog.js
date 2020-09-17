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
import {getDefaultMealType} from '../../../commonFunctions/mealLogFunctions';
import MealTypeSelectionBlock from '../../../components/logs/meal/MealTypeSelectionBlock';
import CreateMealLogBlock from '../../../components/logs/meal/CreateMealLogBlock';
import LeftArrowBtn from '../../../components/logs/leftArrowBtn';
// Functions

const button_list = [bg_key, weight_key, med_key, food_key];

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

      // exclusive for meal log
      selectedMealType: getDefaultMealType(new Date().getHours()),

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
      todayDate: Moment(this.state.recordDate).format('Do MMMM YYYY'),
    });
    checkLogDone(period).then((response) => {
      if (response != undefined) {
        this.setState({completedTypes: response.completed});
        this.setState({notCompletedTypes: response.notCompleted});
      }
    });

  }

  resetState() {
    this.setState({
      recordDate: new Date(),

      showModal: false,
      selectedLogType: '',

      // exclusive for meal log
      selectedMealType: getDefaultMealType(new Date().getHours()),

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

  closeFoodForm = () => {
    this.setState({showFood: false});
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
    const {showBg, showMed, showWeight, showFood} = this.state;
    return (
      <View style={globalStyles.pageContainer}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={() => this.props.navigation.navigate('Home')} />
        </View>
        <Text style={globalStyles.pageHeader}>Add Log</Text>
        <Text style={[globalStyles.pageDetails]}>{todayDate}</Text>
        <Text style={[globalStyles.pageDetails, {marginTop: '4%'}]}>
          Progress For {period}
        </Text>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
            style={{margin: 0}}
            backdropColor={Colors.backgroundColor}>
            <View style={logStyles.modalContainer}>
              <View style={globalStyles.menuBarContainer}>
                <CrossBtn close={this.closeModal} />
              </View>
              <View style={[logStyles.bodyPadding, {flex: 1}]}>
                <Text style={[logStyles.headerText]}>Add Log</Text>
                <Text
                  style={[logStyles.headersubText, logStyles.componentMargin]}>
                  {selectedLogType}
                </Text>
                <LastLogButton logType={selectedLogType} />
                <Text style={[logStyles.greyText, logStyles.componentMargin]}>
                  Fill in if you wish to add a new record
                </Text>
                <DateSelectionBlock date={recordDate} setDate={this.setDate} />
                {selectedLogType === food_key && (
                  <MealTypeSelectionBlock
                    onSelectChange={(option) =>
                      this.setState({selectedMealType: option})
                    }
                    defaultValue={this.state.selectedMealType}
                  />
                )}
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
            <CreateMealLogBlock
              visible={showFood}
              parent="addLog"
              recordDate={recordDate}
              mealType={this.state.selectedMealType}
              closeModal={this.closeFoodForm}
              closeParent={this.closeModal}
              navigation={this.props.navigation}
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
