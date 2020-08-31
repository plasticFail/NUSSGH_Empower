import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
// components
import Card from '../../common/Card';
import StackedImages from "./StackedImages";
import CircularProgress from "./CircularProgress";
// third-party-lib
import Animated, {Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from "react-native-gesture-handler";
import {Svg, Circle, G} from 'react-native-svg';
// Others
import f1 from '../../../resources/images/icons/meal.png';
import f2 from '../../../resources/images/icons/parfait.png';
import f3 from '../../../resources/images/icons/salad.png';
import f4 from '../../../resources/images/icons/carbohydrate.png';

const {
    Clock,
    Value,
    set,
    cond,
    startClock,
    clockRunning,
    timing,
    debug,
    stopClock,
    block,
    call,
    eq,
    spring,
    event,
    interpolate
} = Animated;

const AnimatedCard = Animated.createAnimatedComponent(Card);
const {width, height} = Dimensions.get('window');

const foodImages = [f1, f2, f3, f4];

class NutritionIntakeCard extends React.Component {
    constructor(props) {
        super(props);
        this.translateX = new Value(0);
        this.onStateChange = event([
            {
                nativeEvent: ({state}) => block([
                    cond(eq(state, State.END), call([],
                        () => this._end_animation(this.props.onPress)) )])
            }
        ])
    }

    componentDidMount() {
        this._init_animation();
    }

    _init_animation() {
        spring(this.translateX, {
            duration: 200,
            toValue: 1,
            damping: 7,
            mass: 1,
            stiffness: 121.6,
            overshootClamping: false,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001,
        }).start();
    }

    _end_animation(callback) {
        spring(this.translateX, {
            duration: 20,
            toValue: 2,
            damping: 7,
            mass: 1,
            stiffness: 121.6,
            overshootClamping: false,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001,
        }).start();
        callback();
    }

    render() {
        const x = interpolate(this.translateX, {
            inputRange: [0, 1, 2],
            outputRange: [-width - 50, 0, width + 50]
        });
        return (
            <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                <AnimatedCard style={[styles.root, {transform: [{translateX: x}]}]}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={styles.headerText}>Nutrient Intake</Text>
                        <StackedImages style={{flex: 1}} images={foodImages} imageRadius={20} direction='row' gap={26} />
                    </View>
                    <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
                        <View style={styles.circularProgressWrapper}>
                            <CircularProgress color="#84C395" percent={0.65}
                                              radius={30} padding={5} strokeWidth={5} fontSize={15}/>
                            <Text style={[styles.circularProgressText, {color: "#84C395"}]}>Carbohydrate</Text>
                            <Text style={[styles.circularProgressSubText, {color: "#84C395"}]}>65/100g</Text>
                        </View>
                        <View style={styles.circularProgressWrapper}>
                            <CircularProgress color="#4EA458" percent={0.4} radius={30}
                                              padding={5} strokeWidth={5} fontSize={15}/>
                            <Text style={[styles.circularProgressText, {color: "#4EA458"}]}>Protein</Text>
                            <Text style={[styles.circularProgressSubText, {color: "#4EA458"}]}>40/100g</Text>
                        </View>
                        <View style={styles.circularProgressWrapper}>
                            <CircularProgress color="#265A34" percent={0.80}
                                              radius={30} padding={5} strokeWidth={5} fontSize={15}/>
                            <Text style={[styles.circularProgressText, {color: "#265A34"}]}>Fat</Text>
                            <Text style={[styles.circularProgressSubText, {color: "#265A34"}]}>80/100g</Text>
                        </View>
                    </View>
                </AnimatedCard>
            </TapGestureHandler>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        minHeight: 150,
        padding: 15,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 2,
        color: '#4d4d4d'
    },
    circularProgressWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15
    },
    circularProgressText: {
        paddingTop: 5,
        fontSize: 14,
        fontWeight: 'bold'
    },
    circularProgressSubText: {
        fontSize: 12.5,
    }
})

export default NutritionIntakeCard;