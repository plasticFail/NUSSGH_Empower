import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import globalStyles from '../../styles/globalStyles';

const BtnContainer = (props) => {
  const {onSkip, onNext, onBack, stepNo} = props;

  return (
    <View style={globalStyles.buttonContainer}>
      <TouchableOpacity style={globalStyles.nextButtonStyle}>
        <Text style={globalStyles.actionButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BtnContainer;
