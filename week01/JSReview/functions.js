const returnEmptyString = function () {
    return "";
};

const returnZeroNumber = function () {
    return 0;
};

const returnEmptyArray = function () {
    return [];
};

const returnEmptyObject = function () {
    return {};
};

const returnString = function (str) {
    return str;
};

const addition = function (num1, num2) {
    return num1 + num2;
};

const subtraction = function (num1, num2) {
    return num1 - num2;
};

const multiplication = function (num1, num2) {
    return num1 * num2;
};

const division = function (num1, num2) {
    return num1 / num2;
};

const returnArray = function (arr) {
    return arr;
};

const returnFirstIndex = function (arr) {
    return arr[0];
};

const returnSecondIndex = function (arr) {
    return arr[1];
};

const returnArrayLength = function (arr) {
    return arr.length;
};

const arraySum = function (arr) {
    return arr.reduce((acc, curr) => acc + curr, 0);
};

const arraySubtraction = function (arr) {
    return arr.reduce((acc, curr) => acc - curr, 0);
};

const multiplicationArray = function (arr) {
    return arr.reduce((acc, curr) => acc * curr, 1);
};

const divisionArray = function (arr) {
    return parseFloat(arr.reduce((acc, curr) => acc / curr).toFixed(3));
};

const oddArray = function (arr) {
    return arr.filter((num) => num % 2 !== 0);
};

const evenArray = function (arr) {
    return arr.filter((num) => num % 2 === 0);
};

module.exports = {
returnEmptyString,
returnZeroNumber,
returnEmptyArray,
returnEmptyObject,
returnString,
addition,
subtraction,
multiplication,
division,
returnArray,
returnFirstIndex,
returnSecondIndex,
returnArrayLength,
arraySum,
arraySubtraction,
multiplicationArray,
divisionArray,
oddArray,
evenArray
}
