import React from 'react';
import {Image, Text, View, StyleSheet} from "react-native";

export default function FoodItem({food}) {
    let foodName = food["food-name"][0].toUpperCase() + food["food-name"].slice(1);
    const adjustedFontSize = 13;
    if (foodName.length > 20) {
        foodName = foodName.slice(0, 20) + "...";
    }
    return (
        <View style={styles.foodItem}>
            <Image source={{uri: food.imgUrl.url}} style={styles.foodImage} />
            <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: adjustedFontSize, height: 50, paddingTop: 3}}>
                    {foodName}
                </Text>
                <Text style={{paddingTop: 3}}>{"Qty: " + food["quantity"]}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    foodImage: {
        width: 80,
        height: 80
    },
    foodItem: {
        width: 80,
        marginRight: 20,
    },
})