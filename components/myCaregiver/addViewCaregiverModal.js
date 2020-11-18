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
  Modal,
  Alert,
} from 'react-native';
//third party lib
import Icon from 'react-native-vector-icons/FontAwesome5';
import InAppBrowser from 'react-native-inappbrowser-reborn';

//styles
import {Colors} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';

//component
import LeftArrowBtn from '../logs/leftArrowBtn';
import AccessOption from './accessOption';

import USER_FEMALE from '../../resources/images/Patient-Icons/SVG/user-female.svg';
import USER_MALE from '../../resources/images/Patient-Icons/SVG/user-male.svg';
import {isEmpty} from '../../commonFunctions/common';
import {
  search4Caregiver,
  assignCaregiver2Patient,
  unassignCaregiver,
} from '../../netcalls/requestsMyCaregiver';
import DeleteBin from '../deleteBin';
import diaryStyles from '../../styles/diaryStyles';
import logStyles from '../../styles/logStyles';
import DeleteModal from '../deleteModal';

const iconStyle = {
  width: 40,
  height: 40,
  alignSelf: 'center',
};

const height = Dimensions.get('window').height;

const AddViewCaregiverModal = (props) => {
  const {visible, type, caregiver, modalType, from} = props;
  const {closeModal} = props;

  const [showDelete, setShowDelete] = useState(false);

  const [chosenCaregiver, setChosenCaregiver] = useState(caregiver);
  const [accessName, setAccessName] = useState(false);
  const [accessRD, setAccessRd] = useState(false);
  const [accessLr, setAccessLr] = useState(false);

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

  const deleteCaregiver = () => {
    unassignCaregiver().then((rsp) => {
      if (rsp === 200) {
        Alert.alert('Unassigned Successfully!', '', [
          {
            text: 'Got It',
            onPress: () => {
              setShowDelete(false);
              closeModal();
            },
          },
        ]);
      } else {
        Alert.alert('Unexpected Error ', '', [{text: 'Try Again'}]);
      }
    });
  };

  return (
    <Modal
      visible={visible}
      onBackButtonPress={() => closeModal()}
      presentationStyle={modalType === 'card' ? 'formSheet' : 'fullScreen'}
      animationType="slide">
      <View style={globalStyles.pageContainer}>
        <View
          style={
            from != 'caregiver'
              ? globalStyles.menuBarContainer
              : {marginTop: '3%'}
          }>
          <LeftArrowBtn close={() => closeModal()} />
        </View>
        <Text style={globalStyles.pageHeader}>
          {from === 'caregiver'
            ? type === 'add'
              ? 'Request Access'
              : 'Requested Access'
            : 'View Caregiver'}
        </Text>
        <View style={[globalStyles.row, styles.container]}>
          {chosenCaregiver?.gender === 'female' ? (
            <USER_FEMALE {...iconStyle} />
          ) : (
            <USER_MALE {...iconStyle} />
          )}

          <View style={{flex: 1, marginStart: '3%'}}>
            <Text style={[styles.subField]}>
              {chosenCaregiver?.contact_number}
            </Text>
            <Text style={styles.mainField}>{chosenCaregiver?.first_name}</Text>
          </View>
        </View>

        <Text style={styles.fieldText}>
          {type === 'add' ? 'Select' : 'Requested'} Access Privileges
        </Text>
        <ScrollView style={{flexGrow: 1}}>
          <AccessOption
            mainheader={"Patient's First Name"}
            subheader={'Personal Information'}
            onSelect={() => setAccessName(!accessName)}
            selected={accessName}
          />
          <AccessOption
            mainheader={"Patient's Report & Diary"}
            subheader={'Health Information'}
            onSelect={() => setAccessRd(!accessRD)}
            selected={accessRD}
          />
          <AccessOption
            mainheader={"Patient's Result"}
            subheader={'Health Information'}
            onSelect={() => setAccessLr(!accessLr)}
            selected={accessLr}
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
        {from === 'caregiver' ? (
          <TouchableOpacity
            onPress={() => authorise()}
            style={
              !isEmpty(chosenCaregiver)
                ? globalStyles.submitButtonStyle
                : globalStyles.skipButtonStyle
            }>
            <Text style={globalStyles.actionButtonText}>Request</Text>
          </TouchableOpacity>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <DeleteBin
              style={diaryStyles.binIcon}
              method={() => setShowDelete(true)}
            />

            <TouchableOpacity
              style={logStyles.enableEditButton}
              onPress={() => closeModal()}>
              <Text style={globalStyles.actionButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <DeleteModal
        visible={showDelete}
        item={caregiver.first_name}
        confirmMethod={deleteCaregiver}
        close={() => setShowDelete(false)}
      />
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
