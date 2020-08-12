import React, {useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import SampleData from '../../screens/more/sampleHypoList.json';

//using sample data for now
const ViewMore = (props) => {
  const {category} = props.route.params;
  const [arr, setArr] = useState([]);

  useEffect(() => {
    //initialise list of items under same category
    for (var x in SampleData.data) {
      if (x.category === category) {
        setArr(x.foodItems);
      }
    }
  }, []);

  return <View style={styles.screen}></View>;
};

export default ViewMore;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
});
