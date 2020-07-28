import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import CreateMealLogScreen from "./CreateMealLog";
import FoodSearchEngineScreen from './FoodSearchEngine';

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
    return <Stack.Navigator>
        <Stack.Screen name={'MealLogScreen'}
                      component={MealLogScreen}/>
        <Stack.Screen name={'CreateMealLog'}
                      component={CreateMealLogScreen}
                      options={{animationEnabled: false}}/>
        <Stack.Screen name={'FoodSearchEngine'}
                      component={FoodSearchEngineScreen} />
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