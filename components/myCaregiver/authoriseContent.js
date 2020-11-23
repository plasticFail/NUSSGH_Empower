import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
//third party lib
import globalStyles from '../../styles/globalStyles';
import {adjustSize} from '../../commonFunctions/autoResizeFuncs';

const AuthoriseContent = (props) => {
  const {pinNum} = props;
  const [pinArr, setPinArr] = useState([]);

  useEffect(() => {
    let s = pinNum?.split('');
    setPinArr(s);
  }, [pinNum]);

  return (
    <>
      <Text style={[globalStyles.pageSubDetails, {marginTop: '4%'}]}>
        To appoint a Caregiver, show the below authorization code to the
        Caregiver
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: '10%',
          alignItems: 'center',
        }}>
        {pinArr?.map((item, index) => (
          <Text key={index} style={styles.pinNo}>
            {item}
          </Text>
        ))}
      </View>
      <Text style={styles.acknowledgeText}>
        By sharing the authorisation code, your First Name will also be shared
        with the Caregiver
      </Text>
    </>
  );
};

export default AuthoriseContent;

const styles = StyleSheet.create({
  pinNo: {
    fontFamily: 'SFProDisplay-Bold',
    fontSize: adjustSize(20),
  },
  acknowledgeText: {
    textAlign: 'center',
    margin: '6%',
    marginTop: '3%',
    opacity: 0.5,
    fontSize: adjustSize(15),
  },
});
