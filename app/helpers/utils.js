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

export function getTodatDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear();

  if(dd<10) {
    dd = '0'+dd
  }

  if(mm<10) {
    mm = '0'+mm
  }

  today = mm + '/' + dd + '/' + yyyy;
  return today;
}
