import Ember from 'ember';

const {
    isPresent,
    typeOf,
    isEmpty,
    isNone
} = Ember;

export function isInputValid(inputText) {
    return isPresent(inputText) && typeOf(inputText) === 'string' &&
        !isEmpty(inputText) && !isNone(inputText) && /^[a-z\d\-_\s]+$/i.test(inputText);
}

export function isEmailDomainValid(inputEmail) {
    //return /.+@csu.fullerton\.edu$/.test(inputEmail);
    return /.+.\edu$/.test(inputEmail);
}

export function isInputOfCorrectLength(input, minLength, maxLength) {
    return input.length >= minLength && input.length <= maxLength;
}
