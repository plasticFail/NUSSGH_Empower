import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import CreateMealLogScreen from "./CreateMealLog";
import FoodSearchEngineScreen from './FoodSearchEngine';
import HeaderIcon from "../../../../components/headerBtnIcon";
import Select from "../../../../components/select";

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
            currentDateTime: now,
            selectedMealType: defaultMealType
        }
    }

    handleSelectChange = (value) => {
        this.setState({
            selectedMealType: value
        })
    }

    render() {
        const {navigation} = this.props;
        const {currentDateTime, selectedMealType} = this.state;
        return (
            <View style={styles.root}>
                <Text>Log for {currentDateTime.toString()}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 30, paddingBottom: 30}}>
                    <Text style={{paddingRight: 15, fontSize: 20, fontWeight: 'bold'}}>Meal Type:</Text>
                    <Select defaultValue={selectedMealType}
                            options={options}
                            onSelect={this.handleSelectChange} containerStyle={styles.selectStyle}
                            rightIcon="chevron-down"/>
                </View>
                <Text style={styles.textPrompt}>Where to find your meal?</Text>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor='#fff'>
                    <Text style={styles.buttonText}>Favourites</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor='#fff'>
                    <Text style={styles.buttonText}>Recent</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => {
                        navigation.push("CreateMealLog", { selectedMealType, currentDateTime: currentDateTime.toString()});
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
                                                             text={null} clickFunc={navigation.goBack}/>),
                              headerRight: () => (<View style={{width: 25, height: 25}} />)
                          })}/>
        <Stack.Screen name={'FoodSearchEngine'}
                      component={FoodSearchEngineScreen}
                      options={{headerShown: false}}/>
    </Stack.Navigator>
}

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
    }
})

export default MealLogStack;