import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    TextInput,
    Image,
    TouchableWithoutFeedback,
    Modal,
    Animated, LayoutAnimation,
    Platform, UIManager,
    Alert, TouchableOpacity,
    FlatList
} from 'react-native';
// Third-party lib
import Moment from 'moment';
// Components
import ImageWithBadge from "../../../../components/ImageWithBadge";
import FoodModalContent from "../../../../components/logs/meal/FoodModalContent";
import IntegerQuantitySelector from "../../../../components/IntegerQuantitySelector";
// Functions
import {requestFavouriteMealList} from "../../../../netcalls/mealEndpoints/requestMealLog";
// Others such as images, icons.
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FlashMessage from "../../../../components/FlashMessage";
import {isValidMeal} from "../../../../commonFunctions/mealLogFunctions";
import RenderMealItem from "../../../../components/logs/meal/RenderMealItem";

Icon.loadFont()
// Any meal log selected (e.g Create, Recent or Favourites)
// will be rendered to this page for confirmation before the submitting to database.

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Keywords for state items

export default class CreateMealLog extends React.Component {
    constructor(props) {
        super(props);
        // NAMING MUST FOLLOW KEYWORDS FOR STATE ITEMS.
        this.state = {
            foodItems: [],
            isFavourite: false,
            mealName: "",
            selected: null,
            modalOpen: false,
        }
    }

    // Animation property for items when they are deleted.
    setAnimation = () => {
        LayoutAnimation.configureNext({ duration: 300,
            update: { type: LayoutAnimation.Types.easeInEaseOut, springDamping: 0.4 },
        });
    };

    redirectToFoodSearchEngine = () => {
        this.props.navigation.push('FoodSearchEngine', {
            type: 'ALL',
            // Send in existing items belonging to this food type (beverage, main, side, dessert so that it can be checked).
            existingItems: this.state.foodItems.map(foodItem => foodItem["food-name"])
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.route.params?.item !== this.props.route.params?.item) {
            const { item } = this.props.route.params;
            const newState = {...this.state};
            // Add a new field to the item, called quantity.
            item.quantity = 1;
            newState.foodItems.push(item);
            console.log(newState.foodItems);
            // Update navigation prop param.
            this.props.navigation.setParams({
                edited: true
            });
            this.setState(newState);
        }
    }

    handleMealNameChange = (text) => {
        this.setState({
            mealName: text
        });
    }

    toggleFavouriteIcon = (event) => {
        const toggledBoolean = !this.state.isFavourite;
        this.setState({
            isFavourite: toggledBoolean
        })
    }

    // Find the food item and its index, replace the index with a new food item.
    // Update state with this new state.
    onQuantityChange = (foodName, newQuantity) => {
        const foodItem = this.state.foodItems.filter(food => food["food-name"] === foodName)[0];
        const index = this.state.foodItems.indexOf(foodItem);
        const newFoodItem = {...foodItem};
        newFoodItem.quantity = newQuantity;
        const newState = { ...this.state };
        newState.foodItems[index] = newFoodItem;
        this.setState(newState);
    }

    handleDelete = (foodName) => {
        // Copy the previous state
        const newState = {...this.state};
        // Filter the food item / delete the corresponding food
        newState.foodItems = newState.foodItems.filter(foodItem => foodItem["food-name"] !== foodName);
        this.setState(newState, this.setAnimation);
    }

    handleModalOpen = (food) => {
        this.setState({
            selected: food,
            modalOpen: true
        })
    }

    handleCloseModal = () => {
        this.setState({
            selected: null,
            modalOpen: false
        })
    }

    // Check if meal name is not duplicate (if it is favourited).
    // navigate back to root for confirmation.
    onDone = () => {
        const {mealName, isFavourite, foodItems} = this.state;
        if (mealName.trim() === '' && isFavourite) {
            Alert.alert('Error','Please give your favourite meal a name', [ { text: 'Ok' }]);
            return;
        }

        if (!isValidMeal(foodItems)) {
            Alert.alert('Error','Your meal cannot be empty :(', [ { text: 'Ok' }]);
            return;
        }

        const meal = {
            mealName,
            isFavourite,
            foodItems,
        };
        if (isFavourite) {
            requestFavouriteMealList().then(data => {
                // Duplicate favourite meal name
                if (data.data.filter(m => m.mealName === mealName).length !== 0) {
                    Alert.alert('Error', `There is already another favourite meal with the same name as ${mealName}`,
                        [ { text: 'Ok' }]);
                    return;
                }
                // Otherwise send back and update.
                if (this.props.route.params.parentScreen) {
                    this.props.navigation.navigate(this.props.route.params.parentScreen,{
                        meal,
                        parentScreen: this.props.route.params.parentScreen
                    });
                } else {
                    this.props.navigation.navigate('MealLogRoot', {
                        meal
                    });
                }
            }).catch(err => alert(err.message));
        } else {
            // Not favourited meals can just be sent back to parentScreen.
            if (this.props.route.params.parentScreen) {
                this.props.navigation.navigate(this.props.route.params.parentScreen,{
                    meal,
                    parentScreen: this.props.route.params.parentScreen
                });
            } else {
                this.props.navigation.navigate('MealLogRoot', {
                    meal,
                });
            }
        }
    }

    render() {
        const {navigation, route} = this.props;
        const {isFavourite, mealName, selected, modalOpen, foodItems} = this.state;

        return (
            <View style={{flexGrow: 1}}>
                <ScrollView contentContainerStyle={styles.root}>
                    <View style={{flex: 1, padding: 20}}>
                        <View style={styles.header}>
                            <Icon name='times' size={50} color='#4DAA50' onPress={()=>navigation.goBack()} />
                            <Text style={{fontSize: 30, color:"#21283A", fontWeight: 'bold', paddingBottom: '2%'}}>Add Meal</Text>
                            <Text style={{fontSize: 18, color:"#21283A", fontWeight: 'bold'}} />
                        </View>
                        <View style={styles.mealNameTextAndIcon}>
                            <TextInput
                                style={styles.mealNameTextInput}
                                placeholder="Enter Meal Name (optional)"
                                value={mealName}
                                onChangeText={this.handleMealNameChange}
                            />
                            <Icon name="star" size={40} color={isFavourite ? "#B3D14C" : "#e4e4e4"}
                                  onPress={this.toggleFavouriteIcon}
                                  style={styles.favouriteIcon}/>
                        </View>
                        <Text style={{fontSize: 18, color:"#8A8A8E", fontWeight: 'bold'}} >Food intake</Text>
                        {
                            foodItems.map((foodItem, index) => (
                                <FoodItem item={foodItem}
                                          handleDelete={()=>this.handleDelete(foodItem["food-name"])}
                                          onQuantityChange={(val) => this.onQuantityChange(foodItem["food-name"], val)} />
                            ))
                        }
                        <TouchableOpacity onPress={this.redirectToFoodSearchEngine}>
                            <Text style={{fontSize: 18, color:"#9DC43D", paddingTop: 20, paddingBottom: 20}}>Add Item</Text>
                        </TouchableOpacity>
                        <View style={{flex: 1, justifyContent: 'flex-end'}}>
                            <TouchableHighlight
                                style={styles.button}
                                underlayColor='#fff' onPress={this.onDone}>
                                <Text style={styles.buttonText}>Done</Text>
                            </TouchableHighlight>
                            <Modal visible={modalOpen} transparent={true}>
                                {selected &&
                                <FoodModalContent onClose={this.handleCloseModal} selected={selected}/>
                                }
                            </Modal>
                        </View>
                    </View>
                </ScrollView>
                <FlashMessage triggerValue={this.state.isFavourite}
                              renderFlashMessageComponent={(val) => val ? <View
                                      style={{height: 40, width: 150, borderRadius: 10,
                                          backgroundColor:'#288259', justifyContent: 'center', alignItems: 'center'}}
                                  >
                                    <Text style={{color: '#fff', fontSize: 20}}>Favourited!</Text>
                                  </View>:
                                  <View
                                      style={{height: 40, width: 150, borderRadius: 10,
                                          backgroundColor:'red', justifyContent: 'center', alignItems: 'center'}}
                                  >
                                      <Text style={{color: '#fff', fontSize: 20}}>Unfavourited</Text>
                                  </View>}
                              messageComponentHeight={40}
                />
            </View>
        )
    }
}


// Handle delete should:
// Box out animation before calling handleDelete method. Shrink size animated can do the trick.
function FoodItem({onPress, item, handleDelete, onQuantityChange}) {
    // Item here refers to the food object.
    // render view for foodObj
    const boxOutAnimation = React.useRef(new Animated.Value(1)).current;

    const handleDeleteWithAnimation = () => {
        // Run animation first.
        Animated.timing(boxOutAnimation, {
            toValue: 0,
            duration: 500, // 0.5 second box out time
            useNativeDriver: false
        }).start(()=> {
            handleDelete();
            boxOutAnimation.setValue(1);
        });
    }

    let foodName = item["food-name"][0].toUpperCase() + item["food-name"].slice(1);
    const adjustedFontSize = 20;
    if (foodName.length > 20) {
        foodName = foodName.slice(0, 20) + "...";
    }
    return (
        <TouchableWithoutFeedback>
            <Animated.View style={[styles.foodItem,
                {   opacity: boxOutAnimation,
                    transform: [ {scaleX: boxOutAnimation},
                                 {scaleY: boxOutAnimation}
                                 ]
                }]}>
                <Image source={{uri: item.imgUrl.url}} style={{width: 65, height: 65, borderRadius: 10}}/>
                <View style={styles.foodTextWrapper}>
                    <Text style={{fontSize: adjustedFontSize}}>{foodName}</Text>
                    <IntegerQuantitySelector defaultValue={item.quantity}
                                             changeAmount={1}
                                             minValue={1}
                                             maxValue={50}
                                             buttonColor="#288259" onChange={onQuantityChange} />
                </View>
                <View style={{width: '10%'}}>
                    <Icon name='times' color='red' size={30} onPress={handleDeleteWithAnimation} />
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        backgroundColor: '#ffffff'
    },
    mealNameTextAndIcon: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 20,
        alignItems: 'center'
    },
    mealNameTextInput: {
        height: 50,
        padding: 10,
        borderColor: '#4d4d4d',
        borderWidth: 1,
        borderRadius: 5,
        flex: 1
    },
    favouriteIcon: {
        paddingLeft: 20
    },
    rowContent: {
        display: 'flex',
        flexDirection: 'row',
        height: 185,
        paddingTop: 10
    },
    button:{
        marginBottom:20,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'#aad326',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    emptyButton: {
        width: 80,
        height: 80,
        backgroundColor: '#e4e4e4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    foodImage: {
        width: 80,
        height: 80,
    },
    buttonText:{
        color:'#000',
        textAlign:'center',
        fontSize: 22,
        fontWeight: 'bold'
    },
    foodItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#e8e8e8',
        borderBottomWidth: 1,
        paddingTop: '2%',
        paddingBottom: '2%',
    },
    foodTextWrapper: {
        paddingLeft: 10,
        width: 80,
        height: 40,
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1
    },
    header: {
        height: '18%',
        justifyContent: 'flex-end',
    }
});