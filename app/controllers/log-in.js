import Ember from 'ember';
import ValidationHelper from '../helpers/validation-helper';
import ErrorObjects from '../helpers/error-objects';
import Utils from '../helpers/utils';

export default Ember.Controller.extend({
    serverSideFormError: Ember.A([]),
    username: null,
    password: null,
    isInputValidText: ValidationHelper.isInputValidText,
    signUpService: Ember.inject.service('login-signup'),
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
        processLoginAction() {
            if (this.serverSideFormError.length === 0 &&
                this.isInputValidText(this.username) &&
                this.isInputValidText(this.password)) {
                const userObject = Ember.Object.create({
                    'username': this.get('username'),
                    'password': this.get('password')
                });
                this.send('setErrorMessageEmpty');
                this.get('signUpService').callAuthenticateUser(userObject);
                console.log(isValidUserPromise);
                // if (isValidUserPromise) {
                //     this.set('serverSideFormError', Utils.filterObjects(this.serverSideFormError, 'credentialInvalid'));
                //     this.transitionToRoute('dashboard');
                // } else {
                //     this.send('someErrorwithFormInput', ErrorObjects.credententialsMismatchErrorObject());
                // }
            } else {
                this.send('someErrorwithFormInput', ErrorObjects.formInvalidErrorObject());
            }
        },
        setErrorMessageEmpty() {
            this.set('serverSideFormError', Ember.A([]));
        },
        isFormInputsValid() {
            return Ember.isEmpty(this.get('serverSideFormError'));
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
