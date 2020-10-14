import React from 'react';
import GameCenterStyles from '../../styles/gameCenterStyles';
import {Text, TouchableOpacity, View} from 'react-native';
import globalStyles from '../../styles/globalStyles';


const SelectWordConfirmPage = (props) => {
    return (
        <View style={[GameCenterStyles.modalViewSmall, GameCenterStyles.card, GameCenterStyles.cardPadding]}>
            <Text style={globalStyles.pageDetails}>Confirm Word Selection</Text>
            <Text style={GameCenterStyles.wordText}>{props.word}</Text>
            <TouchableOpacity
                style={[GameCenterStyles.buttonStyle, GameCenterStyles.darkGreenColor]}
                onPress={() => props.startWord(props.word)}>
                <Text style={[globalStyles.actionButtonText, GameCenterStyles.whiteText]}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[GameCenterStyles.buttonStyle]}
                onPress={() => props.closeModal()}>
                <Text style={[globalStyles.actionButtonText]}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SelectWordConfirmPage;

