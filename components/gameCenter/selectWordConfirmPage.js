import React from 'react';
import GameCenterStyles from '../../styles/gameCenterStyles';
import {Text, View} from 'react-native';
import globalStyles from '../../styles/globalStyles';


const SelectWordConfirmPage = (props) => {
    return (
        <View style={[styles.modalView, GameCenterStyles.card, GameCenterStyles.cardPadding]}>
            <Text style={globalStyles.pageHeader}>Confirm Word Selection</Text>
        </View>
    );
};

export default SelectWordConfirmPage;

