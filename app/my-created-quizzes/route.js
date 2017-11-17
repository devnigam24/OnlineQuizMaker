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
            controller.set('isSIgnedIn', userSignedIn);
            controller.set('isStudent', userData.isStudent);
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
        this.get('sessionService').setLastLocation('my-created-quiz');
    },

    model: function() {
        const userData = this.get('sessionService').getUserDataFromSession();
        return this.get('store').query('quiz', {
            postedBy: userData.emailId
        })
    }
});
