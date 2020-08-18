import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// Third-party lib
import Moment from 'moment';
// Components
import RenderMealItem from "./RenderMealItem";

const ReadOnlyMealDisplay = ({meal}) => {
    return (
        <View style={styles.root}>
            <Text style={styles.header}>We found this meal log that you have made previously.</Text>
            <Text style={styles.subHeader}>This meal will be registered.</Text>
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
        flex: 1,
        marginLeft: '5%',
        marginRight: '5%',
        justifyContent: 'space-around',
    },
    dateAndMealTypeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: '10%'
    },
    header: {
       fontSize: 24
    },
    subHeader: {
        fontSize: 20,
        paddingTop: '10%'
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