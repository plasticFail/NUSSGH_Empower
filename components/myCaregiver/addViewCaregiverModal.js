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
  Alert,
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
import {
  search4Caregiver,
  assignCaregiver2Patient,
} from '../../netcalls/requestsMyCaregiver';
import DeleteBin from '../deleteBin';
import diaryStyles from '../../styles/diaryStyles';
import logStyles from '../../styles/logStyles';

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

  const [chosenCaregiver, setChosenCaregiver] = useState({});
  const [accessName, setAccessName] = useState(false);
  const [accessID, setAccessId] = useState(false);
  const [accessDob, setAccessDob] = useState(false);
  const [accessRD, setAccessRd] = useState(false);

  useEffect(() => {
    setSearchResult([]);
    if (type != 'add') {
      setSearchResult([caregiver]);
    }
  }, []);

  const searchCaregiver = (searchKey) => {
    if (searchKey.length === 8) {
      setLoading(true);
      setTimeout(() => {
        search4Caregiver(searchKey).then((rsp) => {
          setSearchResult(rsp?.results);
        });
        setSearchResult([]);
        setLoading(false);
      }, 500);
    }
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
    if (!isEmpty(chosenCaregiver)) {
      //setShowAuthorise(true);
      //call api
      assignCaregiver2Patient(chosenCaregiver.username).then((rsp) => {
        if (rsp != null) {
          Alert.alert('Caregiver Assigned Successfully!', '', [
            {text: 'Got It', onPress: () => closeModal()},
          ]);
        }
      });
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

  const deleteCaregiver = () => {};

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
        {type === 'add' ? (
          <TextInput
            style={globalStyles.row}
            placeholder="Enter Caregiver's Phone Number"
            placeholderTextColor={'#90949c'}
            onChangeText={(value) => searchCaregiver(value)}
            keyboardType={'number-pad'}
            returnKeyType="done"
            maxLength={8}
          />
        ) : (
          <Text style={styles.appointedText}>Appointed</Text>
        )}

        {loading ? (
          <ActivityIndicator
            animating={loading}
            color="#aad326"
            style={{marginTop: '2%', marginBottom: '2%'}}
          />
        ) : searchResult.length > 0 ? (
          <View style={{maxHeight: '20%'}}>
            {searchResult.map((item) => (
              <View style={[globalStyles.row, styles.container]}>
                {item?.gender === 'female' ? (
                  <USER_FEMALE {...iconStyle} />
                ) : (
                  <USER_MALE {...iconStyle} />
                )}
                {type === 'add' ? (
                  <Text style={globalStyles.field}>{item.first_name}</Text>
                ) : (
                  <View style={{flex: 1, marginStart: '3%'}}>
                    <Text style={styles.mainField}>{item.first_name}</Text>
                    <Text style={[styles.subField]}>{item.contact_number}</Text>
                  </View>
                )}

                {type === 'add' ? (
                  <TouchableOpacity onPress={() => selectedCaregiver(item)}>
                    {chosenCaregiver._id === item._id ? (
                      <Tick selected={true} />
                    ) : (
                      <Tick selected={false} />
                    )}
                  </TouchableOpacity>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        <Text style={styles.fieldText}>
          {type === 'add' ? 'Select' : 'Edit'} Access Privileges
        </Text>
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
        ) : (
          <View style={{flexDirection: 'row'}}>
            <DeleteBin style={diaryStyles.binIcon} method={deleteCaregiver} />

            <TouchableOpacity
              style={logStyles.enableEditButton}
              onPress={() => closeModal()}>
              <Text style={globalStyles.actionButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        )}
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
  container: {
    marginBottom: '1%',
    marginTop: '1%',
    flexDirection: 'row',
  },
  appointedText: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 20,
    marginStart: '3%',
    color: Colors.grey,
    opacity: 0.6,
  },
});
