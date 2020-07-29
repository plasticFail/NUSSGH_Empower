import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ProgressBar from "../../../../components/progressbar";

export default function FoodModalContent({onClose, selected, children}) {
    return (<View style={modalStyles.root}>
        <TouchableOpacity style={modalStyles.overlay} onPress={onClose} />
        <View style={modalStyles.paper}>
            <Image style={modalStyles.image} source={{uri: selected.imgUrl.url}}/>
            <View style={modalStyles.nutritionInfoContainer}>
                <ScrollView contentContainerStyle={{padding: 15}}>
                    <Text style={modalStyles.foodNameText}>
                        {selected["food-name"][0].toUpperCase() + selected["food-name"].slice(1)}
                    </Text>
                    <Text style={modalStyles.servingText}>
                        {selected["household-measure"]}({selected["per-serving"]})
                    </Text>
                    <Text style={modalStyles.nutrientHeaderText}>Nutrition per serving</Text>
                    <View style={modalStyles.nutrientRow}>
                        {renderNutritionText(selected.nutrients["energy"], "Energy")}
                        <ProgressBar progress="30%" useIndicatorLevel={true}
                                     containerStyle={{height: 15, width: '100%'}} />
                    </View>
                    <View style={modalStyles.nutrientRow}>
                        {renderNutritionText(selected.nutrients["carbohydrate"], "Carbohydrate")}
                        <ProgressBar progress="60%" useIndicatorLevel={true}
                                     containerStyle={{height: 15, width: '100%'}} />
                    </View>
                    <View style={modalStyles.nutrientRow}>
                        {renderNutritionText(selected.nutrients["protein"], "Protein")}
                        <ProgressBar progress="90%" useIndicatorLevel={true} reverse={true}
                                     containerStyle={{height: 15, width: '100%'}} />
                    </View>
                    <View style={modalStyles.nutrientRow}>
                        {renderNutritionText(selected.nutrients["total-fat"], "Total Fat")}
                        <ProgressBar progress="60%" useIndicatorLevel={true}
                                     containerStyle={{height: 15, width: '100%'}} />
                    </View>
                    <View style={modalStyles.nutrientRow}>
                        {renderNutritionText(selected.nutrients["saturated-fat"], "Saturated Fat")}
                        <ProgressBar progress="60%" useIndicatorLevel={true}
                                     containerStyle={{height: 15, width: '100%'}} />
                    </View>
                    <View style={modalStyles.nutrientRow}>
                        {renderNutritionText(selected.nutrients["dietary-fibre"], "Dietary Fibre")}
                        <ProgressBar progress="30%" useIndicatorLevel={true} reverse={true}
                                     containerStyle={{height: 15, width: '100%'}} />
                    </View>
                    <View style={modalStyles.nutrientRow}>
                        {renderNutritionText(selected.nutrients["cholesterol"], "Cholesterol")}
                        <ProgressBar progress="60%" useIndicatorLevel={true}
                                     containerStyle={{height: 15, width: '100%'}} />
                    </View>
                    {   selected.nutrients.sodium &&
                    <View style={modalStyles.nutrientRow}>
                        {renderNutritionText(selected.nutrients["sodium"], "Sodium")}
                        <ProgressBar progress="90%" useIndicatorLevel={true}
                                     containerStyle={{height: 15, width: '100%'}} />
                    </View>
                    }
                </ScrollView>
            </View>
            {children}
        </View>
    </View>)
}

function renderNutritionText({amount, unit}, nutrient) {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>{nutrient}</Text>
            {
                unit === "N.A" ? <Text>{unit}</Text>
                    : <Text>{amount + " " + unit}</Text>
            }
        </View>
    )
}

const modalStyles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    overlay: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute'
    },
    paper: {
        backgroundColor: 'white',
        width: '80%',
        height: '75%'
    },
    image: {
        width: '100%',
        height: '40%'
    },
    nutritionInfoContainer: {
        height: '53.5%',
    },
    button: {
        width: '100%',
        height: 55,
        backgroundColor:'#aad326',
        justifyContent: 'center',
        alignSelf: 'center',
        transform: [{"translateY": 27.5}] // Half of height
    },
    buttonText: {
        color:'#000',
        textAlign:'center',
        fontSize: 22,
        fontWeight: 'bold'
    },
    nutrientRow: {
        width: '100%',
        paddingTop: 10
    },
    foodNameText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 5
    },
    servingText: {
        fontSize: 14,
        paddingBottom: 5
    },
    nutrientHeaderText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    nutrientText: {
        fontSize: 14
    }
});