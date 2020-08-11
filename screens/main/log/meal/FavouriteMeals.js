import React from 'react';
import {View, StyleSheet, ActivityIndicator, Alert} from 'react-native';
// Functions
import {getToken} from "../../../../storage/asyncStorageFunctions";
// Others
import MealList from "./MealList";
import Searchbar from "../../../../components/Searchbar";
import {favouriteMealListEndpoint, unfavouriteMealEndpoint} from "../../../../netcalls/urls";

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
        getToken().then(token => {
            fetch(favouriteMealListEndpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            }).then(resp => resp.json()).then(data => {
                // Create this temporary observer pattern to handle unfavouriting.
                const d = data.data.map(meal => {
                    meal['unfavourite'] = () => {
                        const mealsAfterUnfavouriting = this.state.favouriteMeals.filter(m => m !== meal);
                        this.setState({
                            favouriteMeals: mealsAfterUnfavouriting
                        })
                    };
                    return meal;
                });
                this.setState({
                    isLoading: false,
                    favouriteMeals: d
                })
            })
        })
    }

    navigateToCreateMealLogPage = (selectedMeal) => {
        const { parentScreen } = this.props.route.params;
        const meal = {...selectedMeal};
        meal.isFavourite = false;
        meal.mealName = "";
        // remove unfavourite key from the selected meal.
        delete meal['unfavourite'];
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
        getToken().then(token => {
            fetch(unfavouriteMealEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({
                    mealName: meal.mealName
                })
            }).then(resp => resp.json()).then(data => {
                // unfavourite the item from local state.
                meal.unfavourite();
            }).catch(err => Alert.alert("Error", err.message,
                [ { text: 'Ok' }]));
        })
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