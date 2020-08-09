import React from 'react';
import {ScrollView, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import FoodItem from "./FoodItem";

export default function RenderMealItem({item, options}) {
    const combinedMealItems = item.beverage.map(x => x).concat(item.main, item.side, item.dessert);
    return (
        <View style={styles.mealItem}>
            <View style={styles.headerContainer}>
                <ScrollView horizontal={true} style={{flex: 1}}>
                    <Text style={styles.headerText}>{options.header ? options.header(item) : item.mealName}</Text>
                </ScrollView>
                <View style={{flexDirection: 'row'}}>
                    {
                        options.buttons.map(buttonOption => (
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
                    combinedMealItems.map(food => <FoodItem key={food["food-name"]} food={food} />)
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mealItem: {
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderColor: '#cfcfcf',
        height: 250,
    },
    headerContainer: {
        height: '30%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    recordDateText: {
        fontSize:  18,
        color: '#7d7d7d'
    },
    button: {
        backgroundColor: '#288259',
        width: 60,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 15
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#fff"
    }
})