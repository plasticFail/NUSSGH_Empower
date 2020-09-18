import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Linking,
} from 'react-native';
//function
import {getFitbitToken} from '../../../storage/asyncStorageFunctions';
import {AuthoriseFitbit} from '../../../commonFunctions/AuthoriseFitbit';
// config
import {
  fitbitOAuthUri,
  client_id,
  redirect_uri,
  scope,
} from '../../../config/FitbitConfig';
// third party lib
import InAppBrowser from 'react-native-inappbrowser-reborn';
// components
import ResponseModal from '../../../components/onboarding/fitbit/ResponseModal';
import LeftArrowBtn from '../../../components/logs/leftArrowBtn';
// others
import {STATUS} from '../../../components/onboarding/fitbit/Status';
import FitbitLogo from '../../../resources/images/icons/SVG/icon-color-fitbit.svg';
import globalStyles from '../../../styles/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../../styles/colors';

const qs = require('qs');

const oAuthUrl =
  fitbitOAuthUri +
  '?' +
  qs.stringify({
    response_type: 'code',
    client_id,
    redirect_uri,
    scope,
    expires_in: '604800',
  });

export default function FitbitSetup(props) {
  const [expand, setExpand] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [processingStatus, setProcessingStatus] = React.useState(
    STATUS.NOT_STARTED,
  );
  const authorised = React.useRef(false);
  const expandAnimation = React.useRef(new Animated.Value(0));
  React.useEffect(() => {
    let cancelled = false;
    if (expand) {
      Animated.timing(expandAnimation.current, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => !cancelled && setExpand(!expand));
    } else {
      Animated.timing(expandAnimation.current, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => !cancelled && setExpand(!expand));
    }

    if (!authorised.current && !cancelled) {
      setTimeout(() => {
        getFitbitToken().then((resp) => {
          if (resp) {
            authorised.current = true;
            //setTimeout(() => props.navigation.navigate('Home'), 1000)
          }
        });
      }, 500);
    }
    return () => {
      cancelled = true;
    };
  }, [expand]);

  const scale = expandAnimation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1], // Grows from 80% size to 100% size
  });

  const handleOpenFitbitOAuthUrl = async () => {
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
          enableDefaultShare: false,
        }).then((response) => {
          if (response.type === 'success' && response.url) {
            AuthoriseFitbit(response.url).then((resp) => {
              if (resp) {
                authorised.current = true;
                setProcessingStatus(STATUS.FINISHED_SUCCESSFULLY);
              } else {
                setProcessingStatus(STATUS.ERROR);
              }
            });
            //Linking.openURL(response.url);
          } else if (
            response.type === 'dismiss' ||
            response.type === 'cancel'
          ) {
            // Cancel loading
            setProcessingStatus(STATUS.CANCELLED);
          }
        });
      } else {
        await Linking.openURL(oAuthUrl);
      }
    } catch (error) {
      await Linking.openURL(oAuthUrl);
    }
  };

  const handleCloseModal = () => {
    setProcessingStatus(STATUS.NOT_STARTED);
    setModalVisible(false);
  };

  return (
    <View style={styles.onboardingContainer}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={props.navigation.goBack} />
      </View>
      <Text style={[globalStyles.pageHeader, styles.stepText]}>Step 4</Text>
      <Text style={globalStyles.pageDetails}>Link your Fitbit Account</Text>
      <Text style={[globalStyles.pageSubDetails, styles.stepContent]}>
        Would you like to add your Fitbit account to track your activity?
        Alternatively, you can set this up later
      </Text>
      {/*
                    <Text style={{paddingLeft: 15, fontWeight: 'bold'}}>{!authorised.current && processingStatus}</Text>
                 */}
      {!authorised.current ? (
        <View style={{padding: 15}}>
          <Text style={styles.fitbitDoneMainText}>Done!</Text>
          <Text style={styles.fitbitDoneSubText}>You are all set</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={handleOpenFitbitOAuthUrl}>
          <View style={[styles.fitbitRedirectButton, {marginTop: 50}]}>
            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 20}}>
              Continue with
            </Text>
            <Animated.View
              style={[styles.fitbitIconStyle, {transform: [{scale}]}]}>
              <FitbitLogo width='100%' height='100%' />
            </Animated.View>
          </View>
        </TouchableOpacity>
      )}
      <View style={{flex: 1}} />
      {authorised.current ? (
        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            style={[globalStyles.nextButtonStyle]}
            onPress={() => props.navigation.navigate('Home')}>
            <Text style={globalStyles.actionButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            style={globalStyles.skipButtonStyle}
            onPress={() => props.navigation.navigate('Home')}>
            <Text style={globalStyles.actionButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      )}
      <ResponseModal
        visible={modalVisible}
        closeModal={handleCloseModal}
        status={processingStatus}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  onboardingContainer: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  remainingContainer: {
    flex: 1,
  },
  fitbitIconStyle: {
    width: 50,
    height: 50,
    margin: 5,
  },
  fitbitPromptContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fitbitPromptText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 50,
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
    justifyContent: 'center',
  },
});
