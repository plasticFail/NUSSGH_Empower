import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity} from 'react-native';
import Searchbar from '../../../../components/Searchbar';
import SampleFoodDB from './SampleFoodDB.json';
import carbohydrate from '../../../../resources/images/icons/carbohydrate.png';
import energy from '../../../../resources/images/icons/energy.png';
import fat from '../../../../resources/images/icons/fat.png';

class FoodSearchEngineScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            isLoading: false,
            foodResults: []
        }
        this.timeout = setTimeout(() => {}, 0); //Initialise timeout for lazy loading
    }

    updateQuery = (text) => {
        if (text === "") {
            clearTimeout(this.timeout);
            this.setState({
                query: text,
                isLoading: false,
                foodResults: []
            })
        } else { // Do lazy loading
            this.setState({
                query: text,
                isLoading: true
            }, () => {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    // Fetch api and load the response here.
                    setTimeout(() => {
                        this.setState({
                            isLoading: false,
                            foodResults: SampleFoodDB.data
                        })
                    }, 2000) // simulate 2s for fetching request.
                }, 500); // 500ms delay before loading API.
            })
        }
    }

    render() {
        const { navigation, route } = this.props;
        const {query, isLoading, foodResults} = this.state;
        const type = route.params.type;
        return (
            <View style={styles.root}>
                <View style={styles.header}>
                    <Text style={styles.searchText}>Search</Text>
                    <Searchbar containerStyle={{marginTop: 10}} onChangeText={this.updateQuery} />
                </View>
                { query === "" ? // Render search prompt "Begin your search"
                    <View style={styles.searchPromptBody}>
                        <Text style={styles.searchPromptText}>Begin your search</Text>
                        <Text style={styles.searchHintText}>Type in the food name in the</Text>
                        <Text style={styles.searchHintText}>search bar!</Text>
                    </View> : isLoading ? // Render loading progress
                    <View style={styles.searchLoading}>
                        <ActivityIndicator size="large" color="#B3D14C" />
                    </View> : // Render food result list
                    <View style={styles.foodSearchResults}>
                        <FoodResultList navigation={navigation} route={route} type={type} foodList={foodResults} />
                    </View>
                }
            </View>
        );
    }
}

function FoodResultList({foodList, navigation, route, type}) {
    const renderFoodListItem = ({item}) => {
        const itemCopy = {...item};
        return (
            <TouchableOpacity style={listStyles.li} onPress={() => navigation.navigate('CreateMealLog', {
                item: itemCopy,
                type: type
            })}>
                <View style={listStyles.imageContainer}>
                    <Image style={listStyles.image} source={{uri: item.imgUrl.url}} />
                </View>
                <View style={listStyles.foodDescription}>
                    <Text style={listStyles.foodServingText}>{item["household-measure"]}</Text>
                    <Text style={listStyles.foodNameText}>
                        {item["food-name"][0].toUpperCase() + item["food-name"].slice(1)}
                    </Text>
                </View>
                <View style={listStyles.nutrientIndicatorList}>
                    <TouchableOpacity style={listStyles.nutrientIndicatorStyle}>
                        <Image style={listStyles.nutrientImageStyle} source={energy} />
                        <View style={{...listStyles.barIndicatorStyle,
                            backgroundColor: getColorFromNutrient(item.nutrients["energy"],
                                "energy")}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={listStyles.nutrientIndicatorStyle}>
                        <Image style={listStyles.nutrientImageStyle} source={carbohydrate} />
                        <View style={{...listStyles.barIndicatorStyle,
                            backgroundColor: getColorFromNutrient(item.nutrients["carbohydrate"],
                                "carbohydrate")}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={listStyles.nutrientIndicatorStyle}>
                        <Image style={listStyles.nutrientImageStyle} source={fat} />
                        <View style={{...listStyles.barIndicatorStyle,
                            backgroundColor: getColorFromNutrient(item.nutrients["total-fat"],
                                "total-fat")}} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
    return <FlatList style={listStyles.container} data={foodList} keyExtractor={item => item._id} renderItem={renderFoodListItem} />
}

// Function to determine color of indicator. In general, red is bad, yellow/orange is okay and green is good.
function getColorFromNutrient({rating}, nutrientName) {
    const Colours = {
        green: "#60A354",
        purple: "#8F31AA",
        yellow: "#F5C444",
        lightBlue: "#7BBFDB",
        blue: "#77B9D2",
        pink: "#E67471",
        white: "#ffffff",
        red: "red",
        deepBlue: "#5F90D5",
        grey: '#5D5D5D'
    }
    if (nutrientName === "dietary-fibre" || nutrientName === "protein") {
        // In this case, the higher the nutrient quantity, the better.
        if (rating === "high") {
            return Colours.green
        } else if (rating === "medium") {
            return Colours.yellow
        } else if (rating === "low") {
            return Colours.red
        }
    } else {
        // In this case, the lower the nutrient quantity, the better.
        if (rating === "high") {
            return Colours.red
        } else if (rating === "medium") {
            return Colours.yellow
        } else if (rating === "low") {
            return Colours.green
        }
    }
}

const listStyles = StyleSheet.create({
    container: {
        width: '100%'
    },
    li: {
        flex: 1,
        height: 120,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 100,
        height: 100
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 5,
        overflow: 'hidden'
    },
    foodDescription: {
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '100%',
        padding: 10
    },
    nutrientIndicatorList: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        width: 40
    },
    foodNameText: {
        fontWeight: 'bold'
    },
    foodServingText: {
        color: '#4d4d4d'
    },
    nutrientIndicatorStyle: {
        height: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    nutrientImageStyle: {
        height: 25,
        width: 25
    },
    barIndicatorStyle: {
        borderRadius: 4, //Should be half of width
        width: 8,
        height: '100%'
    }
})

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        flex: 1
    },
    header: {
        backgroundColor: "#B3D14C",
        height: 120,
        padding: 20
    },
    searchText: {
        fontSize: 28
    },
    searchPromptBody: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchPromptText: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    searchHintText: {
        fontSize: 16,
        color: '#9f9f9f'
    },
    searchLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    foodSearchResults: {
        flex: 1,
        alignItems: 'center'
    }
})

export default FoodSearchEngineScreen;