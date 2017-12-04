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
    cwid: null,
    isInputValidText: ValidationHelper.isInputValidText,
    inputsTouced: Ember.computed('username', 'password', 'firstname', 'lastname', 'phonenumber', 'cwid', function() {
        return this.isInputValidText(this.get('username')) &&
            this.isInputValidText(this.get('password')) &&
            this.isInputValidText(this.get('firstname')) &&
            this.isInputValidText(this.get('lastname')) &&
            this.isInputValidText(this.get('phonenumber')) &&
            this.isInputValidText(this.get('cwid'));
    }),
    noErrors: Ember.computed('serverSideFormError', function() {
        if (this.get('inputsTouced')) {
            return this.get('serverSideFormError').length === 0 ? true : false;
        } else {
            return false;
        }

    }),
    serverSideFormErrorObserver: Ember.observer('serverSideFormError', function() {
        if (this.get('inputsTouced')) {
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
                this.set('cwid', value);
                this.set('serverSideFormError', Utils.filterObjects(this.serverSideFormError, 'cid'));
            } else {
                this.send('someErrorwithFormInput', ErrorObjects.idInvalidErrorObject());
                this.set('cwid', null);
            }
        },

        processSIgnUpAction() {
            if (this.get('noErrors')) {
                const userToPush = this.createRandomUser();
                this.get('store').createRecord('user', userToPush).save();
            } else {
                this.send('someErrorwithFormInput', ErrorObjects.formInvalidErrorObject());
            }
        },

        someErrorwithFormInput(errorObject) {
            let errorArray = this.get('serverSideFormError');
            if (!Utils.isObjectExistsInArray(errorArray, errorObject)) {
                Materialize.toast(errorObject.message, 4000);
                Ember.run.later(() => {
                    errorArray.pushObject(errorObject);
                    this.set('serverSideFormError', errorArray);
                    this.notifyPropertyChange('serverSideFormError');
                }, 4000);
            }
        }
    },

    createRandomUser() {
        const userObject = {
            emailId: this.get('username'),
            password: this.get('password'),
            lastName: this.get('lastname'),
            firstName: this.get('firstname'),
            phone: this.get('phonenumber'),
            cwid: this.get('cwid'),
            streetAddress: Utils.getRandomAddress(),
            city: Utils.getRandomCity(),
            pincode: Utils.getRandomPinCode(),
            country: "USA",
            desc: Utils.getRandomDesc(),
            isStudent: this.get('isStudent'),
            id: Utils.getRandomId()
        };

        return userObject;
    }
});
