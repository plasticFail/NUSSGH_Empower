import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet, Image,
} from 'react-native';
//other screens
import BloodGlucoseLog from '../bloodGlucoseLog';
import BloodGlucoseLogBlock from '../../../../components/logs/bloodGlucoseLogBlock';


const DailyLog1 = (props) => {
    const [date, setDate] = useState(new Date());
    const [bloodGlucose, setBloodGlucose] = useState('');

    return (
        <View style={styles.screen}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Step 1: Blood Glucose Log</Text>
            </View>
            <Image
                style={styles.progress}
                resizeMode='contain'
                source={require('../../../../resources/images/progress1.png')}
            />
            <BloodGlucoseLogBlock date={date} setDate={setDate} bloodGlucose={bloodGlucose} setBloodGlucose={setBloodGlucose}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        padding: 20,
    },
    textContainer: {
        width: '100%',
    },
    text: {
        fontSize: 18,
    },
    progress:{
        width: '100%',
        height: 100,
    },
});

export default DailyLog1;
