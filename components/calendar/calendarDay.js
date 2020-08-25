import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

class CalendarDayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onDayPress = this.onDayPress.bind(this);
  }

  getContentStyle() {
    const {state, marking = {}} = this.props;
    const style = {
      content: {},
      text: {
        color: '#181c26',
      },
    };

    if (state === 'disabled') {
      style.text.color = '#c1c2c1';
    } else if (marking.marked === true) {
      style.text.color = 'black';
      style.content.backgroundColor = '#aad326';
      style.content.borderRadius = 10;
    } else {
      style.content.backgroundColor = '#e2e2e2';
      style.content.borderRadius = 10;
    }
    return style;
  }

  //open modal with medication
  onDayPress() {
    this.props.onPress(this.props.date);
  }

  render() {
    const contentStyle = this.getContentStyle();
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.content, contentStyle.content]}
          onPress={this.onDayPress}>
          <Text style={[styles.contentText, contentStyle.text]}>
            {String(this.props.date.day)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30%',
  },
  weekName: {
    width: 32,
    textAlign: 'center',
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#7c7c7c',
  },
  content: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
  },
});

export default CalendarDayComponent;
