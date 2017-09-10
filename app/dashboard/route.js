import Ember from 'ember';
import Utils from '../helpers/utils';

export default Ember.Route.extend({
    sessionService: Ember.inject.service('session'),

    userData: Ember.computed('sessionService', function() {
        return this.get('sessionService').getUserDataFromSession();
    }),

    setupController(controller, model) {
        this._super(controller, model);
        const userData = this.get('userData');
        if (Utils.isValidObject(userData)) {
            controller.set('userInsession', userData);
        } else {
            this.get('sessionService').clearSession();
        }
    }
});
