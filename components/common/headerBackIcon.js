import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

Icon.loadFont();

const HeaderBackIcon = () => {
    return <Icon name={'arrow-left'} size={25} color={'#000'}/>;
}

export default HeaderBackIcon;
