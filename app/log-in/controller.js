import Ember from 'ember';
import ValidationHelper from '../helpers/validation-helper';
import ErrorObjects from '../helpers/error-objects';
import Utils from '../helpers/utils';

export default Ember.Controller.extend({
    serverSideFormError: Ember.A([]),
    appCtrl: Ember.inject.controller('application'),
    username: null,
    password: null,
    isInputValidText: ValidationHelper.isInputValidText,
    signUpService: Ember.inject.service('login-signup'),
    sessionService: Ember.inject.service('session'),
    noErrors: Ember.computed.readOnly('serverSideFormError', function() {
        return this.get('serverSideFormError').length === 0 ? true : false;
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
        processLoginAction() {
            if (this.noErrors && this.isInputValidText(this.username) && this.isInputValidText(this.password)) {
                const userObject = Ember.Object.create({
                    'username': this.get('username'),
                    'password': this.get('password')
                });
                this.set('serverSideFormError', Utils.filterObjects(this.serverSideFormError, 'form'));
                //const promise = this.get('signUpService').callAuthenticateUser(userObject);
                this.get('store').find('authenticationObjects','test').then(function(post) {
                  console.log(post);
                });
                // promise.then((data) => {
                //     if (data === 'LOGIN_VALID') {
                //         this.set('serverSideFormError', Utils.filterObjects(this.serverSideFormError, 'credentialInvalid'));
                //         const userSessionObj = Ember.Object.create({
                //             'username': userObject.username,
                //             'id': userObject.username
                //         });
                //         const sessioPromise = this.get('sessionService').createSession(userSessionObj);
                //         sessioPromise.then((data) => {
                //             this.get('appCtrl').set('isSIgnedIn', true);
                //             this.transitionToRoute('dashboard');
                //         });
                //     } else if (data === 'USERNAME_NOT_EXISTS') {
                //         this.send('someErrorwithFormInput', ErrorObjects.usernameNotExists());
                //     } else {
                //         this.send('someErrorwithFormInput', ErrorObjects.credententialsMismatchErrorObject());
                //     }
                // })
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
