import Internationalization from './internationalization';

export function isObjectExistsInArray(array, object) {
    var found = false;
    for (var i = 0; i < array.length; i++) {
        if (array[i].label === object.label) {
            found = true;
            break;
        }
    }
    return found;
}

export function filterObjects(array, keyToFilter) {
    return array.filter(function(object) {
        return object.label !== keyToFilter;
    });
}

export function isValidObject(object) {
    if (object && JSON.stringify(object) !== '') {
        return true;
    } else {
        return false;
    }
}

export function getRandomId() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 9; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomCity() {
    const array = Internationalization.cities;
    return array[this.getRandomArbitrary(0, array.length)];
}

export function getRandomPinCode() {
    const array = Internationalization.pincodes;
    return array[this.getRandomArbitrary(0, array.length)];
}

export function getRandomAddress() {
    const array = Internationalization.streetAddress;
    return array[this.getRandomArbitrary(0, array.length)];
}

export function getRandomDesc() {
    const array = Internationalization.description;
    return array[this.getRandomArbitrary(0, array.length)];
}

export function getTodatDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

export function jumbleArray(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
