import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight, TouchableOpacity, Modal, Alert} from 'react-native';
// Third-party lib
import {createStackNavigator, TransitionPresets} from "@react-navigation/stack";
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';
// Screen
import CreateMealLogScreen from "./CreateMealLog";
import FoodSearchEngineScreen from './FoodSearchEngine';
import FavouriteMealScreen from "./FavouriteMeals";
import RecentMealScreen from "./RecentMeal";
// Components
import Select from "../../../../components/select";
// Others
import HeaderIcon from "../../../../components/headerBtnIcon";
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from "react-native-vector-icons/Ionicons";

Entypo.loadFont();

const Stack = createStackNavigator();

const options = [{name: "Breakfast", value: "breakfast"},
    {name: "Lunch", value: "lunch"},
    {name: "Dinner", value: "dinner"},
    {name: "Supper", value: "supper"},
    {name: "Snack / Tea", value: "snack"}];

class MealLogScreen extends React.Component {
    constructor(props) {
        super(props);
        const now = new Date();
        const hours = now.getHours();
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
        this.state = {
            selectedDateTime: now,
            selectedMealType: defaultMealType,
            datepickerModalOpen: false
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

    render() {
        const {navigation} = this.props;
        const {selectedDateTime, selectedMealType, datepickerModalOpen} = this.state;
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
                <Text style={styles.textPrompt}>Where to find your meal?</Text>
                <TouchableHighlight
                    onPress={() => {
                        navigation.push("FavouriteMeal", { selectedMealType, selectedDateTime: selectedDateTime.toString()});
                    }}
                    style={styles.button}
                    underlayColor='#fff'>
                    <Text style={styles.buttonText}>Favourites</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => {
                        navigation.push("RecentMeal", { selectedMealType, selectedDateTime: selectedDateTime.toString()});
                    }}
                    style={styles.button}
                    underlayColor='#fff'>
                    <Text style={styles.buttonText}>Recent</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => {
                        navigation.push("CreateMealLog", { selectedMealType, selectedDateTime: selectedDateTime.toString()});
                    }}
                    style={styles.button}
                    underlayColor='#fff'>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const MealLogStack = (props) => {
    return <Stack.Navigator screenOptions={({route}) => ({
                headerStyle: {
                    backgroundColor: '#aad326',
                },
                headerTintColor: '#000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    alignSelf: 'center',
                },
            })}>
        <Stack.Screen name={'MealLogScreen'}
                      component={MealLogScreen}
                      options={({ route , navigation}) => (
                          {     title: "Meal Log",
                                headerLeft: () => (<HeaderIcon iconName="chevron-left"
                                                               text={null} clickFunc={navigation.goBack}/>),
                                headerRight: () => (<View style={{width: 25, height: 25}} />)
                            })}/>
        <Stack.Screen name={'CreateMealLog'}
                      component={CreateMealLogScreen}
                      options={({ route , navigation}) => (
                          {   animationEnabled: false,
                              title: "Create Meal Log",
                              headerLeft: () => (<HeaderIcon iconName="chevron-left"
                                                             text={null} clickFunc={() => {
                                                                                if (route.params.edited) {
                                                                                    // Confirmation message before going back.
                                                                                    // If the meal has been edited, this dialogue will be popped.
                                                                                    // otherwise the user will be sent back to the previous page.
                                                                                    Alert.alert('Going back?', 'You have not submitted your meal log. Are you sure you want to leave this page?',
                                                                                        [
                                                                                            {
                                                                                                text: 'Ok',
                                                                                                onPress: navigation.goBack
                                                                                            },
                                                                                            {
                                                                                                text: 'Cancel',
                                                                                                onPress: () => {}
                                                                                            }
                                                                                        ])
                                                                                } else {
                                                                                    navigation.goBack()
                                                                                }
                                                                            }
                              }/>),
                              headerRight: () => (<View style={{width: 25, height: 25}} />)
                          })}/>
        <Stack.Screen name={'FavouriteMeal'}
                      component={FavouriteMealScreen}
                      options={({ route , navigation}) => (
                          {   title: "Favourites",
                              headerLeft: () => (<HeaderIcon iconName="times"
                                                             text={null} clickFunc={navigation.goBack}/>),
                              headerRight: () => (<View style={{width: 25, height: 25}} />),
                              ...TransitionPresets.ModalTransition,
                          })}/>
        <Stack.Screen name={'RecentMeal'}
                      component={RecentMealScreen}
                      options={({ route , navigation}) => (
                          {   title: "Recent",
                              headerLeft: () => (<HeaderIcon iconName="times"
                                                             text={null} clickFunc={navigation.goBack}/>),
                              headerRight: () => (<View style={{width: 25, height: 25}} />),
                              ...TransitionPresets.ModalTransition,
                          })}/>
        <Stack.Screen name={'FoodSearchEngine'}
                      component={FoodSearchEngineScreen}
                      options={{headerShown: false}}/>
    </Stack.Navigator>
}

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
        fontSize: 20
    }
})

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        margin: 20,
        flex: 1,
        alignItems: 'center',
    },
    selectStyle: {
        width: '70%'
    },
    textPrompt: {
        fontWeight: "bold",
        fontSize: 32,
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dateInputText: {
        fontSize: 20,
        marginLeft: 10
    }
})

export default MealLogStack;