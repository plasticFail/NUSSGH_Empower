import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
//component
import Clickable from '../../components/account/clickable';
import MenuBtn from '../../components/menuBtn';
//style
import globalStyles from '../../styles/globalStyles';
import {Colors} from '../../styles/colors';

const profilePic = require('../../resources/images/userPic.png');

const username = 'Jimmy';
const name = 'Jimmy Tan';
const phoneNumber = '89898989';

const AccountDetailScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openPhoneModal = () => {
    setPhoneModalVisible(true);
  };

  const closePhoneModal = () => {
    setPhoneModalVisible(false);
  };

  return (
    <View style={[globalStyles.pageContainer]}>
      <View style={globalStyles.menuBarContainer}>
        <MenuBtn />
      </View>
      <ScrollView contentContainerStyle={{...props.style}}>
        <Image source={profilePic} style={styles.profileImg} />
        <Clickable heading={'Username'} content={username} click={false} />
        <Clickable heading={'Name'} content={name} click={false} />
        <Clickable
          heading={'Phone Number'}
          content={phoneNumber}
          click={true}
          phoneModalVisible={phoneModalVisible}
          openModal={openPhoneModal}
          closeModal={closePhoneModal}
        />

        <Clickable
          heading={'Change Password'}
          content={''}
          click={true}
          modalVisible={modalVisible}
          openModal={openModal}
          closeModal={closeModal}
        />

        <Clickable heading='Medication Plan'
                   content=''
                   click={true}
                   openModal={()=>props.navigation.navigate('MedicationPlan')}
                   closeModal={()=>{}}
                   modalVisible={false}
        />
        <Clickable
            heading='Setup fitibt'
            content=''
            click={true}
            openModal={()=>props.navigation.navigate('FitbitSetup')}
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
});

export default AccountDetailScreen;
//edit flag
