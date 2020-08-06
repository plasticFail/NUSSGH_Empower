import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator, FlatList, ScrollView, TouchableOpacity, Image, Dimensions} from 'react-native';
// Functions
import {getToken} from "../../../../storage/asyncStorageFunctions";
// Others
import SampleFavouriteMeal from './SampleFavouriteMeal.json';
import MealList from "./MealList";
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
        getToken().then(token => {
            const url = "https://sghempower.com/log/meal/favourite-list";
            fetch(url, {
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
        const { selectedMealType, selectedDateTime } = this.props.route.params;
        this.props.navigation.navigate("CreateMealLog", {
            meal: selectedMeal,
            selectedMealType,
            selectedDateTime
        });
    }

    handleChangeFilterQuery = (text) => {
        this.setState({
            filterQuery: text
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