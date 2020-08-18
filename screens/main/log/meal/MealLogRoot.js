import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
// Third-party lib
import Moment from 'moment';
// Functions
import {storeLastMealLog} from "../../../../storage/asyncStorageFunctions";
import {mealAddLogRequest} from "../../../../netcalls/requestsLog";
import {getDefaultMealType} from "../../../../commonFunctions/mealLogFunctions";
// Components
import DateSelectionBlock from "../../../../components/logs/dateSelectionBlock";
import MealTypeSelectionBlock from "../../../../components/logs/meal/MealTypeSelectionBlock";
import MealFinder from "../../../../components/logs/meal/MealFinder";
import RenderMealItem from "../../../../components/logs/meal/RenderMealItem";
// Others
import Entypo from 'react-native-vector-icons/Entypo';
import SuccessDialogue from "../../../../components/successDialogue";

Entypo.loadFont();

class MealLogRoot extends React.Component {
    constructor(props) {
        super(props);
        const now = new Date();
        const hours = now.getHours();

        this.state = {
            selectedDateTime: now,
            selectedMealType: getDefaultMealType(hours),
            datepickerModalOpen: false,
            selectedMeal: null,
            successMessage: false
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
            storeLastMealLog(mealData).then(resp => {
                this.setState({
                    successMessage: true
                })
            })
        }).catch(err => {
            Alert.alert("Error", err.message,
                [ { text: 'Ok' }]);
        });
    }

    navigateToCreateMealLogPage = (selectedMeal) => {
        const meal = {...selectedMeal};
        // remove unfavourite key from the selected meal.
        delete meal['unfavourite'];
        this.props.navigation.navigate("CreateMealLog", {
            meal,
        });
    }

    render() {
        const {navigation} = this.props;
        const {selectedDateTime, selectedMealType, selectedMeal, successMessage} = this.state;
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
                                       />
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
                              <TouchableOpacity style={styles.submitButton} onPress={this.handleSubmitLog}>
                                  <Text style={styles.submitButtonText}>Submit Log!</Text>
                              </TouchableOpacity>
                          </View>
                    }
                </ScrollView>
                <SuccessDialogue type='Meal' visible={successMessage} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
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