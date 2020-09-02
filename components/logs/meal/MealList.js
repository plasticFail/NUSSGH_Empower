import React from 'react';
import {
    FlatList,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet,
    Alert,
    Dimensions,
    Modal,
    TouchableHighlight
} from "react-native";
// Functions
// Components
import RenderMealItem from './RenderMealItem';
// Others
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {unfavouriteMealEndpoint} from '../../../netcalls/urls';

Icon.loadFont();

// Props description
// onSelectMeal is a callback function when a meal is selected
// meals is a list of the user's meals, already filtered by record date or favourites.
// options is an object:
//      keys            value description
//      buttons         List<Object> A list of button properties. Example usage:
//                      [
//                          {
//                              icon: {
//                                         name: <String>: Icon name
//                                         color: <String>: Color of icon
//                                     },
//                              onPress: Function<Meal>: Callback when this button for a meal is clicked. E.g. (meal) => alert(meal.mealName)
//                              buttonStyle: <Styles to override button, can specify background color, width and height here>
//                           },
//                           {
//                               text: <String>: Text in button,
//                           }
//                      ]
//
//       header        Function<Meal>: Function that takes in a Meal Object and returns a string to render in the Meal header.
export default function MealList({filterQuery, meals, options, onMealAdd}) {
    const [selectedMeal, setSelectedMeal] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const processed = meals.map(m => {
        if (m.foodItems) {
            return m;
        }
        m.foodItems = m.beverage.concat(m.side, m.main, m.dessert)
        delete m['main'];
        delete m['side'];
        delete m['dessert'];
        delete m['beverage'];
        return m;
    });

    const onMealItemClick = (meal) => {
        setSelectedMeal(meal);
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setSelectedMeal(null);
        setOpenModal(false);
    }

    const handleAddMeal = (meal) => {
        setSelectedMeal(null);
        setOpenModal(false);
        onMealAdd(meal);
    }

    const filtered = processed.filter(x => x.mealName.toLowerCase().indexOf(filterQuery.trim().toLowerCase()) != -1);
    return (
        <React.Fragment>
            <FlatList data={filtered}
                      keyExtractor={meal => meal._id}
                      style={{flex: 1}}
                      contentContainerStyle={styles.listContainer} renderItem={({item}) =>
                (<RenderMealItem onSelectMeal={() => onMealItemClick(item)} item={item} options={options} />)}
            />
            {
                openModal &&
                <Modal visible={openModal} transparent>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <TouchableOpacity
                            style={{position: 'absolute', backgroundColor: '#000', opacity: 0.4, height: '100%', width: '100%'}}
                            onPress={handleCloseModal}/>
                        <View style={{height: '65%', backgroundColor: '#F7F7FB'}}>
                            <Icon onPress={handleCloseModal} style={{padding: 15}} color='#4DAA50' name='chevron-down' size={34}/>
                            <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1, paddingLeft: 15, paddingRight: 15}}>
                                <View>
                                    <Text style={{fontSize: 32, fontWeight: "bold"}}>Meal Info</Text>
                                    <Text style={{fontSize: 24, fontWeight: "bold", paddingTop: '3%'}}>{selectedMeal.mealName}</Text>
                                    <Text style={{fontSize: 24, fontWeight: "bold", color: '#7d7d7d', paddingTop: '3%'}}>Meal Includes</Text>
                                    {
                                        selectedMeal.foodItems.map(food => (
                                            <FoodRow food={food} />
                                        ))
                                    }
                                </View>
                            </ScrollView>
                            <View style={[styles.buttonContainer, styles.shadow]}>
                                <TouchableHighlight
                                    style={styles.button}
                                    underlayColor="#fff"
                                    onPress={() => handleAddMeal(selectedMeal)}>
                                    <Text style={styles.buttonText}>Add</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            }
        </React.Fragment>
    )
}

function FoodRow({food}) {
    return (
        <View style={{flexDirection: 'row', borderBottomWidth: 1, borderColor: '#E2E7EE', alignItems: 'center', paddingBottom: 10, paddingTop: 10}}>
            <Image source={{uri: food.imgUrl.url}} style={{height: 60, width: 60, borderRadius: 10}}/>
            <View style={{paddingLeft: '3%'}}>
                <Text style={{fontSize: 20}}>{food["food-name"][0].toUpperCase() + food["food-name"].slice(1)}</Text>
                <Text style={{fontSize: 16, color: '#7d7d7d'}}>{food["quantity"] + " Serving(s)"}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 20,
        borderColor: '#cfcfcf',
        flexGrow: 1
    },
    button: {
        width: '90%',
        height: 55,
        backgroundColor: '#aad326',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
    },
    buttonContainer: {
        height: 150,
        paddingTop: '5%',
        backgroundColor: '#fff'
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})
