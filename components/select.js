import React from 'react';
import {View, StyleSheet, Text, Platform, ActionSheetIOS, TouchableOpacity, Modal, Animated, TouchableWithoutFeedback} from 'react-native';
// Others
import Icon from 'react-native-vector-icons/dist/FontAwesome';

// Determine what ui to render for select. Different os render different select types.
// Props description for customizability.
// options: An array of options that can be selected from. Each option should have a name and a value field.
//          example of options that can be passed: [ {name: 'First Option', value: 'firstOption'} ]. Only the name
//          of the options will be displayed in the user interface.
//
// defaultValue: The default value that is set for the select. It is the value of the option, not the name.
//
// containerStyle: style for the select input. Not the popup/modal.
//
// textStyle: style for the text input in the select.
//
// onSelect: callback function fired when an option is selected. This function will take in the value of the option
//           that is selected.
//           Example: onSelect={(value) => alert(value)} will alert the value of the option when that option has been
//           selected.
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
            return (
                <TouchableOpacity style={{...iosStyles.container, ...containerStyle}} onPress={this.handleOpen}>
                    { open && <SelectModal visible={open}
                                 options={options}
                                 onSelectOptionCallback={this.handleCloseAfterSelect}
                                 onCancel={this.handleClose}/> }
                    <Text style={{...iosStyles.textStyle, ...textStyle}}>{result}</Text>
                    <Icon color="#000" name={rightIcon} size={20} />
                </TouchableOpacity>
            )
        }
    }
}

class SelectModal extends React.Component {
    state = {
        slideAnimation: new Animated.Value(0),
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.state.slideAnimation.setValue(0);
        Animated.timing(this.state.slideAnimation, {
            toValue: 1,
            duration: 200, // 200ms slide up animation.
            useNativeDriver: true
        }).start();
    }

    // Some magic happening in the animation callback.
    // This function basically takes in a callback function (once the animation is finished) and optional arguments.
    // Optional arguments will then be passed to the callback.
    // Callbacks are for either onCancel events or onSelect.
    handleCloseWithAnimation = (callback) => (arg) => {
        Animated.timing(this.state.slideAnimation, {
            toValue: 0,
            duration: 200, // 200ms slide down animation.
            useNativeDriver: true
        }).start(() => callback(arg));
    }

    render() {
        const {visible, options, onCancel, onSelectOptionCallback} = this.props;
        const heightOfOptions = (options.length + 1) * modalStyles.option.height;

        const yInterpolate = this.state.slideAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [heightOfOptions, 0], // From hidden underneath to translateY: 0.
            extrapolate: 'clamp'
        })
        const optionsContainerStyle = {
            ...modalStyles.optionsContainer,
            transform: [{translateY: yInterpolate}]
        }
        return (
            <Modal visible={visible} transparent={true}>
                <View style={modalStyles.root}>
                    <TouchableWithoutFeedback onPress={this.handleCloseWithAnimation(onCancel)}>
                        <View style={modalStyles.overlay} />
                    </TouchableWithoutFeedback>
                    <Animated.View style={optionsContainerStyle}>
                        {
                            options.map(option => (
                                <TouchableOpacity
                                    style={modalStyles.option}
                                    key={option.name}
                                    onPress={() => this.handleCloseWithAnimation(onSelectOptionCallback)(option)}>
                                    <Text style={modalStyles.optionText}>{option.name}</Text>
                                </TouchableOpacity>
                            ))
                        }
                        <TouchableOpacity
                            style={modalStyles.option}
                            key='cancel'
                            onPress={this.handleCloseWithAnimation(onCancel)}>
                            <Text style={modalStyles.cancelOptionText}>Cancel</Text>
                        </TouchableOpacity>
                    </Animated.View>
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
        alignItems: 'center'
    },
    overlay: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.15)'
    },
    optionsContainer: {
        backgroundColor: 'rgba(255,255,255, 0.96)',
        borderRadius: 10,
        width: '95%',
        marginBottom: 20
    },
    option: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.7,
        borderColor: '#cdcdcd'
    },
    optionText: {
        fontSize: 20,
        color: '#007aff'
    },
    cancelOptionText: {
        fontSize: 20,
        color: 'rgb(255,59,48)'
    },
})

const iosStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        backgroundColor: '#E2E8EE',
        borderRadius: 10,
        flexDirection: 'row',
        paddingLeft: '7%',
        paddingRight: '3%'
    },
    textStyle: {
        fontSize: 24,
        width: '90%'
    },
})