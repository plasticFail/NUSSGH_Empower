import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
//third party library
import Entypo from 'react-native-vector-icons/Entypo';
//component
import EditPasswordModal from './editPasswordModal';
import EditPhoneModal from './editPhoneModal';
import {Colors} from '../../styles/colors';
import EditUsernameModal from './editUsernameModal';
import EditNameModal from './editNameModal';

Entypo.loadFont();

const Clickable = (props) => {
  const {heading, content} = props;
  const {openModal} = props;

  return (
    <>
      <TouchableOpacity containerStyle={styles.container}>
        <View style={styles.view}>
          <View style={{flex: 1}}>
            <Text style={styles.headingText}>{heading}</Text>
            <Text style={styles.contentText}>{content}</Text>
          </View>
          <TouchableOpacity
            onPress={() => openModal()}
            style={{alignSelf: 'flex-end'}}>
            <Entypo name="edit" size={25} color={'#aad326'} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {props.modalVisible ? (
        <EditPasswordModal
          visible={props.modalVisible}
          close={props.closeModal}
        />
      ) : null}
      {props.usernameModalVisible ? (
        <EditUsernameModal
          visible={props.usernameModalVisible}
          close={props.closeModal}
        />
      ) : null}
      {props.nameModalVisible ? (
        <EditNameModal
          visible={props.nameModalVisible}
          close={props.closeModal}
        />
      ) : null}
      {props.phoneModalVisible ? (
        <EditPhoneModal
          visible={props.phoneModalVisible}
          close={props.closeModal}
        />
      ) : null}
    </>
  );
};

export default Clickable;

const styles = StyleSheet.create({
  container: {
    marginStart: '5%',
    width: '100%',
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '2%',
    borderTopWidth: 0.5,
    borderColor: Colors.lastLogValueColor,
    margin: '1%',
  },
  headingText: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 14,
    color: Colors.lastLogValueColor,
  },
  contentText: {
    fontSize: 18,
    marginRight: '3%',
    fontFamily: 'SFProDisplay-Regular',
  },
});
