import React from 'react';
import {View, StyleSheet, Text, Platform, ActionSheetIOS, TouchableOpacity} from 'react-native';
// Others
import Icon from 'react-native-vector-icons/dist/FontAwesome';

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
        const {options, onSelect, defaultValue, containerStyle, textStyle, rightIcon} = this.props;
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
                    <Icon color="#000" name={rightIcon} size={20} />
                </TouchableOpacity>
            )
        } else { // return component for android. To be done.
            return null;
        }
    }
}

const iosStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        backgroundColor: '#eff3bd',
        borderRadius: 10,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10
    },
    textStyle: {
        fontSize: 24,
        width: '90%'
    },
})