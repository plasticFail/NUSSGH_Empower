import React from 'react';
import {ScrollView, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

const drawerItems = [
    { name: 'Edit Account', path: 'AccountDetail', icon: 'user' },
    { name: 'Medication', path: 'Medication', icon: 'capsules'},
    { name: 'Game Center', path: 'GameCenter', icon: 'gamepad'},
    { name: 'Goals', path: 'Goals', icon: 'bullseye'},
    { name: 'Appointments', path: 'Appointments', icon: 'calendar-check'},
    { name: 'Educational Material', path: 'EducationMaterials', icon: 'book'}
]

export function CustomDrawerComponent(props) {
    const {navigation} = props;
    return (
        <View style={styles.container}>
            <Text style={styles.menuText}>Menu</Text>
            <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
                {
                    drawerItems.map((drawerItem, index) => (
                        <TouchableOpacity key={drawerItem.name}
                                          onPress={()=>navigation.navigate(drawerItem.path)}
                                          style={styles.drawerItem}>
                            <Icon name={drawerItem.icon} size={30} color='#fff' />
                            <Text style={styles.drawerItemText}>{drawerItem.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
            <TouchableOpacity style={{height: 100, flexDirection: 'row', alignItems: 'center'}}>
                <Icon name='sign-out-alt' size={30} color='#fff'/>
                <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4EA75A',
        paddingTop: '25%',
        paddingLeft: '10%',
        paddingRight: '10%'
    },
    menuText: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
        paddingBottom: 5
    },
    drawerItem: {
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    drawerItemText: {
        fontSize: 18,
        color: '#fff',
        width: '80%',
        paddingLeft: 10
    },
    logoutText: {
        fontSize: 20,
        color: '#fff',
        paddingLeft: 15
    }
})
