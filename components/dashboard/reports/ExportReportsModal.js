import React, {useRef, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated, Dimensions, TouchableHighlight, ScrollView, Image, FlatList} from 'react-native';
import globalStyles from "../../../styles/globalStyles";
import Icon from "react-native-vector-icons/FontAwesome5";
import Modal from "react-native-modal";
import DatePicker from "react-native-date-picker";
import Moment from 'moment';
import {ACTIVITY_KEY, BGL_TAB_KEY, FOOD_INTAKE_KEY, MEDICATION_KEY, WEIGHT_KEY} from "../../../screens/main/reports";

// fs library
const RNFS = require('react-native-fs');
const pathPrefix = RNFS.DocumentDirectoryPath + '/';

const {width, height} = Dimensions.get('window');

const reportTypes = [
    {name: 'Blood Glucose'},
    {name: 'Food Intake'},
    {name: 'Medication'},
    {name: 'Weight'},
    {name: 'Activity'}
]

function ExportReportsModal(props) {
    const {visible, setVisible} = props;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedReportType, setSelectedReportTypes] = useState(reportTypes.map(type =>  {
        return {...type, selected: false};
    }));

    // Takes in report name that will be toggled.
    const updateReportSelected = (reportName) => {
        const newSelectedReports = selectedReportType.map((report, index) => {
           if (report.name === reportName) {
               return {
                   ...report,
                   selected: !report.selected
               }
           } else {
               return report;
           }
        });
        setSelectedReportTypes(newSelectedReports);
    }

    const handleExport = () => {
        const filename = 'MyReports.txt';
        const fp = pathPrefix + filename;
        const srt = selectedReportType.filter(type => type.selected).map(selectedType => selectedType.name).join(', ');
        const message = 'Just testing this file system library. Please work.';
        RNFS.writeFile(fp, message, 'utf8').then(success => {
            console.log(`Yay it worked, ${srt} file(s) saved at ${fp}`);
        }).catch(err => {
            console.log('Oh no it failed due to ' + err.message.toString());
        })
    }

    return (
        <Modal isVisible={visible} style={{margin: 0}}>
            <View style={globalStyles.pageContainer}>
                <ScrollView>
                    <View style={globalStyles.menuBarContainer}>
                        <TouchableOpacity onPress={()=>setVisible(false)}>
                            <Icon name={'chevron-down'} size={34} color='#16A850' />
                        </TouchableOpacity>
                    </View>
                    <Text style={globalStyles.pageHeader}>Export</Text>
                    <Text style={[globalStyles.pageDetails, {color: 'grey'}]}>Select report</Text>
                    <ReportTypeSelector style={globalStyles.pageDetails}
                                        reportTypes={selectedReportType}
                                        updateSelectionCallback={updateReportSelected} />
                    <View style={globalStyles.pageDetails}>
                        <CustomDatePicker date={startDate} label='From' setDate={setStartDate} />
                        <CustomDatePicker date={endDate} label='To' setDate={setEndDate} />
                    </View>
                </ScrollView>
                <View style={{flex: 1}} />
                <View style={globalStyles.buttonContainer}>
                    <TouchableHighlight
                        onPress={handleExport}
                        style={[globalStyles.submitButtonStyle, {backgroundColor: '#aad326'}]}
                        underlayColor='#fff'>
                        <Text style={[globalStyles.actionButtonText, {color: '#000'}]}>Export</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    );
}

function CustomDatePicker({date, setDate, label}) {
    const [visible, setVisible] = useState(false);
    const slideAnimation = useRef(new Animated.Value(0)).current;
    const heightInterpolate = slideAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 225], //I don't know how to get the height of the datepicker but 225 seems to fit it just nice.
        extrapolate: 'clamp',
    });

    const handleOpenCloseWithAnimation = (currentVisibility) => {
        if (currentVisibility) {
            Animated.timing(slideAnimation, {
                toValue: 0,
                duration: 300, // 300ms slide up animation when visible is set false.
                useNativeDriver: false,
            }).start(() => setVisible(false));
        } else {
            setVisible(true);
            Animated.timing(slideAnimation, {
                toValue: 1,
                duration: 300, // 300ms slide down animation when visible is set true.
                useNativeDriver: false,
            }).start();
        }
    };

    return (
        <View style={{width: '100%'}}>
            <TouchableOpacity onPress={()=>handleOpenCloseWithAnimation(visible)}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderColor: '#e5e5e5'}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: '#8d8d8d'}}>{label}</Text>
                    <Text style={{fontSize: 18}}>{Moment(date).format('DD MMM YYYY')}</Text>
                </View>
            </TouchableOpacity>
            {visible &&
                (<Animated.View
                    style={[
                        styles.slideAnimationWrapperForDatePicker,
                        {height: heightInterpolate},
                    ]}>
                    <DatePicker style={{width}} date={date}
                                onDateChange={setDate}
                                maximumDate={new Date()}
                                mode='date'/>
                </Animated.View>)
            }
        </View>
    )
}

function ReportTypeSelector(props) {
    const {updateSelectionCallback, style} = props;
    return (
        <FlatList data={props.reportTypes} style={style} keyExtractor={i => `report-type-${i.name}`}
                  numColumns={2}
                  renderItem={({item}) => (
                      <View style={{width: '50%', flexDirection: 'row', alignItems: 'center', paddingTop: 5, paddingBottom: 5}}>
                          <TouchableOpacity onPress={()=>updateSelectionCallback(item.name)}>
                              <View style={{width: 30, height: 30,
                                  backgroundColor: `${item.selected ? '#aad326' : '#d5d5d5'}`,
                                  borderRadius: 5}}/>
                          </TouchableOpacity>
                          <Text style={[globalStyles.pageDetails, {fontWeight: 'normal'}]}>{item.name}</Text>
                      </View>
                  )}
        />
    )
}

const styles = StyleSheet.create({
    slideAnimationWrapperForDatePicker: {
        overflow: 'hidden',
        marginStart: '4%',
        marginEnd: '4%',
    },
});

export {ExportReportsModal}
