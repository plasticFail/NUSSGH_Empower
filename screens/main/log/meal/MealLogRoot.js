import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight, TouchableOpacity, ScrollView, Alert} from 'react-native';
// Third-party lib
import Moment from 'moment';
// Functions
import {storeLastMealLog} from "../../../../storage/asyncStorageFunctions";
// Components
import Select from "../../../../components/select";
// Others
import Entypo from 'react-native-vector-icons/Entypo';
import RenderMealItem from "../../../../components/logs/meal/RenderMealItem";
import {mealAddLogRequest} from "../../../../netcalls/requestsLog";
import DateSelectionBlock from "../../../../components/logs/dateSelectionBlock";
import MealTypeSelectionBlock from "../../../../components/logs/meal/MealTypeSelectionBlock";
import MealFinder from "../../../../components/logs/meal/MealFinder";

Entypo.loadFont();

class MealLogRoot extends React.Component {
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
        if (onMealUpdateListener) {
            onMealUpdateListener(this.state.selectedMeal);
        }
        if (onDateTimeUpdateListener) {
            onDateTimeUpdateListener(this.state.selectedDateTime);
        }
        if (onMealTypeUpdateListener) {
            onMealTypeUpdateListener(this.state.selectedMealType);
        }
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
            if (this.props.onDateTimeUpdateListener) {
                this.props.onDateTimeUpdateListener(this.state.selectedDateTime)
            }
        }

        // MEAL TYPE CHANGED. CALL PARENT PROPS IF THERE IS ANY.
        if (prevState.selectedMealType !== this.state.selectedMealType) {
            if (this.props.onMealTypeUpdateListener) {
                this.props.onMealTypeUpdateListener(this.state.selectedMealType);
            }
        }

        // MEAL CHANGED. CALL PARENT PROPS IF THERE IS ANY.
        if (prevState.selectedMeal !== this.state.selectedMeal) {
            if (this.props.onMealUpdateListener) {
                this.props.onMealUpdateListener(this.state.selectedMeal);
            }
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

    handleSubmitLog = () => {
        // selectedMealType is one of breakfast, lunch, dinner, supper or snack.
        // selectedDateTime is javascript's default Date object.toString().
        const { selectedMealType, selectedDateTime } = this.state;
        const { beverage, main, side, dessert, isFavourite, mealName } = this.state.selectedMeal;
        const recordDate = Moment(new Date(selectedDateTime)).format("DD/MM/YYYY HH:mm:ss");
        const mealData = {
            isFavourite,
            beverage,
            main,
            side,
            dessert,
            mealName,
            mealType: selectedMealType,
            recordDate
        };
        mealAddLogRequest(mealData).then(data => {
            storeLastMealLog(JSON.stringify(this.state)).then(resp => {
                this.props.navigation.goBack();
                Alert.alert("Log Success!", data.message,
                    [ { text: 'Ok' }]);
            })
        }).catch(err => {
            Alert.alert("Error", err.message,
                [ { text: 'Ok' }]);
        });
    }

    navigateToCreateMealLogPage = (selectedMeal) => {
        const parentScreen = this.props.parentScreen;
        const meal = {...selectedMeal};
        // remove unfavourite key from the selected meal.
        delete meal['unfavourite'];
        this.props.navigation.navigate("CreateMealLog", {
            meal,
            parentScreen
        });
    }

    render() {
        const {navigation, parentScreen} = this.props;
        const {selectedDateTime, selectedMealType, selectedMeal} = this.state;
        return (
            <View style={styles.root}>
                <ScrollView style={{flex: 1}} contentContainerStyle={{padding: 20, flexGrow: 1}}>
                <DateSelectionBlock date={selectedDateTime} setDate={(date) => this.setState({selectedDateTime : date})} />
                <MealTypeSelectionBlock onSelectChange={this.handleSelectChange} defaultValue={selectedMealType} />
                {   // If meal is not selected, display options (create, recent or favourites) for
                    // user to select a meal from (MealFinder).
                  !selectedMeal ? (
                      <MealFinder navigation={navigation} parentScreen={parentScreen} />
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
                          {   // If parent screen is from daily log, don't render the submit button.
                              this.props.parentScreen !== 'DailyLog2' &&
                              <TouchableOpacity style={styles.submitButton} onPress={this.handleSubmitLog}>
                                  <Text style={styles.submitButtonText}>Submit Log!</Text>
                              </TouchableOpacity>
                          }
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
    },
    datePickerInput: {
        backgroundColor: '#eff3bd',
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    dateInputText: {
        fontSize: 20,
        marginLeft: 10
    },
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