import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
// Others
import Icon from 'react-native-vector-icons/dist/FontAwesome';

Icon.loadFont();

function Searchbar({onSubmit, textInputStyle,
                       containerStyle,
                       delayBeforeSubmit, placeholder, onChangeText}) {
    const [value, setValue] = React.useState("");

    const handleChangeText = (text) => {
        onChangeText(text);
        setValue(text);
    }
    return (
        <View style={{...styles.root, ...containerStyle}}>
            <TextInput placeholder={placeholder}
                       value={value}
                       onChangeText={handleChangeText}
                       style={{...styles.textInput, ...textInputStyle}}/>
            <Icon name="search" size={20} color={'#4d4d4d'} onPress={onSubmit}></Icon>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        fontSize: 20,
        width: '95%',
        color: '#4d4d4d'
    }
})

export default Searchbar;