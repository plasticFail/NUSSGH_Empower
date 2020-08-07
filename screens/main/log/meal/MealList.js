import React from 'react';
import {FlatList, View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Alert, Dimensions} from "react-native";
// Functions
import {getToken} from "../../../../storage/asyncStorageFunctions";
// Components
import FoodItem from "./FoodItem";
// Others
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {unfavouriteMealEndpoint} from '../../../../netcalls/urls';

Icon.loadFont();

// Props description
// onSelectMeal is a callback function when a meal is selected
// meals is a list of the user's meals, already filtered by record date or favourites.
// options is an object:
//      keys            value description
//      mode            value is a string, which can be set to 'recent'. If set to 'recent', meal names will not
//                      not be shown. The record date of the meal log will be shown instead.
//                      defaults to showing meal name
export default function MealList({onSelectMeal, meals, options}) {
    const favouriteMode = options?.mode !== 'recent';
    return (
        <FlatList data={meals}
                  keyExtractor={meal => meal._id}
                  contentContainerStyle={styles.listContainer} renderItem={({item}) =>
            (<RenderMealItem item={item} favouriteMode={favouriteMode}
                             onPressSelect={() => onSelectMeal(item)} />)}
        />
    )
}

function RenderMealItem({item, onPressSelect, favouriteMode}) {
    const combinedMealItems = item.beverage.map(x => x).concat(item.main, item.side, item.dessert);

    const handleUnfavourite = () => {
        getToken().then(token => {
            fetch(unfavouriteMealEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({
                    mealName: item.mealName
                })
            }).then(resp => resp.json()).then(data => {
                // unfavourite the item from local state.
                item.unfavourite();
            }).catch(err => Alert.alert("Error", err.message,
                [ { text: 'Ok' }]));
        })
    }

    return (
        <View style={styles.mealItem}>
            <View style={styles.mealNameContainer}>
                {
                    favouriteMode ? <Text style={styles.mealNameText}>{item.mealName}</Text> :
                                   <Text style={styles.recordDateText}>
                                       {
                                           item.record_date
                                       }
                                   </Text>
                }
                <View style={{flexDirection: 'row'}}>
                    {   // If it is in 'favourite' mode, show the unfavourite button.
                        favouriteMode && <TouchableOpacity style={styles.deleteButton} onPress={handleUnfavourite}>
                        <Icon name='trash' size={20} color='#fff'/>
                    </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.selectButton} onPress={onPressSelect}>
                        <Text style={styles.selectButtonText}>Select</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{flexDirection: 'row'}} horizontal={true}>
                {
                    combinedMealItems.map(food => <FoodItem key={food["food-name"]} food={food} />)
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 20,
        borderColor: '#cfcfcf',
    },
    mealItem: {
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderColor: '#cfcfcf',
        height: 250,
    },
    mealNameContainer: {
        height: '30%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    mealNameText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    recordDateText: {
        fontSize:  18,
        color: '#7d7d7d'
    },
    selectButton: {
        backgroundColor: '#288259',
        width: 60,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    selectButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#fff"
    },
    deleteButton: {
        backgroundColor: 'red',
        width: 40,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 20
    },
})