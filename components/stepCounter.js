import React, {useState, Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
//third party lib
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput} from 'react-native-gesture-handler';
import {decimal, wholeNumber} from '../commonFunctions/common';

//this stepper is only for whole numbers**
//Props:
//paramter: eg. 1 unit - parameter is unit
//count, setCount from parent
//textStyle: style the text of the count
//enableInput: boolean
//valueType: decimal-pad/ number-pad (whole num)
//style: adjust entire stepper component*
//maxLength : maximum digit for input
//incrementValue:

export default class StepCounter extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      count: this.props.count === undefined ? 0 : this.props.count,
      enableInput:
        this.props.enableInput === undefined ? false : this.props.enableInput,
      valueType: this.props.valueType === decimal ? decimal : wholeNumber,
      incrementValue:
        this.props.incrementValue === undefined ? 1 : this.props.incrementValue,
    };
    this.timer = null;
    this.handleAdd = this.handleAdd.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    this.setState({
      count: this.props.count === undefined ? 0 : this.props.count,
    });
    this.stopTimer();
  }

  componentDidUpdate(prevProp) {
    if (prevProp.count != this.props.count) {
      this.setState({
        count: this.props.count === undefined ? 0 : this.props.count,
      });
    }
  }

  componentWillUnmount() {
    console.log('Unmounting timer for step counter');
    this.stopTimer();
    this.timer = null;
  }

  handleClickAdd = () => {
    this.stopTimer();
    let newCount = this.state.count + this.state.incrementValue;
    this.setState({count: newCount});
  };

  handleClickMinus = () => {
    this.stopTimer();
    if (this.state.count > 0) {
      let newCount = this.state.count - this.state.incrementValue;
      this.setState({count: newCount});
    } else {
      this.setState({count: 0});
    }
  };

  handleAdd = () => {
    let newCount = this.state.count + this.state.incrementValue;
    this.setState({count: newCount});
    this.timer = setTimeout(this.handleAdd, 200);
    this.props.setCount(newCount);
  };

  handleMinus = () => {
    clearTimeout();
    if (this.state.count > 0) {
      let newCount = this.state.count - this.state.incrementValue;
      this.setState({count: newCount});
      this.timer = setTimeout(this.handleMinus, 200);
      this.props.setCount(newCount);
    } else {
      this.setState({count: 0});
    }
  };

  stopTimer() {
    clearTimeout(this.timer);
  }

  render() {
    const {parameter, textStyle, maxLength} = this.props;
    const {count, enableInput, valueType} = this.state;
    return (
      <View style={{...styles.container, ...this.props.style}}>
        <TouchableOpacity
          onPress={this.handleClickMinus}
          onPressIn={this.handleMinus}
          onPressOut={this.stopTimer}>
          <Ionicons name="remove-circle" size={40} color={'#aad326'} />
        </TouchableOpacity>
        {enableInput === false ? (
          <Text style={[styles.countContent, textStyle]}>
            {count} {parameter}
          </Text>
        ) : (
          <>
            <TextInput
              value={String(count)}
              keyboardType={valueType}
              maxLength={maxLength}
              style={[styles.textInput, styles.shadow]}
              onChangeText={(value) => {
                if (valueType === wholeNumber) {
                  var cleanNumber = value.replace(/[^0-9]/g, '');
                  this.setState({count: Number(cleanNumber)});
                  this.props.setCount(Number(cleanNumber));
                } else if (valueType === decimal) {
                  this.setState({count: Number(value)});
                  this.props.setCount(value);
                }
              }}
              returnKeyType="done"
            />
          </>
        )}
        <TouchableOpacity
          onPress={this.handleClickAdd}
          onPressIn={this.handleAdd}
          onPressOut={this.stopTimer}>
          <Ionicons name="add-circle" size={40} color={'#aad326'} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    marginEnd: '3%',
  },
  countContent: {
    marginVertical: '8%',
    marginHorizontal: '5%',
    fontSize: 17,
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'center',
    width: '60%',
    height: '100%',
    marginBottom: '3%',
    flexDirection: 'row',
    fontSize: 19,
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
