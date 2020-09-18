import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import BGL_LOGO from '../../../../resources/images/icons/SVG/icon-darkgreen-bloodglucose.svg';
import CALORIE_LOGO from '../../../../resources/images/icons/SVG/icon-darkgreen-food.svg';
import WEIGHT_LOGO from '../../../../resources/images/icons/SVG/icon-darkgreen-weight.svg';

const {width} = Dimensions.get('window');

const logoConfig = {
    width: 30,
    height: 30
}

export default function DiaryCard(props) {
    const {bgl, calorie, weight} = props;

    return (
        <View style={[styles.card, styles.shadow, {margin:'5%', flexDirection: 'column', alignItems: 'flex-start'}]}>
            <View style={{borderBottomWidth: 0.5, borderColor: '#7d7d7d', width: '100%'}}>
                <Text style={{padding: 20, fontWeight: 'bold', fontSize: 24, color: '#7d7d7d'}}>Overview</Text>
            </View>
            <View style={styles.overviewRow}>
                <BGL_LOGO {...logoConfig} />
                <View style={{marginLeft: '4%'}}>
                    <Text style={styles.metricText}>Blood Glucose</Text>
                    <Text style={styles.measuredText}>{bgl ? bgl + " mmol/L" : "Not taken yet"}</Text>
                </View>
            </View>
            <View style={styles.overviewRow}>
                <CALORIE_LOGO {...logoConfig} />
                <View style={{marginLeft: '4%'}}>
                    <Text style={styles.metricText}>Nutrition</Text>
                    <Text style={styles.measuredText}>{calorie} kcal</Text>
                </View>
            </View>
            <View style={[styles.overviewRow, {borderBottomWidth: 0}]}>
                <WEIGHT_LOGO {...logoConfig} />
                <View style={{marginLeft: '4%'}}>
                    <Text style={styles.metricText}>Weight</Text>
                    <Text style={styles.measuredText}>{weight ? weight + " kg" : "Not taken yet"}</Text>
                </View>
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
        width: width - 80,
        flexDirection: 'row'
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
