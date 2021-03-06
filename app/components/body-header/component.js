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
            this.get('sessionService').clearSession();
            this.get('appCtrl').send('didLogout');
        }
    }
});
