import React from 'react';
import {ScrollView, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import FoodItem from "./FoodItem";

export default function RenderMealItem({item, options, containerStyle, onSelectMeal}) {
    return (
        <TouchableOpacity style={{...styles.mealItem, ...containerStyle}} onPress={onSelectMeal}>
            {
                options?.buttons.map(buttonOption => (
                    <TouchableOpacity style={{...styles.button, ...buttonOption.buttonStyle}}
                                      onPress={()=>buttonOption.onPress(item)}>
                        {
                            buttonOption.icon ? <Icon size={34} name={buttonOption.icon.name}
                                                      color={buttonOption.icon.color} /> : null
                        }
                    </TouchableOpacity>
                ))
            }
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{item["mealName"]}</Text>
                <Text style={[styles.headerText, {color: '#7d7d7d'}]}>{item.foodItems.length + ' Different Item(s)'}</Text>
            </View>
            {
                /*
                <View style={styles.headerContainer}>
                <ScrollView horizontal={true} style={{flex: 1}}>
                    <Text style={styles.headerText}>{options?.header ? options.header(item) : item.mealName}</Text>
                </ScrollView>
                <View style={{flexDirection: 'row'}}>
                    {
                        options?.buttons.map(buttonOption => (
                            <TouchableOpacity style={{...styles.button, ...buttonOption.buttonStyle}}
                                              onPress={() => buttonOption.onPress(item)}>
                                {   buttonOption.icon ? <Icon size={20} name={buttonOption.icon.name}
                                                              color={buttonOption.icon.color || '#fff'} /> :
                                    <Text style={styles.buttonText}>{buttonOption.text}</Text>
                                }
                            </TouchableOpacity>))
                    }
                </View>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{flexDirection: 'row'}}
                        horizontal={true}>
                {
                    item.foodItems.map(food => <FoodItem key={food["food-name"]} food={food} />)
                }
            </ScrollView>

                 */
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mealItem: {
        borderBottomWidth: 0.5,
        borderColor: '#cfcfcf',
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerContainer: {
        paddingLeft: '3%'
    },
    headerText: {
        fontSize: 16,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#fff"
    }
})
