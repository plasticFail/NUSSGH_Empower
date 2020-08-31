import React from 'react';
import {View, StyleSheet, ActivityIndicator, Alert} from 'react-native';
// Functions
import {requestUnfavouriteMeal, requestFavouriteMealList} from "../../../../netcalls/mealEndpoints/requestMealLog";
// Others
import MealList from "../../../../components/logs/meal/MealList";
import Searchbar from "../../../../components/Searchbar";

// The screen that contains a list of the user's favourite meals.
export default class FavouriteMealScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            favouriteMeals: [],
            filterQuery: ''
        }
    }

    componentDidMount() {
        // Get user's favourite meal.
        requestFavouriteMealList().then(data => {
            // Create this temporary observer pattern to handle unfavouriting.
            this.setState({
                isLoading: false,
                favouriteMeals: data.data
            })
        }).catch(err => alert(err.message));
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

    handleChangeFilterQuery = (text) => {
        this.setState({
            filterQuery: text
        })
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
        const {isLoading, favouriteMeals, filterQuery} = this.state;
        const filteredMeals = favouriteMeals.filter(meal =>
            meal.mealName.toLowerCase().indexOf(filterQuery.toLowerCase()) > -1);
        return (
            isLoading ?
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#B3D14C" />
            </View> :
            <View style={styles.root}>
                <Searchbar containerStyle={{height: 50}} onChangeText={this.handleChangeFilterQuery}
                           onSubmit={() => {}}/>
                <MealList meals={filteredMeals}
                          onSelectMeal={this.navigateToCreateMealLogPage}
                          options={{
                                buttons: [
                                    {
                                        icon: {
                                            name: 'trash',
                                            color: '#fff'
                                        },
                                        onPress: this.handleUnfavouriteMeal,
                                        buttonStyle: {
                                            backgroundColor: 'red',
                                            width: 40
                                        }
                                    },
                                    {
                                        text: 'Select',
                                        onPress: this.navigateToCreateMealLogPage
                                    }
                                ],
                                header: (meal) => meal.mealName,
                            }}
                          />
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
        //backgroundColor: '#fff'
        height: '100%'
    }
})