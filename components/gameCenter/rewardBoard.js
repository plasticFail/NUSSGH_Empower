import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import RewardRow from './rewardRow';


const RewardBoard = (props) => {
    const rewardList = [1, 1, 1];

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.column}>
                {rewardList.map((item, index) => (
                    <RewardRow key={index} />
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
        alignItems: 'center',
    }
});
