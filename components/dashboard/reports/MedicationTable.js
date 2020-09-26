import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {DAY_FILTER_KEY, WEEK_FILTER_KEY} from "../../../screens/main/reports";
import {
    filterToDayData,
    filterToWeekData,
    getBinCount,
    partitionDataPoints,
    squashToXY
} from "../../../commonFunctions/reportDataFormatter";
import ProgressBar from "../../progressbar";
import Moment from 'moment';
import globalStyles from "../../../styles/globalStyles";
import {getPlan} from "../../../netcalls/requestsMedPlan";

function MedicationTable(props) {
    const filteredData = props.filterKey === DAY_FILTER_KEY ? filterToDayData(props.data, new Date(), d=>d.record_date)
        : props.filterKey === WEEK_FILTER_KEY ? filterToWeekData(props.data, new Date(), d=>d.record_date) : props.data;
    const filteredPlans = filterPlans(props.plan, props.filterKey);
    const zipped = zipMedicationData(filteredPlans, filteredData);
    const adherenceData = calculateAdherence(zipped);
    //const binCount = getBinCount(filteredData, d=>d.medication, d=>d.dosage);
    return (
        <View style={props.style}>
            {Object.entries(adherenceData).map((item, index) => {
                const [key, value] = item;
                return (
                    <MedicationRowDisplay med={key} quantity={value.adherence} key={`med-${index}`} />
                )
            })}
        </View>
        /*
        <FlatList data={Object.entries(binCount)}
                  style={props.style}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => {
                      const [key, value] = item;
                      return (
                          <MedicationRowDisplay med={key} quantity={value} />
                      )
                  }}
        />
         */
    )
}

function zipMedicationData(medPlan, medData) {
    let result = {};
    if (medData.length === 0) {
        return result;
    }
    for (const plan of Object.entries(medPlan)) {
        const [date, medications] = plan;
        if (!(date in result)) {
            result[date] = {};
            for (const medplanMed of medications) {
                result[date][medplanMed.medication] = {
                    perDay: medplanMed.per_day,
                    cumulativeDosage: 0
                }
            }
        }
    }
    for (const data of medData) {
        let date = Moment(data.record_date, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD');
        if (!(data.medication in result[date])) {
            result[date][data.medication] = {
                cumulativeDosage: 0,
                perDay: null // Medication isnt in med plan.
            }; // This is the cumulative dosage
        }
        result[date][data.medication].cumulativeDosage += data.dosage;
    }
    return result;
}

function filterPlans(medPlan, filterKey) {
    let result = {};
    const endDate = Moment(new Date());
    if (filterKey === DAY_FILTER_KEY) {
        for (const [date, plans] of Object.entries(medPlan)) {
            if (date === endDate.format('YYYY-MM-DD')) {
                result[date] = plans;
            }
        }
        return result;
    } else if (filterKey === WEEK_FILTER_KEY) {
        const startDate = Moment(new Date()).subtract(7, "days");
        for (const [date, plans] of Object.entries(medPlan)) {
            if (Moment(date, 'YYYY-MM-DD').isBetween(startDate, endDate)) {
                result[date] = plans;
            }
        }
        return result;
    } else {
        return medPlan;
    }
}

function calculateAdherence(zippedData) {
    let result = {};
    for (const [date, medConsumObject] of Object.entries(zippedData)) {
        for (const [medication, consumption] of Object.entries(medConsumObject)) {
            if (!(medication in result)) {
                result[medication] = {
                    adherence: [],
                    spontaneous: 0
                }
            }
            if (consumption.perDay !== null) {
                const val = Math.min(consumption.cumulativeDosage / consumption.perDay, 1.0);
                result[medication].adherence.push(val);
            } else {
                result[medication].spontaneous += consumption.cumulativeDosage;
            }
        }
    }
    console.log(result);
    for (const [medication, values] of Object.entries(result)) {
        if (result[medication].adherence.length === 0) {
            result[medication].adherence = 0;
        } else {
            result[medication].adherence = values.adherence
                .reduce((acc, curr, index) => acc + curr, 0) / values.adherence.length;
        }
    }
    return result;
}

function MedicationRowDisplay({med, quantity}) {
    return (
        <View style={{paddingTop: 15, paddingBottom: 15}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7, alignItems: 'center'}}>
                <Text style={{fontSize: 18, fontFamily: 'SFProDisplay-Regular'}}>{med}</Text>
                <Text>{Math.round(quantity * 100) + "%"}</Text>
            </View>
            <ProgressBar containerStyle={{height: 7.5, width: '90%', marginBottom: 5}} progress={`${quantity * 100}%`}
                         reverse={true}
                         useIndicatorLevel={true} />
        </View>
    )
}

function MedicationDateDisplay({filterKey, style}) {
    const dateFormat = 'DD MMM';
    const startDate = filterKey === DAY_FILTER_KEY ? Moment(new Date()).format(dateFormat) :
        filterKey === WEEK_FILTER_KEY ? Moment(new Date()).subtract(7, 'days').format(dateFormat) :
            Moment(new Date()).subtract(28, "days").format(dateFormat);
    const endDate = Moment(new Date()).format(dateFormat);

    return (
        <View style={style}>
            <Text style={{fontSize: 18, color: '#3C3C43'}}>{`${startDate} - ${endDate}`}</Text>
        </View>
    )
}

export {MedicationTable, MedicationDateDisplay};
