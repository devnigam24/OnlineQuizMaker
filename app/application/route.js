import Ember from 'ember';
import Utils from '../helpers/utils';

export default Ember.Route.extend({
    sessionService: Ember.inject.service('session'),

    userData: Ember.computed(function() {
        return this.get('sessionService').getUserDataFromSession();
    }),

    setupController(controller, model) {
        this._super(controller, model);
        const userData = this.get('userData');
        if (Utils.isValidObject(userData)) {
            controller.set('isSIgnedIn', true);
            controller.set('showLoginButton', false);
            controller.set('showJoinButton', false);
            controller.set('userInsession', userData);
        } else {
            this.get('sessionService').clearSession();
        }
    },

    afterModel: function() {
      this.get('sessionService').setLastLocation('indexPage');
    },

    willDestroy() {
      this._super(...arguments);
    }
});
