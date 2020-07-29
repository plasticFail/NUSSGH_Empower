import React from 'react';
import {View, StyleSheet, Text, Platform, ActionSheetIOS, TouchableOpacity} from 'react-native';

// Determine what ui to render for select. Different os render different select types.
export default class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: "",
            open: false
        }
    }

    componentDidMount() {
        const {options, onSelect, defaultValue} = this.props;
        const optionName = options.filter(option => option.value === defaultValue)[0].name;
        this.setState({
            result: optionName
        })
    }

    handleCloseAfterSelect = (option) => {
        this.setState({
            open: false,
            result: option.name
        }, () => this.props.onSelect(option.value))
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
        const {options, onSelect, defaultValue, containerStyle, textStyle} = this.props;
        const {open, result} = this.state;
        if (Platform.OS === 'ios') {
            const openSelect = () => ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ["Cancel"].concat(options.map(option => option.name)),
                    cancelButtonIndex: 0
                },
                buttonIndex => {
                    if (buttonIndex == 0) {
                        this.handleClose();
                    } else {
                        this.handleCloseAfterSelect(options[buttonIndex - 1]);
                    }
                })
            open ? openSelect() : undefined;

            return (
                <TouchableOpacity style={{...iosStyles.container, ...containerStyle}} onPress={this.handleOpen}>
                    <Text style={{...iosStyles.textStyle, ...textStyle}}>{result}</Text>
                </TouchableOpacity>
            )
        } else {
            return null;
        }
    }
}

const iosStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        backgroundColor: '#eff3bd',
        borderRadius: 10
    },
    textStyle: {
        fontSize: 24,
        paddingLeft: 10
    },
})