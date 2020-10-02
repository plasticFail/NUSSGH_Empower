import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function ChartLegend(props) {
    const size = props.size || 30;
    return (
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <LegendCircle color={props.color} size={size} />
            <Text style={{paddingLeft: props.textPaddingLeft || 0, paddingRight: props.textPaddingRight || 0, color: '#3C3C43'}}>
                {props.legendName}
            </Text>
        </View>
    )
}

function LegendCircle(props) {
    return (
        <View style={{width: props.size, height: props.size, justifyContent: 'center', alignItems: 'center',
            backgroundColor: props.color, borderRadius: props.size/2}}>
            <View style={{width: props.size / 2, height: props.size / 2, backgroundColor: '#fff', borderRadius: props.size /4}} />
        </View>
    )
}

export {ChartLegend};
