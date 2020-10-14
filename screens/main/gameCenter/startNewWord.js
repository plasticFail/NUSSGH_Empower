import React, {useEffect} from 'react';
import globalStyles from '../../../styles/globalStyles';
import {Text, View} from 'react-native';
import LeftArrowBtn from '../../../components/logs/leftArrowBtn';
import SelectWordItem from '../../../components/gameCenter/selectWordItem';
import {GetIconByWord} from '../../../commonFunctions/gameCenterFunctions';


const StartNewWord = (props) => {

    return (
        <View style={{...globalStyles.pageContainer, ...props.style}}>
            <View style={globalStyles.menuBarContainer}>
                <LeftArrowBtn close={() => props.navigation.goBack()} />
            </View>
            <Text style={globalStyles.pageHeader}>Select Word</Text>
            <Text style={[globalStyles.pageDetails]}>Select The Word To Start Game</Text>
            <SelectWordItem imageSource={GetIconByWord('FIT')}
                            wordText={'FIT'}/>

        </View>
    );
}

export default StartNewWord;
