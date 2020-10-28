import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import RewardRow from './rewardRow';


const RewardBoard = (props) => {
    const {items} = props;

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.column}>
                {items.map((item, index) => (
                    <RewardRow key={index} items={item} />
                ))}
            </View>
        </ScrollView>
    );
}

export default RewardBoard;

const styles = StyleSheet.create({
    column: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    }
});
