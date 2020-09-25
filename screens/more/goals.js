import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
//styles
import globalStyles from '../../styles/globalStyles';
//component
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
//third party lib
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddGoalModal from '../../components/goals/addGoalModal';

const GoalsScreen = (props) => {
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <View style={globalStyles.pageContainer}>
      <View style={globalStyles.menuBarContainer}>
        <LeftArrowBtn close={() => props.navigation.navigate('Home')} />
      </View>
      <Text style={globalStyles.pageHeader}>Goals</Text>
      <Text style={[globalStyles.pageDetails, {marginBottom: '4%'}]}>
        Edit Your Targets
      </Text>
      <TouchableOpacity
        onPress={() => setOpenAdd(true)}
        style={{flexDirection: 'row'}}>
        <AntDesign
          name="pluscircleo"
          color={'#aad326'}
          size={25}
          style={{margin: '2%'}}
        />
        <Text style={styles.addbutton}>Add Goal</Text>
      </TouchableOpacity>
      <AddGoalModal visible={openAdd} close={() => setOpenAdd(false)} />
    </View>
  );
};

export default GoalsScreen;

const styles = StyleSheet.create({
  addbutton: {
    marginStart: '2%',
    color: '#aad326',
    fontSize: 20,
    marginTop: '2%',
  },
});
