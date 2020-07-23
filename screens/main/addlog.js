import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import DefaultMealLogScreen from './log/meal/DefaultMealLogScreen';

const Stack = createStackNavigator();

const AddLogDetails = ({style, navigation}) => {
    return <View style={{...styles.addLogScreen, style}}>
        <Text>Add Log</Text>
        <Button title={"To meal log"} onPress={(event) => {
            navigation.push('MealLog');
        }} />
    </View>
};

const AddLogScreen = props => {
    return <Stack.Navigator>
        <Stack.Screen name={'AddLog'} component={AddLogDetails} />
        <Stack.Screen name={'MealLog'} component={DefaultMealLogScreen}
                      options={{animationEnabled: false}} />
    </Stack.Navigator>
}

const styles = StyleSheet.create({
    addLogScreen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default AddLogScreen;
