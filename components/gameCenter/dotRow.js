import React from 'react';
import {View, StyleSheet} from 'react-native';
//components
import Dot from './dot';


const DotRow = (props) => {

    return (
        <View style={styles.row}>
            {props.row.map((item, index) => (
                <Dot number={item} bingoPattern={props.bingoPattern[index]} pickState={props.pickState[index]}/>
            ))}
        </View>
    );
};

export default DotRow;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});
