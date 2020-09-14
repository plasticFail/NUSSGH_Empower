import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

Icon.loadFont()

export default class IntegerQuantitySelector extends React.Component {
    constructor(props) {
        super(props);
    }

    increase = (amount) => {
        const newAmount = this.props.value + amount;
        if (newAmount > this.props.maxValue) {
            // Do nothing, throw error
            alert(`${this.props.maxValue} is the maximum you can add!`);
        } else {
            this.props.onChange(newAmount)
        }
    }

    decrease = (amount) => {
        const newAmount = this.props.value - amount;
        if (newAmount < this.props.minValue) {
            // Do nothing, throw error
            alert(`${this.props.minValue} is the minimum you can minus!`);
        } else {
            this.props.onChange(newAmount)
        }
    }

    render() {
        const { onChange, minValue, maxValue, changeAmount, buttonColor, value} = this.props;
        return (
            <View style={styles.container}>
                <Icon name="arrow-circle-left" color={buttonColor}
                      size={25} onPress={() => this.decrease(changeAmount)}/>
                <Text style={styles.text}>{value}</Text>
                <Icon name="arrow-circle-right" color={buttonColor}
                      size={25} onPress={() => this.increase(changeAmount)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 35,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        paddingLeft: 12,
        paddingRight: 12
    }
});