import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, Alert} from 'react-native';
import Moment from 'moment';
import FormBlock from '../../../../components/logs/formBlock';
import MealLogRoot from "../meal/MealLogRoot";

export default class DailyLogForFood extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.route.params?.dailyLog2Cache) {
            this.state = deserializeState(this.props.route.params.dailyLog2Cache.state);
        } else {
            this.state = {
                mealTaken: false,
                mealSelected: null,
                recordDate: null,
                mealType: null
            }
        }

    }

    setMealTaken = (bool) => {
        this.setState({
            mealTaken: bool
        })
    }

    setMealCallback = (meal) => {
        this.setState({
            mealSelected: meal
        })
    }

    setMealTypeCallback = (mealType) => {
        this.setState({
            mealType: mealType
        })
    }

    setRecordDateCallback = (date) => {
        this.setState({
            recordDate: date
        })
    }

    goNext = () => {
        const {mealTaken, mealSelected, mealType, recordDate} = this.state;
        if (mealTaken && mealSelected === null) {
            Alert.alert("Error", "Please select your meal before proceeding next", [{
                text: "Ok"
            }])
            return;
        }
        this.props.navigation.navigate('DailyLog3', {...this.props.route.params,
            dailyLog2Cache: {
                state: serializeState({...this.state})
            }
        });
    }

    goBack = () => {
        this.props.navigation.navigate('DailyLog', {...this.props.route.params,
            dailyLog2Cache: {
                state: serializeState({...this.state})
            }
        });
    }

    render() {
        const {navigation, route} = this.props;
        const {mealTaken, mealSelected, recordDate, mealType} = this.state;

        return (
            <ScrollView contentContainerStyle={styles.root}>
                <View style={{padding: 20}}>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerText}>Step 2: Log your food intake!</Text>
                    </View>
                    <Image
                        style={styles.progress}
                        resizeMode="contain"
                        source={require('../../../../resources/images/progress2.png')}
                    />
                    <View style={styles.formBlockContainer}>
                        <FormBlock question='Have you had your meal?'
                                   getFormSelection={this.setMealTaken}
                                   selectNo={false}
                                   defaultValue={mealTaken ? 'yes' : 'no'} />
                    </View>
                </View>
                {
                    mealTaken ? <MealLogRoot
                                             parentScreen='DailyLog2'
                                             onMealUpdateListener={this.setMealCallback}
                                             onMealTypeUpdateListener={this.setMealTypeCallback}
                                             onDateTimeUpdateListener={this.setRecordDateCallback}
                                             recordDate={recordDate}
                                             mealType={mealType}
                                             selectedMeal={mealSelected}
                                             navigation={navigation}
                                             route={route}
                        /> :
                        null
                }
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={this.goBack}>
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={this.goNext}>
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

function serializeState(state) {
    const {mealTaken, mealSelected, mealType, recordDate} = state;
    if (recordDate === null) {
        return state;
    }
    return {
        mealSelected,
        mealTaken,
        mealType,
        recordDate: Moment(recordDate).format("DD/MM/YYYY HH:mm:ss")
    }
}

function deserializeState(serializedState) {
    const {mealTaken, mealSelected, mealType, recordDate} = serializedState;
    // the record date passed to serializeState is the string format.
    if (recordDate === null) {
        return serializedState;
    }
    return {
        mealSelected,
        mealTaken,
        mealType,
        recordDate: Moment(recordDate, "DD/MM/YYYY HH:mm:ss").toDate()
    }
}

const styles = StyleSheet.create({
    root: {
        minHeight: '100%',
        backgroundColor: '#fff'
    },
    headerTextContainer: {
        width: '100%',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
    },
    progress: {
        width: '100%',
        height: 100,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    button: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B3D14C',
        height: 45,
        borderRadius: 10
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    formBlockContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: '100%',
        paddingBottom: '5%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})