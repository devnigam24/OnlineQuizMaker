import Ember from 'ember';
import ValidationHelper from '../helpers/validation-helper';
import ErrorObjects from '../helpers/error-objects';
import Utils from '../helpers/utils';

export default Ember.Controller.extend({
    serverSideFormError: Ember.A([]),
    username: null,
    password: null,
    firstname: null,
    lastname: null,
    phonenumber: null,
    id: null,
    isInputValidText: ValidationHelper.isInputValidText,
    signUpService: Ember.inject.service('login-signup'),
    noErrors: Ember.computed.readOnly('serverSideFormError', function() {
        return this.get('serverSideFormError').length === 0 ? true : false;
    }),
    serverSideFormErrorObserver: Ember.observer('serverSideFormError', function() {
        if (this.isInputValidText(this.get('username')) &&
            this.isInputValidText(this.get('password')) &&
            this.isInputValidText(this.get('firstname')) &&
            this.isInputValidText(this.get('lastname'))
        ) {
            this.removeObserver('serverSideFormError');
            this.set('serverSideFormError', Utils.filterObjects(this.serverSideFormError, 'form'));
        }
    }),
    actions: {
        userNameValidation(userName) {
            if (this.isInputValidText(userName)) {
                if (ValidationHelper.isEmailDomainValid(userName)) {
                    this.set('username', userName);
                    this.set('serverSideFormError', Utils.filterObjects(this.serverSideFormError, 'signupusername'));
                } else {
                    this.send('someErrorwithFormInput', ErrorObjects.getUserNameDomainErrorObject());
                    this.set('username', null);
                }
            } else {
                this.send('someErrorwithFormInput', ErrorObjects.userNameInvalidErrorObject());
                this.set('username', null);
            }
        },
        passwordValidation(password) {
            if (this.isInputValidText(password)) {
                if (ValidationHelper.isInputOfCorrectLength(password, 6, 12)) {
                    this.set('password', password);
                    this.set('serverSideFormError', Utils.filterObjects(this.serverSideFormError, 'signuppassword'));
                } else {
                    this.send('someErrorwithFormInput', ErrorObjects.passwordInvalidLengthErrorObject());
                    this.set('password', null);
                }
            } else {
                this.send('someErrorwithFormInput', ErrorObjects.passwordInvalidErrorObject());
                this.set('password', null);
            }
        },
        fnameValidation(value) {
            if (this.isInputValidText(value)) {
                if (ValidationHelper.isInputDoesNotHasSpecialChars(value)) {
                    this.set('firstname', value);
                    this.set('serverSideFormError', Utils.filterObjects(this.serverSideFormError, 'fname'));
                } else {
                    this.send('someErrorwithFormInput', ErrorObjects.firstNameInvalidChars());
                    this.set('firstname', null);
                }
            } else {
                this.send('someErrorwithFormInput', ErrorObjects.firstNameInvalidErrorObject());
                this.set('firstname', null);
            }
        },
        lnameValidation(value) {
            if (this.isInputValidText(value)) {
                if (ValidationHelper.isInputDoesNotHasSpecialChars(value)) {
                    this.set('lastname', value);
                    this.set('serverSideFormError', Utils.filterObjects(this.serverSideFormError, 'lname'));
                } else {
                    this.send('someErrorwithFormInput', ErrorObjects.lastNameInvalidChars());
                    this.set('lastname', null);
                }
            } else {
                this.send('someErrorwithFormInput', ErrorObjects.lastNameInvalidErrorObject());
                this.set('lastname', null);
            }
        },

        phoneValidation(value) {
            if (ValidationHelper.isInputValidText(value)) {
                if (ValidationHelper.isPhoneNumberFormatValid(value)) {
                    this.set('phonenumber', value);
                    this.set('serverSideFormError', Utils.filterObjects(this.serverSideFormError, 'pnumber'));
                } else {
                    this.send('someErrorwithFormInput', ErrorObjects.phoneNumberInvalidFormatErrorObject());
                    this.set('phonenumber', null);
                }
            } else {
                this.send('someErrorwithFormInput', ErrorObjects.phoneNumberInvalidErrorObject());
                this.set('phonenumber', null);
            }
        },

        cwidValidation(value) {
            if (ValidationHelper.isInputValidNumber(value)) {
                this.set('id', value);
                this.set('serverSideFormError', Utils.filterObjects(this.serverSideFormError, 'cid'));
            } else {
                this.send('someErrorwithFormInput', ErrorObjects.idInvalidErrorObject());
                this.set('id', null);
            }
        },

        processSIgnUpAction() {
            if (this.noErrors && this.isInputValidText(this.username) &&
                this.isInputValidText(this.firstname) && this.isInputValidText(this.lastname) &&
                this.isInputValidText(this.password)) {
                const userObject = Ember.Object.create({
                    'username': this.get('username'),
                    'password': this.get('password'),
                    'lastname': this.get('lastname'),
                    'firstname': this.get('firstname'),
                    'phone': this.get('phonenumber'),
                    'id': this.get('id'),
                    "streetAddress": "P.O. Box 279, 7334 Feugiat St.",
                    "city": "Miramichi",
                    "pincode": "NC6A 7EJ",
                    "country": "Peru",
                    "desc": "Some long description fetched from Database"
                });
                this.get('signUpService').storeUserRegistration(userObject);
            } else {
                this.send('someErrorwithFormInput', ErrorObjects.formInvalidErrorObject());
            }
        },
        someErrorwithFormInput(errorObject) {
            let errorArray = this.get('serverSideFormError');
            if (!Utils.isObjectExistsInArray(errorArray, errorObject)) {
                errorArray.pushObject(errorObject);
                this.set('serverSideFormError', errorArray);
                this.notifyPropertyChange('serverSideFormError');
            }
        }
    }
});
