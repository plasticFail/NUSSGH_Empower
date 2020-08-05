import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from "react-native";
// Other
import SampleFavouriteMeal from './SampleFavouriteMeal.json';
import MealList from "./MealList";
import {getToken} from "../../../../storage/asyncStorageFunctions";

export default class RecentMealScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            recentMeals: []
        }
    }

    componentDidMount() {
        // Fetch recently logged meals.
        const mealListEndpoint = 'https://sghempower.com/log/meal/list';
        getToken().then(token => {
                fetch(mealListEndpoint, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    }
                }).then(resp => resp.json()).then(data => {
                    this.setState({
                        isLoading: false,
                        recentMeals: data.data
                    });
                }).catch(err => alert(err.message));
            })
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
        backgroundColor: '#fff',
        height: '100%'
    },
    loadingContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})