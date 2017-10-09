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
