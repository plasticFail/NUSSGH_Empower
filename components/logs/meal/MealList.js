import React from 'react';
import {FlatList, View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Alert, Dimensions} from "react-native";
// Functions
import {getToken} from "../../../storage/asyncStorageFunctions";
// Components
import RenderMealItem from './RenderMealItem';
// Others
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {unfavouriteMealEndpoint} from '../../../netcalls/urls';

Icon.loadFont();

// Props description
// onSelectMeal is a callback function when a meal is selected
// meals is a list of the user's meals, already filtered by record date or favourites.
// options is an object:
//      keys            value description
//      buttons         List<Object> A list of button properties. Example usage:
//                      [
//                          {
//                              icon: {
//                                         name: <String>: Icon name
//                                         color: <String>: Color of icon
//                                     },
//                              onPress: Function<Meal>: Callback when this button for a meal is clicked. E.g. (meal) => alert(meal.mealName)
//                              buttonStyle: <Styles to override button, can specify background color, width and height here>
//                           },
//                           {
//                               text: <String>: Text in button,
//                           }
//                      ]
//
//       header        Function<Meal>: Function that takes in a Meal Object and returns a string to render in the Meal header.
export default function MealList({filterQuery, meals, options}) {
    const processed = meals.map(m => {
        if (m.foodItems) {
            return m;
        }
        m.foodItems = m.beverage.concat(m.side, m.main, m.dessert)
        delete m['main'];
        delete m['side'];
        delete m['dessert'];
        delete m['beverage'];
        return m;
    });

    const filtered = processed.filter(x => x.mealName.toLowerCase().indexOf(filterQuery.trim().toLowerCase()) != -1);
    return (
        <FlatList data={filtered}
                  keyExtractor={meal => meal._id}
                  contentContainerStyle={styles.listContainer} renderItem={({item}) =>
            (<RenderMealItem item={item} options={options} />)}
        />
    )
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 20,
        borderColor: '#cfcfcf',
    }
})