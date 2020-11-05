import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
//third party lib
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import InAppBrowser from 'react-native-inappbrowser-reborn';

//styles
import {Colors} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';

//component
import LeftArrowBtn from '../logs/leftArrowBtn';
import Tick from '../tick';
import AccessOption from './accessOption';

import USER_FEMALE from '../../resources/images/Patient-Icons/SVG/user-female.svg';
import USER_MALE from '../../resources/images/Patient-Icons/SVG/user-male.svg';
import {isEmpty} from '../../commonFunctions/common';
import AuthoriseModal from './authoriseModal';

const sampleResults = [
  {
    _id: 4645645645645,
    first_name: 'Audrey',
    last_name: 'Soh',
    gender: 'female',
  },
  {
    _id: 46456452,
    first_name: 'Jimmy',
    last_name: 'M',
    gender: 'male',
  },
  {
    _id: 46456452,
    first_name: 'Jimmy',
    last_name: 'M',
    gender: 'male',
  },
  {
    _id: 46456452,
    first_name: 'Jimmy',
    last_name: 'M',
    gender: 'male',
  },
];

const iconStyle = {
  width: 40,
  height: 40,
};

const height = Dimensions.get('window').height;

const AddViewCaregiverModal = (props) => {
  const {visible, type, caregiver} = props;
  const {closeModal} = props;
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAuthorise, setShowAuthorise] = useState(false);

  //down animation
  const [showDown, setShowDown] = useState(true);
  const moveDownAnimation = useRef(new Animated.Value(0)).current;

  const [chosenCaregiver, setChosenCaregiver] = useState({});
  const [accessName, setAccessName] = useState(false);
  const [accessID, setAccessId] = useState(false);
  const [accessDob, setAccessDob] = useState(false);
  const [accessRD, setAccessRd] = useState(false);

  useEffect(() => {
    if (showDown) {
      runanimation();
    }
  }, [visible, showDown]);

  //animation
  const runanimation = () => {
    setShowDown(true);
    moveDownAnimation.setValue(0);
    Animated.loop(
      Animated.timing(moveDownAnimation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ).start();
  };

  const heightInterpoloation = moveDownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.34, height * 0.43],
  });

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 30
    );
  };

  const removeAnimation = () => {
    setShowDown(false);
    moveDownAnimation.setValue(0);
  };

  const searchCaregiver = (searchKey) => {
    console.log(searchKey);
    setLoading(true);
    setTimeout(() => {
      setSearchResult(sampleResults);
      setLoading(false);
      runanimation();
    }, 500);
  };

  const selectedCaregiver = (caregiver) => {
    setChosenCaregiver(caregiver);
    //show search result only selected
    let finalResult = [caregiver];
    setSearchResult(finalResult);
    //if selected alr, unselect
    if (chosenCaregiver._id === caregiver._id) {
      setChosenCaregiver({});
      setSearchResult([]);
    }
  };

  const authorise = () => {
    console.log('authorising');
    console.log(isEmpty(selectedCaregiver));
    if (!isEmpty(chosenCaregiver)) {
      //setShowAuthorise(true);
      //call api
    }
  };

  const openURL = async () => {
    let link =
      'https://www.pdpc.gov.sg/Overview-of-PDPA/The-Legislation/Personal-Data-Protection-Act';
    if (await InAppBrowser.isAvailable) {
      InAppBrowser.open(link).then((resp) => {
        if (resp.type === 'success') {
          // Opened link successfully
        }
      });
    }
  };

  return (
    <Modal
      isVisible={visible}
      coverScreen={true}
      backdropOpacity={1}
      onBackButtonPress={() => closeModal()}
      style={{margin: 0}}
      backdropColor={Colors.backgroundColor}>
      <View style={globalStyles.pageContainer}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={() => closeModal()} />
        </View>
        <Text style={globalStyles.pageHeader}>
          {type === 'add' ? 'Add Caregiver' : 'View Caregiver'}
        </Text>
        <TextInput
          style={globalStyles.row}
          placeholder="Enter Caregiver ID"
          placeholderTextColor={'#90949c'}
          onChangeText={(value) => searchCaregiver(value)}
          keyboardType={'number-pad'}
          returnKeyType="done"
        />
        {/*Animated Down */}
        {showDown && searchResult.length > 2 && !loading ? (
          <Animated.View
            style={[
              {transform: [{translateY: heightInterpoloation}]},
              styles.downIcon,
            ]}>
            <Icon name="arrow-circle-down" size={25} color="#aad326" />
          </Animated.View>
        ) : null}

        {loading ? (
          <ActivityIndicator
            animating={loading}
            color="#aad326"
            style={{marginTop: '2%', marginBottom: '2%'}}
          />
        ) : searchResult.length > 0 ? (
          <View style={{maxHeight: '20%'}}>
            <ScrollView
              contentContainerStyle={{flexGrow: 0}}
              scrollEventThrottle={100}
              onScroll={({nativeEvent}) => {
                if (isCloseToBottom(nativeEvent)) {
                  return removeAnimation();
                } else {
                  setShowDown(true);
                }
              }}>
              {searchResult.map((item) => (
                <View
                  style={[
                    globalStyles.row,
                    {
                      marginBottom: '1%',
                      marginTop: '1%',
                      flexDirection: 'row',
                    },
                  ]}>
                  {item?.gender === 'female' ? (
                    <USER_FEMALE {...iconStyle} />
                  ) : (
                    <USER_MALE {...iconStyle} />
                  )}
                  <Text style={globalStyles.field}>{item.first_name}</Text>
                  <TouchableOpacity onPress={() => selectedCaregiver(item)}>
                    {chosenCaregiver._id === item._id ? (
                      <Tick selected={true} />
                    ) : (
                      <Tick selected={false} />
                    )}
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        ) : null}
        <Text style={styles.fieldText}>
          {type === 'add' ? 'Select' : 'Edit'} Access Privileges
        </Text>
        {/*Access Privileges */}
        <ScrollView style={{flexGrow: 1}}>
          <AccessOption
            mainheader={'Your Name'}
            subheader={'Personal Information'}
            onSelect={() => setAccessName(!accessName)}
            selected={accessName}
          />
          <AccessOption
            mainheader={'Your ID'}
            subheader={'Personal Information'}
            onSelect={() => setAccessId(!accessID)}
            selected={accessID}
          />
          <AccessOption
            mainheader={'Your Date of Birth'}
            subheader={'Personal Information'}
            onSelect={() => setAccessDob(!accessDob)}
            selected={accessDob}
          />
          <AccessOption
            mainheader={'Your Report & Diary'}
            subheader={'Health Information'}
            onSelect={() => setAccessRd(!accessRD)}
            selected={accessRD}
          />
          <TouchableOpacity onPress={() => openURL()}>
            <Text style={styles.pdpaText}>
              Learn more about{' '}
              <Text style={{fontWeight: 'bold', color: '#aad326'}}>
                Personal Data Protection Act
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={globalStyles.buttonContainer}>
        {type === 'add' ? (
          <TouchableOpacity
            onPress={() => authorise()}
            style={
              !isEmpty(chosenCaregiver)
                ? globalStyles.submitButtonStyle
                : globalStyles.skipButtonStyle
            }>
            <Text style={globalStyles.actionButtonText}>Next</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {/*Show Authorise modal 
      <AuthoriseModal
        visible={showAuthorise}
        closeModal={() => setShowAuthorise(false)}
        closeParent={() => closeModal()}
      />
      */}
    </Modal>
  );
};

export default AddViewCaregiverModal;

const styles = StyleSheet.create({
  fieldText: {
    fontFamily: 'SFProDisplay-Bold',
    color: '#3c3c43',
    opacity: 0.6,
    fontSize: 20,
    marginStart: '3%',
  },
  rowMargin: {
    marginStart: '2%',
    marginEnd: '2%',
    flex: 1,
  },
  subField: {
    fontFamily: 'SFProDisplay-Regular',
    opacity: 0.6,
    fontSize: 16,
  },
  mainField: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 20,
  },
  downIcon: {
    position: 'absolute',
    right: '2%',
    zIndex: 2,
  },
  pdpaText: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: '5%',
  },
});
