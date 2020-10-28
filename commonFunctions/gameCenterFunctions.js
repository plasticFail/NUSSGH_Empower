
const GetIconByWord = word => {
    if(word) {
        switch (word.toLowerCase()) {
            case 'fit':
                return require('../resources/images/gameCenter/2x/icon-bingo-fit-2x.png');
            case 'ace':
                return require('../resources/images/gameCenter/2x/icon-bingo-ace-2x.png');
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
