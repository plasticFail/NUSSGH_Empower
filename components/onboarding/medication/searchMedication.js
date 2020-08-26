import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
//third party library
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {storeMedications} from '../../../netcalls/requestsLog';
import SearchResult from '../searchResult';

Ionicons.loadFont();

const SearchMedication = (props) => {
  const {visible, closeModal} = props;
  const {selectedMedicine, setSelectedMedicine} = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchKeyCache, setSearchKeyCache] = useState('');
  const [searchResults, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //time lag when call api*
  useEffect(() => {
    console.log('search key ' + searchTerm + ' cache ' + searchKeyCache);
    if (searchKeyCache == searchTerm) {
      setTimeout(() => searchMedication(), 800);
    }
  }, [searchTerm, searchKeyCache]);

  //update states
  const search = (query) => {
    if (query === '') {
      setIsLoading(false);
      setSearchResult([]);
      setSearchTerm('');
      setSearchKeyCache('');
    } else {
      setIsLoading(true);
      setSearchTerm(query);
      setTimeout(() => {
        setSearchKeyCache(query);
      }, 1000);
    }
  };

  //make api call
  const searchMedication = () => {
    if (searchTerm != '') {
      let arr = [];
      storeMedications().then((response) => {
        for (let x of response.medications) {
          arr.push(x);
        }
        let result = arr.filter((medication) => {
          let medicine = medication.drug_name
            .replace(/\s{1,2}\[|\]/g, ' ')
            .toLowerCase();
          let searchArr = String(searchTerm).split(' ');
          let count = 0;
          for (let x of searchArr) {
            if (medicine.includes(x.toLowerCase())) {
              count += 1;
            }
          }
          if (count === searchArr.length) {
            return medication;
          }
        });
        setSearchResult(result);
        setIsLoading(false);
      });
    } else {
      setSearchResult([]);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isVisible={visible}
      coverScreen={true}
      backdropOpacity={1}
      backdropColor={'white'}>
      <View style={{flexDirection: 'row', marginTop: '5%'}}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={30}
            color="#000"
            style={{padding: '1%'}}
          />
          <TextInput
            onChangeText={(value) => search(value)}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity onPress={closeModal}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {searchTerm === '' ? (
        <>
          <Text style={styles.prompt}>
            Input your medication in the search bar!
          </Text>
          <View style={{flex: 1}} />
        </>
      ) : isLoading ? (
        <>
          <ActivityIndicator
            size="large"
            color="#B3D14C"
            style={{justifyContent: 'center', marginTop: '50%'}}
          />
          <View style={{flex: 1}} />
        </>
      ) : searchResults.length > 0 ? (
        <View style={{flex: 1}}>
          <SearchResult
            medicationList={searchResults}
            selectedMedicine={selectedMedicine}
            setSelectedMedicine={setSelectedMedicine}
            closeModal={closeModal}
          />
        </View>
      ) : (
        <>
          <Text style={styles.prompt}>No results for {searchTerm}</Text>
          <View style={{flex: 1}} />
        </>
      )}
    </Modal>
  );
};

export default SearchMedication;

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    backgroundColor: 'white',
    flex: 1,
  },
  cancelText: {
    alignSelf: 'flex-end',
    fontSize: 20,
    color: '#aad326',
    marginTop: '10%',
    marginStart: '3%',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6ebed',
    borderRadius: 20,
  },
  searchInput: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    color: '#424242',
    backgroundColor: '#e6ebed',
    fontSize: 20,
    borderRadius: 20,
  },
  prompt: {
    alignSelf: 'center',
    marginTop: '50%',
    fontSize: 20,
    width: '80%',
    textAlign: 'center',
  },
});
