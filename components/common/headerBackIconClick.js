import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

Icon.loadFont();

const HeaderBackIconClick = props => {
    return (
        <TouchableOpacity activeOpacity={0.3} onPress={props.clickFunc}>
            <Icon name={'arrow-left'} size={25} color={'#000'}/>
        </TouchableOpacity>
    );
}

export default HeaderBackIconClick;
