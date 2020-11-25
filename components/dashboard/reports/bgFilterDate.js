import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {getDateRange} from '../../../commonFunctions/diaryFunctions';
import Moment from 'moment';
import {adjustSize} from '../../../commonFunctions/autoResizeFuncs';

const BgFilterDate = (props) => {
  const {date} = props;
  const {getSelectedDate} = props;
  const [expand, setExpand] = useState(false);
  const [dateList, setDateList] = useState([]);

  useEffect(() => {
    let list = getDateRange(28, new Date());
    list.reverse();
    setDateList(list);
  }, []);

  const selectDate = (item) => {
    if (expand) {
      getSelectedDate(item);
      setExpand(false);
    } else {
      setExpand(true);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={{...props.style, ...styles.container}}
        onPress={() => selectDate()}>
        <Text style={[styles.dateText, {alignSelf: 'center'}]}>
          {' '}
          {Moment(new Date(date)).format('D MMM YYYY')}
        </Text>
        <EvilIcon name="chevron-down" size={adjustSize(30)} />
      </TouchableOpacity>

      {expand && (
        <ScrollView style={styles.expandContent}>
          <TouchableOpacity
            style={[{flexDirection: 'row'}, styles.optionContainer]}
            onPress={() => setExpand(false)}>
            <Text style={[styles.dateText, {opacity: 0.5}]}>Please Select</Text>
            <EvilIcon name="chevron-up" size={adjustSize(30)} style={{opacity: 0.5}} />
          </TouchableOpacity>
          {dateList.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionContainer,
                {
                  backgroundColor:
                    Moment(new Date(date)).format('YYYY/MM/DD') ===
                    Moment(new Date(item)).format('YYYY/MM/DD')
                      ? '#aad326'
                      : null,
                },
              ]}
              onPress={() => selectDate(item)}>
              <Text style={styles.dateText}>
                {' '}
                {Moment(new Date(item)).format('D MMM YYYY')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default BgFilterDate;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: '5%',
    top: '3%',
    borderWidth: 1,
    borderColor: '#e1e7ed',
    backgroundColor: 'white',
    paddingHorizontal: '3%',
    paddingVertical: '1%',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: adjustSize(10),
  },
  dateText: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: adjustSize(15),
  },
  expandContent: {
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 2,
    right: '5%',
    paddingHorizontal: '3%',
    top: '3%',
    borderRadius: adjustSize(10),
    borderWidth: 1,
    borderColor: '#e1e7ed',
    height: '50%',
  },
  optionContainer: {
    paddingVertical: '3%',
    justifyContent: 'center',
    marginTop: '2%',
    marginBottom: '2%',
  },
});
