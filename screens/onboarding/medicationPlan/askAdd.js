import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//third party library
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Calendar} from 'react-native-calendars';
//component
import CalendarMedicationDay from '../../../components/onboarding/medication/calendarMedicationDay';
import LoadingModal from '../../../components/loadingModal';
//function
import {prepareData, postPlan} from '../../../netcalls/requestsMedPlan';
//styles
import {Colors} from '../../../styles/colors';
import globalStyles from '../../../styles/globalStyles';
import {
  addMedicine,
  removeMed4Date,
  removeMed4All,
} from '../../../commonFunctions/medicationFunction';

Ionicons.loadFont();

class AskAdd extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      selectedDates4All: {},
      selectedDate: '',
      showCalendar: false,
      loading: false,
    };
  }

  componentDidUpdate(prevProp) {
    if (prevProp.route.params != this.props.route.params) {
      const {parent} = this.props.route.params;
      if (parent === 'addPlan') {
        //if return from AddPlan
        console.log('setting new state for marked dates in calendar');
        const {list} = this.props.route.params;
        this.onReturn(list);
        //
      } else if (parent === 'deleteConfirmation') {
        //if return from delete dialogue
        const {dateString, type, medication} = this.props.route.params;
        if (!this.isEmpty(medication)) {
          if (type === 'justThis') {
            console.log(
              dateString + ': removing ' + type + ' for ' + medication.drugName,
            );
            this.removeObj4Date(dateString, medication);
          } else if (type === 'forAll') {
            this.removeForAllDates(medication);
          }
        }
      }
    }
  }

  //get the selected dates for a particular medication from ask plan
  //loop through the current selectDatesForAll to see if medicine exist for day
  //if not, add the medication*
  onReturn = (data) => {
    //since calendar's markedDates property is an object , enforce new object creation**
    this.setState({
      selectedDates4All: JSON.parse(
        JSON.stringify(addMedicine(data, this.state.selectedDates4All)),
      ),
    });
    this.checkCalendar();
  };

  //check if in medicationList array medicine name exist*
  containsObject = (obj, list) => {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].drugName === obj.drugName) {
        return true;
      }
    }
    return false;
  };

  handleSkip = () => {
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({loading: false});
      this.props.navigation.navigate('DashBoard');
    }, 1500);
  };

  handleNext = () => {
    let data = prepareData(this.state.selectedDates4All);
    postPlan(data).then((response) => {
      if (response != null) {
        this.handleSkip();
      }
    });
  };

  handleAddMedication = () => {
    this.props.navigation.navigate('AddPlan');
  };

  //check if selected dates object is empty
  isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  //remove medication obj just for this date
  removeObj4Date = (dateString, selectedItem) => {
    this.setState({
      selectedDates4All: JSON.parse(
        JSON.stringify(
          removeMed4Date(
            dateString,
            selectedItem,
            this.state.selectedDates4All,
          ),
        ),
      ),
    });
    this.checkCalendar();
  };

  removeForAllDates = (selectedItem) => {
    console.log('removing ' + selectedItem.drugName + ' for all dates');

    this.setState({
      selectedDates4All: JSON.parse(
        JSON.stringify(
          removeMed4All(selectedItem, this.state.selectedDates4All),
        ),
      ),
    });
    this.checkCalendar();
  };

  checkCalendar = () => {
    let original = this.state.selectedDates4All;
    for (var x of Object.keys(original)) {
      let medList = original[x].medicationList;
      if (medList != undefined && medList.length > 0) {
        this.setState({showCalendar: true});
        return;
      }
    }
    this.setState({showCalendar: false});
    return;
  };

  render() {
    const {selectedDates4All, showCalendar, loading} = this.state;
    return (
      <View style={styles.onboardingContainer}>
        <Text style={[globalStyles.pageHeader, styles.stepText]}>Step 3</Text>
        <Text style={globalStyles.pageDetails}>Add your Medicine Plan</Text>
        <Text style={[globalStyles.pageSubDetails, styles.stepContent]}>
          Would you like to add your scheduled medications for this month? We
          will help to track them.
        </Text>
        {this.isEmpty(selectedDates4All) === true ? (
          <>
            <TouchableOpacity
              style={styles.addButton}
              onPress={this.handleAddMedication}>
              <Ionicons
                name="add-circle"
                size={80}
                color={Colors.nextBtnColor}
              />
            </TouchableOpacity>
            <View style={{flex: 1}} />
            <View style={globalStyles.buttonContainer}>
              <TouchableOpacity
                style={globalStyles.skipButtonStyle}
                onPress={this.handleSkip}>
                <Text style={globalStyles.actionButtonText}>Skip</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : showCalendar === true ? (
          <>
            <Calendar
              dayComponent={CalendarMedicationDay}
              current={new Date()}
              hideArrows={true}
              disableMonthChange={true}
              markedDates={selectedDates4All}
              markingType={'custom'}
              selectAll={false}
              theme={{
                calendarBackground: Colors.backgroundColor,
                'stylesheet.calendar.header': {
                  header: {
                    flexDirection: 'row',
                    marginTop: 6,
                    alignItems: 'center',
                    marginStart: '2%',
                  },
                  headerContainer: {
                    width: '80%',
                    flexDirection: 'row',
                  },
                  monthText: {
                    fontSize: 25,
                    fontFamily: 'SFProDisplay-Bold',
                    textAlign: 'center',
                  },
                },
                arrowColor: Colors.lastLogValueColor,
              }}
            />
            <View style={{flex: 1, paddingBottom: '3%'}} />
            <View style={globalStyles.buttonContainer}>
              <TouchableOpacity
                style={[globalStyles.nextButtonStyle]}
                onPress={this.handleNext}>
                <Text style={globalStyles.actionButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.addButton}
              onPress={this.handleAddMedication}>
              <Ionicons
                name="add-circle"
                size={80}
                color={Colors.nextBtnColor}
              />
            </TouchableOpacity>
            <View style={{flex: 1}} />
            <View style={globalStyles.buttonContainer}>
              <TouchableOpacity
                style={globalStyles.skipButtonStyle}
                onPress={this.handleSkip}>
                <Text style={globalStyles.actionButtonText}>Skip</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
