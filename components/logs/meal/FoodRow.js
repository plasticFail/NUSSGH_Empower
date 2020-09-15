import {Image, Text, View} from "react-native";
import React from "react";

export default function FoodRow({food}) {
    return (
        <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: '#E2E7EE', alignItems: 'center', paddingBottom: 10, paddingTop: 10, width: '100%'}}>
            <Image source={{uri: food.imgUrl.url}} style={{height: 60, width: 60, borderRadius: 10}}/>
            <View style={{paddingLeft: '3%'}}>
                <Text style={{fontSize: 20}}>{food["food-name"][0].toUpperCase() + food["food-name"].slice(1)}</Text>
                <Text style={{fontSize: 16, color: '#7d7d7d'}}>{food["quantity"] + " Serving(s)"}</Text>
            </View>
        </View>
    )
}
//edit flag
