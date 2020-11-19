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
import {
  getMyCaregiver,
  getPendingReq,
  getCode,
} from '../../netcalls/requestsMyCaregiver';
import AuthoriseContent from '../../components/myCaregiver/authoriseContent';
import AuthoriseReqModal from '../../components/authoriseReqModal';
import {pendingCaregiverReq} from '../../netcalls/urls';

const iconStyle = {
  width: 40,
  height: 40,
};

const MyCaregiverScreen = (props) => {
  const [caregiver, setCaregiver] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [pinNum, setPinNum] = useState('');

  const [pendingCaregiver, setPendingCaregiver] = useState({});
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    async function setUp() {
      await init();
    }
    setUp();
    //when enter page, check if there is any incoming request*
  }, []);

  const init = async () => {
    let rsp = await getMyCaregiver();
    if (rsp?._id != null) {
      setCaregiver(rsp);
      setPendingCaregiver({});
    } else {
      setCaregiver({});
      let obj = await getPendingReq();
      //there is a pending request
      console.log(obj.response);
      if (obj?.status === 200) {
        setShowModal(true);
        setPermissions(obj?.response?.permissions);
        setPendingCaregiver(obj?.response?.caregiver);
      } else {
        let code = await getCode();
        setPinNum(code?.code);
        //check again for any incoming req
        setTimeout(init, 5000);
      }
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setShowDetailModal(true);
  };

  const closeReqModal = () => {
    setShowModal(false);
    init().then(() => {});
  };

  //get caregiver assigned and the list of permission granted*
  return (
    <View style={{...globalStyles.pageContainer, ...props.style}}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={() => props.navigation.navigate('Home')} />
      </View>
      <Text style={globalStyles.pageHeader}>My Caregiver</Text>

      {isEmpty(caregiver) ? (
        <>
          <Text style={styles.subHeading}>Authorisation</Text>
          <AuthoriseContent pinNum={pinNum} />
        </>
      ) : (
        <>
          <Text style={styles.subHeading}>Appointed</Text>
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
        </>
      )}
      {showModal ? (
        <AuthoriseReqModal
          visible={showModal}
          closeSuccess={closeReqModal}
          pendingCaregiver={pendingCaregiver}
          permissions={permissions}
        />
      ) : null}
      {showDetailModal ? (
        <AddViewCaregiverModal
          visible={showDetailModal}
          closeModal={() => {
            setShowDetailModal(false);
            init();
          }}
          type={modalType}
          caregiver={caregiver}
          pendingCaregiver={pendingCaregiver}
          patient={null}
          permissions={permissions}
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
