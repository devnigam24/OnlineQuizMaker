export function getUserNameDomainErrorObject() {
    return {
        'label': 'signupusername',
        'message': 'Email has to be a CSU fullerton Email'
    };
}

export function userNameInvalidErrorObject() {
    return {
        'label': 'signupusername',
        'message': 'Email Invalid'
    };
}

export function passwordInvalidLengthErrorObject() {
    return {
        'label': 'signuppassword',
        'message': 'Password Length has to be between 6 to 12'
    };
}

export function passwordInvalidErrorObject() {
    return {
        'label': 'signuppassword',
        'message': 'Password Invalid'
    };
}

export function firstNameInvalidErrorObject() {
    return {
        'label': 'fname',
        'message': 'First Name Invalid'
    };
}

export function firstNameInvalidChars() {
    return {
        'label': 'fname',
        'message': 'First Name contains invalid characters'
    };
}

export function lastNameInvalidErrorObject() {
    return {
        'label': 'lname',
        'message': 'Last Name Invalid'
    };
}

export function lastNameInvalidChars() {
    return {
        'label': 'lname',
        'message': 'Last Name contains invalid characters'
    };
}

export function formInvalidErrorObject() {
    return {
        'label': 'form',
        'message': 'Form Inputs either not complete or invalid'
    };
}

export function phoneNumberInvalidErrorObject() {
    return {
        'label': 'pnumber',
        'message': 'Phone Number Invalid'
    };
}

export function phoneNumberInvalidFormatErrorObject() {
    return {
        'label': 'pnumber',
        'message': 'Phone Number Invalid Format'
    };
}

export function idInvalidErrorObject() {
    return {
        'label': 'cid',
        'message': 'CWID Invalid'
    };
}

export function credententialsMismatchErrorObject() {
    return {
        'label': 'credentialInvalid',
        'message': 'The Username and Password does not match'
    };
}

export function usernameNotExists() {
    return {
        'label': 'credentialInvalid',
        'message': 'Username does not exists try another email id'
    };
}

export function internalServerErrorObject() {
    return {
        'label': 'servererror',
        'message': '500 Internal Server Error'
    };
}

export function quizTopicNotExists() {
    return {
        'label': 'quizTopic',
        'message': 'Please Enter a quiz topic'
    };
}

export function quizTopicInvalid() {
    return {
        'label': 'quizTopic',
        'message': 'Please enter a valid quiz topic'
    };
}

export function quizInvalidDates() {
    return {
        'label': 'quizDates',
        'message': 'Please enter valid quiz validity'
    };
}
