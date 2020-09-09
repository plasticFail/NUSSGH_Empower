import React from 'react';
import {View, StyleSheet, ActivityIndicator, Alert} from 'react-native';
// Functions
import {requestUnfavouriteMeal, requestFavouriteMealList} from "../../../../netcalls/mealEndpoints/requestMealLog";
// Others
import MealList from "../../../../components/logs/meal/MealList";

// The screen that contains a list of the user's favourite meals.
export default class FavouriteMealComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            favouriteMeals: []
        }
    }

    componentDidMount() {
        // Get user's favourite meal.
        requestFavouriteMealList().then(data => {
            // Create this temporary observer pattern to handle unfavouriting.
            this.setState({
                isLoading: false,
                favouriteMeals: data.data
            });
        }).catch(err => alert(err.message));
    }

    navigateToCreateMealLogPage = (selectedMeal) => {
        const meal = {...selectedMeal};
        meal.isFavourite = false;
        meal.mealName = "";
        this.props.navigation.navigate("CreateMealLog", {
            meal
        });
    }

    handleUnfavouriteMeal = (meal) => {
        requestUnfavouriteMeal(meal.mealName)
            .then(data => {
                // unfavourite the item from local state.
                this.setState({
                    favouriteMeals: this.state.favouriteMeals.filter(m => m.mealName !== meal.mealName)
                })
            })
            .catch(err => Alert.alert("Error", err.message, [ { text: 'Ok' }]));
    }

    render() {
        const {isLoading, favouriteMeals} = this.state;
        const {filterQuery} = this.props;
        return (
            isLoading ?
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#B3D14C" />
            </View> :
            <View style={styles.root}>
                {
                    <MealList meals={favouriteMeals} filterQuery={filterQuery}
                              onMealAdd={this.navigateToCreateMealLogPage}
                              options={{
                                    buttons: [
                                        {
                                            icon: {
                                                name: 'star',
                                                color: '#aad326'
                                            },
                                            onPress: this.handleUnfavouriteMeal,
                                            buttonStyle: {
                                                width: 40
                                            }
                                        }
                                    ],
                                    header: (meal) => meal.mealName,
                                }}
                          />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    root: {
        flexGrow: 1,
    }
})
