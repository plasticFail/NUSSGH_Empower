import React from 'react';
import {TextInput, StyleSheet, View, Keyboard, Animated, Platform, TouchableOpacity, Text} from 'react-native';
// Others
import Icon from 'react-native-vector-icons/dist/FontAwesome';

Icon.loadFont();
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
class Searchbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            keyboardShown: false
        }
        this.searchbarWidth = new Animated.Value(1);
    }

    componentDidMount () {
        this.keyboardWillShowSub = Keyboard.addListener(Platform.OS == 'android' ? 'keyboardDidShow' : 'keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener(Platform.OS == 'android' ? "keyboardDidHide" : 'keyboardWillHide', this.keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardWillShow = (event) => {
        this.setState({keyboardShown: true});
        Animated.timing(this.searchbarWidth, {
            toValue: 0.9,
            duration: 200,
            useNativeDriver: false
        }).start();
    }

    keyboardWillHide = (event) => {
        this.setState({keyboardShown: false});
        Animated.timing(this.searchbarWidth, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false
        }).start();
    }

    handleChangeText = (text) => {
        const {onSubmit, textInputStyle, containerStyle, placeholder, onChangeText} = this.props;
        onChangeText(text);
        this.setState({
            value: text
        })
    }

    render() {
        const width = this.searchbarWidth.interpolate({
           inputRange: [0, 1],
           outputRange: ['0%', '100%']
        });
        const {onSubmit, textInputStyle, containerStyle, placeholder, onChangeText} = this.props;
        const {value, keyboardShown} = this.state;
        return (
            <View style={{...styles.root, ...containerStyle}}>
                <AnimatedTextInput placeholder={placeholder}
                           value={value}
                           onChangeText={this.handleChangeText}
                           autoFocus={true}
                           style={[{...styles.textInput, ...textInputStyle}, {width}]}/>
                {   keyboardShown &&
                    <TouchableOpacity onPress={() => this.handleChangeText("")}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                }
                <Icon style={{position: 'absolute', paddingLeft: styles.textInput.paddingLeft / 4}} name="search" size={20} color={'#4d4d4d'} onPress={onSubmit}></Icon>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        height: 45,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        fontSize: 20,
        color: '#4d4d4d',
        paddingLeft: 40,
        height: 45,
        backgroundColor: '#E2E7EE',
        borderRadius: 10,
        marginRight: 10
    },
    cancelText: {
        color: '#288259'
    }
})

export default Searchbar;