import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Image,
    TouchableOpacity,
    Modal,
    TouchableHighlight,
} from 'react-native';
// Components
import Searchbar from '../../../../components/Searchbar';
import FoodModalContent from "./FoodModalContent";
// Functions
import {getToken} from "../../../../storage/asyncStorageFunctions";
// Others
import carbohydrate from '../../../../resources/images/icons/carbohydrate.png';
import energy from '../../../../resources/images/icons/energy.png';
import fat from '../../../../resources/images/icons/fat.png';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

Icon.loadFont();

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

    // handler for making lazy requests.
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
                    this.makeApiCallToFoodSearchEngine()
                }, 500); // 500ms delay before loading API.
            });
        }
    }

    onSubmit = () => {
        clearTimeout(this.timeout);
        this.setState({
            isLoading: true
        }, () => {
            // Fetch api here again
            this.makeApiCallToFoodSearchEngine();
        })
    }

    makeApiCallToFoodSearchEngine = () => {
        // Get token.
        getToken().then(token => {
            // Fetch api and load the response here.
            fetch('https://sghempower.com/food/search', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({query: this.state.query, type: this.props.route.params.type})
            }).then((res) => res.json()).then(data => {
                this.setState({
                    foodResults: data.data,
                    isLoading: false
                })
            }).catch(err => {
                this.setState({
                    isLoading: false
                }, () => alert(err.message))
            });
        });
    }

    render() {
        const { navigation, route } = this.props;
        const {query, isLoading, foodResults} = this.state;
        const type = route.params.type;
        return (
            <View style={styles.root}>
                <View style={styles.header}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="chevron-left" onPress={navigation.goBack} size={25}/>
                        <Text style={styles.searchText}>Search</Text>
                    </View>
                    <Searchbar containerStyle={{marginTop: 10}}
                               onChangeText={this.updateQuery}
                               onSubmit={this.onSubmit} />
                </View>
                { query === "" ? // Render search prompt "Begin your search"
                    <View style={styles.searchPromptBody}>
                        <Text style={styles.searchPromptText}>Begin your search</Text>
                        <Text style={styles.searchHintText}>Type in the food name in the</Text>
                        <Text style={styles.searchHintText}>search bar!</Text>
                    </View> : isLoading ? // Render loading progress
                    <View style={styles.searchLoading}>
                        <ActivityIndicator size="large" color="#B3D14C" />
                    </View> : foodResults.length > 0 ?// Render food result list
                    <View style={styles.foodSearchResults}>
                        <FoodResultList navigation={navigation} route={route} type={type} foodList={foodResults} />
                    </View> : // Render no search results
                    <View style={styles.searchPromptBody}>
                        <Text style={styles.searchPromptText}>No results for {query} :(</Text>
                        <Text style={styles.searchHintText}>Try again with</Text>
                        <Text style={styles.searchHintText}>another query!</Text>
                    </View>
                }
            </View>
        );
    }
}

function FoodResultList({foodList, navigation, route, type}) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null); // Selected food item modal to show.

    const handleOpen = (item) => {
        setModalOpen(true);
        setSelected(item);
    }

    const handleClose = () => {
        setModalOpen(false);
        setSelected(null);
    }

    const navigateBackToCreateMealLog = () => {
        navigation.navigate('CreateMealLog', {
            item: {...selected},
            type: type
        });
        handleClose();
    };

    const addFoodToLog = () => {
        // Check if it already exists in the list. If yes, throw alert, otherwise navigate back to create meal log.
        const selectedFoodName = selected["food-name"]
        if (route.params.existingItems.indexOf(selectedFoodName) != -1) {
            // We already have this food item in the cart.
            alert(`${selectedFoodName} is already in your cart! Select something else.`);
        } else {
            navigateBackToCreateMealLog();
        }
    }

    const renderFoodListItem = ({item}) => {
        return (
            <TouchableOpacity style={listStyles.li} onPress={() => handleOpen(item)}>
                <View style={listStyles.imageContainer}>
                    <Image style={listStyles.image} source={{uri: item.imgUrl.url}} key={item["food-name"]} />
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
    return (
        <React.Fragment>
            <Modal visible={modalOpen} transparent={true}>
                {selected &&
                       <FoodModalContent selected={selected} onClose={handleClose}>
                            <TouchableHighlight
                                style={styles.button}
                                underlayColor='#fff' onPress={addFoodToLog}>
                                <Text style={styles.buttonText}>Add</Text>
                            </TouchableHighlight>
                       </FoodModalContent>
                }
            </Modal>
            <FlatList style={listStyles.container} data={foodList}
                      keyExtractor={item => item["food-name"]} renderItem={renderFoodListItem} />
        </React.Fragment>
    )
}

function renderNutritionText({amount, unit}, nutrient) {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={modalStyles.nutrientText}>{nutrient}</Text>
            {
                unit === "N.A" ? <Text>{unit}</Text>
                    : <Text>{amount + " " + unit}</Text>
            }
        </View>
    )
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
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
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
        justifyContent: 'center', // position of the food description
        height: '100%',
        padding: 10
    },
    nutrientIndicatorList: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '100%',
        flex: 1
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
        justifyContent: 'space-around',
        width: '100%',
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
        height: '18%',
        padding: 20,
        justifyContent: 'flex-end'
    },
    searchText: {
        fontSize: 28,
        paddingLeft: 15
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
    },
    button: {
        width: '100%',
        height: 55,
        backgroundColor:'#aad326',
        justifyContent: 'center',
        alignSelf: 'center',
        //transform: [{"translateY": 27.5}] // Half of height
    },
    buttonText: {
        color:'#000',
        textAlign:'center',
        fontSize: 22,
        fontWeight: 'bold'
    },
})

export default FoodSearchEngineScreen;