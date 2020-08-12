import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SectionList, Text} from 'react-native';
import Carousel from '../../components/hypofood/carousel';
import SampleData from './sampleHypoList.json';
import {FlatList} from 'react-native-gesture-handler';

const HypocorrectionFood = (props) => {
  /*
  const [categoryList, setCategoryList] = useState([]);
  console.log(categoryList);
  //init
  useEffect(() => {
    let uniqueList = new Set(SampleData.data.map((food) => food.category));
    setCategoryList([...uniqueList]);
  }, []);
*/
  return (
    <View style={styles.screen}>
      <FlatList
        data={SampleData.data}
        renderItem={({item}) => (
          <>
            <Text>{item.category}</Text>
            <Carousel
              items={item.foodItems}
              itemsPerInterval={3}
              random={true}
              category={item.category}
            />
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    backgroundColor: 'white',
  },
});

export default HypocorrectionFood;
