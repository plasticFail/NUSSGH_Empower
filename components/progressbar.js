import React from 'react';
import {Animated, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

// PROPS TO CUSTOMISE PROGRESS BAR
// backgroundBarColor: string. The color of the background, which is usually greyish white.
// containerStyle: style. The style of the entire progress bar container. You can customise the height or width of the bar using this prop.
// progressBarColor: string. The color of the progress bar.
// progress: string. The progress of the bar in percentage. Example: "75%", "30%"
// useIndicatorLevel: boolean. If this prop is set true, then colour of progressbar will be fixed according to indicator level colors.
// reverse: boolean. If this prop is set true, then the colour of progressbar will be reversed according to indicator level.

// Indicator level colors: green for < 33%, yellow for < 66% and red >= 66%.
// Note if reverse is set, red will be for < 33%, yellow for < 66% and green for >= 66%.
export default class ProgressBar extends React.Component {
    state = {
        animation: new Animated.Value(0),
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.state.animation.setValue(0);
        Animated.timing(this.state.animation, {
            toValue: parseFloat(this.props.progress.split("%")[0]) / 100,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.progress && prevProps.progress !== this.props.progress) {
            Animated.timing(this.state.animation, {
                toValue: parseFloat(this.props.progress.split("%")[0]) / 100,
                duration: 1000,
                useNativeDriver: false
            }).start();
        }
    }

    render() {

        const widthInterpolate = this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%']
        });

        const colorInterpolate = this.state.animation.interpolate({
            inputRange: [0, 0.25, 0.5, 0.75, 1],
            outputRange: this.props.reverse ? getReverseColorRange()
                : getColorRange()
        })

        const progressBarStyle = {
            width: widthInterpolate,
            backgroundColor: this.props.useIndicatorLevel ? colorInterpolate : this.props.progressBarColor ? this.props.progressBarColor : '#7BBFDB',
            height: '100%',
            position: 'absolute',
            borderRadius: this.props.containerStyle ? this.props.containerStyle.height ?
                this.props.containerStyle.height / 2 : styles.container.height / 2 : styles.container.height / 2
        };

        const backgroundBarStyle = {
            ...styles.backgroundFill,
            backgroundColor: this.props.backgroundBarColor ? this.props.backgroundBarColor
                : styles.backgroundFill.backgroundColor,
            borderRadius: progressBarStyle.borderRadius
        }
        return (
            <View style={{...styles.container, ...this.props.containerStyle}}>
                <TouchableWithoutFeedback>
                    <View style={backgroundBarStyle}>

                    </View>
                </TouchableWithoutFeedback>
                <View style={StyleSheet.absoluteFill}>
                    <Animated.View style={[progressBarStyle]}/>
                </View>
            </View>
        );
    }
}

// method to retrieve animated color range from a given percentage.
function getColorRange() {
    return ['rgb(96, 163, 84)', 'rgb(96, 163, 84)', 'rgb(245, 196, 68)', 'rgb(220,20,60)', 'rgb(220,20,60)'];
}

// method to retrieve animated color range for reversed indicator.
function getReverseColorRange() {
    return ['rgb(220,20,60)', 'rgb(220,20,60)', 'rgb(245, 196, 68)', 'rgb(96, 163, 84)', 'rgb(96, 163, 84)'];
}

// default values
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 20
    },
    backgroundFill : {
        position: 'absolute',
        width: '100%',
        backgroundColor: "#d4d4d4",
        height: '100%'
    }
})