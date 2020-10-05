import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import logStyles from '../../styles/logStyles';
//third party lib
import Ionicons from 'react-native-vector-icons/Ionicons';
//function
import {isEmpty} from '../../commonFunctions/common';
//component
import SearchMedication from '../medication/searchMedication';

const SearchBarMed = (props) => {
  const {selectedMed, setSelectedMed} = props;
  const [openSearchModal, setOpenSearchModal] = useState(false);

  return (
    <View style={{...props.style}}>
      <TouchableOpacity
        style={[logStyles.inputField, {margin: '3%'}]}
        onPress={() => setOpenSearchModal(true)}>
        {selectedMed.medication === undefined ? (
          <Text style={{fontSize: 17, color: '#b5b5b5'}}>
            <Ionicons name="search" size={20} /> Name (eg. Metformin)
          </Text>
        ) : (
          <Text style={{fontSize: 17, color: 'black'}}>
            {selectedMed.medication}
          </Text>
        )}
      </TouchableOpacity>
      {/*Search Modal */}
      {openSearchModal ? (
        <SearchMedication
          visible={openSearchModal}
          closeModal={() => setOpenSearchModal(false)}
          selectedMedicine={selectedMed}
          setSelectedMedicine={setSelectedMed}
        />
      ) : null}
    </View>
  );
};
export default SearchBarMed;
