import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'header',
    classNames: ['navbar-fixed'],
    classNameBindings: ['isSIgnedIn:navPC'],
    sessionService: Ember.inject.service('session'),
    appCtrl: Ember.inject.controller('application'),
    actions: {
        signUpButtonPressed() {
            this.set('showJoinButton', false);
        },
        logOut() {
            Ember.Logger.log('Session Data cleared');
            this.get('sessionService').clearSession();
            this.get('appCtrl').send('didLogout');
        }
    }
});
