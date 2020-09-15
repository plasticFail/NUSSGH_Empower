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
            toValue: 0.82,
            duration: 200,
            useNativeDriver: false
        }).start();
    }

    keyboardWillHide = (event) => {
        this.setState({keyboardShown: false});
        if (this.props.value !== '') {
            return ;
        }
        Animated.timing(this.searchbarWidth, {
            toValue: 1,
            duration: 350,
            useNativeDriver: false
        }).start();
    }

    handleChangeText = (text) => {
        const {onSubmit, textInputStyle, containerStyle, placeholder, onChangeText} = this.props;
        onChangeText(text);
    }

    handleCancel = () => {
        const {onSubmit, textInputStyle, containerStyle, placeholder, onChangeText} = this.props;
        onChangeText('');
        Animated.timing(this.searchbarWidth, {
            toValue: 1,
            duration: 350,
            useNativeDriver: false
        }).start();
    }

    render() {
        const width = this.searchbarWidth.interpolate({
           inputRange: [0, 1],
           outputRange: ['0%', '100%']
        });
        const {onSubmit, textInputStyle, containerStyle, placeholder, onChangeText, value} = this.props;
        const {keyboardShown} = this.state;
        return (
            <View style={{...styles.root, ...containerStyle}}>
                <AnimatedTextInput placeholder={placeholder}
                           value={value}
                           onChangeText={this.handleChangeText}
                           placeholder={placeholder}
                           style={[{...styles.textInput, ...textInputStyle}, {width}]}/>
                {   (keyboardShown || value !== '')  &&
                    <TouchableOpacity onPress={this.handleCancel}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                }
                <Icon style={{position: 'absolute', paddingLeft: styles.textInput.paddingLeft / 4}}
                      name="search" size={20}
                      color={'#4d4d4d'}
                      onPress={onSubmit} />
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
        color: '#288259',
        fontSize: 16
    }
})

export default Searchbar;
//edit flag
