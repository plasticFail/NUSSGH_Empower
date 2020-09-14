import React from 'react';
import {View, StyleSheet, ActivityIndicator, Alert} from "react-native";
// Functions
import {requestMealLogList} from "../../../../netcalls/mealEndpoints/requestMealLog";
// Other
import MealList from "../../../../components/logs/meal/MealList";

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
        requestMealLogList().then(data => {
            this.setState({
                isLoading: false,
                recentMeals: data.data
            });
        }).catch(err => Alert.alert('Error',err.message, [ { text: 'Ok' }]));
    }

    navigateToCreateMealLogPage = (selectedMeal) => {
        const { parentScreen } = this.props.route.params;
        const meal = {...selectedMeal};
        meal.isFavourite = false;
        meal.mealName = "";
        this.props.navigation.navigate("CreateMealLog", {
            meal,
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
                              options={{
                                  buttons: [
                                      {
                                          text: 'Select',
                                          onPress: this.navigateToCreateMealLogPage
                                      }
                                  ],
                                  header: (meal) => meal.record_date
                              }}
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