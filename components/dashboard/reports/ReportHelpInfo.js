import React from 'react';
import EvilIcon from "react-native-vector-icons/EvilIcons";
import {Colors} from "../../../styles/colors";
import {TouchableOpacity, View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions} from "react-native";

const lineChartToolTipMessage = "Swipe on the graph to look at various timestamps!";
const barChartToolTipMessage = "Tap on the bars for more details!";

const {width, height} = Dimensions.get('window');

function ReportHelpInfo(props) {
    const {showInfo, toggleInfoCallback} = props;
    return (<TouchableOpacity onPress={toggleInfoCallback}>
        <EvilIcon
            name="question"
            color={Colors.lastLogButtonColor}
            size={40}
            style={{paddingRight: 15}}
        />
        { showInfo &&
        <View style={[styles.tooltip, {transform: [{translateX: -170}, {translateY: 20}]}]}>
            <Text>{props.message}</Text>
        </View>
        }
    </TouchableOpacity>)
}

const styles = StyleSheet.create({
    tooltip: {
        position: 'absolute',
        width: 180,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: '#8d8d8d',
        borderWidth: 1
    }
})

export {ReportHelpInfo, barChartToolTipMessage, lineChartToolTipMessage};
