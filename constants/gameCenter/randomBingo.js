const random0 = [
    [1, 18, 14, 19, 6],
    [22, 2, 15, 7, 23],
    [10, 11, 3, 12, 13],
    [24, 8, 16, 4, 25],
    [9, 20, 17, 21, 5],
];

const random1 = [
    [26, 43, 39, 44, 31],
    [47, 27, 40, 32, 48],
    [35, 36, 28, 37, 38],
    [49, 33, 41, 29, 50],
    [34, 45, 42, 46, 30],
];

const random2 = [
    [51, 68, 64, 69, 56],
    [72, 52, 65, 57, 73],
    [60, 61, 53, 62, 63],
    [74, 58, 66, 54, 75],
    [59, 70, 67, 71, 55],
];

const getRandomBoard = index => {
    switch (index){
        case 0:
            return random0;
        case 1:
            return random1;
    }
    return random2;
}

export {getRandomBoard};
