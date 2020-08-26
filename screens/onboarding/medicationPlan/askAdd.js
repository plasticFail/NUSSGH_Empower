import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//third party library
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Calendar} from 'react-native-calendars';
//component
import CalendarMedicationDay from '../../../components/onboarding/medication/calendarMedicationDay';

Ionicons.loadFont();

class AskAdd extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      selectedDates4All: {},
    };
  }

  componentDidUpdate(prevProp) {
    if (prevProp.route.params != this.props.route.params) {
      console.log('setting state');
      const {list} = this.props.route.params;
      this.onReturn(list);
      console.log('---state');
      console.log(this.state.selectedDates4All);
    }
  }

  //get the selected dates for a particular medication
  //loop through the current selectDatesForAll to see if medicine exist for day
  //if not, add the medication*
  onReturn = (data) => {
    let object = this.state.selectedDates4All;
    for (var x of Object.keys(data)) {
      if (!Object.keys(object).includes(x)) {
        console.log('no medicine for this date, adding medicine');
        object[x] = {
          selected: true,
          marked: true,
          medicationList: [data[x].medicine],
        };
      } else {
        //there is an existing date with medication
        //check if medication exist in medicationlist for that date, if not add
        if (!this.containsObject(data[x].medicine, object[x].medicationList)) {
          object[x].medicationList.push(data[x].medicine);
        }
      }
    }
    //since calendar's markedDates property is an object , enforce new object creation**
    this.setState({selectedDates4All: JSON.parse(JSON.stringify(object))});
  };

  //check if medicine name same*
  containsObject = (obj, list) => {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].drugName === obj.drugName) {
        return true;
      }
    }
    return false;
  };

  handleSkip = () => {};

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

  isEquivalent = (a, b) => {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
      return false;
    }

    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];

      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  };

  removeObj = () => {
    console.log('i wana remove');
  };

  render() {
    const {selectedDates4All} = this.state;
    return (
      <View style={styles.onboardingContainer}>
        <Text style={styles.stepText}>Step 3</Text>
        <Text style={styles.stepContent}>Add your Medicine Plan</Text>
        <Text style={styles.stepDescription}>
          Would you like to add your scheduled medications for this month? We
          will help to track them.
        </Text>
        {this.isEmpty(selectedDates4All) === true ? (
          <>
            <TouchableOpacity
              style={styles.addButton}
              onPress={this.handleAddMedication}>
              <Ionicons name="add-circle" size={80} color="#aad326" />
            </TouchableOpacity>
            <View style={{flex: 1}} />
            <TouchableOpacity
              style={styles.skipButton}
              onPress={this.handleSkip}>
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
          </>
        ) : (
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
                textDayHeaderFontSize: 15,
              }}
            />
            <View style={{flex: 1}} />
            <TouchableOpacity
              style={[styles.skipButton, {backgroundColor: '#aad326'}]}
              onPress={() => this.props.navigation.navigate('DashBoard')}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }
}

export default AskAdd;

const styles = StyleSheet.create({
  onboardingContainer: {
    paddingTop: '2%',
    backgroundColor: 'white',
    flex: 1,
  },
  stepText: {
    marginTop: '10%',
    fontSize: 35,
    fontWeight: '700',
    marginStart: '3%',
    marginEnd: '3%',
  },
  stepContent: {
    fontWeight: '700',
    fontSize: 20,
    marginTop: '3%',
    marginStart: '3%',
    marginEnd: '3%',
  },
  stepDescription: {
    fontSize: 17,
    width: '90%',
    marginTop: '3%',
    marginStart: '3%',
    marginEnd: '3%',
  },
  addButton: {
    alignSelf: 'center',
    marginTop: '15%',
  },
  skipButton: {
    backgroundColor: '#e4e4e4',
    height: 45,
    width: '70%',
    borderRadius: 20,
    margin: '5%',
    alignSelf: 'center',
    marginBottom: '3%',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: '3%',
    fontWeight: '700',
  },
});
