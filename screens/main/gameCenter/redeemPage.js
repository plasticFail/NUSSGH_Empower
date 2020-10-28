import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
//third party libs
import Modal from 'react-native-modal';
//styles
import GameCenterStyles from '../../../styles/gameCenterStyles';
import globalStyles from '../../../styles/globalStyles';
//functions
import {requestGetRewardOverview} from '../../../netcalls/gameCenterEndPoints/requestGameCenter';
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

    const init = async () => {
        console.log('init redeem page');
        let responseObj = await requestGetRewardOverview();
    };

    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const [showRedeemConfirm, setShowRedeemConfirm] = useState(true);
    const [showRedeemSuccess, setShowRedeemSuccess] = useState(false);
    const [showUseVoucher, setShowUseVoucher] = useState(false);

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
                <Text style={[GameCenterStyles.subText, GameCenterStyles.whiteText, GameCenterStyles.textBold]}>160 Points Available</Text>
            </View>

            <RewardBoard />

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
