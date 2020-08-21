import React, {useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
//component
import Clickable from '../../components/account/clickable';

const profilePic = require('../../resources/images/userPic.png');

const username = 'Jimmy';

const AccountDetailScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{...styles.accountDetailScreen, ...props.style}}>
      <Image source={profilePic} style={styles.profileImg} />
      <Clickable heading={'Username'} content={username} click={false} />
      <Clickable
        heading={'Change Password'}
        content={''}
        click={true}
        modalVisible={modalVisible}
        openModal={openModal}
        closeModal={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  accountDetailScreen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  profileImg: {
    width: 150,
    height: 150,
    padding: '2%',
    borderRadius: 150 / 2,
    borderWidth: 4,
    borderColor: '#AAD326',
  },
});

export default AccountDetailScreen;
