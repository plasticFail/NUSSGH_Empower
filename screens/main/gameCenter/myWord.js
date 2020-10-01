import React from 'react';
import {Text, View} from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import LeftArrowBtn from '../../../components/logs/leftArrowBtn';
import InProgress from '../../../components/inProgress';


const MyWord = (props) => {
    return (
        <View style={{...globalStyles.pageContainer, ...props.style}}>
            <View style={globalStyles.menuBarContainer}>
                <LeftArrowBtn close={() => props.navigation.goBack()} />
            </View>
            <Text style={globalStyles.pageHeader}>My Word</Text>
            <InProgress />
        </View>
    )
};

export default MyWord;
