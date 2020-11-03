
const GetIconByWord = word => {
    if(word) {
        switch (word.toLowerCase()) {
            case 'fit':
                return require('../resources/images/gameCenter/2x/icon-bingo-fit-2x.png');
            case 'ace':
                return require('../resources/images/gameCenter/2x/icon-bingo-ace-2x.png');
            case 'game':
                return require('../resources/images/gameCenter/2x/icon-bingo-game-2x.png');
            case 'food':
                return require('../resources/images/gameCenter/2x/icon-bingo-food-2x.png');
            case 'goal':
                return require('../resources/images/gameCenter/2x/icon-bingo-goals-2x.png');
            case 'med':
                return require('../resources/images/gameCenter/2x/icon-bingo-med-2x.png');
            case 'run':
                return require('../resources/images/gameCenter/2x/icon-bingo-running-2x.png');
            case 'steps':
                return require('../resources/images/gameCenter/2x/icon-bingo-steps-2x.png');
            default:
                return null;
        }
    }
    return null;
}

const GetRewardIconByKey = key => {
    if(key){
        switch (key){
            case 'csm':
                return require('../resources/images/Voucher-Images/2x/img-voucher-csm-2x.png');
            case 'hpb':
                return require('../resources/images/Voucher-Images/2x/img-voucher-hpb-2x.png');
            case 'tl':
                return require('../resources/images/Voucher-Images/2x/img-voucher-tl-2x.png');
            case 'wg':
                return require('../resources/images/Voucher-Images/2x/img-voucher-wg-2x.png');
            default:
                return null;

        }
    }
    return null;
}

export {GetIconByWord, GetRewardIconByKey};
