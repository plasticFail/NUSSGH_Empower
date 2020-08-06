import React from 'react';
import {FlatList, View, Text, TouchableOpacity, ScrollView, Image, StyleSheet} from "react-native";
// Functions
import {getToken} from "../../../../storage/asyncStorageFunctions";
// Third party lib
import Moment from 'moment';
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
    const showMealName = options?.mode !== 'recent';
    return (
        <FlatList data={meals}
                  contentContainerStyle={styles.listContainer} renderItem={({item}) =>
            (<RenderMealItem item={item} showMealName={showMealName}
                             onPressSelect={() => onSelectMeal(item)} />)}
        />
    )
}

function RenderMealItem({item, onPressSelect, showMealName}) {
    const combinedMealItems = item.beverage.concat(item.main, item.side, item.dessert);

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
            }).catch(err => alert(err.message));
        })
    }

    return (
        <View style={styles.mealItem}>
            <View style={styles.mealNameContainer}>
                {
                    showMealName ? <Text style={styles.mealNameText}>{item.mealName}</Text> :
                                   <Text style={styles.recordDateText}>
                                       {
                                           Moment(new Date(item['record_date']["$date"]))
                                           .format("DD/MM/YYYY HH:mm:ss") + " (" + item['mealType'] + ")"
                                       }
                                   </Text>
                }
                <View style={{flexDirection: 'row'}}>
                    {   // If it is in 'favourite' mode, show the unfavourite button.
                        showMealName && <TouchableOpacity style={styles.deleteButton} onPress={handleUnfavourite}>
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

function FoodItem({food}) {
    let foodName = food["food-name"][0].toUpperCase() + food["food-name"].slice(1);
    const adjustedFontSize = 13;
    if (foodName.length > 20) {
        foodName = foodName.slice(0, 20) + "...";
    }
    return (
        <View style={styles.foodItem}>
            <Image source={{uri: food.imgUrl.url}} style={styles.foodImage} />
            <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: adjustedFontSize, height: 50}}>
                    {foodName}
                </Text>
                <Text>{"Qty: " + food["quantity"]}</Text>
            </View>
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
        height: 250
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
    foodImage: {
        width: 80,
        height: 80
    },
    foodItem: {
        width: 80,
        marginRight: 20
    },
})