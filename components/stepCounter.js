import React, {useState, Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
//third party lib
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

//Props:
//paramter: eg. 1 unit - parameter is unit
//count, setCount from parent
//textStyle: style the text of the count
Ionicons.loadFont();

export default class StepCounter extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      count: 0,
    };
    this.timer = null;
    this.handleAdd = this.handleAdd.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  handleAdd = () => {
    let newCount = this.state.count + 1;
    this.setState({count: newCount});
    this.timer = setTimeout(this.handleAdd, 200);
    this.props.setCount(newCount);
  };

  handleMinus = () => {
    clearTimeout();
    if (this.state.count > 0) {
      let newCount = this.state.count - 1;
      this.setState({count: newCount});
      this.timer = setTimeout(this.handleMinus, 200);
      this.props.setCount(newCount);
    } else {
      this.setState({count: 0});
    }
  };

  stopTimer() {
    console.log('calling');
    clearTimeout(this.timer);
  }

  render() {
    const {parameter, textStyle} = this.props;
    const {count} = this.state;
    return (
      <View style={{...styles.container, ...this.props.style}}>
        <TouchableOpacity
          onPressIn={this.handleMinus}
          onPressOut={this.stopTimer}>
          <Ionicons name="remove-circle" size={40} color={'#aad326'} />
        </TouchableOpacity>
        <Text style={[styles.countContent, textStyle]}>
          {count} {parameter}
        </Text>
        <TouchableOpacity
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
    marginVertical: '4%',
    marginHorizontal: '5%',
    fontSize: 20,
    textAlign: 'center',
  },
});
