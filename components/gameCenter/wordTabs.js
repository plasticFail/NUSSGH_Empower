import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {horizontalMargins} from "../../styles/variables";

const wordTabTitles = [
    {
        name: "Completed",
        portion: 0.5
    },
    {
        name: "In Progress",
        portion: 0.5
    }
]

const {width, height} = Dimensions.get('window');

const WordTab = props => {
    const {currentTab, setTabCallback} = props;
    return (
        <View
            style={[
                {flexDirection: 'row', justifyContent: 'space-between'},
                props.style,
            ]}>
            {wordTabTitles.map((tab, index) => (
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        width: (width - horizontalMargins) * tab.portion,
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderBottomWidth: currentTab === index ? 3 : 0,
                        borderColor: '#aad326',
                    }}
                    onPress={() => setTabCallback(index)}
                    key={tab.name}>
                    <Text style={{color: currentTab === index ? "#aad326" : "#000", fontSize: 18}}>
                        {tab.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );

}

export default WordTab;
