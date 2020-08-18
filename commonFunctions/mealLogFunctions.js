function getDefaultMealType(hours) {
    let defaultMealType = null;
    if (hours >= 12 && hours < 18) {
        defaultMealType = 'lunch';
    } else if (hours >= 18 && hours < 22) {
        defaultMealType = 'dinner'
    } else if (hours >= 22 || hours < 5) {
        defaultMealType = 'supper'
    } else {
        defaultMealType = 'breakfast'
    }
    return defaultMealType;
}

function isValidMeal(meal) {
    return meal && meal.beverage.length + meal.main.length + meal.side.length + meal.dessert.length !== 0;
}

export {getDefaultMealType, isValidMeal}