import Ember from 'ember';

const {
    isPresent,
    typeOf,
    isEmpty,
    isNone
} = Ember;

export function isInputValidText(inputText) {
    return isPresent(inputText) && typeOf(inputText) === 'string' &&
        !isEmpty(inputText) && !isNone(inputText);
}

export function isInputValidNumber(inputText) {
    return isPresent(inputText) && !(Number.parseInt(inputText).toString() === "NaN") &&
        !isEmpty(inputText) && !isNone(inputText);
}

export function isPhoneNumberFormatValid(inputText) {
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(inputText);
}

export function isEmailDomainValid(inputEmail) {
    return /.+@csu.fullerton\.edu$/.test(inputEmail);
}

export function isInputOfCorrectLength(input, minLength, maxLength) {
    return input.length >= minLength && input.length <= maxLength;
}

export function isInputDoesNotHasSpecialChars(input) {
    return /^[a-z\d\-_\s]+$/i.test(input);
}
