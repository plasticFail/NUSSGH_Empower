import React from 'react';
import {View, StyleSheet, ActivityIndicator, Alert} from "react-native";
// Functions
import {getToken} from "../../../../storage/asyncStorageFunctions";
// Other
import {mealListEndpoint} from "../../../../netcalls/urls";
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
        // Fetch recently logged meals.
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
                }).catch(err => Alert.alert('Error',err.message, [ { text: 'Ok' }]));
            })
    }

    navigateToCreateMealLogPage = (selectedMeal) => {
        const { parentScreen } = this.props.route.params;
        this.props.navigation.navigate("CreateMealLog", {
            meal: selectedMeal,
            parentScreen
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