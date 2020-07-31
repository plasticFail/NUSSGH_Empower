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
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import main from '../../../../resources/images/icons/meal.png';
import beverage from '../../../../resources/images/icons/mug.png';
import side from '../../../../resources/images/icons/salad.png';
import dessert from '../../../../resources/images/icons/parfait.png';
import ImageWithBadge from "../../../../components/ImageWithBadge";
import FoodModalContent from "./FoodModalContent";

Icon.loadFont()
// Any meal log selected (e.g Create, Recent or Favourites)
// will be rendered to this page for confirmation before the submitting to database.

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class CreateMealLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beverage: [],
            main: [],
            side: [],
            dessert: [],
            isFavourite: false,
            mealName: "",
            selected: null,
            modalOpen: false
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
            newState[type].push(item);
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

    handleDelete = (food, type) => {
        // Copy the previous state
        const newState = {...this.state};
        // Filter the food item / delete the corresponding food
        newState[type] = newState[type].filter(foodItem => foodItem !== food);
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
        const { selectedMealType, currentDateTime } = this.props.route.params;
        const { beverage, main, side, dessert, isFavourite, mealName } = this.state;
        const dataToLog = {
            mealType: selectedMealType,
            dateTime: currentDateTime,
            // And all the food items, not yet decided on how to log
        }
        this.props.navigation.popToTop();
        this.props.navigation.goBack();
        //this.props.navigation.navigate('AddLog');
        alert(`Log submitted! for ${JSON.stringify(dataToLog)}`);
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
                                    this.handleDelete(food, "beverage");
                                }
                                } onPress={() => this.handleModalOpen(food)} />)
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
                                        this.handleDelete(food, "main");
                                    }
                                } onPress={() => this.handleModalOpen(food)} />)
                            }
                            <CreateButton onPress={this.redirectToFoodSearchEngine("main")} />
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
                                        this.handleDelete(food, "side");
                                    }
                                } onPress={() => this.handleModalOpen(food)} />)
                            }
                            <CreateButton onPress={this.redirectToFoodSearchEngine("side")} />
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
                                        this.handleDelete(food, "dessert");
                                    }
                                } onPress={() => this.handleModalOpen(food)} />)
                            }
                            <CreateButton onPress={this.redirectToFoodSearchEngine("dessert")} />
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

function EmptyButton({onPress}) {
    return (
        <TouchableHighlight
            style={styles.emptyButton}
            underlayColor='#fff'
            onPress={onPress}>
            <Icon name='plus' color='#fff' size={25} />
        </TouchableHighlight>
    )
}

function CreateButton({onPress}) {
    return (
        <View style={styles.foodItem}>
            <EmptyButton onPress={onPress}/>
            <View style={styles.foodTextWrapper}>
            </View>
        </View>
    )
}

// Handle delete should:
// Box out animation before calling handleDelete method. Shrink size animated can do the trick.
function FoodItem({onPress, item, handleDelete}) {
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

    const adjustedFontSize = item["food-name"].length > 15 ? 10 : 15;
    return (
        <TouchableWithoutFeedback styles={styles.foodItem} onPress={onPress}>
            <Animated.View style={[styles.foodItem,
                {   opacity: boxOutAnimation,
                    transform: [ {scaleX: boxOutAnimation},
                                 {scaleY: boxOutAnimation}
                                 ]
                }]}>
                <ImageWithBadge
                    containerStyle={styles.foodImage}
                    imageProps={{source: {uri: item.imgUrl.url}}}
                    badgeIcon={<Icon name="times" size={12.5} onPress={handleDeleteWithAnimation} color='#fff'/>}
                    badgeSize={12.5}
                    badgeColor="red"/>
                <View style={styles.foodTextWrapper}>
                    <Text style={{fontSize: adjustedFontSize}}>{item["food-name"][0].toUpperCase() + item["food-name"].slice(1)}</Text>
                </View>
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
        height: 150,
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
        display: 'flex',
        alignItems: 'center',
    },
    foodTextWrapper: {
        display: 'flex',
        paddingTop: 8,
        alignItems: 'center',
        width: 80
    }
});