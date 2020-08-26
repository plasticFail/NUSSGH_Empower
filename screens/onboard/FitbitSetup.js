import React from 'react';
import {View, StyleSheet, Text, Dimensions, Image, TouchableWithoutFeedback, Animated, Modal, ActivityIndicator, Linking} from 'react-native';
// third party lib
import {Svg, Circle} from "react-native-svg";
// component
import {BackAndForwardButton} from "../../components/BackAndForwardButtons";
//function
import {getFitbitToken} from "../../storage/asyncStorageFunctions";
import {postFitbitToken} from "../../netcalls/fitbitEndpoints/tokenRequests";
// config
import {fitbitTokenUri, fitbitOAuthUri, client_id, redirect_uri, authorisationHeader, scope} from "../../config/FitbitConfig";
// others
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import fitbitIcon from '../../resources/images/fitbit/fitbit.png';

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

export default class FitbitSetup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthorized: false
        }
    }

    componentDidMount() {
        getFitbitToken().then(data => {
            if (data !== null) {
                this.setState({
                    isAuthorized: true
                })
            } else {
                Linking.addEventListener('url', this.handleRedirectUrl);
            }
        })
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleRedirectUrl);
    }

    handleRedirectUrl = (event) => {
        // Entire set up procedure for handling authorisation code grant.
        const callback_url = event.url;
        // remove the front part of callback url.
        const params = callback_url.split(redirect_uri + "?")[1];
        const codeResponse = qs.parse(params);
        const authorisationCode = codeResponse['code'].replace(/(_|=|#)/g, '');
        // Make call to get tokens
        fetch(fitbitTokenUri, {
            method: "POST",
            headers: {
                Authorization: "Basic " + authorisationHeader,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: qs.stringify({
                clientId: client_id,
                grant_type: 'authorization_code',
                redirect_uri,
                code: authorisationCode
            })
        }).then(resp => resp.json())
            .then(data => {
                postFitbitToken(data).then(resp => {
                        this.setState({
                            isAuthorized: true
                        });
                    }
                )
            }).catch(err => alert(err.message));
    }

    render() {
        return (
            <FitbitSetupComponent hasBeenAuthorized={this.state.isAuthorized} />
        );
    }

}


function FitbitSetupComponent(props) {
    const [expand, setExpand] = React.useState(false);
    const {hasBeenAuthorized} = props;
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
    }, [expand, hasBeenAuthorized]);

    const scale = expandAnimation.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0.92, 1] // Grows from 80% size to 100% size
    });

    const handleOpenFitbitOAuthUrl = async () => {
        await Linking.canOpenURL(oAuthUrl).then(supported => {
            if (supported) {
                Linking.openURL(oAuthUrl);
            }
        });

    }

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
                    {
                        hasBeenAuthorized ?
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
                <BackAndForwardButton onPressBack={()=>{}}
                                      onPressForward={()=>{}}
                                      overrideForwardTitle={hasBeenAuthorized ? 'Next' : 'Skip'}
                                      enableForward={() => true} />
            </View>
        </View>
    )
}

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
    },
    fitbitDoneMainText: {
        color: '#4d4d4d',
        fontSize: 24,
        fontWeight: 'bold',
    },
    fitbitDoneSubText: {
        color: '#4d4d4d',
        fontSize: 20,
    }
})