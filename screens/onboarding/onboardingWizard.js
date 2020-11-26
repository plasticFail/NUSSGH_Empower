import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import {Colors} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';
//component
import BtnContainer from '../../components/onboarding/buttonContainer';

class OnboardingWizard extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      currentStep: 1,

      //step 1 inputs
      qn1: {},
      qn2: {},
      qn3: {},
      ans1: '',
      ans2: '',
      ans3: '',
      show3: false,
    };
  }

  renderStepSubDetail = (stepNum) => {
    switch (stepNum) {
      case 1:
        return 'Set up Security Questions';
    }
  };

  renderStepInstruction = (stepNum) => {
    switch (stepNum) {
      case 1:
        return 'These security questions will be used to verify your identity and help recover your password if you ever forget it.';
    }
  };

  onSkip = () => {
    if (this.state.currentStep === 1) {
      return false;
    } else {
      this.setState({currentStep: currentStep + 1});
      return true;
    }
  };

  render() {
    const {currentStep} = this.state;
    return (
      <View style={styles.onboardingContainer}>
        <Text style={[globalStyles.pageHeader, styles.stepText]}>
          Step {currentStep}
        </Text>
        <Text style={globalStyles.pageDetails}>
          {this.renderStepSubDetail(currentStep)}
        </Text>
        <Text style={[globalStyles.pageSubDetails, styles.stepContent]}>
          {this.renderStepInstruction(currentStep)}
        </Text>
        <View style={{flex: 1}}></View>
        <BtnContainer onNext={this.onPressNext} stepNo={currentStep} />
      </View>
    );
  }
}

export default OnboardingWizard;

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
});
