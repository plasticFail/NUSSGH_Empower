import React from 'react';
import {View, StyleSheet, Text, Dimensions, ScrollView} from 'react-native';
import SimpleBarChart from "./SimpleBarChart";
import Animated, {Easing, Extrapolate} from 'react-native-reanimated';
import Moment from 'moment';
import Card from '../../common/Card';

const {width, height} = Dimensions.get('window');
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
    interpolate
} = Animated;
const AnimatedCard = Animated.createAnimatedComponent(Card);

const data = [
    {'food': 'Cola', 'amount': 356.4, 'quantity': 1},
    {'food': 'McSpicy', 'amount': 1256.2, 'quantity': 2},
    {'food': 'Caesar salad', 'amount': 170.42, 'quantity': 1},
    {'food': 'Bak Kut Teh', 'amount': 300.71, 'quantity': 1}
]

const total = Math.round(data.reduce((acc, curr) => acc + curr.amount * curr.quantity, 0));
function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration: 500,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease),
    };

    return block([
        cond(
            clockRunning(clock),
            [
                // if the clock is already running we update the toValue, in case a new dest has been passed in
                set(config.toValue, dest),
            ],
            [
                // if the clock isn't running we reset all the animation params and start the clock
                set(state.finished, 0),
                set(state.time, 0),
                set(state.position, value),
                set(state.frameTime, 0),
                set(config.toValue, dest),
                startClock(clock),
            ]
        ),
        // we run the step here that is going to update position
        timing(clock, state, config),
        // if the animation is over we stop the clock
        cond(state.finished, debug('stop clock', stopClock(clock))),
        // we made the block return the updated position
        state.position,
    ]);
}

class CalorieReport extends React.Component {
    // Animation variables.
    transY = runTiming(new Clock(), height - 300, 0);
    opacity = runTiming(new Clock(), 0, 1);
    constructor(props) {
        super(props);
        this.state = {
            selectedData: null
        }
    }

    onDataPress = (data) => {
        this.setState({
            selectedData: data
        }, () => {
            this.transY = runTiming(new Clock(), height - 300, 0);
            this.opacity = runTiming(new Clock(), 0, 1);
        });
    }

    render() {
        const {selectedData} = this.state;

        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{...styles.root, ...this.props.style}}>
                <SimpleBarChart onPressData={this.onDataPress} />
                <View style={styles.detailsContainer}>
                    <Text style={styles.graphTitleLabel}>
                        Your calorie (kcal) consumption this week
                    </Text>
                    {
                        selectedData &&
                        (
                            <AnimatedCard style={{backgroundColor: '#fff', flex:1,
                                transform: [{translateY: this.transY}], opacity: this.opacity
                            }}>
                                <Text style={styles.selectedDateText}>{Moment(selectedData.x).format('D MMM, ddd')}</Text>
                                <View style={styles.overviewContainer}>
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{fontSize:16, color: '#7F8286'}}>Total</Text>
                                        <Text style={{fontSize:20, color: '#545E65'}}>{total} kcal</Text>
                                    </View>
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{fontSize:16, color: '#AFB2B6'}}>From Recommended</Text>
                                        <Text style={{fontSize:20, color: '#545E65'}}>-6%</Text>
                                    </View>
                                </View>
                                <Text style={styles.tableDescText}>Breakdown</Text>
                                <View style={styles.table}>
                                    <View style={styles.row}>
                                        <Text style={styles.rowLeftHeaderText}>Food</Text>
                                        <Text style={[styles.rowHeaderText, {paddingRight: 7}]}>Qty</Text>
                                        <Text style={styles.rowHeaderText}>Calorie (kcal)</Text>
                                    </View>
                                    {
                                        data.map((d, index) => (
                                            <View style={index % 2 === 0 ? styles.rowAlt : styles.row}>
                                                <Text style={styles.rowLeftText}>{d.food}</Text>
                                                <Text style={[styles.rowText, {paddingRight: 7}]}>{d.quantity}</Text>
                                                <Text style={styles.rowText}>{d.amount}</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                                <View style={{flex: 1}} />
                            </AnimatedCard>
                        )
                    }
                </View>
            </View>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    detailsContainer: {
        flex: 1
    },
    graphTitleLabel: {
        backgroundColor: '#fff',
        textAlign: 'center',
        color: '#4d4d4d',
        paddingTop: 10,
        paddingBottom: 10
    },
    //content related
    overviewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F3F6F8',
        paddingTop: '3%',
        paddingBottom: '3%'
    },
    selectedDateText: {
        paddingTop: '3%',
        paddingBottom: '3%',
        fontSize: 24,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
        color: '#4d4d4d'
    },
    table: {

    },
    tableDescText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4d4d4d',
        paddingLeft: 20,
        paddingTop: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        height: 50
    },
    rowAlt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F6FAFE',
        paddingLeft: 20,
        paddingRight: 20,
        height: 50
    },
    rowHeaderText:{
        fontSize: 16,
        color: '#4d4d4d',
        flex: 1,
        textAlign: 'right'
    },
    rowLeftHeaderText:{
        fontSize: 16,
        color: '#4d4d4d',
        flex: 3
    },
    rowText: {
        fontSize: 16,
        color: '#4d4d4d',
        flex: 1,
        textAlign: 'right'
    },
    rowLeftText: {
        fontSize: 16,
        color: '#4d4d4d',
        flex: 3
    }
});

export default CalorieReport;
//edit flag
