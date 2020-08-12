import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
//third party libs
import {connect} from 'react-redux';
//functions
import {mapStateToProps, mapDispatchToProps} from '../../redux/reduxMapping';
import {storeToken} from '../../storage/asyncStorageFunctions';
//components
import MoreFunctionBlock from '../../components/moreFunctionBlock';

const MoreRootScreen = (props) => {
  const clickHandler = (id) => {
    switch (id) {
      case 1:
        props.navigation.navigate('AccountDetail');
        break;
      case 2:
        props.navigation.navigate('Medication');
        break;

      case 3:
        props.navigation.navigate('Appointments');
        break;

      case 4:
        props.navigation.navigate('HypocorrectionFood');
        break;

      case 5:
        storeToken('');
        props.logout();
        break;
    }
  };

  const functionList = [
    {id: 1, value: 'View Account Details'},
    {id: 2, value: 'View My Medications'},
    {id: 3, value: 'View My Appointments'},
    {id: 4, value: 'View Hypo-correction Food'},
    {id: 5, value: 'Logout'},
  ];

  return (
    <View style={{...styles.moreScreen, ...props.style}}>
      <FlatList
        style={styles.list}
        keyExtractor={(item, index) => item.id}
        data={functionList}
        renderItem={(itemData) => (
          <MoreFunctionBlock
            id={itemData.item.id}
            text={itemData.item.value}
            clickFunc={clickHandler}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  moreScreen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreRootScreen);
