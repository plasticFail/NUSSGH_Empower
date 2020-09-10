import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// Third-party lib
import Moment from 'moment';
// Components
import FoodRow from "./FoodRow";
// Others
import Icon from 'react-native-vector-icons/FontAwesome5';

const meal = {
    mealName: 'My Meal',
    mealType: 'breakfast',
    foodItems: [
        {
            "_id" : "5ec4e766f0ab4835be506cd2",
            "category" : "BEVERAGES",
            "food-name" : "2-in-1 coffee powder, with sugar",
            "description" : "Instant coffee with sugar",
            "edible-portion" : "100%",
            "per-serving" : "15 g",
            "quantity": 2,
            "household-measure" : "Sachet",
            "nutrients" : {
                "energy" : {
                    "amount" : "60.6",
                    "unit" : "kcal",
                    "rating" : "high"
                },
                "protein" : {
                    "amount" : "0.87",
                    "unit" : "g",
                    "rating" : "medium"
                },
                "total-fat" : {
                    "amount" : "0.45",
                    "unit" : "g",
                    "rating" : "medium"
                },
                "saturated-fat" : {
                    "amount" : "0.2",
                    "unit" : "g",
                    "rating" : "medium"
                },
                "dietary-fibre" : {
                    "amount" : "1.2",
                    "unit" : "g",
                    "rating" : "high"
                },
                "carbohydrate" : {
                    "amount" : "13.28",
                    "unit" : "g",
                    "rating" : "high"
                },
                "cholesterol" : {
                    "amount" : "N.A",
                    "unit" : "N.A"
                },
                "sodium" : {
                    "amount" : "21.15",
                    "unit" : "mg",
                    "rating" : "medium"
                }
            },
            "subcategory" : "Non-alcoholic beverages",
            "checked" : 1,
            "imgUrl" : {
                "url" : "https://cdn.pixabay.com/photo/2018/06/06/10/13/coffee-beans-3457587__340.jpg",
                "author" : "N.A"
            }
        }
    ]
};

function ReadOnlyMealDisplay(props) {
    const [showFoodItem, setShowFoodItem] = React.useState(false);
    const {style, show} = props;
    return ( show &&
        <View style={[styles.root, style]}>
            {
                /*
                <TouchableOpacity style={styles.card} onPress={()=>setShowFoodItem(!showFoodItem)}>
                    <Icon color='#fff' name='utensils' size={30} />
                    <Text style={styles.cardText}>{"Last logged for " + meal.mealType + " today."}</Text>
                    <Icon color='#fff' name={showFoodItem ? 'chevron-up' : 'chevron-down'} size={30} />
                </TouchableOpacity>
                 */
            }
            {
                showFoodItem && (
                    meal.foodItems.map(food => (<FoodRow key={food['food-name']} food={food}/>))
                )
            }
            { /*
                <Text style={{fontSize: 16, width: '100%', paddingTop: 10}}>To create another log, fill in the rest of the form</Text>
                */
            }
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 10,
    },
    card: {
        width: '100%',
        padding: 15,
        backgroundColor: '#4DAA50',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
    },
    cardText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        width: '80%'
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})

export default ReadOnlyMealDisplay;
