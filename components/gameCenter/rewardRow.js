import React from 'react';
import {StyleSheet, View} from 'react-native';
import RewardItem from './rewardItem';


const RewardRow = (props) => {
    const rewardList = [1, 1];

    return (
        <View style={styles.row}>
            {rewardList.map((item, index) => (
                <RewardItem key={index} numberInRow={rewardList.length}/>
            ))}
        </View>
    );
}

export default RewardRow;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});
