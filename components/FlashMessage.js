import React from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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