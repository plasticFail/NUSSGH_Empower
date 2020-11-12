
const GetIconByWord = word => {
    if(word) {
        switch (word.toLowerCase()) {
            case 'fit':
                return require('../resources/images/gameCenter/img/icon-bingo-fit.png');
            case 'ace':
                return require('../resources/images/gameCenter/img/icon-bingo-ace.png');
            case 'game':
                return require('../resources/images/gameCenter/img/icon-bingo-game.png');
            case 'food':
                return require('../resources/images/gameCenter/img/icon-bingo-food.png');
            case 'goal':
                return require('../resources/images/gameCenter/img/icon-bingo-goals.png');
            case 'med':
                return require('../resources/images/gameCenter/img/icon-bingo-med.png');
            case 'run':
                return require('../resources/images/gameCenter/img/icon-bingo-running.png');
            case 'steps':
                return require('../resources/images/gameCenter/img/icon-bingo-steps.png');
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
                return require('../resources/images/Voucher-Images/img-voucher-csm.png');
            case 'hpb':
                return require('../resources/images/Voucher-Images/img-voucher-hpb.png');
            case 'tl':
                return require('../resources/images/Voucher-Images/img-voucher-tl.png');
            case 'wg':
                return require('../resources/images/Voucher-Images/img-voucher-wg.png');
            default:
                return null;

        }
    }
    return null;
}

export {GetIconByWord, GetRewardIconByKey};
