import Ember from 'ember';
import ValidationHelper from '../helpers/validation-helper';

export default Ember.Controller.extend({
    serverSideFormError: Ember.A([]),
    username: null,
    password: null,
    firstname: null,
    lastname: null,
    isInputValid: ValidationHelper.isInputValid,
    isEmailDomainValid: ValidationHelper.isEmailDomainValid,
    isInputOfCorrectLength: ValidationHelper.isInputOfCorrectLength,
    actions: {
        signUpUserNameValidation(signUpUserName) {
            if (this.isInputValid(signUpUserName)) {
                if (this.isEmailDomainValid(signUpUserName)) {
                    Ember.Logger.info('username success with : ' + signUpUserName);
                    this.set('username', signUpUserName);
                } else {
                    this.send('someErrorwithFormInput', 'Email has to be a CSU fullerton Email');
                    this.set('username', null);
                }
            } else {
                this.send('someErrorwithFormInput', 'Email Invalid');
                this.set('username', null);
            }
        },
        signUpUserPasswordValidation(signUpPassword) {
            if (this.isInputValid(signUpPassword)) {
                if (this.isInputOfCorrectLength(signUpPassword, 4, 8)) {
                    Ember.Logger.info('Password success with : ' + signUpPassword);
                    this.set('password', signUpPassword);
                } else {
                    this.send('someErrorwithFormInput', 'Password Length has to be between 4 to 8');
                    this.set('password', null);
                }
            } else {
                this.send('someErrorwithFormInput', 'Password Invalid');
                this.set('password', null);
            }
        },
        fnameValidation(value) {
            if (this.isInputValid(value)) {
                this.set('firstname', value);
                Ember.Logger.info('First name success with : ' + value);
            } else {
                this.send('someErrorwithFormInput', 'First Name Invalid');
                this.set('firstname', null);
            }
        },
        lnameValidation(value) {
            if (this.isInputValid(value)) {
                this.set('lastname', value);
                Ember.Logger.info('Last name success with : ' + value);
            } else {
                this.send('someErrorwithFormInput', 'Last Name Invalid');
                this.set('lastname', null);
            }
        },
        processSIgnUpAction() {
            if (this.isInputValid(this.get('username')) && this.isInputValid(this.get('password'))) {
                const userObject = Ember.Object.create({
                    'username': this.get('username'),
                    'password': this.get('password'),
                    'lastname': this.get('lastname'),
                    'firstname': this.get('firstname')
                });
                Ember.Logger.info('processSIgnUpAction called with : ' + JSON.stringify(userObject));
                this.send('setErrorMessageEmpty');
            } else {
                this.send('someErrorwithFormInput', 'Form Invalid');
            }
        },
        setErrorMessageEmpty() {
            this.set('serverSideFormError', Ember.A([]));
        },
        someErrorwithFormInput(loggerMessage) {
            let errorArray = this.get('serverSideFormError');
            if (!(errorArray.includes(loggerMessage)))
                errorArray.pushObject(loggerMessage);
            this.set('serverSideFormError', errorArray);
            Ember.Logger.log(this.get('serverSideFormError'));
        }
    }
});
