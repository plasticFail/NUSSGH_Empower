import React, {useEffect, useState, Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
//component
import MenuBtn from '../../components/menuBtn';
//styles
import globalStyles from '../../styles/globalStyles';
//third party lib
import Modal from 'react-native-modal';
import {Calendar} from 'react-native-calendars';
//components
import LeftArrowBtn from '../../components/logs/leftArrowBtn';
import Medication4Day from '../../components/medication/medication4Day';
//style
import {Colors} from '../../styles/colors';
import {getMedication4DateRange} from '../../netcalls/requestsMedPlan';
import {
  prepareDataFromAPI,
  fromDate,
  toDate,
} from '../../commonFunctions/medicationFunction';
import LoadingModal from '../../components/loadingModal';

export default class MedicationScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      medicationList: {},
      loading: true,
      returnLoad: false,
    };

    this.props.navigation.addListener('focus', () => {
      //check the period, date and which logs done
      this.setUp();
    });
  }

  componentDidMount() {
    this.setUp();
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.route.params != this.props.route.params) {
      console.log('in update-----');
      this.setUp();
    }
  }

  setUp = () => {
    this.setState({loading: true});
    getMedication4DateRange(fromDate, toDate)
      .then((response) => {
        if (response != null) {
          this.setState({loading: false});
          this.prepareData(response);
          this.setState({returnLoad: false});
        }
      })
      .catch((err) => console.log(err));
  };

  prepareData = (data) => {
    this.setState({medicationList: prepareDataFromAPI(data)});
  };

  render() {
    const {loading, medicationList, returnLoad} = this.state;
    return (
      <View style={globalStyles.pageContainer}>
        <View style={globalStyles.menuBarContainer}>
          <LeftArrowBtn close={() => this.props.navigation.navigate('Home')} />
        </View>
        <Text style={globalStyles.pageHeader}>Medication</Text>
        <Text style={[globalStyles.pageSubDetails, {marginBottom: '4%'}]}>
          Select the date to view or add medication
        </Text>
        <Calendar
          dayComponent={Medication4Day}
          hideArrows={false}
          selectAll={false}
          disableMonthChange={true}
          markingType={'custom'}
          selectAll={false}
          markedDates={medicationList}
          theme={{
            calendarBackground: Colors.backgroundColor,
            'stylesheet.calendar.header': {
              header: {
                flexDirection: 'row',
                marginTop: '2%',
                alignItems: 'center',
                alignSelf: 'center',
              },
              headerContainer: {
                width: '80%',
                flexDirection: 'row',
                justifyContent: 'center',
              },
              monthText: {
                fontSize: 20,
                fontFamily: 'SFProDisplay-Bold',
              },
            },
            arrowColor: Colors.lastLogValueColor,
          }}
        />
        {loading ? (
          <LoadingModal
            visible={loading}
            message={'Retrieving your Medication Plan'}
          />
        ) : null}
      </View>
    );
  }
}
