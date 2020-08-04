import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator, FlatList, ScrollView, TouchableOpacity, Image, Dimensions} from 'react-native';
// Others
import SampleFavouriteMeal from './SampleFavouriteMeal.json';
import MealList from "./MealList";
import Searchbar from "../../../../components/Searchbar";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const suggestedButtonRatio = [0.7, 0.8]; // Fraction of screen width and height that it needs to be translated to.
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
        // Load data from api here.
        // For now I'll simulate the loading
        setTimeout(() => {
            this.setState({
                favouriteMeals: SampleFavouriteMeal.data,
                isLoading: false
            })
        }, 1000); // 1s simulation to fetch the user's favourited meals.
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
                <TouchableOpacity style={styles.suggestedButton}>
                    <Text style={styles.suggestedButtonText}>Suggested</Text>
                </TouchableOpacity>
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
    },
    suggestedButton: {
        position: 'absolute',
        width: 100,
        height: 40,
        backgroundColor: '#288259',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12.5,
        transform: [{translateX: suggestedButtonRatio[0] * windowWidth},
            {translateY: suggestedButtonRatio[1] * windowHeight}]
    },
    suggestedButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff'
    }
})