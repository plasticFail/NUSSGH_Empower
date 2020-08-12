import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight, TouchableOpacity, Modal, Alert} from 'react-native';
// Third-party lib
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';
// Components
import Select from "../../../../components/select";
// Others
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from "react-native-vector-icons/Ionicons";
import {getToken} from "../../../../storage/asyncStorageFunctions";
import {mealAddLogEndpoint} from "../../../../netcalls/urls";
import RenderMealItem from "./RenderMealItem";

Entypo.loadFont();

const options = [{name: "Breakfast", value: "breakfast"},
    {name: "Lunch", value: "lunch"},
    {name: "Dinner", value: "dinner"},
    {name: "Supper", value: "supper"},
    {name: "Snack / Tea", value: "snack"}];

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

    handleOpenDatePickerModal = () => {
        this.setState({
            datepickerModalOpen: true
        })
    }

    handleCloseDatePickerModal = () => {
        this.setState({
            datepickerModalOpen: false
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

        getToken().then(token => {
                fetch(mealAddLogEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    },
                    body: JSON.stringify({
                        isFavourite,
                        beverage,
                        main,
                        side,
                        dessert,
                        mealName,
                        mealType: selectedMealType,
                        recordDate
                    })
                }).then(resp => resp.json()).then(data => {
                    if (data.statusCode === 403) {
                        // There is another favourite meal with the same name as this favourite meal.
                        Alert.alert('Error',data.message, [ { text: 'Ok' }]);
                        return;
                    }
                    this.props.navigation.goBack();
                    Alert.alert("Log Success!", data.message,
                        [ { text: 'Ok' }]);
                }).catch(err => {
                    Alert.alert("Error", err.message,
                        [ { text: 'Ok' }]);
                });
            }
        )
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
        const {navigation} = this.props;
        const {selectedDateTime, selectedMealType, datepickerModalOpen, selectedMeal} = this.state;
        return (
            <View style={styles.root}>
                <Modal visible={datepickerModalOpen} transparent={true}>
                    <View style={modalStyles.root}>
                        <TouchableOpacity style={modalStyles.overlay} onPress={this.handleCloseDatePickerModal} />
                        <View style={modalStyles.paper}>
                            <DatePicker
                                visible={datepickerModalOpen}
                                date={selectedDateTime}
                                minimumDate={Moment(new Date()).subtract(10, 'days').toDate()}
                                maximumDate={Moment(new Date()).add(10, 'minutes').toDate()}
                                onDateChange={(date) => this.setState({selectedDateTime: date})}
                                mode="datetime"
                            />
                            <TouchableOpacity style={modalStyles.okayButton} onPress={this.handleCloseDatePickerModal}>
                                <Text style={modalStyles.okayButtonText}>Okay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{paddingRight: 10, fontSize: 20, fontWeight: 'bold',  width: 120}}>Log time:</Text>
                    <TouchableOpacity style={styles.datePickerInput} onPress={this.handleOpenDatePickerModal}>
                        <Text style={styles.dateInputText}>
                            {Moment(selectedDateTime).format('MMM Do YY, h:mm a')}
                        </Text>
                        <Ionicons
                            name="calendar-outline"
                            size={20}
                            onPress={this.handleOpenDatePickerModal}
                            style={{marginRight: 10}}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 30, paddingBottom: 30}}>
                    <Text style={{paddingRight: 10, fontSize: 20, fontWeight: 'bold', width: 120}}>Meal Type:</Text>
                    <Select defaultValue={selectedMealType}
                            options={options}
                            onSelect={this.handleSelectChange} containerStyle={styles.selectStyle}
                            rightIcon="chevron-down"/>
                </View>
                {   // If meal is not selected, display options (create, recent or favourites) for
                    // user to select a meal from.
                  !selectedMeal ? (
                      <React.Fragment>
                          <Text style={styles.textPrompt}>Where to find your meal?</Text>
                          <TouchableHighlight
                              onPress={() => {
                                  navigation.push("FavouriteMeal", { parentScreen: this.props.parentScreen });
                              }}
                              style={styles.button}
                              underlayColor='#fff'>
                              <Text style={styles.buttonText}>Favourites</Text>
                          </TouchableHighlight>
                        <TouchableHighlight
                        onPress={() => {
                        navigation.push("RecentMeal", { parentScreen: this.props.parentScreen });
                             }}
                        style={styles.button}
                        underlayColor='#fff'>
                        <Text style={styles.buttonText}>Recent</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                        onPress={() => {
                        navigation.push("CreateMealLog", { parentScreen: this.props.parentScreen });
                             }}
                        style={styles.button}
                        underlayColor='#fff'>
                        <Text style={styles.buttonText}>Create</Text>
                        </TouchableHighlight>
                      </React.Fragment>
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

// Date picker modal
const modalStyles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    overlay: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0, 0.5)'
    },
    paper: {
        backgroundColor: '#fff',
        width: '80%'
    },
    okayButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#288259',
        justifyContent: 'center',
        alignItems: 'center'
    },
    okayButtonText: {
        color: '#fff',
        fontSize: 30
    },
})

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        margin: 20,
        flex: 1,
        alignItems: 'center',
    },
    selectStyle: {
        flex: 1
    },
    textPrompt: {
        fontWeight: "bold",
        fontSize: 28,
        paddingBottom: 30
    },
    button:{
        width: '70%',
        height: 65,
        backgroundColor:'#288259',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonText:{
        color:'#fff',
        textAlign:'center',
        fontSize: 26
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