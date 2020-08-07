import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
// Components
import ProgressBar from "../../../../components/progressbar";
// Others
import Icon from 'react-native-vector-icons/dist/FontAwesome';

Icon.loadFont()

// Children prop is any react component passed to serve as a button at the bottom of the modal paper.
export default function FoodModalContent({onClose, selected, children}) {
    return (<View style={modalStyles.root}>
        <TouchableOpacity style={modalStyles.overlay} onPress={onClose} />
        <View style={modalStyles.paper}>
            <View style={modalStyles.header}>
                <Icon name="times" size={25} onPress={onClose} style={modalStyles.closeButton}/>
            </View>
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
                        {renderNutritionRow(selected.nutrients["energy"], "Energy")}
                        {renderNutritionRow(selected.nutrients["carbohydrate"], "Carbohydrate")}
                        {renderNutritionRow(selected.nutrients["protein"], "Protein")}
                        {renderNutritionRow(selected.nutrients["total-fat"], "Total Fat")}
                        {renderNutritionRow(selected.nutrients["saturated-fat"], "Saturated Fat")}
                        {renderNutritionRow(selected.nutrients["dietary-fibre"], "Dietary Fibre")}
                        {renderNutritionRow(selected.nutrients["cholesterol"], "Cholesterol")}
                        {   selected.nutrients.sodium &&
                            renderNutritionRow(selected.nutrients["sodium"], "Sodium")
                        }
                </ScrollView>
            </View>
            {children}
        </View>
    </View>)
}

function renderNutritionRow({amount, unit}, nutrient) {
    // for now generate a random % and use that as the percentage for the progressbar.
    const percent = (Math.random() * 100).toString() + "%";
    return (<View style={modalStyles.nutrientRow}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>{nutrient}</Text>
            {
                unit === "N.A" ? <Text>{unit}</Text>
                    : <Text>{amount + " " + unit}</Text>
            }
        </View>
        <ProgressBar progress={percent} useIndicatorLevel={true}
                     containerStyle={{height: 15, width: '100%'}} />
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
    closeButton: {
        paddingRight: 3
    },
    header: {
        height: '4%',
        width: '100%',
        backgroundColor: '#aad326',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
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
        flex: 1
    },
    nutrientRow: {
        width: '100%',
        paddingTop: 10
    },
    foodNameText: {
        fontSize: 26,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    servingText: {
        fontSize: 18,
        paddingBottom: 10
    },
    nutrientHeaderText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    nutrientText: {
        fontSize: 14
    }
});

// Nutritiona values obtained from: https://www.healthhub.sg/programmes/57/nutrition-101
function getDailyNutritionalValueFor(gender, age, nutrient) {
    if (gender === 'female') {
        if (age < 30) {
            switch(nutrient) {
                case 'energy':
                    return { amount: 2070, unit: 'kcal' }
                case 'protein':
                    return { amount: 62.6, unit: 'g' }
                case 'total-fat':
                    return { amount: 69, unit: 'g' }
                case 'saturated-fat':
                    return { amount: 23, unit: 'g' }
                case 'carbohydrate':
                    return { amount: 300, unit: 'g' }
                case 'dietary-fibre':
                    return { amount: 21, unit: 'g' }
                case 'sodium':
                    return { amount: 2000, unit: 'mg' }
            }
        } else if (age < 60) {
            switch(nutrient) {
                case 'energy':
                    return { amount: 2035, unit: 'kcal' }
                case 'protein':
                    return { amount: 62.6, unit: 'g' }
                case 'total-fat':
                    return { amount: 68, unit: 'g' }
                case 'saturated-fat':
                    return { amount: 23, unit: 'g' }
                case 'carbohydrate':
                    return { amount: 294, unit: 'g' }
                case 'dietary-fibre':
                    return { amount: 20, unit: 'g' }
                case 'sodium':
                    return { amount: 2000, unit: 'mg' }
            }
        } else {
            switch(nutrient) {
                case 'energy':
                    return { amount: 1865, unit: 'kcal' }
                case 'protein':
                    return { amount: 62.6, unit: 'g' }
                case 'total-fat':
                    return { amount: 62, unit: 'g' }
                case 'saturated-fat':
                    return { amount: 21, unit: 'g' }
                case 'carbohydrate':
                    return { amount: 264, unit: 'g' }
                case 'dietary-fibre':
                    return { amount: 19, unit: 'g' }
                case 'sodium':
                    return { amount: 2000, unit: 'mg' }
            }
        }
    } else if (gender === 'male') {
        if (age < 30) {
            switch(nutrient) {
                case 'energy':
                    return { amount: 2700, unit: 'kcal' }
                case 'protein':
                    return { amount: 76.3, unit: 'g' }
                case 'total-fat':
                    return { amount: 90, unit: 'g' }
                case 'saturated-fat':
                    return { amount: 30, unit: 'g' }
                case 'carbohydrate':
                    return { amount: 396, unit: 'g' }
                case 'dietary-fibre':
                    return { amount: 27, unit: 'g' }
                case 'sodium':
                    return { amount: 2000, unit: 'mg' }
            }
        } else if (age < 60) {
            switch(nutrient) {
                case 'energy':
                    return { amount: 2590, unit: 'kcal' }
                case 'protein':
                    return { amount: 76.3, unit: 'g' }
                case 'total-fat':
                    return { amount: 86, unit: 'g' }
                case 'saturated-fat':
                    return { amount: 29, unit: 'g' }
                case 'carbohydrate':
                    return { amount: 377, unit: 'g' }
                case 'dietary-fibre':
                    return { amount: 26, unit: 'g' }
                case 'sodium':
                    return { amount: 2000, unit: 'mg' }
            }
        } else {
            switch(nutrient) {
                case 'energy':
                    return { amount: 2235, unit: 'kcal' }
                case 'protein':
                    return { amount: 76.3, unit: 'g' }
                case 'total-fat':
                    return { amount: 75, unit: 'g' }
                case 'saturated-fat':
                    return { amount: 25, unit: 'g' }
                case 'carbohydrate':
                    return { amount: 315, unit: 'g' }
                case 'dietary-fibre':
                    return { amount: 22, unit: 'g' }
                case 'sodium':
                    return { amount: 2000, unit: 'mg' }
            }
        }
    }
    return null;
}