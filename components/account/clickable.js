import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//third party library
import Entypo from 'react-native-vector-icons/Entypo';
//component
import EditPasswordModal from './editPasswordModal';
import EditPhoneModal from './editPhoneModal';

Entypo.loadFont();

const Clickable = (props) => {
  const {heading, content, click} = props;

  return (
    <>
      {click == true ? (
        <TouchableOpacity
          containerStyle={styles.container}
          onPress={props.openModal}>
          <View style={styles.view}>
            <Text style={styles.headingText}>{heading}</Text>
            <Text style={styles.contentText}>{content}</Text>
            <Entypo name="chevron-right" size={20} />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={[styles.container, styles.view]}>
          <Text style={styles.headingText}>{heading}</Text>
          <Text style={styles.contentText}>{content}</Text>
        </View>
      )}
      <EditPasswordModal
        visible={props.modalVisible}
        close={props.closeModal}
      />
      <EditPhoneModal
        visible={props.phoneModalVisible}
        close={props.closeModal}
      />
    </>
  );
};

export default Clickable;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: '5%',
    marginTop: '5%',
    width: '100%',
  },
  view: {flexDirection: 'row', justifyContent: 'space-around'},
  headingText: {
    fontWeight: '700',
    fontSize: 16,
    flex: 1,
  },
  contentText: {
    alignSelf: 'flex-end',
    fontSize: 16,
    marginRight: '3%',
  },
});
