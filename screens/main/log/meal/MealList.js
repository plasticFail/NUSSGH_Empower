import React from 'react';
import {FlatList, View, Text, TouchableOpacity, ScrollView, Image, StyleSheet} from "react-native";

// Props description
// onSelectMeal is a callback function when a meal is selected
// meals is a list of the user's meals, already filtered by record date or favourites.
// options is an object:
//      keys            value description
//      mode            value is a string, which can be set to 'recent'. If set to 'recent', meal names will not
//                      not be shown. The record date of the meal log will be shown instead.
//                      defaults to showing meal name
export default function MealList({onSelectMeal, meals, options}) {
    const showMealName = options?.mode === 'recent' ? false : true;
    return (
        <FlatList data={meals}
                  keyExtractor={item => item.mealName}
                  style={styles.listContainer} renderItem={({item}) =>
            (<RenderMealItem item={item} showMealName={showMealName}
                             onPressSelect={() => onSelectMeal(item)} />)}
        />
    )
}

function RenderMealItem({item, onPressSelect, showMealName}) {
    const combinedMealItems = item.beverage.concat(item.main, item.side, item.dessert);
    return (
        <View style={styles.mealItem}>
            <View style={styles.mealNameContainer}>
                {
                    showMealName ? <Text style={styles.mealNameText}>{item.mealName}</Text> :
                                   <Text style={styles.recordDateText}>{item.recordDate}</Text>
                }
                <TouchableOpacity style={styles.selectButton} onPress={onPressSelect}>
                    <Text style={styles.selectButtonText}>Select</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{flexDirection: 'row'}} horizontal={true}>
                {
                    combinedMealItems.map(food => <FoodItem key={food["food-name"]} food={food} />)
                }
            </ScrollView>
        </View>
    )
}

function FoodItem({food}) {
    const adjustedFontSize = food["food-name"].length > 20 ? 12 : 15;
    return (
        <View style={styles.foodItem}>
            <Image source={{uri: food.imgUrl.url}} style={styles.foodImage} />
            <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: adjustedFontSize}}>
                    {food["food-name"][0].toUpperCase() + food["food-name"].slice(1)}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 20,
        borderTopWidth: 1,
        borderColor: '#cfcfcf',
    },
    mealItem: {
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderColor: '#cfcfcf',
        height: 200
    },
    mealNameContainer: {
        height: '30%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mealNameText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    recordDateText: {
        fontSize: 20,
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
    foodImage: {
        width: 80,
        height: 80
    },
    foodItem: {
        width: 80,
        marginRight: 20
    },
})