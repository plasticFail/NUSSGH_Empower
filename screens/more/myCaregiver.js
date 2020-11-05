import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
//style
import {Colors} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';
//function
import {isEmpty} from '../../commonFunctions/common';
//third party lib
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
//component
import LeftArrowBtn from '../../components/logs/leftArrowBtn';

import USER_MALE from '../../resources/images/Patient-Icons/SVG/user-male.svg';
import USER_FEMALE from '../../resources/images/Patient-Icons/SVG/user-female.svg';
import AddViewCaregiverModal from '../../components/myCaregiver/addViewCaregiverModal';
import {getMyCaregiver} from '../../netcalls/requestsMyCaregiver';

const iconStyle = {
  width: 40,
  height: 40,
};

const MyCaregiverScreen = (props) => {
  const [caregiver, setCaregiver] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    getMyCaregiver().then((rsp) => {
      if (rsp?._id != null) {
        setCaregiver(rsp);
      }
    });
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  //get caregiver assigned and the list of permission granted*
  return (
    <View style={{...globalStyles.pageContainer, ...props.style}}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={() => props.navigation.navigate('Home')} />
      </View>
      <Text style={globalStyles.pageHeader}>My Caregiver</Text>
      <Text style={styles.subHeading}>Appointed</Text>
      {isEmpty(caregiver) ? (
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => openModal('add')}>
          <AntDesign
            name="pluscircleo"
            color={'#aad326'}
            size={25}
            style={{margin: '2%'}}
          />
          <Text style={styles.addText}>Add Caregiver</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={globalStyles.row}
          onPress={() => openModal('view')}>
          <View style={{flexDirection: 'row'}}>
            {caregiver?.gender === 'female' ? (
              <USER_FEMALE {...iconStyle} />
            ) : (
              <USER_MALE {...iconStyle} />
            )}
            <Text style={globalStyles.field}>
              {caregiver?.first_name} {caregiver?.last_name}{' '}
            </Text>
            <Entypo
              name="chevron-small-right"
              size={40}
              style={{opacity: 0.5, color: '#21293A'}}
            />
          </View>
        </TouchableOpacity>
      )}
      {showModal ? (
        <AddViewCaregiverModal
          visible={showModal}
          closeModal={() => {
            setShowModal(false);
            init();
          }}
          type={modalType}
          caregiver={caregiver}
        />
      ) : null}
    </View>
  );
};

export default MyCaregiverScreen;

const styles = StyleSheet.create({
  subHeading: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 20,
    marginStart: '3%',
    color: Colors.grey,
    opacity: 0.6,
  },
  chevronstyle: {
    justifyContent: 'center',
  },
  addText: {
    marginStart: '2%',
    color: '#a7d026',
    fontSize: 20,
    marginTop: '2%',
  },
});
