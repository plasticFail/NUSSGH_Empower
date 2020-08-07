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
    Platform, UIManager
} from 'react-native';
// Third-party lib
import Moment from 'moment';
// Components
import ImageWithBadge from "../../../../components/ImageWithBadge";
import FoodModalContent from "./FoodModalContent";
import IntegerQuantitySelector from "../../../../components/IntegerQuantitySelector";
// Functions
import {getToken} from "../../../../storage/asyncStorageFunctions";
// Others such as images, icons.
import {mealAddLogEndpoint} from "../../../../netcalls/urls";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import main from '../../../../resources/images/icons/meal.png';
import beverage from '../../../../resources/images/icons/mug.png';
import side from '../../../../resources/images/icons/salad.png';
import dessert from '../../../../resources/images/icons/parfait.png';

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
const BEVERAGE_KEY_WORD = 'beverage';
const MAIN_KEY_WORD = 'main';
const SIDE_KEY_WORD = 'side';
const DESSERT_KEY_WORD = 'dessert';

export default class CreateMealLog extends React.Component {
    constructor(props) {
        super(props);
        // NAMING MUST FOLLOW KEYWORDS FOR STATE ITEMS.
        this.state = {
            beverage: [],
            main: [],
            side: [],
            dessert: [],
            isFavourite: false,
            mealName: "",
            selected: null,
            modalOpen: false,
        }
    }

    componentDidMount() {
        if (this.props.route.params?.meal) {
            const {meal} = this.props.route.params;
            this.setState({
                beverage: meal.beverage,
                main: meal.main,
                side: meal.side,
                dessert: meal.dessert
            });
        }
    }

    // Animation property for items when they are deleted.
    setAnimation = () => {
        LayoutAnimation.configureNext({ duration: 300,
            update: { type: LayoutAnimation.Types.easeInEaseOut, springDamping: 0.4 },
        });
    };

    redirectToFoodSearchEngine = (type) => () => {
        this.props.navigation.push('FoodSearchEngine', {
            type: type,
            // Send in existing items belonging to this food type (beverage, main, side, dessert so that it can be checked).
            existingItems: this.state[type].map(foodItem => foodItem["food-name"])
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.route.params?.item !== this.props.route.params?.item) {
            const { type, item } = this.props.route.params;
            const newState = {...this.state};
            // Add a new field to the item, called quantity.
            item.quantity = 1;
            newState[type].push(item);
            // Update navigation prop param.
            this.props.navigation.setParams({
                edited: true
            });
            this.setState(newState, () => console.log(this.state));
        }
    }

    handleMealNameChange = (text) => {
        this.setState({
            mealName: text
        })
    }

    toggleFavouriteIcon = (event) => {
        const toggledBoolean = !this.state.isFavourite;
        this.setState({
            isFavourite: toggledBoolean
        })
    }

    // Find the food item and its index, replace the index with a new food item.
    // Update state with this new state.
    onQuantityChange = (foodName, type) =>  (newQuantity) => {
        const foodItem = this.state[type].filter(food => food["food-name"] === foodName)[0];
        const index = this.state[type].indexOf(foodItem);
        const newFoodItem = {...foodItem};
        newFoodItem.quantity = newQuantity;
        const newState = { ...this.state };
        newState[type][index] = newFoodItem;
        this.setState(newState);
    }

    handleDelete = (foodName, type) => {
        // Copy the previous state
        const newState = {...this.state};
        // Filter the food item / delete the corresponding food
        newState[type] = newState[type].filter(foodItem => foodItem["food-name"] !== foodName);
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

    handleSubmitLog = () => {
        // selectedMealType is one of breakfast, lunch, dinner, supper or snack.
        // selectedDateTime is javascript's default Date object.toString().
        const { selectedMealType, selectedDateTime } = this.props.route.params;
        const { beverage, main, side, dessert, isFavourite, mealName } = this.state;
        if (mealName.trim() === '' && isFavourite) {
            alert('Please give your favourite meal a name');
            return;
        }
        // Need to subtract 8 hours from the current time because mongo db tracks UTC+0 time zone.
        const recordDate = Moment(new Date(selectedDateTime)).format("DD/MM/YYYY HH:mm:ss");
        // console.log(recordDate);
        getToken().then(token => {
                fetch(mealAddLogEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    },
                    body: JSON.stringify({
                        isFavourite,
                        beverage,
                        main,
                        side,
                        dessert,
                        mealName,
                        mealType: selectedMealType,
                        recordDate
                    })
                }).then(resp => resp.json()).then(data => {
                    if (data.statusCode === 400) {
                        alert(data.message);
                        return;
                    }
                    this.props.navigation.popToTop();
                    this.props.navigation.goBack();
                    alert(`Your meal log for ${selectedDateTime} has been recorded!`);
                }).catch(err => {
                    alert(err.message);
                });
            }
        )
    }

    render() {
        const {navigation, route} = this.props;
        const {isFavourite, mealName, selected, modalOpen} = this.state;
        // DO NOT UNPACKAGE or DECOMPOSE beverage, main, side and dessert from state here because the render function
        // currently looks for the images beverage, main, side and dessert from imports.
        // Outside this render function, it is safe to unpackage / decompose the state fields.
        return (
            <ScrollView>
                <View contentContainerStyle={styles.root}>
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
                    <View>
                        <ScrollView horizontal={true} contentContainerStyle={styles.rowContent}
                                    // Refs to provide auto scroll to end for easier adding.
                                    ref={beverageScrollView => this.beverageScrollView = beverageScrollView}
                                    onContentSizeChange={() => {
                                        this.beverageScrollView.scrollToEnd();
                                    }}>
                            <FoodTypeLabel
                                containerStyle={styles.foodItem}
                                imageStyle={styles.foodImage}
                                alignment='center'
                                value="Beverage" img={beverage}/>
                            {   // Render food list for cart items in beverage.
                                // Note that key must be specified otherwise everything will re-render.
                                this.state.beverage.map((food) => <FoodItem key={food["food-name"]}
                                                                            item={food} handleDelete={() => {
                                    // Handle delete for this food item in the cart.
                                    this.handleDelete(food["food-name"], BEVERAGE_KEY_WORD);
                                }
                                }
                                                                            onPress={() => this.handleModalOpen(food)}
                                                                            onQuantityChange={this.onQuantityChange(food["food-name"], BEVERAGE_KEY_WORD)} />)
                            }

                            <CreateButton onPress={this.redirectToFoodSearchEngine("beverage")} />
                        </ScrollView>
                        <ScrollView horizontal={true} contentContainerStyle={styles.rowContent}
                                    // Refs to provide auto scroll to end for easier adding.
                                    ref={mainScrollView => this.mainScrollView = mainScrollView}
                                    onContentSizeChange={() => {
                                        this.mainScrollView.scrollToEnd();
                                    }}>
                            <FoodTypeLabel
                                containerStyle={styles.foodItem}
                                imageStyle={styles.foodImage}
                                alignment='center'
                                value="Main" img={main}/>
                            {   // Render food list for cart items in main.
                                // Note that key must be specified otherwise everything will re-render.
                                this.state.main.map((food) => <FoodItem key={food["food-name"]}
                                                                        item={food} handleDelete={() => {
                                    // Handle delete for this food item in the cart.
                                        this.handleDelete(food["food-name"], MAIN_KEY_WORD);
                                    }
                                }
                                                                        onPress={() => this.handleModalOpen(food)}
                                                                        onQuantityChange={this.onQuantityChange(food["food-name"], MAIN_KEY_WORD)}/>)
                            }
                            <CreateButton onPress={this.redirectToFoodSearchEngine(MAIN_KEY_WORD)} />
                        </ScrollView>
                        <ScrollView horizontal={true}
                                    // Refs to provide auto scroll to end for easier adding.
                                    ref={sideScrollView => this.sideScrollView = sideScrollView}
                                    onContentSizeChange={() => {
                                        this.sideScrollView.scrollToEnd();
                                    }}
                                    contentContainerStyle={styles.rowContent}>
                            <FoodTypeLabel
                                containerStyle={styles.foodItem}
                                imageStyle={styles.foodImage}
                                alignment='center'
                                value="Side" img={side}/>
                            {   // Render food list for cart items in side.
                                // Note that key must be specified otherwise everything will re-render.
                                this.state.side.map((food) => <FoodItem key={food["food-name"]}
                                                                        item={food} handleDelete={() => {
                                    // Handle delete for this food item in the cart.
                                        this.handleDelete(food["food-name"], SIDE_KEY_WORD);
                                    }
                                }
                                                                        onPress={() => this.handleModalOpen(food)}
                                                                        onQuantityChange={this.onQuantityChange(food["food-name"], SIDE_KEY_WORD)} />)
                            }
                            <CreateButton onPress={this.redirectToFoodSearchEngine(SIDE_KEY_WORD)} />
                        </ScrollView>
                        <ScrollView horizontal={true}
                                    // Refs to provide auto scroll to end for easier adding.
                                    ref={dessertScrollView => this.dessertScrollView = dessertScrollView}
                                    onContentSizeChange={() => {
                                        this.dessertScrollView.scrollToEnd();
                                    }}
                                    contentContainerStyle={styles.rowContent}>
                            <FoodTypeLabel
                                containerStyle={styles.foodItem}
                                imageStyle={styles.foodImage}
                                alignment='center'
                                value="Dessert" img={dessert}/>
                            {   // Render food list for cart items in dessert.
                                // Note that key must be specified otherwise everything will re-render.
                                this.state.dessert.map((food) => <FoodItem key={food["food-name"]}
                                                                           item={food} handleDelete={() => {
                                    // Handle delete for this food item in the cart.
                                        this.handleDelete(food["food-name"], DESSERT_KEY_WORD);
                                    }
                                }
                                                                           onPress={() => this.handleModalOpen(food)}
                                                                           onQuantityChange={this.onQuantityChange(food["food-name"], DESSERT_KEY_WORD)}/>)
                            }
                            <CreateButton onPress={this.redirectToFoodSearchEngine(DESSERT_KEY_WORD)} />
                        </ScrollView>
                        <TouchableHighlight
                            style={styles.button}
                            underlayColor='#fff' onPress={this.handleSubmitLog}>
                            <Text style={styles.buttonText}>Submit Log!</Text>
                        </TouchableHighlight>
                        <Modal visible={modalOpen} transparent={true}>
                            {selected &&
                            <FoodModalContent onClose={this.handleCloseModal} selected={selected}/>
                            }
                        </Modal>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

function CreateButton({onPress}) {
    return (
        <View style={styles.foodItem}>
            <TouchableHighlight
                style={styles.emptyButton}
                underlayColor='#fff'
                onPress={onPress}>
                <Icon name='plus' color='#fff' size={25} />
            </TouchableHighlight>
        </View>
    )
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
    const adjustedFontSize = 13;
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
                <ImageWithBadge
                    containerStyle={styles.foodImage}
                    imageProps={{source: {uri: item.imgUrl.url}}}
                    badgeIcon={<Icon name="times" size={19} onPress={handleDeleteWithAnimation} color='#fff'/>}
                    badgeSize={19}
                    badgeColor="red"
                    onPressImage={onPress} />
                <View style={styles.foodTextWrapper}>
                    <Text style={{fontSize: adjustedFontSize}}>{foodName}</Text>
                </View>
                <IntegerQuantitySelector defaultValue={item.quantity}
                                         changeAmount={1}
                                         minValue={1}
                                         maxValue={50}
                                         buttonColor="#288259" onChange={onQuantityChange} />
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

function FoodTypeLabel({img, containerStyle, imageStyle, textStyle, alignment, value}) {

    return (
        <View style={containerStyle}>
            <Image style={imageStyle} source={img}/>
            <View style={alignment === "center" ? styles.foodTextWrapper : null}>
                <Text style={textStyle}>{value}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        backgroundColor: '#ffffff'
    },
    mealNameTextAndIcon: {
        display: 'flex',
        flexDirection: 'row',
        padding: 20,
        paddingBottom: 45,
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
        marginRight:40,
        marginLeft:40,
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
        paddingLeft: 20,
        paddingRight: 20,
        width: 120,
        alignItems: 'center',
    },
    foodTextWrapper: {
        paddingTop: 8,
        alignItems: 'center',
        width: 80,
        height: 40,
        justifyContent: 'center'
    }
});