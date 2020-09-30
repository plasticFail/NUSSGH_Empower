import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import DotRow from './dotRow';
//styles
import GameCenterStyles from '../../styles/gameCenterStyles';


const DotBoard = props => {

    const [pickState, setPickState] = useState([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ]);

    const pickByPosition = (row, column) => {
        pickState[row][column] = 1 - pickState[row][column];
        setPickState([...pickState]);

        console.log('click at ' + row + " " + column);
    };

    return (
        <View style={[styles.board, GameCenterStyles.cardGreen, GameCenterStyles.cardPadding]}>
            <Image resizeMode="contain" style={GameCenterStyles.subLogo} source={require('../../resources/images/gameCenter/img-header.png')}/>
            {props.boardNum.map((item, index) => (
                <DotRow row={item} bingoPattern={props.bingoPattern[index]} pickState={pickState[index]} />
            ))}
        </View>
    );
};

export default DotBoard;

const styles = StyleSheet.create({
    board: {
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});
