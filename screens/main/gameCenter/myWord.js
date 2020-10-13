import React, {useState} from 'react';
import {Text, View} from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import LeftArrowBtn from '../../../components/logs/leftArrowBtn';
import WordTab from '../../../components/gameCenter/wordTabs';
import GameCenterStyles from '../../../styles/gameCenterStyles';


const MyWord = (props) => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    return (
        <View style={{...globalStyles.pageContainer, ...props.style}}>
            <View style={globalStyles.menuBarContainer}>
                <LeftArrowBtn close={() => props.navigation.goBack()} />
            </View>
            <Text style={globalStyles.pageHeader}>My Word</Text>

            <WordTab currentTab={currentTabIndex} setTabCallback={setCurrentTabIndex}/>

            <View style={GameCenterStyles.cardPadding}>
                <Text style={[globalStyles.pageDetails]}>Season 1</Text>


            </View>

        </View>
    )
};

export default MyWord;
