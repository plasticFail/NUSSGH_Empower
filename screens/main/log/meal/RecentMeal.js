import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from "react-native";
// Other
import SampleFavouriteMeal from './SampleFavouriteMeal.json';
import MealList from "./MealList";

export default class RecentMealScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            recentMeals: []
        }
    }

    componentDidMount() {
        // Simulate 1 seconds for calling api
        setTimeout(() => {
            this.setState({
                isLoading: false,
                recentMeals: SampleFavouriteMeal.data
            })
        }, 1000);
    }

    navigateToCreateMealLogPage = (selectedMeal) => {
        const { selectedMealType, selectedDateTime } = this.props.route.params;
        this.props.navigation.navigate("CreateMealLog", {
            meal: selectedMeal,
            selectedMealType,
            selectedDateTime
        });
    }

    render() {
        const {isLoading, recentMeals} = this.state;
        return ( isLoading ?
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#B3D14C" />
                </View> :
                <View style={styles.root}>
                    <MealList meals={recentMeals}
                              onSelectMeal={this.navigateToCreateMealLogPage}
                              options={{mode: 'recent'}}
                    />
                </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#fff'
    },
    loadingContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})