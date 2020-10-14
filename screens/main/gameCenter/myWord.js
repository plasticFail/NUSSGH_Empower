import React, {useState} from 'react';
import {Text, View} from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import LeftArrowBtn from '../../../components/logs/leftArrowBtn';
import WordTab from '../../../components/gameCenter/wordTabs';
import GameCenterStyles from '../../../styles/gameCenterStyles';
import SelectWordItem from '../../../components/gameCenter/selectWordItem';
import {GetIconByWord} from '../../../commonFunctions/gameCenterFunctions';
import WordItem from '../../../components/gameCenter/wordItem';
import {requestSelectGame} from '../../../netcalls/gameCenterEndPoints/requestGameCenter';


const MyWord = (props) => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const startWord = async(word) => {
        let responseObj = await requestSelectGame(word);
        if(responseObj != null){
            props.navigation.goBack();
        }
    }

    return (
        <View style={{...globalStyles.pageContainer, ...props.style}}>
            <View style={globalStyles.menuBarContainer}>
                <LeftArrowBtn close={() => props.navigation.goBack()} />
            </View>
            <Text style={globalStyles.pageHeader}>My Word</Text>

            <WordTab currentTab={currentTabIndex} setTabCallback={setCurrentTabIndex}/>

            <View style={GameCenterStyles.cardPadding}>
                <Text style={[globalStyles.pageDetails]}>Season 1</Text>

                {currentTabIndex === 1 && props.route.params.games.map((item, index) => (
                    <WordItem key={index}
                              imageSource={GetIconByWord(item.word)}
                              wordText={item.word}
                              percentage={item.word_progress + '%'}
                              showArrow={true}
                              clickFunc={() => {startWord(item.word)}}
                    />
                ))}

            </View>

        </View>
    )
};

export default MyWord;
