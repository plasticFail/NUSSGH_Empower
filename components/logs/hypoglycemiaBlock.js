import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text, Animated} from 'react-native';
//component
import FormBlockFix from './formBlockFix';
import {useSafeArea} from 'react-native-safe-area-context';

const formQn1 = 'Did you eat lesser than usual today?';
const formQn2 = 'Did you exercise today';
const formQn3 = 'Did you have any alcoholic beverages today';

//take in props blood glucose value, then determine whether to show form and returns the selection
const HypoglycemiaBlock = (props) => {
  const [visible, setVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Number(props.bloodGlucose) <= 4 && props.bloodGlucose != '') {
      setVisible(true);
      //fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setVisible(true));
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }
  }, [props.bloodGlucose]);

  return (
    visible && (
      <Animated.View style={[{opacity: fadeAnim}]}>
        <View style={{flex: 1}}>
          <Text style={styles.header}>
            We are very concerned about your submitted blood glucose reading
            which is lower than your target minimum blood glucose
          </Text>
          <FormBlockFix
            question={formQn1}
            color={'#aad326'}
            getFormSelection={props.setEatSelection}
            selectYes={props.eatSelection}
            color={'#e958c8'}
          />
          <FormBlockFix
            question={formQn2}
            color={'#aad326'}
            getFormSelection={props.setExerciseSelection}
            selectYes={props.exerciseSelection}
            color={'#e958c8'}
          />
          <FormBlockFix
            question={formQn3}
            color={'#aad326'}
            getFormSelection={props.setAlcoholSelection}
            selectYes={props.alcoholSelection}
            color={'#e958c8'}
          />

          <View style={{marginTop: '2%'}}>
            <Text style={{marginStart: '2%', marginEnd: '2%'}}>
              *Submit your blood glucose now to view list of fast acting
              carbohydrate list that you should consume immediately!
            </Text>
          </View>
        </View>
      </Animated.View>
    )
  );
};

export default HypoglycemiaBlock;

const styles = StyleSheet.create({
  header: {
    fontSize: 17,
    alignSelf: 'center',
    marginTop: '5%',
  },
  formContainer: {},
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: 'black',
    marginStart: '5%',
  },
  questionContainer: {marginStart: '2%', marginBottom: '4%'},
  button: {
    marginTop: '9%',
    backgroundColor: '#eb90d6',
    width: 300,
    height: 40,
    borderRadius: 20,
    marginVertical: 10,
    paddingVertical: 6,
  },
  buttonText: {
    fontSize: 23,
    fontWeight: '500',
    textAlign: 'center',
  },
});
