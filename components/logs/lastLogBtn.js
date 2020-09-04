import React, {useEffect, useState, useRef} from 'react';
import {Text, View, TouchableOpacity, Image, Animated} from 'react-native';
//styles
import logStyles from '../../styles/logStyles';
import globalStyles from '../../styles/globalStyles';
//function
import {
  renderLogIcon,
  bg_key,
  food_key,
  med_key,
  weight_key,
  isToday,
  isPeriod,
} from '../../commonFunctions/logFunctions';
//third part lib
import Entypo from 'react-native-vector-icons/Entypo';
//function
import {getLastBgLog} from '../../storage/asyncStorageFunctions';
//component
import BloodGlucoseLogDisplay from './bloodGlucoseLogDisplay';

//show last values
const LastLogButton = (props) => {
  const {logType} = props;
  const [lastPeriod, setLastPeriod] = useState('');
  const [none4tdy, setnone4tdy] = useState(true);
  const [dataToDisplay, setDataToDisplay] = useState({});
  const [show, setShow] = useState(false);
  const [height, setHeight] = useState(0);
  const dropDownAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getLastLog();
  }, []);

  const getLastLog = () => {
    if (logType === bg_key) {
      getLastBgLog().then((response) => {
        if (response && isToday(response.date)) {
          setnone4tdy(false);
          setLastPeriod(isPeriod(response.hour));
          setDataToDisplay(response);
        }
      });
    } else if (logType === weight_key) {
    }
  };

  const getHeight = (event) => {
    setHeight(event.nativeEvent.layout.height);
  };

  dropDownAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });

  return (
    <>
      <TouchableOpacity
        style={logStyles.lastLogContainer}
        onPress={() => setShow(!show)}>
        <View style={{marginEnd: '4%'}}>
          <Image
            source={renderLogIcon(bg_key)}
            style={logStyles.mini_loglogo}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={[globalStyles.pageDetails, {color: 'white'}]}>
            {logType}
          </Text>
          {none4tdy ? (
            <Text style={logStyles.lastLogDetail}>No Logs Done for Today</Text>
          ) : (
            <Text style={logStyles.lastLogDetail}>
              Last logged in the {lastPeriod}
            </Text>
          )}
        </View>
        <View style={{alignSelf: 'flex-end'}}>
          {show === false ? (
            <Entypo
              name="chevron-down"
              size={30}
              color="white"
              onPress={() => setShow(true)}
            />
          ) : (
            <Entypo
              name="chevron-up"
              size={30}
              color="white"
              onPress={() => setShow(false)}
            />
          )}
        </View>
      </TouchableOpacity>
      {!none4tdy && logType === bg_key && (
        <BloodGlucoseLogDisplay
          data={dataToDisplay}
          show={show}
          setShow={setShow}
        />
      )}
    </>
  );
};

export default LastLogButton;
