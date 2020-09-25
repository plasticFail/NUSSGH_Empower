import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
// styles
import logStyles from '../../styles/logStyles';
import {Colors} from '../../styles/colors';
//third party lib
import Entypo from 'react-native-vector-icons/Entypo';
import {normalTextFontSize} from '../../styles/variables';

const options = [
  {name: 'Daily', value: 'daily'},
  {name: 'Weekly', value: 'weekly'},
  {name: 'Monthly', value: 'monthly'},
  {name: 'One-Off', value: 'one-off'},
];

const FrequencySelector = (props) => {
  const {selected, setSelected} = props;
  const [open, setOpen] = useState(false);

  const formatSelected = (text) => {
    return (
      String(text).substr(0, 1).toUpperCase() +
      String(text).substr(1, String(text.length))
    );
  };

  return (
    <>
      <Text
        style={[
          logStyles.fieldName,
          {color: Colors.lastLogValueColor, marginStart: '4%'},
        ]}>
        Frequency
      </Text>
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={[logStyles.inputField, styles.dropDownContainer]}>
        <Text style={styles.selectedText}>{formatSelected(selected)}</Text>
        {open ? (
          <Entypo
            name="chevron-thin-up"
            color={Colors.lastLogValueColor}
            size={20}
          />
        ) : (
          <Entypo
            name="chevron-thin-down"
            color={Colors.lastLogValueColor}
            size={20}
          />
        )}
      </TouchableOpacity>
      {open && (
        <View style={styles.dropDownItemContainer}>
          {options.map((item) =>
            item.value === selected ? (
              <TouchableOpacity
                style={{backgroundColor: '#aad326'}}
                onPress={() => {
                  setSelected(item.value);
                  setOpen(false);
                }}>
                <Text style={styles.dropdownItemLabel}>{item.name}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setSelected(item.value);
                  setOpen(false);
                }}>
                <Text style={styles.dropdownItemLabel}>{item.name}</Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      )}
    </>
  );
};

export default FrequencySelector;

const styles = StyleSheet.create({
  selectedText: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: normalTextFontSize,
    flex: 1,
  },
  dropDownContainer: {
    marginStart: '4%',
    marginEnd: '4%',
    flexDirection: 'row',
    borderRadius: 3,
  },
  dropDownItemContainer: {
    marginStart: '4%',
    marginEnd: '4%',
    backgroundColor: 'white',
    marginTop: '-2%',
  },
  dropdownItemLabel: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: normalTextFontSize,
    margin: '2%',
  },
});
