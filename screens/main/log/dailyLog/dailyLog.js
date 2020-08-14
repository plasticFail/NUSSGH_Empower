import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Modal} from 'react-native';
//other screens
import BloodGlucoseLogBlock from '../../../../components/logs/bloodGlucoseLogBlock';
import FormBlock from '../../../../components/logs/formBlock';
import BloodGlucoseLogDisplay from '../../../../components/logs/bloodGlucoseLogDisplay';
import {getLastBgLog} from '../../../../storage/asyncStorageFunctions';

class DailyLog extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      currentStep: 1,
      showNewInput: false,

      dateBloodGlucose: new Date(),
      bloodGlucose: '',
      lastBloodGlucose: null,
    };
  }

  componentDidMount() {
    getLastBgLog().then((data) => {
      console.log(data);
      console.log(data.time);
      console.log(data.value);
      this.setState({lastBloodGlucose : data});
    });
  }

  componentDidUpdate() {
    console.log(this.state.dateBloodGlucose);
    console.log(this.state.bloodGlucose);
  }

  displayStepText = () => {
    switch (this.state.currentStep){
      case 1:
        return 'Step 1: Blood Glucose Log';
      case 2:
        return 'Step 2: Food Intake';
      case 3:
        return 'Step 3: Medication Log';
      case 4:
        return 'Step 4: Weight Log';
      case 5:
        return 'Step 5 Summary';
    }
    return '';
  }

  stepImage = () => {
    switch (this.state.currentStep){
      case 1:
        return require('../../../../resources/images/progress1.png');
      case 2:
        return require('../../../../resources/images/progress2.png');
      case 3:
        return require('../../../../resources/images/progress3.png');
      case 4:
        return require('../../../../resources/images/progress4.png');
      case 5:
        return require('../../../../resources/images/progress5.png');
    }
    return '';
  }

  formText = () => {
    switch (this.state.currentStep){
      case 1:
        return 'You already logged blood glucose today, Want to add a new record?';
      case 2:
        return 'You already logged food intake today, Want to add a new record?';
      case 3:
        return 'You already logged medication today, Want to add a new record?';
      case 4:
        return 'You already logged weight today, Want to add a new record?';
    }
    return '';
  }

  showFormText = () => {
    switch (this.state.currentStep){
      case 1:
        if(this.state.lastBloodGlucose !== null){
          return true;
        }
        break;
      case 2:
        return true;
        break;
      case 3:
        return true;
        break;
      case 4:
        return true;
        break;
      case 5:
        return false;
        break;
    }
    return false;
  }

  showLastLog = step => {
    if(step === this.state.currentStep){
      switch (step){
        case 1:
          if(this.state.lastBloodGlucose !== null && !this.state.showNewInput){
            return true;
          }
          break;
      }
    }
    return false;
  }

  showNewLogInput = step => {
    if(step === this.state.currentStep){
      switch (step){
        case 1:
          if(this.state.lastBloodGlucose === null || this.state.showNewInput){
            return true;
          }
          break;
      }
    }
    return false;
  }

  render() {
    return (
        <View style={styles.screen}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{this.displayStepText()}</Text>
          </View>
          <Image
              style={styles.progress}
              resizeMode="contain"
              source={this.stepImage()}
          />

          {this.showFormText() && (<View
              style={[
                styles.container,
                styles.shadow,
                {marginBottom: '4%', paddingEnd: '1%'},
              ]}>
            <FormBlock
                question={this.formText()}
                getFormSelection={boolValue => {
                  this.setState({showNewInput: boolValue})
                }}
                selectNo={true}
                color={'#aad326'}
            />
          </View>)}

          {this.showLastLog(1) && (<BloodGlucoseLogDisplay data={this.state.lastBloodGlucose}/>)}

          {this.showNewLogInput(1) && (
            <BloodGlucoseLogBlock
              date={this.state.dateBloodGlucose}
              setDate={date => {this.setState({dateBloodGlucose : date})}}
              bloodGlucose={this.state.bloodGlucose}
              setBloodGlucose={value => {this.setState({bloodGlucose : value})}}
            />
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // pass states to other screens to maintain persistent storage.
              this.setState({currentStep : this.state.currentStep+1});
              this.setState({showNewInput : false});
            }}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  textContainer: {
    width: '100%',
  },
  text: {
    fontSize: 18,
  },
  progress: {
    width: '100%',
    height: 100,
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    paddingBottom: '5%',
    borderRadius: 20,
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
  button: {
    marginTop: '9%',
    backgroundColor: '#AAD326',
    borderRadius: 20,
    marginVertical: 10,
    paddingHorizontal: 40,
    paddingVertical: 6,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 23,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default DailyLog;
