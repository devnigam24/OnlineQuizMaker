import Ember from 'ember';
import Utils from '../helpers/utils';

export default Ember.Route.extend({
    sessionService: Ember.inject.service('session'),
    appCtrl: Ember.inject.controller('application'),

    setupController(controller, model) {
        this._super(controller, model);
        const userData = this.get('sessionService').getUserDataFromSession();
        const userSignedIn = this.get('sessionService').isUserSignedIn();
        if (Utils.isValidObject(userData)) {
            controller.set('userInsession', userData);
            this.get('appCtrl').set('userInsession', userData);
            controller.set('isSIgnedIn', userSignedIn);
            this.get('appCtrl').set('isSIgnedIn', userSignedIn);
        } else {
            this.get('sessionService').clearSession();
        }
    },

    beforeModel: function() {
        const lastLocation = this.get('sessionService').getLastLocation();
        if (lastLocation === 'indexPage') {
            this.get('sessionService').clearSession();
            this.get('appCtrl').send('didLogout');
        } else {
            this.set('appCtrl.isIndexPage', false);
        }
    },

    afterModel: function() {
        this.controllerFor('application').set('showLoginButton', false);
        this.controllerFor('application').set('showJoinButton', false);
        this.get('sessionService').setLastLocation('dashboard');
    },

    model: function() {
        const userData = this.get('sessionService').getUserDataFromSession();
        if (userData.isStudent) {
            return Ember.RSVP.hash({
                data: this.get('store').query('result', {
                    attempedBy: userData.emailId
                })
            });
        } else {
            return Ember.RSVP.hash({
                data: this.get('store').query('result', {
                    postedBy: userData.emailId
                })
            });
        }
    }
});
