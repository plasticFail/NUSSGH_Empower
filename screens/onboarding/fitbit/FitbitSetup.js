import React from 'react';
import {View, StyleSheet, Text, Dimensions, Image, TouchableWithoutFeedback, Animated, Linking} from 'react-native';
//function
import {getFitbitToken} from "../../../storage/asyncStorageFunctions";
// config
import {fitbitOAuthUri, client_id, redirect_uri, scope} from "../../../config/FitbitConfig";
// others
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import fitbitIcon from '../../../resources/images/fitbit/fitbit.png';
import globalStyles from "../../../styles/globalStyles";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Colors} from "../../../styles/colors";
// third party lib
import Modal from 'react-native-modal';
import InAppBrowser from 'react-native-inappbrowser-reborn'
import {AuthoriseFitbit} from "../../../commonFunctions/AuthoriseFitbit";
import {STATUS} from "../../../components/onboarding/fitbit/Status";
import ResponseModal from "../../../components/onboarding/fitbit/ResponseModal";

const qs = require('qs');

const oAuthUrl = fitbitOAuthUri + "?" + qs.stringify({
    response_type: 'code',
    client_id,
    redirect_uri,
    scope,
    expires_in: '604800'
});

const {width, height} = Dimensions.get('window');
const headerHeight = height / 4;
const circleRadius = height;
const circleOffset = height - headerHeight;
Icon.loadFont();

export default function FitbitSetup(props) {
    const [expand, setExpand] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [processingStatus, setProcessingStatus] = React.useState(STATUS.NOT_STARTED);
    const authorised = React.useRef(false);
    const expandAnimation = React.useRef(new Animated.Value(0));
    React.useEffect(() => {
        let cancelled = false;
        if (expand) {
            Animated.timing(expandAnimation.current, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start(() => !cancelled && setExpand(!expand));
        } else {
            Animated.timing(expandAnimation.current, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }).start(() => !cancelled && setExpand(!expand));
        }

        if (!authorised.current && !cancelled) {
            setTimeout(() => {
                getFitbitToken().then(resp => {
                    if (resp) {
                        authorised.current = true;
                    }
                })
            }, 500);
        }
        return () => {
            cancelled = true
        };
    }, [expand]);

    const scale = expandAnimation.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0.92, 1] // Grows from 80% size to 100% size
    });

    const handleOpenFitbitOAuthUrl = async () => {
        /*
        await Linking.canOpenURL(oAuthUrl).then(supported => {
            if (supported) {
                Linking.openURL(oAuthUrl).then(res => console.log(res));
            }
        });
        */
        try {
            if (await InAppBrowser.isAvailable()) {
                setProcessingStatus(STATUS.IN_PROGRESS);
                setModalVisible(true);
                InAppBrowser.openAuth(oAuthUrl, redirect_uri, {
                    // iOS Properties
                    ephemeralWebSession: false,
                    // Android Properties
                    showTitle: false,
                    enableUrlBarHiding: true,
                    enableDefaultShare: false
                }).then((response) => {
                    if (
                        response.type === 'success' &&
                        response.url
                    ) {
                        AuthoriseFitbit(response.url).then((resp) => {
                            if (resp) {
                                authorised.current = true;
                                setProcessingStatus(STATUS.FINISHED_SUCCESSFULLY);
                            } else {
                                setProcessingStatus(STATUS.ERROR);
                            }
                        });
                        //Linking.openURL(response.url);
                    } else if (response.type === 'dismiss' || response.type === 'cancel') {
                        // Cancel loading
                        setProcessingStatus(STATUS.CANCELLED);
                    }
                })
            } else {
                await Linking.openURL(oAuthUrl);
            }
        } catch (error) {
            await Linking.openURL(oAuthUrl);
        }

    }

    const handleCloseModal = () => {
        setProcessingStatus(STATUS.NOT_STARTED);
        setModalVisible(false);
    }

    return (
        <View style={styles.onboardingContainer}>
            <Icon name='arrow-left' onPress={props.navigation.goBack} color={Colors.backArrowColor} size={30} style={{paddingLeft: 10}} />
            <Text style={[globalStyles.pageHeader, styles.stepText]}>Step 4</Text>
            <Text style={globalStyles.pageDetails}>Link your Fitbit Account</Text>
            <Text style={[globalStyles.pageSubDetails, styles.stepContent]}>
                Would you like to add your Fitbit account to track your activity? Alternatively, you can set
                this up later
            </Text>
            <Text style={{paddingLeft: 15, fontWeight: 'bold'}}>{!authorised.current && processingStatus}</Text>
            {   authorised.current ?
                (<View style={{padding: 15}}>
                    <Text style={styles.fitbitDoneMainText}>Done!</Text>
                    <Text style={styles.fitbitDoneSubText}>You are all set</Text>
                </View>)
                :
                (<TouchableOpacity onPress={handleOpenFitbitOAuthUrl}>
                    <View style={[styles.fitbitRedirectButton, {marginTop: 50}]}>
                        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 20}}>Continue with</Text>
                        <Animated.View style={[styles.fitbitIconStyle, {transform: [{scale}]}]}>
                            <Image source={fitbitIcon} style={{width: '100%', height: '100%'}} />
                        </Animated.View>
                    </View>
                </TouchableOpacity>)
            }
            {
            /*
            <View style={styles.root}>
            <Text style={globalStyles.pageHeader}>Step 4</Text>
            <View style={styles.headerContainer}>
                <Text style={styles.headerMainText}>Step 4: Link your fitbit</Text>
                <Text style={styles.headerSubText}>Its as easy as logging into your Fitbit account!</Text>
                <Text style={styles.headerSubText}>Alternatively, you can choose to set this up later!</Text>
            </View>
            <View style={styles.remainingContainer}>
                <View style={[styles.fitbitPromptContainer, {flex: 4}]}>
                    {
                        authorised.current ?
                            <React.Fragment>
                                <Text style={styles.fitbitDoneMainText}>Done!</Text>
                                <Text style={styles.fitbitDoneSubText}>You are all set</Text>
                            </React.Fragment>
                            : <React.Fragment>
                            <Text style={styles.fitbitPromptText}>
                                Tap on the Fitbit icon to begin!
                            </Text>
                            <TouchableWithoutFeedback onPress={handleOpenFitbitOAuthUrl}>
                                <Animated.View style={[styles.fitbitIconStyle, {transform: [{scale}]}]}>
                                    <Image source={fitbitIcon} style={{width: '100%', height: '100%'}} />
                                </Animated.View>
                            </TouchableWithoutFeedback>
                        </React.Fragment>
                    }
                </View>
                <BackAndForwardButton onPressBack={()=>props.navigation.goBack()}
                                      onPressForward={()=>{}}
                                      overrideForwardTitle={authorised.current ? 'Next' : 'Skip'}
                                      enableForward={() => true} />
            </View>
             */
            }
            <View style={{flex: 1}} />
            {
                authorised.current ?
                    (<View style={globalStyles.buttonContainer}>
                        <TouchableOpacity
                            style={[globalStyles.nextButtonStyle]}
                            onPress={this.handleNext}>
                            <Text style={globalStyles.actionButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>)
                    :
                    (<View style={globalStyles.buttonContainer}>
                        <TouchableOpacity
                            style={globalStyles.skipButtonStyle}
                            onPress={this.handleSkip}>
                            <Text style={globalStyles.actionButtonText}>Skip</Text>
                        </TouchableOpacity>
                    </View>)
            }
            <ResponseModal visible={modalVisible} closeModal={handleCloseModal} status={processingStatus}/>
        </View>
    )
}

const styles = StyleSheet.create({
    onboardingContainer: {
        paddingTop: '18%',
        backgroundColor: Colors.backgroundColor,
        flex: 1,
    },
    stepText: {
       // marginTop: '10%',
    },
    headerContainer: {
        width,
        height: headerHeight,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '15%'
    },
    remainingContainer: {
        flex: 1,
    },
    fitbitIconStyle: {
        width: 40,
        height: 40,
        margin: 10
    },
    fitbitPromptContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    fitbitPromptText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 50
    },
    fitbitDoneMainText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    fitbitDoneSubText: {
        fontSize: 20,
    },
    fitbitRedirectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
        backgroundColor: '#4FACB6',
        borderRadius: 15,
        justifyContent: 'center'
    }
})
