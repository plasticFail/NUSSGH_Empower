import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';

Icon.loadFont();

const HeaderBackIcon = () => {
    return <Icon name={'arrow-left'} size={adjustSize(25)} color={'#000'}/>;
}

export default HeaderBackIcon;
