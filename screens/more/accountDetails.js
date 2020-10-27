import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
//component
import Clickable from '../../components/account/clickable';
//style
import globalStyles from '../../styles/globalStyles';
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
//third party lib
import Ant from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../../styles/colors';
import {getPatientProfile} from '../../netcalls/requestsAccount';

import USER_MALE from '../../resources/images/Patient-Icons/SVG/user-male.svg';
import USER_FEMALE from '../../resources/images/Patient-Icons/SVG/user-female.svg';

const iconStyle = {
  height: 200,
  width: 200,
  alignSelf: 'center',
  marginBottom: '3%',
  marginTop: '3%',
};

const AccountDetailScreen = (props) => {
  const [usernameModalVisible, setUsernameModalVisible] = useState(false);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [patient, setPatient] = useState({});

  console.log(patient.gender);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    getPatientProfile().then((response) => {
      if (response != null) {
        let data = response.patient;
        setPatient(data);
        setUsername(data.username);
        let nameString = data.first_name + ' ' + data.last_name;
        setName(nameString);
        setPhoneNumber(data.contact_number);
      }
    });
  };

  return (
    <View style={[globalStyles.pageContainer]}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={() => props.navigation.navigate('Home')} />
      </View>
      <Text style={globalStyles.pageHeader}>Edit Account</Text>
      <ScrollView contentContainerStyle={{...props.style}}>
        {patient?.gender === 'female' ? (
          <USER_FEMALE {...iconStyle} />
        ) : (
          <USER_MALE {...iconStyle} />
        )}
        <View style={{flexDirection: 'row', margin: '2%'}}>
          <Ant name="user" size={30} color={Colors.lastLogValueColor} />
          <Text style={styles.sectionHeading}>Account Details</Text>
        </View>
        <Clickable
          heading={'Username'}
          content={username}
          click={false}
          usernameModalVisible={usernameModalVisible}
          openModal={() => setUsernameModalVisible(true)}
          closeModal={() => {
            setUsernameModalVisible(false);
          }}
        />
        <Clickable
          heading={'Name'}
          content={name}
          click={true}
          nameModalVisible={nameModalVisible}
          openModal={() => setNameModalVisible(true)}
          closeModal={() => {
            setNameModalVisible(false);
            init();
          }}
          patient={patient}
        />
        <Clickable
          heading={'Phone Number'}
          content={phoneNumber}
          click={true}
          phoneModalVisible={phoneModalVisible}
          openModal={() => setPhoneModalVisible(true)}
          closeModal={() => {
            setPhoneModalVisible(false);
            init();
          }}
          patient={patient}
        />
        <Clickable
          heading={'Change Password'}
          content={''}
          click={true}
          modalVisible={passwordModalVisible}
          openModal={() => setPasswordModalVisible(true)}
          closeModal={() => setPasswordModalVisible(false)}
        />

        {/*
        <Clickable
          heading="Medication Plan"
          content=""
          click={true}
          openModal={() => props.navigation.navigate('MedicationPlan')}
          closeModal={() => {}}
          modalVisible={false}
        />
        */}

        <View style={{flexDirection: 'row', margin: '2%'}}>
          <Entypo name="link" size={30} color={Colors.lastLogValueColor} />
          <Text style={styles.sectionHeading}>External Account</Text>
        </View>
        <Clickable
          heading="Setup fitibt"
          content=""
          click={true}
          openModal={() => props.navigation.navigate('FitbitSetup')}
          closeModal={() => {}}
          modalVisible={false}
        />

        <View style={{flex: 3}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImg: {
    width: 150,
    height: 150,
    padding: '2%',
    borderRadius: 150 / 2,
    borderWidth: 4,
    borderColor: '#AAD326',
    marginTop: '7%',
    alignSelf: 'center',
  },
  sectionHeading: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: 19,
    color: Colors.lastLogValueColor,
    marginTop: '2%',
    marginStart: '2%',
  },
});

export default AccountDetailScreen;
//edit flag
