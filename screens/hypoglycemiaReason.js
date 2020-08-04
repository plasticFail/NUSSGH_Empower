import React, {useState} from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import RadioButton from '../components/radioButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
export default class HypoglycemiaReason extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eatLess: true,
      doExercise: true,
      haveAlchol: true,
    };
    this.setEatLess = this.setEatLess.bind(this);
    this.setExercise = this.setExercise.bind(this);
    this.setAlcohol = this.setAlcohol.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBackButtonPressAndroid = this.handleBackButtonPressAndroid.bind(
      this,
    );
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonPressAndroid,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonPressAndroid,
    );
  }

  handleBackButtonPressAndroid() {
    if (!this.props.navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      return false;
    }
    this.props.navigation.navigate('DashBoard');
  }

  setEatLess(selectedItem) {
    console.log('Eat');
    if (selectedItem == true) {
      this.setState({eatLess: true});
    } else {
      this.setState({eatLess: false});
    }
  }

  setExercise(selectedItem) {
    console.log('Excercise');
    if (selectedItem == true) {
      this.setState({doExercise: true});
    } else {
      this.setState({doExercise: false});
    }
  }

  setAlcohol(selectedItem) {
    console.log('Alcohol');
    if (selectedItem == true) {
      this.setState({haveAlchol: true});
    } else {
      this.setState({haveAlchol: false});
    }
  }

  handleSubmit() {
    this.props.navigation.navigate('DashBoard');
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
        <Text style={styles.header}>
          We are very concerned about your submitted blood glucose reading which
          is lower than your target minimum blood glucose
        </Text>

        <View style={[styles.formContainer, {flex: 2}]}>
          <RenderForm
            setEatLess={this.setEatLess}
            setExercise={this.setExercise}
            setAlcohol={this.setAlcohol}
          />
          <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <Text style={{margin: '1%'}}>
              *Click 'Submit' to view list of fast acting carbohydrate list that
              you should consume immediately!
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

function RenderForm({setEatLess, setExercise, setAlcohol}) {
  return (
    <View>
      <Text style={styles.formTitle}>Finding out why: </Text>
      <FormQuestion type={'eat'} setRespective={setEatLess} />
      <FormQuestion type={'exercise'} setRespective={setExercise} />
      <FormQuestion type={'alcohol'} setRespective={setAlcohol} />
    </View>
  );
}

function FormQuestion({type, setRespective}) {
  const [selectYes, setSelectedYes] = useState(false);
  const [selectNo, setSelectedNo] = useState(false);

  const handleButtonPress = (selectItem) => {
    if (selectItem == 'yes') {
      setSelectedYes(true);
      setSelectedNo(false);
      setRespective(true);
    }
    if (selectItem == 'no') {
      setSelectedYes(false);
      setSelectedNo(true);
      setRespective(false);
    }
  };
  if (type == 'eat') {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionHeader}>
          Did you eat lesser than usual today?
        </Text>
        <View style={styles.buttonGroupStyle}>
          <TouchableOpacity onPress={() => handleButtonPress('yes')}>
            <RadioButton
              btnText={'Yes'}
              color={'#e958c8'}
              selected={selectYes}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginStart: '40%'}}
            onPress={() => handleButtonPress('no')}>
            <RadioButton btnText={'No'} color={'#e958c8'} selected={selectNo} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (type == 'exercise') {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionHeader}>Did you exercise today?</Text>
        <View style={styles.buttonGroupStyle}>
          <TouchableOpacity onPress={() => handleButtonPress('yes')}>
            <RadioButton
              btnText={'Yes'}
              color={'#e958c8'}
              selected={selectYes}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginStart: '40%'}}
            onPress={() => handleButtonPress('no')}>
            <RadioButton btnText={'No'} color={'#e958c8'} selected={selectNo} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  if (type == 'alcohol') {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionHeader}>
          Did you have any alcholic beverages today?
        </Text>
        <View style={styles.buttonGroupStyle}>
          <TouchableOpacity onPress={() => handleButtonPress('yes')}>
            <RadioButton
              btnText={'Yes'}
              color={'#e958c8'}
              selected={selectYes}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginStart: '40%'}}
            onPress={() => handleButtonPress('no')}>
            <RadioButton btnText={'No'} color={'#e958c8'} selected={selectNo} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5f7b70',
    alignSelf: 'center',
    marginTop: '5%',
    marginStart: '2%',
    marginEnd: '2%',
    marginBottom: '7%',
  },
  formContainer: {},
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
  formTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: 'black',
    marginStart: '5%',
  },
  questionHeader: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
    marginTop: '5%',
    marginStart: '2%',
  },
  questionContainer: {marginStart: '2%'},
  buttonGroupStyle: {flexDirection: 'row', marginTop: ' 5%', marginStart: '5%'},
  button: {
    marginTop: '9%',
    backgroundColor: '#eb90d6',
    width: 300,
    height: 40,
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 6,
  },
  buttonText: {
    fontSize: 23,
    fontWeight: '500',
    textAlign: 'center',
  },
});
