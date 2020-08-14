import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// Third-party lib
import Moment from 'moment';
// Functions
import {getLastMealLog} from "../../../../storage/asyncStorageFunctions";
// Components
import RenderMealItem from "../../../../components/logs/meal/RenderMealItem";

const PreviousMealBlock = (props) => {
    const [mealData, setMealData] = React.useState(null);
    React.useEffect(() => {
        if (mealData === null) {
            getLastMealLog().then(log => {
                setMealData(log);
            });
        }
    }, [mealData]);

    return ( mealData &&
        <View style={styles.root}>
            <Text style={styles.header}>We found this meal log that you have made previously.</Text>
            <Text style={styles.subHeader}>This meal will be registered.</Text>
            <View style={styles.dateAndMealTypeWrapper}>
                <Text style={styles.mealTypeText}>
                    {mealData.selectedMealType[0].toUpperCase() + mealData.selectedMealType.slice(1)}
                </Text>
                <Text style={styles.recordDateText}>
                    {Moment(mealData.selectedDateTime).format("DD/MM/YYYY HH:mm:ss")}
                </Text>
            </View>
            <RenderMealItem item={mealData.selectedMeal} />
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

export default PreviousMealBlock;