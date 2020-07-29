import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import CreateMealLogScreen from "./CreateMealLog";
import FoodSearchEngineScreen from './FoodSearchEngine';
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import HeaderIcon from "../../../../components/headerBtnIcon";

const Stack = createStackNavigator();
const now = new Date();

const MealLogScreen = ({navigation}) => {
    return <View style={styles.root}>
        <Text>Log for {now.toLocaleString()}</Text>
        <Text>Where to find your meal?</Text>
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
                navigation.push("CreateMealLog");
            }}
            style={styles.button}
            underlayColor='#fff'>
            <Text style={styles.buttonText}>Create</Text>
        </TouchableHighlight>
    </View>
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
                      component={MealLogScreen} options={{
                          title: 'Meal Log'
                        }}/>
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
        margin: 20
    },
    button:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'#68a0cf',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    buttonText:{
        color:'#fff',
        textAlign:'center',
    }
})

export default MealLogStack;