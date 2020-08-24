import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

//props: handleEdit, handleDelete, disable (edit button)
const ActionButton = (props) => {
  const {disable} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {disable == true ? (
        <TouchableOpacity
          disabled={disable}
          style={[styles.actionButton, {backgroundColor: '#cdd4e4'}]}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.actionButton, {backgroundColor: '#aad326'}]}
          onPress={props.handleEdit}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[styles.actionButton, {backgroundColor: '#ffb7e7'}]}
        onPress={props.handleDelete}>
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  actionButton: {
    borderRadius: 20,
    margin: '2%',
    flexDirection: 'row',
    padding: '10%',
    alignSelf: 'center',
    marginVertical: 10,
    paddingHorizontal: 40,
    paddingVertical: 6,
  },
  actionText: {
    fontWeight: '700',
    fontSize: 17,
    textAlign: 'center',
  },
});
