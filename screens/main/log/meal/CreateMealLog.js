import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';

// Any meal log selected (e.g Create, Recent or Favourites)
// will be rendered to this page for confirmation before the submitting to database.

export default class CreateMealLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beverage: [],
            main: [],
            side: [],
            dessert: []
        }
    }

    callbackFromFoodSearchEngine = (category) => (foodObj) => {
        const previousList = this.state.category;
        // append to list
        previousList.push(foodObj);
        if (category === 'beverage') {
            this.setState({
                beverage: previousList
            });
        } else if (category === 'main') {
            this.setState({
                main: previousList
            });
        } else if (category === 'side') {
            this.setState({
                side: previousList
            });
        } else if (category === 'dessert') {
            this.setState({
                dessert: previousList
            });
        }
    }

    redirectToFoodSearchEngine = () => {
        this.props.navigation.push('FoodSearchEngine')
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.root}>
                <View style={styles.mealNameTextAndIcon}>
                    <Text>Meal Name</Text>
                    <Text>Favourite Icon</Text>
                </View>
                <ScrollView>
                    <ScrollView horizontal={true} contentContainerStyle={styles.rowContent}>
                        <FoodItem type="create" onPress={this.redirectToFoodSearchEngine} />
                    </ScrollView>
                    <ScrollView horizontal={true} contentContainerStyle={styles.rowContent}>
                        <FoodItem type="create" onPress={this.redirectToFoodSearchEngine} />
                    </ScrollView>
                    <ScrollView horizontal={true} contentContainerStyle={styles.rowContent}>
                        <FoodItem type="create" onPress={this.redirectToFoodSearchEngine} />
                    </ScrollView>
                    <ScrollView horizontal={true} contentContainerStyle={styles.rowContent}>
                        <FoodItem type="create" onPress={this.redirectToFoodSearchEngine} />
                    </ScrollView>
                    <TouchableHighlight
                        style={styles.button}
                        underlayColor='#fff'>
                        <Text style={styles.buttonText}>Submit Log!</Text>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        )
    }
}

function EmptyButton({onPress}) {
    return (
        <TouchableHighlight
            style={styles.emptyButton}
            underlayColor='#fff'
            onPress={onPress}>
            <Text style={styles.buttonText}>+</Text>
        </TouchableHighlight>
    )
}

function FoodItem({onPress, foodObj, type}) {
    if (type === 'create' ) {
        return (
            <View style={styles.foodItem}>
                <EmptyButton onPress={onPress}/>
                <View style={styles.foodTextWrapper}>

                </View>
            </View>
        )
    } else if (type === 'label') {
        // render view labels (either beverage, main, side or dessert)
    } else {
        // render view for foodObj
    }
}

const styles = StyleSheet.create({
    root: {
        display: 'flex',
        backgroundColor: '#ffffff'
    },
    mealNameTextAndIcon: {
        display: 'flex',
        flexDirection: 'row',
        height: 80,
        padding: 20,
    },
    rowContent: {
        display: 'flex',
        flexDirection: 'row',
        height: 150,
    },
    button:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'#68a0cf',
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
    buttonText:{
        color:'#fff',
        textAlign:'center',
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