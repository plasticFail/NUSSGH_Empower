import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

Icon.loadFont()

export default class IntegerQuantitySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: null
        }
    }

    componentDidMount() {
        const {defaultValue} = this.props;
        this.setState({
            currentValue: defaultValue
        })
    }

    increase = (amount) => {
        const newAmount = this.state.currentValue + amount;
        if (newAmount > this.props.maxValue) {
            // Do nothing, throw error
            alert(`${this.props.maxValue} is the maximum you can add!`);
        } else {
            this.setState({
                currentValue: newAmount
            }, () => this.props.onChange(newAmount));
        }
    }

    decrease = (amount) => {
        const newAmount = this.state.currentValue - amount;
        if (newAmount < this.props.minValue) {
            // Do nothing, throw error
            alert(`${this.props.minValue} is the minimum you can minus!`);
        } else {
            this.setState({
                currentValue: newAmount
            }, () => this.props.onChange(newAmount));
        }
    }

    render() {
        const { onChange, minValue, maxValue, changeAmount, buttonColor } = this.props;
        const { currentValue } = this.state;
        return (
            <View style={styles.container}>
                <Icon name="arrow-circle-left" color={buttonColor}
                      size={25} onPress={() => this.decrease(changeAmount)}/>
                <Text>{currentValue}</Text>
                <Icon name="arrow-circle-right" color={buttonColor}
                      size={25} onPress={() => this.increase(changeAmount)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 35,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    }
});