import React from 'react';
import {Text, View, StyleSheet} from "react-native";
// Components
import Select from "../../select";

const options = [{name: "Breakfast", value: "breakfast"},
    {name: "Lunch", value: "lunch"},
    {name: "Dinner", value: "dinner"},
    {name: "Supper", value: "supper"},
    {name: "Snack / Tea", value: "snack"}];

export default function MealTypeSelectionBlock({onSelectChange, defaultValue}) {
    return (
        <View style={{flexDirection: 'column', paddingTop: 30, paddingBottom: 30, width: '100%'}}>
            <Text style={{paddingBottom: 10, fontSize: 20}}>Meal Type:</Text>
            <Select
                defaultValue={defaultValue}
                options={options}
                onSelect={onSelectChange} containerStyle={styles.selectStyle}
                rightIcon="chevron-down"/>
        </View>
    )
}

const styles = StyleSheet.create({
    selectStyle: {
        height: 43,
    }
})