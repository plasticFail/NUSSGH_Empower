import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {requestNutrientConsumption} from "../../../../netcalls/mealEndpoints/requestMealLog";
import {getLastMinuteFromTodayDate, getTodayDate} from "../../../../commonFunctions/common";
import Moment from "moment";
import {getEntry4Day} from "../../../../netcalls/requestsDiary";

const {width, height} = Dimensions.get('window');

export default function DiaryCard(props) {
    const {bgl, calorie, weight} = props;

    return (
        <View style={[styles.card, styles.shadow, {margin:'5%', flexDirection: 'column', alignItems: 'flex-start'}]}>
            <View style={{borderBottomWidth: 0.5, borderColor: '#7d7d7d', width: '100%'}}>
                <Text style={{padding: 20, fontWeight: 'bold', fontSize: 24, color: '#7d7d7d'}}>Overview</Text>
            </View>
            <View style={styles.overviewRow}>
                <Text style={styles.metricText}>Blood Glucose</Text>
                <Text style={styles.measuredText}>{bgl ? bgl + " mmol/L" : "Not taken yet"}</Text>
            </View>
            <View style={styles.overviewRow}>
                <Text style={styles.metricText}>Nutrition</Text>
                <Text style={styles.measuredText}>{calorie} kcal</Text>
            </View>
            <View style={[styles.overviewRow, {borderBottomWidth: 0}]}>
                <Text style={styles.metricText}>Weight</Text>
                <Text style={styles.measuredText}>{weight ? weight + " kg" : "Not taken yet"}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    overviewRow: {
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        borderBottomWidth: 0.5,
        borderColor: '#7d7d7d',
        width: width - 80
    },
    metricText: {
        fontWeight: 'bold',
        color: '#7d7d7d'
    },
    measuredText: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 18
    }
})
//edit flag
