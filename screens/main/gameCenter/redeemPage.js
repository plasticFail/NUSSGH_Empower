import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
//third party libs
import Modal from 'react-native-modal';
//styles
import GameCenterStyles from '../../../styles/gameCenterStyles';
import globalStyles from '../../../styles/globalStyles';
//functions
import {requestGetRewardOverview} from '../../../netcalls/gameCenterEndPoints/requestGameCenter';
import {rewardItemInALine} from '../../../constants/gameCenter/gameCenterConstant';
//components
import LeftArrowBtn from '../../../components/logs/leftArrowBtn';
import RedeemTab from '../../../components/gameCenter/redeemTabs';
import RewardBoard from '../../../components/gameCenter/rewardBoard';
import UseVoucherPage from '../../../components/gameCenter/useVoucherPage';
import RedeemConfirmPage from '../../../components/gameCenter/redeemConfirmPage';
import RedeemSuccessPage from '../../../components/gameCenter/redeemSuccessPage';


const RedeemPage = (props) => {
    useEffect(() => {
        init();
    }, []);

    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const [showRedeemConfirm, setShowRedeemConfirm] = useState(false);
    const [showRedeemSuccess, setShowRedeemSuccess] = useState(false);
    const [showUseVoucher, setShowUseVoucher] = useState(false);

    const [availablePoint, setAvailablePoint] = useState(0);
    const [availableItems, setAvailableItems] = useState([]);
    const [redeemedItems, setRedeemedItems] = useState([]);

    const init = async () => {
        console.log('init redeem page');
        let responseObj = await requestGetRewardOverview();

        setAvailablePoint(responseObj.available_points);

        let dict = {};
        for(let i=0; i<responseObj.all_items.length; i++){
            dict[responseObj.all_items[i]._id] = responseObj.all_items[i];
        }

        initAvailableItem(responseObj.available_items, dict);
        initRedeemedItem( responseObj.redeemed_items, dict);
    };

    const initAvailableItem = (available_items, dict) => {
        for(let i=0; i<available_items.length; i++){
            available_items[i].content = dict[available_items[i]._id];
        }

        let curIndex = 0, availableItemIndex = 0, availableItemSlice=[];
        while(curIndex < available_items.length){
            if(curIndex+1 < available_items.length){
                availableItemSlice[availableItemIndex]=available_items.slice(curIndex, curIndex + rewardItemInALine);
                availableItemIndex ++;
                curIndex += rewardItemInALine;
            }
            else{
                availableItemSlice[availableItemIndex]=available_items.slice(curIndex, curIndex + 1);
                availableItemIndex ++;
                curIndex ++;
            }

        }
        setAvailableItems(availableItemSlice);
    }

    const initRedeemedItem = (redeemed_items, dict) => {
        for(let i=0; i<redeemed_items.length; i++){
            redeemed_items[i].content = dict[redeemed_items[i]._id];
        }

        let curIndex = 0, redeemedItemIndex = 0, redeemedItemSlice=[];
        while(curIndex < redeemed_items.length){
            if(curIndex+1 < redeemed_items.length){
                redeemedItemSlice[redeemedItemIndex]=redeemed_items.slice(curIndex, curIndex + rewardItemInALine);
                redeemedItemIndex ++;
                curIndex += rewardItemInALine;
            }
            else{
                redeemedItemSlice[redeemedItemIndex]=redeemed_items.slice(curIndex, curIndex + 1);
                redeemedItemIndex ++;
                curIndex ++;
            }

        }
        setRedeemedItems(redeemedItemSlice);
    }

    return (
        <View style={globalStyles.pageContainer}>
            <View style={globalStyles.menuBarContainer}>
                <LeftArrowBtn close={() => props.navigation.goBack()} />
            </View>
            <Text style={globalStyles.pageHeader}>Redeem</Text>
            <RedeemTab
                currentTab={currentTabIndex}
                setTabCallback={setCurrentTabIndex}/>

            <View style={[GameCenterStyles.darkGreenColor, GameCenterStyles.center, GameCenterStyles.cardPadding]}>
                <Text style={[GameCenterStyles.subText, GameCenterStyles.whiteText, GameCenterStyles.textBold]}>{availablePoint} Points Available</Text>
            </View>

            {currentTabIndex === 0 ? (
                <RewardBoard items={redeemedItems}/>
            ):(
                <RewardBoard items={availableItems}/>
            )}

            <Modal
                isVisible={showRedeemConfirm}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setShowRedeemConfirm(false)}>
                <RedeemConfirmPage />
            </Modal>

            <Modal
                isVisible={showRedeemSuccess}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setShowRedeemSuccess(false)}>
                <RedeemSuccessPage />
            </Modal>

            <Modal
                isVisible={showUseVoucher}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setShowUseVoucher(false)}>
                <UseVoucherPage />
            </Modal>

        </View>
    );
}

export default RedeemPage;
