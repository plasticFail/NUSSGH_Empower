import React from 'react';
import {View, StyleSheet, Text, Dimensions, Image, TouchableWithoutFeedback, Animated, Modal, ActivityIndicator} from 'react-native';
import {Svg, Circle} from "react-native-svg";
import WebView from "react-native-webview";
import {BackAndForwardButton} from "../../components/BackAndForwardButtons";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import fitbitIcon from '../../resources/images/fitbit/fitbit.png';

const fitbitOAuthUri = "https://www.fitbit.com/oauth2/authorize";

const {width, height} = Dimensions.get('window');
const headerHeight = height / 4;
const circleRadius = height;
const circleOffset = height - headerHeight;
Icon.loadFont();
export default function FitbitSetup(props) {
    const [expand, setExpand] = React.useState(false);
    const [openWebview, setOpenWebview] = React.useState(false);
    const expandAnimation = React.useRef(new Animated.Value(0));
    React.useEffect(() => {
        if (expand) {
            Animated.timing(expandAnimation.current, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start(() => setExpand(!expand));
        } else {
            Animated.timing(expandAnimation.current, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start(() => setExpand(!expand));
        }
    }, [expand]);

    const scale = expandAnimation.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0.92, 1] // Grows from 80% size to 100% size
    });

    return (
        <View style={styles.root}>
            <View style={StyleSheet.absoluteFill}>
                <Svg width={width} height={height}>
                    <Circle cx={width/2} r={circleRadius}
                            cy={-circleOffset}
                            fill="#B3D14C"/>
                </Svg>
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerMainText}>Step 4: Link your fitbit</Text>
                <Text style={styles.headerSubText}>Its as easy as logging into your Fitbit account!</Text>
                <Text style={styles.headerSubText}>Alternatively, you can choose to set this up later!</Text>
            </View>
            <View style={styles.remainingContainer}>
                <View style={[styles.fitbitPromptContainer, {flex: 4}]}>
                    <Text style={styles.fitbitPromptText}>
                        Tap on the Fitbit icon to begin!
                    </Text>
                    <TouchableWithoutFeedback onPress={() => setOpenWebview(true)}>
                        <Animated.View style={[styles.fitbitIconStyle, {transform: [{scale}]}]}>
                            <Image source={fitbitIcon} style={{width: '100%', height: '100%'}} />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
                <BackAndForwardButton onPressBack={()=>{}}
                                      onPressForward={()=>{}}
                                      overrideForwardTitle='Skip'
                                      enableForward={() => true} />
            </View>
            {openWebview && <FitbitWebViewModal visible={openWebview} setVisible={setOpenWebview}/>}
        </View>
    )
}

function FitbitWebViewModal({visible, setVisible}) {
    const loading = React.useRef(true);
    setTimeout(() => {
           loading.current = false;
    }, 1200);

    return (
        <Modal visible={visible} animationType='slide'>
            <View style={modalStyles.root}>
                <View style={modalStyles.header}>
                    <Icon name='times' size={35} onPress={() => setVisible(false)}
                          style={modalStyles.closeButton} />
                </View>
                {   loading.current &&
                    <View style={{flex: 1000, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={modalStyles.waitText}>Please wait for a moment!</Text>
                        <ActivityIndicator size='large' color='#b3d14c' />
                    </View>
                }
                <WebView source={{uri: fitbitOAuthUri}} style={{height: 0}} />
            </View>
        </Modal>
    )
}

const modalStyles = StyleSheet.create({
    root: {
        flex: 1,
    },
    closeButton: {
        alignSelf: 'flex-end',
        paddingRight: 10,
    },
    waitText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#4d4d4d',
        paddingBottom: '5%'
    },
    header: {
        paddingTop: '10%',
        backgroundColor: "#B3D14C",
        paddingBottom: '2%'
    },
    webview: {
        // Cannot remove margin anyway.
    }
})

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerContainer: {
        width,
        height: headerHeight,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '15%'
    },
    headerMainText: {
        color: '#4d4d4d',
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 20
    },
    headerSubText: {
        color: '#4d4d4d',
        fontSize: 16,
        fontWeight: 'bold',
        opacity: 0.77
    },
    remainingContainer: {
        flex: 1,
    },
    fitbitIconStyle: {
        width: '40%',
        height: '40%',
    },
    fitbitPromptContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    fitbitPromptText: {
        color: '#4d4d4d',
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 50
    }
})