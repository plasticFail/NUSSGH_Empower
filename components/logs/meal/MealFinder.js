import React from 'react';
import {Text, TouchableHighlight, StyleSheet} from "react-native";

const buttons = [
    {
        title: 'Favourites',
        navTo: 'FavouriteMeal'
    },
    {
        title: 'Recent',
        navTo: 'RecentMeal'
    },
    {
        title: 'Create',
        navTo: 'CreateMealLog'
    }
]

export default function MealFinder({parentScreen, navigation}) {
    return (
        <React.Fragment>
            <Text style={styles.textPrompt}>Where to find your meal?</Text>
            {
                buttons.map(button => (
                    <TouchableHighlight
                        key={button.title}
                        onPress={() => {
                            navigation.push(button.navTo, { parentScreen: parentScreen });
                        }}
                        style={styles.button}
                        underlayColor='#fff'>
                        <Text style={styles.buttonText}>{button.title}</Text>
                    </TouchableHighlight>
                ))
            }
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    textPrompt: {
        fontWeight: "bold",
        fontSize: 28,
        paddingBottom: 30,
        alignSelf: 'center'
    },
    button:{
        width: '70%',
        height: 65,
        backgroundColor:'#288259',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        marginTop: 20,
        alignSelf: 'center'
    },
    buttonText:{
        color:'#fff',
        textAlign:'center',
        fontSize: 26
    },
})