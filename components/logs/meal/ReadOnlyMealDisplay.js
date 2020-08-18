import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// Third-party lib
import Moment from 'moment';
// Components
import RenderMealItem from "./RenderMealItem";

const ReadOnlyMealDisplay = ({meal}) => {
    return (
        <View style={styles.root}>
            <View style={styles.dateAndMealTypeWrapper}>
                <Text style={styles.mealTypeText}>
                    {meal.mealType[0].toUpperCase() + meal.mealType.slice(1)}
                </Text>
                <Text style={styles.recordDateText}>
                    {meal.recordDate instanceof Date ? Moment(meal.recordDate).format("DD/MM/YYYY HH:mm:ss")
                        : meal.recordDate }
                </Text>
            </View>
            <RenderMealItem item={meal} />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: '5%'
    },
    dateAndMealTypeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',

    },
    mealTypeText: {
        fontSize: 15
    },
    recordDateText: {
        fontSize: 15,
        color: '#7d7d7d'
    }
})

export default ReadOnlyMealDisplay;