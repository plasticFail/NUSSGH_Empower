import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { PieChart } from 'react-native-svg-charts'
import {DAY_FILTER_KEY, WEEK_FILTER_KEY} from "../../../screens/main/reports";
import {filterToDayData, filterToWeekData, getBinCount} from "../../../commonFunctions/reportDataFormatter";

function NutritionPie(props) {
    const pieData = filterAndProcessData(props.data, props.filterKey, props.pieKeys);
    return <PieChart style={{ height: 200 }} data={pieData} />
}

function filterAndProcessData(data, filterKey, pieKeys) {
    const filteredData = filterKey === DAY_FILTER_KEY ? filterToDayData(data, new Date(), d=>d.date)
        : filterKey === WEEK_FILTER_KEY ? filterToWeekData(data, new Date(), d=>d.date) : data;
    let result = [];
    for (const key of pieKeys) {
        const binCount = getBinCount(filteredData, d=>key, d=>d.nutrients[key].amount);
        if (binCount != -1) {
            result.push(binCount);
        }
    }
    const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);
    const pieData = result.map(d => {
        const [nutrient, quantity] = Object.entries(d)[0];
        return Math.round(quantity);
    }).map((value, index) => ({
        value,
        svg: {
            fill: randomColor(),
            onPress: () => console.log('press', index),
        },
        key: `pie-${index}`,
    }))

    return pieData
}

export {NutritionPie};
