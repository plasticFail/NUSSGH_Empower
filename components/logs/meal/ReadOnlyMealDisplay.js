import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// Third-party lib
import Moment from 'moment';
// Components
import RenderMealItem from "./RenderMealItem";

const ReadOnlyMealDisplay = (props) => {
    const {meal, style} = props;
    return (
        <View style={[styles.root, styles.shadow, style]}>
            <View style={styles.dateAndMealTypeWrapper}>
                <Text style={styles.mealTypeText}>
                    {meal.mealType[0].toUpperCase() + meal.mealType.slice(1)}
                </Text>
                {
                    /*
                    <Text style={styles.recordDateText}>
                        {meal.recordDate instanceof Date ? Moment(meal.recordDate).format("DD/MM/YYYY HH:mm:ss")
                            : meal.recordDate }
                    </Text>
                     */
                }
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
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 15
    },
    dateAndMealTypeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',

    },
    mealTypeText: {
        fontSize: 15,
        paddingBottom: 4,
    },
    recordDateText: {
        fontSize: 15,
        color: '#7d7d7d'
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