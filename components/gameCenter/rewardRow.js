import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import RewardItem from './rewardItem';


const RewardRow = (props) => {
    const {items} = props;

    return (
        <View style={styles.row}>
            {items.map((item, index) => (
                <RewardItem key={index} item={item}/>
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
