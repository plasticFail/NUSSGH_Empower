import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {DAY_FILTER_KEY, WEEK_FILTER_KEY} from "../../../screens/main/reports";
import {filterToDayData, filterToWeekData, getBinCount} from "../../../commonFunctions/reportDataFormatter";
import ProgressBar from "../../progressbar";
import globalStyles from "../../../styles/globalStyles";

function MedicationTable(props) {
    const [medPlan, setMedPlan] = React.useState(null);
    const [didMount, setDidMount] = React.useState(false);

    React.useEffect(() => {
        if (!didMount) {

            setDidMount(true);
        }
    })


    const filteredData = props.filterKey === DAY_FILTER_KEY ? filterToDayData(props.data, new Date(), d=>d.record_date)
        : props.filterKey === WEEK_FILTER_KEY ? filterToWeekData(props.data, new Date(), d=>d.record_date) : props.data;
    const binCount = getBinCount(filteredData, d=>d.medication, d=>d.dosage);

    return (
        <View style={props.style}>
            {Object.entries(binCount).map((item, index) => {
                const [key, value] = item;
                return (
                    <MedicationRowDisplay med={key} quantity={value} key={`med-${index}`} />
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

function MedicationRowDisplay({med, quantity}) {
    return (
        <View style={{paddingTop: 15, paddingBottom: 15}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7, alignItems: 'center'}}>
                <Text style={{fontSize: 18, fontFamily: 'SFProDisplay-Regular'}}>{med}</Text>
                <Text>{quantity}</Text>
            </View>
            <ProgressBar containerStyle={{height: 7.5, width: '90%', marginBottom: 5}} progress={"33%"} useIndicatorLevel />
        </View>
    )
}

export {MedicationTable};
