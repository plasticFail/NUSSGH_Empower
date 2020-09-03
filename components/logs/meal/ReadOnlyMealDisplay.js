import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// Third-party lib
import Moment from 'moment';
// Components
import FoodRow from "./FoodRow";
// Others
import Icon from 'react-native-vector-icons/FontAwesome';


function ReadOnlyMealDisplay(props) {
    const [showFoodItem, setShowFoodItem] = React.useState(false);
    const {meal, style} = props;
    return (
        <View style={[styles.root, style]}>
            <View style={styles.card}>
                <Icon color='#fff' name='utensils' size={30} />
                <Text style={styles.cardText}>{"Last logged for " + meal.mealType + " today."}</Text>
                <Icon color='#fff' name='chevron-down' size={30} />
            </View>
            {
                showFoodItem && (
                    meal.foodItems.map(food => (<FoodRow key={food['food-name']} food={food}/>))
                )
            }
            <Text>To create another log, fill in the rest of the form</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center'
    },
    card: {
        width: '90%',
        padding: 10,
        backgroundColor: '#4DAA50',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
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
