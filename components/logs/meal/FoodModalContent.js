import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Animated} from "react-native";
// Components
import ProgressBar from "../../progressbar";
// Others
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicon from 'react-native-vector-icons/Ionicons';
import CircularProgress from "../../dashboard/todayOverview/CircularProgress";
import logStyles from "../../../styles/logStyles";

const {height, width} = Dimensions.get('window');

const addButtonPadding = 0.18;
// Children prop is any react component passed to serve as a button at the bottom of the modal paper.
export default function FoodModalContent({onClose, selected, children}) {
    const [showImage, setShowImage] = React.useState(false);
    const [showFacts, setShowFacts] = React.useState(false);


    const toggleShowImage = () => {
        setShowImage(!showImage);
    }

    const toggleShowFacts = () => {
        setShowFacts(!showFacts);
    }

    return (
        <View style={logStyles.modalContainer}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={[logStyles.menuBarContainer]}>
                <Ionicon name="arrow-back-outline" color={'#4DAA50'} size={40} onPress={onClose} style={{marginLeft: '2%'}}/>
            </View>
            <View style={[logStyles.bodyPadding, {flex: 1}]}>
            <Text style={[logStyles.headersubText, {fontSize: 24}]}>
                {selected['food-name'][0].toUpperCase() + selected['food-name'].slice(1) + ' - ' + selected['household-measure']}
            </Text>
            <View style={logStyles.componentMargin}>
                <Text style={modalStyles.nutrientHeaderText}>Nutrition per serving</Text>
                <View style={{flexDirection: 'row', minHeight: 100, justifyContent: 'space-between'}}>
                    {renderNutritionCol(selected.nutrients["energy"], "Cal")}
                    {renderNutritionCol(selected.nutrients["carbohydrate"], "Carb")}
                    {renderNutritionCol(selected.nutrients["total-fat"], "Fat")}
                    {renderNutritionCol(selected.nutrients["protein"], "Protein")}
                </View>
            </View>
            <TouchableOpacity style={[logStyles.componentMargin, modalStyles.foodInfoButton]} onPress={toggleShowImage}>
                <Text style={modalStyles.foodInfoButtonText}>Show Product Image</Text>
                <Icon name={showImage ? 'chevron-up' : 'chevron-down'} size={20} color='#000' />
            </TouchableOpacity>
            {
                showImage && (
                    <Image source={{uri: selected.imgUrl.url}}
                           style={modalStyles.image} />
                )
            }
            <TouchableOpacity style={[logStyles.componentMargin, modalStyles.foodInfoButton, {marginTop: 15}]} onPress={toggleShowFacts}>
                <Text style={modalStyles.foodInfoButtonText}>Show Nutrition Facts</Text>
                <Icon name={showFacts ? 'chevron-up' : 'chevron-down'} size={20} color='#000' />
            </TouchableOpacity>
            {
                showFacts && Object.keys(selected.nutrients).map((nutrient, index) => (
                   <View key={nutrient} style={modalStyles.foodInfoRow}>
                       <Text style={modalStyles.foodInfoRowNutrientText}>{nutrient[0].toUpperCase() + nutrient.slice(1)}</Text>
                       <Text style={modalStyles.foodInfoRowQuantityText}>
                           {    selected.nutrients[nutrient].amount === 'N.A' ? 'N.A' :
                                selected.nutrients[nutrient].amount + ' ' + selected.nutrients[nutrient].unit
                            }
                       </Text>
                   </View>
                ))
            }
            </View>
        </ScrollView>
            {children}
        </View>)
}

const colorMap = {
    'Cal': "#84C395",
    'Carb': "#4EA458",
    'Protein': "#265A34",
    'Fat': "#aad326"
}

function renderNutritionCol({amount, unit}, nutrient) {
    // for now generate a random % and use that as the percentage for the progressbar.
    const color = colorMap[nutrient];
    const percent = Math.round(Math.random() * 100) / 100;
    return (<View style={modalStyles.nutrientCol}>
            {
                amount === "N.A" ?
                    <React.Fragment>
                        <Text style={{color: '#7d7d7d'}}>N.A</Text>
                        <Text style={{fontWeight: 'bold'}}>{nutrient}</Text>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <CircularProgress color={color} percent={percent} key={nutrient}
                                          radius={30} padding={5} strokeWidth={5} fontSize={15}/>
                        <Text style={{fontWeight: 'bold'}}>{nutrient}</Text>
                        <Text style={{color: '#7d7d7d'}}>{amount + ' ' + unit}</Text>
                    </React.Fragment>
            }
        </View>
    )
}

const modalStyles = StyleSheet.create({
    root: {
        backgroundColor: '#F7F7FB',
        flex: 1,
    },
    addButtonWrapper: {
        position: 'absolute',
        width: '100%',
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: height * addButtonPadding
    },
    foodInfoButtonsContainer: {
        paddingBottom: 40,
    },
    foodInfoButton: {
        backgroundColor: '#E3E7EE',
        borderRadius: 15,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    foodInfoButtonText: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingRight: '2%'
    },
    foodInfoRow: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#e4e4e4',
        marginLeft: 20,
        marginRight: 20
    },
    foodInfoRowNutrientText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: '4%',
        paddingBottom: '4%'
    },
    foodInfoRowQuantityText: {
        fontSize: 18,
        color: '#7d7d7d',
        paddingTop: '4%',
        paddingBottom: '4%'
    },
    image: {
        width: height * 0.35,
        height: height * 0.35,
        alignSelf: 'center',
        borderRadius: 20
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        height: 0.11 * height,
        justifyContent: 'flex-end',
        marginStart: '4%',
    },
    nutrientCol: {
        width: (width * 0.92 - 40) / 4,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    foodNameText: {
        fontSize: 26,
        fontWeight: 'bold',
        marginStart: '4%',
        marginEnd: '4%',
        paddingBottom: 10
    },
    nutrientHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#8B8A8E'
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
