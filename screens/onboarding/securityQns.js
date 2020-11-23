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
//styles
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';
//component
import SecurityQnDropdown from '../../components/account/SecurityQnDropdown';
//function
import {getQuestions, setSecurityQn} from '../../netcalls/requestsSecurityQn';
import {isEmpty} from '../../commonFunctions/common';

const SecurityQns = (props) => {
  const [originalQnsList, setOriginalQnList] = useState([]);
  const [list, setList] = useState([]);

  const [expand1, setExpand1] = useState(false);
  const [security1Qn, setSecurity1Qn] = useState({});
  const [security1Ans, setSecurity1Ans] = useState('');

  const [expand2, setExpand2] = useState(false);
  const [security2Qn, setSecurity2Qn] = useState({});
  const [security2Ans, setSecurity2Ans] = useState('');

  const [expand3, setExpand3] = useState(false);
  const [security3Qn, setSecurity3Qn] = useState({});
  const [security3Ans, setSecurity3Ans] = useState('');

  useEffect(() => {
    async function getList() {
      let list = await getQuestions();
      setOriginalQnList(list);
      setList(list);
    }
    getList();
  }, []);

  useEffect(() => {
    manageDropDownOpen();
  }, [expand1, expand2, expand3]);

  const filterQns = (selectedQn, num) => {
    if (num === 1) {
      setSecurity1Qn(selectedQn);
    }
    if (num === 2) {
      setSecurity2Qn(selectedQn);
    }
    if (num === 3) {
      setSecurity3Qn(selectedQn);
    }
  };

  const manageDropDownOpen = () => {
    if (expand1) {
      setExpand2(false);
      setExpand3(false);
    }
    if (expand2) {
      setExpand1(false);
      setExpand3(false);
    }
    if (expand3) {
      setExpand1(false);
      setExpand2(false);
    }
  };

  const enableNextButton = () => {
    if (
      !isEmpty(security1Qn) &&
      !isEmpty(security2Qn) &&
      !isEmpty(security3Qn) &&
      security1Ans &&
      security2Ans &&
      security3Ans
    ) {
      return true;
    } else {
      return false;
    }
  };

  const submit = () => {
    if (enableNextButton()) {
      let obj = [
        {
          question_id: security1Qn._id,
          answer: security1Ans,
        },
        {
          question_id: security2Qn._id,
          answer: security2Ans,
        },
        {
          question_id: security3Qn._id,
          answer: security3Ans,
        },
      ];
      console.log('submitting ');
      console.log(obj);

      setSecurityQn(obj).then((rsp) => {
        if (rsp === 200) {
          Alert.alert('Security Questions Set Successfully!', '', [
            {text: 'Got It', onPress: () => props.navigation.goBack()},
          ]);
        } else {
          Alert.alert('Unexpected Error!', 'Please try again later', [
            {text: 'Got It'},
          ]);
        }
      });
    }
  };
  return (
    <View style={styles.onboardingContainer}>
      <Text style={[globalStyles.pageHeader, styles.stepText]}>Step 1</Text>
      <Text style={globalStyles.pageDetails}>Set up Security Questions</Text>
      <Text style={[globalStyles.pageSubDetails, styles.stepContent]}>
        These security questions will be used to verify your identity and help
        recover your password if you ever forget it.
      </Text>

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View style={{flex: 1}}>
          <ScrollView
            style={{
              flexGrow: 1,
              position: 'relative',
            }}>
            <SecurityQnDropdown
              num={1}
              selectedQn={security1Qn}
              onSelectQn={filterQns}
              list={list}
              expand={expand1}
              open={() => setExpand1(true)}
              close={() => setExpand1(false)}
              otherQn1={security2Qn}
              otherQn2={security3Qn}
            />
            <TextInput
              style={styles.answerInput}
              placeholder={'Answer'}
              placeholderTextColor={'#90949c'}
              value={security1Ans}
              onChangeText={setSecurity1Ans}
            />
            <SecurityQnDropdown
              num={2}
              selectedQn={security2Qn}
              onSelectQn={filterQns}
              list={list}
              expand={expand2}
              open={() => setExpand2(true)}
              close={() => setExpand2(false)}
              otherQn1={security1Qn}
              otherQn2={security3Qn}
            />
            <TextInput
              style={styles.answerInput}
              placeholder={'Answer'}
              placeholderTextColor={'#90949c'}
              value={security2Ans}
              onChangeText={setSecurity2Ans}
            />
            <SecurityQnDropdown
              num={3}
              selectedQn={security3Qn}
              onSelectQn={filterQns}
              list={list}
              expand={expand3}
              open={() => setExpand3(true)}
              close={() => setExpand3(false)}
              otherQn1={security1Qn}
              otherQn2={security2Qn}
            />
            <TextInput
              style={styles.answerInput}
              placeholder={'Answer'}
              placeholderTextColor={'#90949c'}
              value={security3Ans}
              onChangeText={setSecurity3Ans}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      <View style={globalStyles.buttonContainer}>
        <TouchableOpacity
          onPress={() => submit()}
          style={
            enableNextButton()
              ? globalStyles.nextButtonStyle
              : globalStyles.skipButtonStyle
          }>
          <Text style={globalStyles.actionButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SecurityQns;

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
  answerInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e1e7ed',
    margin: '2%',
    backgroundColor: 'white',
    paddingVertical: '2%',
    paddingStart: '3%',
    zIndex: 1,
  },
});
