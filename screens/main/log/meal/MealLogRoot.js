import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
// Third-party lib
import Moment from 'moment';
// Functions
import {getDefaultMealType} from "../../../../commonFunctions/mealLogFunctions";
// Components
import DateSelectionBlock from "../../../../components/logs/dateSelectionBlock";
import MealTypeSelectionBlock from "../../../../components/logs/meal/MealTypeSelectionBlock";
import MealFinder from "../../../../components/logs/meal/MealFinder";
import RenderMealItem from "../../../../components/logs/meal/RenderMealItem";
// Others
import Icon from 'react-native-vector-icons/FontAwesome';
import {getLastMealLog} from "../../../../storage/asyncStorageFunctions";
import ReadOnlyMealDisplay from "../../../../components/logs/meal/ReadOnlyMealDisplay";

class MealLogRoot extends React.Component {
    constructor(props) {
        super(props);
        const now = new Date();
        const hours = now.getHours();

        this.state = {
            selectedDateTime: now,
            selectedMealType: getDefaultMealType(hours),
            datepickerModalOpen: false,
            previousMealToday: null
        }
    }

    componentDidMount() {
        getLastMealLog().then(data => {
            this.setState({
                previousMealToday: data
            });
        });
    }

    handleSelectChange = (value) => {
        this.setState({
            selectedMealType: value
        })
    }

    navigateToCreateMealLogPage = () => {
        this.props.navigation.navigate("CreateMealLog", {
            mealType: this.state.selectedMealType,
            recordDate: this.state.selectedDateTime.toString()
        });
    }

    render() {
        const {navigation} = this.props;
        const {selectedDateTime, selectedMealType, previousMealToday} = this.state;
        return (
            <View style={styles.root}>
                <View style={styles.header}>
                    <Icon name='times' size={50} color='#4DAA50' onPress={()=>navigation.goBack()} />
                    <Text style={{fontSize: 30, color:"#21283A", fontWeight: 'bold', paddingBottom: '2%'}}>Add Log</Text>
                    <Text style={{fontSize: 18, color:"#21283A", fontWeight: 'bold'}}>Food intake log</Text>
                </View>
                <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
                    {
                        //previousMealToday &&
                            <ReadOnlyMealDisplay data={previousMealToday} />
                    }
                    <DateSelectionBlock date={selectedDateTime}
                                        setDate={(date) => this.setState({selectedDateTime : date})} />
                    <MealTypeSelectionBlock onSelectChange={this.handleSelectChange}
                                            defaultValue={selectedMealType} />
                    <TouchableOpacity style={styles.startButton} onPress={this.navigateToCreateMealLogPage}>
                        <Icon name='plus' size={30} color='#fff' />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
    },
    header: {
        height: '18%',
        justifyContent: 'flex-end'
    },
    startButton: {alignSelf: 'center', backgroundColor: '#9DC43D', height: 60, width: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 30},
    submitButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#288259',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 15
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 20
    }
})

export default MealLogRoot;
