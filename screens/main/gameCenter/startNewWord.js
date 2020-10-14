import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
//styles
import globalStyles from '../../../styles/globalStyles';
//components
import LeftArrowBtn from '../../../components/logs/leftArrowBtn';
import SelectWordItem from '../../../components/gameCenter/selectWordItem';
import {GetIconByWord} from '../../../commonFunctions/gameCenterFunctions';
import SelectWordConfirmPage from '../../../components/gameCenter/selectWordConfirmPage';
//functions
import {requestSelectGame} from '../../../netcalls/gameCenterEndPoints/requestGameCenter';


const StartNewWord = (props) => {
    const [showConfirmWordSelection, setShowConfirmWordSelection] = useState(false);

    const confirmStartWord = (word) => {
        setShowConfirmWordSelection(true);
    }

    const startWord = async(word) => {
        let responseObj = await requestSelectGame(word);
        if(responseObj != null){

        }
    }

    return (
        <View style={{...globalStyles.pageContainer, ...props.style}}>
            <View style={globalStyles.menuBarContainer}>
                <LeftArrowBtn close={() => props.navigation.goBack()} />
            </View>
            <Text style={globalStyles.pageHeader}>Select Word</Text>
            <Text style={[globalStyles.pageDetails]}>Select The Word To Start Game</Text>
            {props.route.params.availableWords.map((item, index) => (
                <SelectWordItem key={item} imageSource={GetIconByWord(item)}
                                wordText={item} clickFunc={confirmStartWord}/>))
            }
            <Modal isVisible={showConfirmWordSelection}
                            transparent={true}
                            animationType="fade"
                            onRequestClose={() => setShowConfirmWordSelection(false)}>>
                <SelectWordConfirmPage/>
            </Modal>
        </View>
    );
}

export default StartNewWord;
