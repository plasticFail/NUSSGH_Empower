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
      bloodGlucose: null,
    };
  }

  componentDidMount() {
    getLastBgLog().then((data) => {
      console.log(data);
      console.log(data.time);
      console.log(data.value);
      this.setState({bloodGlucose : data});
    });
  }

  componentDidUpdate() {
    console.log(this.state.bloodGlucose.value);
  }

  displayStepText = step => {
    switch (step){
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

  stepImage = step => {
    switch (step){
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

  newInputText = step => {
    switch (step){
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

  render() {
    return (
        <View style={styles.screen}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{this.displayStepText(this.state.currentStep)}</Text>
          </View>
          <Image
              style={styles.progress}
              resizeMode="contain"
              source={this.stepImage(this.state.currentStep)}
          />

          {this.state.showNewInput ? (<View
              style={[
                styles.container,
                styles.shadow,
                {marginBottom: '4%', paddingEnd: '1%'},
              ]}>
            <FormBlock
                question={this.newInputText(this.state.currentStep)}
                getFormSelection={boolValue => {
                  this.setState({showNewInput: boolValue})
                }}
                selectNo={true}
                color={'#aad326'}
            />
          </View>) : null}

          {this.state.bloodGlucose !== null ? (<BloodGlucoseLogDisplay data={this.state.bloodGlucose}/>) : null}


          {/*{show && (*/}
          {/*  <BloodGlucoseLogBlock*/}
          {/*    date={date}*/}
          {/*    setDate={setDate}*/}
          {/*    bloodGlucose={bloodGlucose}*/}
          {/*    setBloodGlucose={setBloodGlucose}*/}
          {/*  />*/}
          {/*)}*/}

          {/*<TouchableOpacity*/}
          {/*  style={{marginTop: '4%'}}*/}
          {/*  onPress={() => {*/}
          {/*    // pass states to other screens to maintain persistent storage.*/}
          {/*    const states = props.route.params;*/}
          {/*    props.navigation.navigate('DailyLog2', states);*/}
          {/*  }}>*/}
          {/*  <Text>Next</Text>*/}
          {/*</TouchableOpacity>*/}
        </View>
    );
  }
};

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
});

export default DailyLog;
