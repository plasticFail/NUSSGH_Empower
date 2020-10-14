
const GetIconByWord = word => {
    switch (word.toLowerCase()){
        case 'fit':
            return require('../resources/images/gameCenter/2x/icon-bingo-fit-2x.png');
        case 'ace':
            return require('../resources/images/gameCenter/2x/icon-bingo-ace-2x.png');
        default:
            return null;
    }
}

export {GetIconByWord};
