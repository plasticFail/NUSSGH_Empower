import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator, FlatList, ScrollView, TouchableOpacity, Image} from 'react-native';
// Others
import SampleFavouriteMeal from './SampleFavouriteMeal.json';

// The screen that contains a list of the user's favourite meals.
export default class FavouriteMealScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            favouriteMeals: []
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

    render() {
        const {isLoading, favouriteMeals} = this.state;
        return (
            isLoading ?
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#B3D14C" />
            </View> :
            <View style={styles.root}>
                <FlatList data={favouriteMeals}
                          keyExtractor={item => item.mealName}
                          style={styles.listContainer} renderItem={({item}) =>
                    (<RenderMealItem item={item}
                                    onPressSelect={() => this.navigateToCreateMealLogPage(item)} />)}
                />
            </View>
        );
    }
}

function RenderMealItem({item, onPressSelect}) {
    const combinedMealItems = item.beverage.concat(item.main, item.side, item.dessert);
    return (
        <View style={styles.mealItem}>
            <View style={styles.mealNameContainer}>
                <Text style={styles.mealNameText}>{item.mealName}</Text>
                <TouchableOpacity style={styles.selectButton} onPress={onPressSelect}>
                    <Text style={styles.selectButtonText}>Select</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{flexDirection: 'row'}} horizontal={true}>
                {
                    combinedMealItems.map(food => <FoodItem food={food} />)
                }
            </ScrollView>
        </View>
    )
}

function FoodItem({food}) {
    const adjustedFontSize = food["food-name"].length > 20 ? 12 : 15;
    return (
        <View style={styles.foodItem}>
            <Image source={{uri: food.imgUrl.url}} style={styles.foodImage} />
            <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: adjustedFontSize}}>
                    {food["food-name"][0].toUpperCase() + food["food-name"].slice(1)}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    root: {
        backgroundColor: '#fff'
    },
    listContainer: {
        padding: 20,
        borderTopWidth: 1,
        borderColor: '#cfcfcf',
    },
    mealItem: {
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderColor: '#cfcfcf',
        height: 200
    },
    mealNameContainer: {
        height: '30%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mealNameText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    selectButton: {
        backgroundColor: '#288259',
        width: 60,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    selectButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#fff"
    },
    foodImage: {
        width: 80,
        height: 80
    },
    foodItem: {
        width: 80,
        marginRight: 20
    }
})