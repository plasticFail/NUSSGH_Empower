import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
//others
import {Colors} from "../../../../styles/colors";
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CALENDAR_LOGO from '../../../../resources/images/Patient-Icons/SVG/icon-green-calendar.svg'

export default function NotificationsCard(props) {
    return (
        <TouchableOpacity style={[styles.card, styles.shadow]}>
            <CALENDAR_LOGO width={30} height={30} />
            <Text style={{color: Colors.backArrowColor, flex: 1, marginLeft: '3%'}}>2 <Text style={{color: '#000'}}>
                Upcoming Appointments
            </Text></Text>
            <Icon name='chevron-right' size={20} color={Colors.lastLogValueColor}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        margin: '5%',
        padding: '4%',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
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
    }
});
