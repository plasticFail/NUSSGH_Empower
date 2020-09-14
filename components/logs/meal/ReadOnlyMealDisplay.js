import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// Components
import FoodRow from "./FoodRow";

function ReadOnlyMealDisplay(props) {
    const {style, show, data} = props;
    return ( show &&
        <View style={[styles.root, style]}>
            <View style={styles.recordDateContainer}>
                <Text style={styles.cardText}>{data.recordDate}</Text>
            </View>
            {
                data.foodItems.map(food => (<FoodRow key={food['food-name']} food={food}/>))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20
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
        color: '#8d8d8d',
        padding: 10,
        width: '80%',
    },
    recordDateContainer: {
        borderBottomWidth: 1,
        borderColor: '#E2E7EE'
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
