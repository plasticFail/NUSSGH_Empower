import React from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

/*
Props description for customisability.
slideUpDuration: <Float>: Duration in milliseconds when the flash message appears (slides up).
slideDownDuration: <Float>: Duration in milliseconds when the flash message disappears (slides down).
delay: <Float>: Duration in milliseconds that the flash message will stay on the screen before disappearing.
messageComponentHeight: <Float>: Specify the height of the flash message so that this component can calculate how much to translate.
triggerValue: <Any>: Whenever this value changes, it will trigger the flash message.
renderFlashMessageComponent: Function<same type as trigger value>: The component to show when the trigger value changes.
 */
export default class FlashMessage extends React.Component {
    state = {
        flashMessageAnimation: new Animated.Value(0),
        triggerValue: null
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({
            triggerValue: this.props.triggerValue
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.triggerValue !== this.props.triggerValue) {
            this.setState({
                triggerValue: this.props.triggerValue
            }, () => {
                this.setState({
                    // Forcefully reset the animation and restart it.
                    flashMessageAnimation: new Animated.Value(0)
                }, () => this.launchAnimation());
            });
        }
    }

    launchAnimation = () => {
        const {slideUpDuration, slideDownDuration, delay} = this.props;
        Animated.sequence([Animated.timing(this.state.flashMessageAnimation, {
            toValue: 1,
            duration: slideUpDuration || 200,
            useNativeDriver: false
        }), Animated.delay(delay || 1000), Animated.timing(this.state.flashMessageAnimation, {
            toValue: 0,
            duration: slideDownDuration || 200,
            useNativeDriver: false
        })]).start();
    }

    render() {
        const paddingBottomForFlashMessage = 150
        const yInterpolate = this.state.flashMessageAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [windowHeight, windowHeight - paddingBottomForFlashMessage - this.props.messageComponentHeight],
            extrapolate: 'clamp'
        })
        const transformOptions = {
            transform: [{translateY: yInterpolate}]
        }
        const {triggerValue} = this.state;
        const messageComponent = this.props.renderFlashMessageComponent(triggerValue);
        return (
            <Animated.View style={[styles.root, transformOptions]}>
                {messageComponent}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center'
    }
})