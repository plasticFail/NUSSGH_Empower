import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';

//icons for the options
import BIN from '../resources/images/Patient-Icons/SVG/icon-red-remove.svg';
import {bin, text} from '../commonFunctions/common';

const iconStyle = {
  height: 35,
  width: 35,
  marginEnd: '5%',
  marginStart: '5%',
};

//tweaked from select.js
export default class OptionsList extends Component {
  state = {
    slideAnimation: new Animated.Value(0),
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const {visible, options, onCancel, callback} = this.props;

    return (
      <Modal isVisible={visible} onBackdropPress={() => onCancel()}>
        <View style={modalStyles.root}>
          {options.map((option) => (
            <TouchableOpacity
              style={modalStyles.option}
              key={option.name}
              onPress={() => callback()}>
              {option.icon === bin && <BIN {...iconStyle} />}
              {option.textColor === text ? (
                <Text style={modalStyles.optionTextRed}>{option.name}</Text>
              ) : (
                <Text style={modalStyles.optionText}>{option.name}</Text>
              )}
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={modalStyles.optionCancel}
            key="cancel"
            onPress={() => onCancel()}>
            <Text style={modalStyles.cancelOptionText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const modalStyles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  option: {
    height: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    borderColor: '#cdcdcd',
    backgroundColor: 'rgba(248,248,248, 0.79)',
    width: '100%',
    borderRadius: 20,
    marginBottom: '3%',
    flexDirection: 'row',
  },
  optionText: {
    fontSize: 20,
    color: '#007aff',
  },
  optionTextRed: {
    fontSize: 20,
    color: '#FF0844',
  },
  cancelOptionText: {
    fontSize: 20,
    color: '#007AFF',
    fontFamily: 'SFProDisplay-Bold',
  },
  optionCancel: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    borderColor: '#cdcdcd',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    marginBottom: '3%',
    flexDirection: 'row',
  },
});
