import React from 'react';
import globalStyles from '../../../styles/globalStyles';
import {Text, View} from 'react-native';
import LeftArrowBtn from '../../../components/logs/leftArrowBtn';


const StartNewWord = (props) => {
    return (
        <View style={{...globalStyles.pageContainer, ...props.style}}>
            <View style={globalStyles.menuBarContainer}>
                <LeftArrowBtn close={() => props.navigation.goBack()} />
            </View>
            <Text style={globalStyles.pageHeader}>My Word</Text>


        </View>
    );
}

export default StartNewWord;
