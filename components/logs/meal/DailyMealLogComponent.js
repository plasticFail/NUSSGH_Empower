import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
// Components
import DateSelectionBlock from "../dateSelectionBlock";
import MealTypeSelectionBlock from "./MealTypeSelectionBlock";
import MealFinder from "./MealFinder";
import RenderMealItem from "./RenderMealItem";
// Others
import Entypo from 'react-native-vector-icons/Entypo';

Entypo.loadFont();

class DailyMealLogComponent extends React.Component {
    constructor(props) {
        super(props);
        const {selectedMeal, mealType, recordDate} = this.props;
        const now = new Date();
        const hours = now.getHours();

        this.state = {
            selectedDateTime: recordDate || now,
            selectedMealType: mealType || getDefaultMealType(hours),
            datepickerModalOpen: false,
            selectedMeal: selectedMeal || null
        }
    }

    componentDidMount() {
        // Update parent the moment this component mounts.
        const {onMealUpdateListener, onDateTimeUpdateListener, onMealTypeUpdateListener} = this.props;
        onMealUpdateListener(this.state.selectedMeal);
        onDateTimeUpdateListener(this.state.selectedDateTime);
        onMealTypeUpdateListener(this.state.selectedMealType);
    }

    // Listen to updates from route, date time and meal type
    componentDidUpdate(prevProps, prevState) {

        // MEAL CHANGED FROM CREATE MEAL LOG PAGE.
        if (this.props.route.params?.meal && this.props.route.params.meal !== this.state.selectedMeal) {
            const newMeal = this.props.route.params.meal;
            this.setState({
                selectedMeal: newMeal
            });
        }

        // DATE TIME CHANGED. CALL PARENT PROPS IF THERE IS ANY.
        if (prevState.selectedDateTime !== this.state.selectedDateTime) {
            this.props.onDateTimeUpdateListener(this.state.selectedDateTime)
        }

        // MEAL TYPE CHANGED. CALL PARENT PROPS IF THERE IS ANY.
        if (prevState.selectedMealType !== this.state.selectedMealType) {
            this.props.onMealTypeUpdateListener(this.state.selectedMealType);
        }

        // MEAL CHANGED. CALL PARENT PROPS IF THERE IS ANY.
        if (prevState.selectedMeal !== this.state.selectedMeal) {
            this.props.onMealUpdateListener(this.state.selectedMeal);
        }
    }

    handleSelectChange = (value) => {
        this.setState({
            selectedMealType: value
        })
    }

    handleDeleteMeal = () => {
        // Clear the parameters and then set selected meal to be null.
        this.props.navigation.setParams({meal: null});
        this.setState({
            selectedMeal: null
        });
    }

    navigateToCreateMealLogPage = (selectedMeal) => {
        const meal = {...selectedMeal};
        // remove unfavourite key from the selected meal.
        delete meal['unfavourite'];
        this.props.navigation.navigate("CreateMealLog", {
            meal,
            parentScreen: 'DailyLog'
        });
    }

    render() {
        const {navigation} = this.props;
        const {selectedDateTime, selectedMealType, selectedMeal} = this.state;
        return (
            <View style={styles.root}>
                <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
                    <DateSelectionBlock date={selectedDateTime}
                                        setDate={(date) => this.setState({selectedDateTime : date})} />
                    <MealTypeSelectionBlock onSelectChange={this.handleSelectChange}
                                            defaultValue={selectedMealType} />
                    {   // If meal is not selected, display options (create, recent or favourites) for
                        // user to select a meal from (MealFinder).
                        !selectedMeal ? (
                                <MealFinder navigation={navigation}
                                            parentScreen='DailyLog' />
                            ) : // Meal has been selected, render a preview of the meal for confirmation before submitting.
                            <View style={{width: '100%', flex: 1}}>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <RenderMealItem item={selectedMeal}
                                                    options={{
                                                        buttons: [
                                                            {
                                                                text: 'Remove',
                                                                onPress: this.handleDeleteMeal,
                                                                buttonStyle: {
                                                                    backgroundColor: 'red',
                                                                    width: 80
                                                                }
                                                            },
                                                            {
                                                                text: 'Edit',
                                                                onPress: this.navigateToCreateMealLogPage
                                                            }
                                                        ],
                                                        header: (meal) => meal.mealName
                                                    }}
                                    />
                                </View>
                            </View>
                    }
                </ScrollView>
            </View>
        )
    }
}

function getDefaultMealType(hours) {
    let defaultMealType = null;
    if (hours >= 12 && hours < 18) {
        defaultMealType = 'lunch';
    } else if (hours >= 18 && hours < 22) {
        defaultMealType = 'dinner'
    } else if (hours >= 22 || hours < 5) {
        defaultMealType = 'supper'
    } else {
        defaultMealType = 'breakfast'
    }
    return defaultMealType;
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    }
})

export default DailyMealLogComponent;